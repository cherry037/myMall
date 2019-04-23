import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/goodsList'
import NotFound from '@/404.vue'
import Cart from '@/views/cart.vue'
import Address from '@/views/address.vue'
import OrderConfirm from '@/views/orderConfirm.vue'
import OrderSuccess from '@/views/orderSuccess.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: Cart,
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
