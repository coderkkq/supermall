import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/inedx'

import fastClick from 'fastclick'

import toast from 'components/common/toast'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300毫秒延迟
fastClick.attach(document.body)

//使用 图片懒加载插件
Vue.use(VueLazyload, {
  loading: require('assets/img/common/t01195efb6c24129f3f.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
