import  {
  ADD_CART,
  ADD_COUNTER
} from './mutations-types'

export default {
  // mutations 唯一的目的就是哦修改state中的状态
  //mutations 中的每个方法尽可能完成的事件比较单一一点
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
