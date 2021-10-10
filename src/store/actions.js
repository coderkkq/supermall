import  {
  ADD_CART,
  ADD_COUNTER
} from './mutations-types'


export default {
  addCart(context, payload) {
    // payload:新添加的商品
    // 方法一
    // 1、查找之前的数组中是否有该商品
    // let oldProduct = null
    // for (let item of context.state.cartList){
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }
    // // 2、判断oldProduct
    // if (oldProduct) {
    //   oldProduct.count += 1
    // }else {
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }

    // 方法二
    // 1、查找之前的数组中是否有该商品
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2、判断oldProduct
      if (oldProduct) {    //数量+1
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      }else {     //添加新的商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}
