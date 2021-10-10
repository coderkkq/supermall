<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
   <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
     <detail-swiper :top-images="topImages"></detail-swiper>
     <detail-base-info :goods="goods"/>
     <detail-shop-info :shop="shop"/>
     <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
     <detail-param-info ref="params" :param-info="paramInfo"/>
     <detail-comment-info ref="comment" :comment-info="commentInfo"/>
     <goods-list ref="recommend" :goods="recommends"/>
   </scroll>
    <detail-bottom-bar @addToCart="addCart"/>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

// 导入请求数据的方法
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
import {debounce} from "common/utils";
import {backTopMixin} from 'common/mixin'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,

  },
  mixins: [backTopMixin],   //混入机制

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
    }
  },
  created() {
    // 1.第一步,保存传入的iid
    // 第一种方式：
    // console.log(this.$route.params)
    this.iid = this.$route.params.iid
    // 第二种方式：
    // console.log(this.$route.query)
    // this.iid = this.$route.query.iid

    // 2.第二步,根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res)
      const data = res.result;
       // 1、获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      // 3创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      // $nextTick()等待上面的组件渲染完成再执行nextTick()，执行里面的回调函数
      // 但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
      // offset值不对的时候，都是因为图片的问题
      // this.$nextTick(() => {
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //
      //   console.log(this.themeTopYs)
      // })
    })

    // 3.请求推荐的数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.$bus.$on('detailImageLoad', () => {
      newRefresh()
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      // 这里监听图片的加载：在DetailGoodsInfo组件里面已经对图片加载的多少进行了一次限制，
      // 只在加载最后一张图片时才执行回调函数
      // $nextTick()等待组件渲染完成再执行nextTick()，执行里面的回调函数
      this.$nextTick(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // 传入一个Number.MAX_VALUE，为js的最大值，方便后面页面滚动判断用
        this.themeTopYs.push(Number.MAX_VALUE)

        // console.log(this.themeTopYs)
      })
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)

    },
    contentScroll(position) {
      // console.log(position)
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
        //   console.log(i)
        // }

        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <
          this.themeTopYs[i+1])) {
          this.currentIndex = i;
          console.log(i)
        }

        // if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY <
        //   this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i;
        //   // console.log(this.currentIndex)
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
      }

      // 是否显示回到顶部
      this.isShowBackTop = (-position.y) > 1000
    },
    addCart() {
      // 1、获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;   //商品唯一标识，必传

      // 2、将商品添加到购物车(使用vuex)
      // 当vuex里面做了某些操作，要想知道这个操作，可以使用Promise()
      this.$store.dispatch('addCart', product).then(res => {
        // this.isShow = true,
        //   this.message = res
        //
        // setTimeout(() => {
        //   this.isShow = false
        //   this.message = ''
        // },1500)

        this.$toast.show(res, 1500)
      })
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: calc(100vh - 44px - 49px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: 100%;
  }
</style>
