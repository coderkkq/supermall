<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList"
                      :key="index"
                      :product="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

import {mapGetters} from 'vuex'
export default {
  name: "CartList",
  computed: {
    ...mapGetters({
      cartList: 'cartList'
    })
  },
  components: {
    Scroll,
    CartListItem
  },
  activated() {
    // 进入组件重新刷新一下（使得better-scroll重新计算高度）
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;
  }
  .content {
    height: 100%;
  }
</style>
