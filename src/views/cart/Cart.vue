<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!--商品列表-->
    <cart-list/>

    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComponents/CartList";
import CartBottomBar from "./childComponents/CartBottomBar";

// 导入vuex提供的mapGetters方法
import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  data() {
    return {
    }
  },
  computed: {
    // vuex自带的方法(将getter 混入 computed对象中)
    // 方法一：
    // ...mapGetters(['cartLength','cartList'])
    // 方法二:
    ...mapGetters({
      cartLength: 'cartLength',
      cartList: 'cartList'
    })
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
