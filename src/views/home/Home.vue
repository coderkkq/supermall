<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">

      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
   </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>


<script>
// 页面子组件导入
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 公共组件导入
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

// 导入对home页面封装的网络请求的方法
import {getHomeMultidata, getHomeGoods} from "network/home";

//导入封装的公共方法
import {debounce} from "common/utils";
import {backTopMixin} from 'common/mixin'


export default {
  name: "Home",
  components: {
    // Profile,
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [backTopMixin],  // 混入机制

  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',     //保存goods里面 数据的显示类型
      tabOffsetTop: 0,    //获取tabControl组件距离顶部的距离
      isTabFixed: false,    //判断tabControl的显示和隐藏
      saveY: 0   //保存路由跳转是的滑动位置
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  // 组件销毁调用(使用keep-alive后组件不销毁)
  // destroyed() {
  //   console.log('home destroyed')
  // },
  // 进入组件时（即组件进入活跃状态）调用activated()
  activated() {
    // console.log('activated')
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // 刷新一下
    this.$refs.scroll.refresh()
  },
  // 离开组件时（即组件进入不活跃状态）调用deactivated()
  deactivated() {
    // console.log('deactivated')
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY)  //打印离开时获取的滚动位置
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 1.图片加载完成的事件监听
    // 下面这里的this.$refs.scroll.refresh  : 为什么没有()，因为
    // 带上()指向的是this.$refs.scroll.refresh()执行后的返回值
    const refresh = debounce(this.$refs.scroll.refresh,200)
    // 组件创建完后监听GoodsListItem中图片是否加载
    // 注意这里的$bus是指在main.js里面通过原型上定义创建的一个全局变量（可以在任意Vue实例中通过$bus调用）
    this.$bus.$on('homeItemImageLoad',() => {
      refresh()
    })

  },
  methods: {
    //事件监听相关：
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      // console.log('-----')
      this.isShowBackTop = (-position.y) > 1000

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      // console.log('加载更多的方法')
      this.getHomeGoods(this.currentType)
      // // 因为better-scroll和图片的异步加载问题，需要调用refresh刷新一下
      // this.$refs.scroll.scroll.refresh()
    },
    //网络请求相关：
    getHomeMultidata() {
      //1.请求多个数据
      getHomeMultidata().then(res => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(this.banners)
        // console.log(this.recommends)
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 完成上拉加载更多，（默认scroll只执行一次上拉加载完成，
        // 这里调用一下scroll对象里面的finishPullUp(),指上拉加载完成
        this.$refs.scroll.finishPullUp()
      })
    },
    // 获取tabControl的offsetTop(注意组件没有offsetTop)
    // 所以的组件都有一个属性$el: 用于获取组件中的元素
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  }
}
</script>

<style scoped>
  #home {
    position: relative;
    /*padding-top: 44px;*/
    /*vh：视口，100vh：100个视口的高度*/
    height: 100vh;
  }
 .home-nav {
   background-color: var(--color-tint);
   color: #ffffff;
   /*position: fixed;*/
   /*left: 0;*/
   /*right: 0;*/
   /*top: 0;*/
   /*z-index: 9;*/
 }
 /*轮播图内容*/
 .content {
   position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0;
   right: 0;
   overflow: hidden;
 }
 .tab-control {
   position: relative;
   z-index: 9;
   background-color: #fff;
 }
 /*.content {*/
 /*  height: calc(100% - 93px);*/
 /*  overflow: hidden;*/
 /*  margin-top: 44px;*/
 /*}*/
</style>
