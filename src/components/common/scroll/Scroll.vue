<template>
<!--  ref绑定给子组件，因为不推荐使用document.querySelector获取元素-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    // pullUpLoad: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      // 实时监听滑动（probeType）
      probeType: this.probeType,
      // 上拉加载更多（pullUpLoad）
      // pullUpLoad: this.pullUpLoad,
      // 电脑端鼠标滑动需要（mouseWheel）
      mouseWheel: true
    })
    // 2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
      // console.log(position)
      this.$emit('scroll', position)
    })
    // 3.监听上拉事件
    // this.scroll.on('pullingUp', () => {
    //   this.$emit('pullingUp')
    // })
  },
  methods: {
    scrollTo(x, y, time=500) {
      this.scroll.scrollTo(x, y, time)
    },
    // finishPullUp() {
    //   this.scroll.finishPullUp()
    // }
  }
}
</script>

<style scoped>

</style>
