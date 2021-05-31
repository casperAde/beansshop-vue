import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// 路由
import router from './router'
// Vuex
import store from './store'
// 全局引入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.scss'
// 字体图标
import './assets/fonts/iconfont.css'

// 引入axios
import axios from 'axios'
// 配置默认请求地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置拦截器
axios.interceptors.request.use(config => {

  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

import TreeTable from 'vue-table-with-tree-grid'

Vue.component('tree-table', TreeTable)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

//创建过滤器将秒数过滤为年月日，时分秒
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
