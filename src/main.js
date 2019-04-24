// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
// import axios from './utils/fetch'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import currency from './utils/currency'

Vue.use(Vuex)
Vue.use(infiniteScroll)
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-bars.svg',
  try: 3
})

import storeConfig from '@/store'

//css全局样式
import '@/assets/css/base.css'
import '@/assets/css/checkout.css'
import '@/assets/css/product.css'
import { EAFNOSUPPORT } from 'constants';

Vue.config.productionTip = false
Vue.filter('currency', currency)
const store = new Vuex.Store(storeConfig)

router.beforeEach((to, from, next) => {
  axios.get('users/checkLogin').then(response => {
    const res = response.data
    if (res.status === '0') {
      store.commit('setName', res.result)      
      next()
    } else {
      store.commit('setName', '')
      next()
    }
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
