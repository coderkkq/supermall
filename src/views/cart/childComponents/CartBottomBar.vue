<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="settlement" @click="calcClick">去结算: ({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' +this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      // return this.$store.state.cartList.filter(item => item.checked).length
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count
      }, 0)
    },
    isSelectAll() {
      // 方法一：对购物车中的数据进行过滤，获取到不选中状态的数组的长度，然后取反（数字取反==false）
      // if (this.cartList.length === 0) return false   //当数组为零时返回一个false（小bug）
      // return !(this.cartList.filter(item => !item.checked).length)

      // 方法二：
      // 判断反非选中状态的数组的长度是否为零
      // if (this.cartList.length === 0) return false    //当数组为零时返回一个false（小bug）
      // return (this.cartList.filter(item => !item.checked).length === 0)

      // 方法三：（不用遍历数组，性能更好）
      // 查找数组中的非选中状态，如果有则find方法返回true，然后return回去的布尔值取反
      if (this.cartList.length === 0) return false     //当数组为零时返回一个false（小bug）
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      // if (this.isSelectAll) {    //this.isSelectAll : 这个为全部选中状态
      //   this.cartList.forEach(item => item.checked = false)
      // } else {
      //   this.cartList.forEach(item => item.checked = true)
      // }
      // 改用三元表达式：
      return this.isSelectAll ? this.cartList.forEach(item => item.checked = false)
        : this.cartList.forEach(item => item.checked = true)
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的东西', 1500)
      }
    }
  }
}
</script>

<style scoped>
  .cart-bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    background-color: #eeeeee;
    line-height: 40px;
    font-size: 14px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 30px;
    flex: 1;
  }
  .settlement {
    width: 90px;
    margin-left: 80px;
    background-color: red;
    color: #ffffff;
    text-align: center;
  }
</style>
