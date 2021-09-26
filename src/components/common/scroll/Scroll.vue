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
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      tap: true,
      mouseWheel: true
      // observeImage: true
    })
  }
}
</script>

<style scoped>

</style>
