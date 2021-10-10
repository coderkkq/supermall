import Vue from 'vue'
import VueRouter from 'vue-router'
import * as path from "path";

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

//2. 创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    // 使用动态路由的方式，拼接id，跳转路由携带参数
    // 第一种方式写法:
    path: '/detail/:iid',

    // 第二种方式写法:
    // path: '/detail',
    component: Detail
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
