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
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // observeDOM: true,
      click: true,
      // 实时监听滑动（probeType）
      probeType: this.probeType,
      // 上拉加载更多（pullUpLoad）
      pullUpLoad: this.pullUpLoad,
      // 电脑端鼠标滑动需要（mouseWheel）
      // mouseWheel: true
    })
    // 2.监听滚动的位置(先判断probeType的值为2或3时才监听滚动位置)
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit('scroll', position)
      })
    }
    // 3.监听scroll滚动到底部(先判断使用组件时有没有传值设置pullUpLoad为true)
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('监听滚动到底部')
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      // console.log('----')
      this.scroll && this.scroll.refresh()
    },
    // 上拉加载更多
    finishPullUp() {
     this.scroll && this.scroll.finishPullUp()
    },
    // 获取滑动的位置
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
