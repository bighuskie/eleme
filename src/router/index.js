import Vue from 'vue'
import Router from 'vue-router'
import vueResource from 'vue-resource'
import Business from '@/components/business/container/container'
import Goods from '@/components/business/goods/goods'
import Ratings from '@/components/business/ratings/ratings'
import Seller from '@/components/business/seller/seller'

import Takeout from '@/components/takeout/container/takeout'
import Find from '@/components/find/container/find'
import Order from '@/components/order/container/order'
import Personal from '@/components/personal/container/personal'

import Login from '@/components/common/logining'
import passwordLogin from '@/components/common/passwordLogin'

Vue.use(Router)
Vue.use(vueResource)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/takeout'
    },
    {
      path: '/takeout',
      name: 'Takeout',
      component: Takeout
    },
    {
      path: '/find',
      name: 'Find',
      component: Find
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/business',
      name: 'Business',
      component: Business,
      children: [
        {
          path: '',
          name: 'Goods',
          component: Goods
        },
        {
          path: 'goods',
          name: 'Goods',
          component: Goods
        },
        {
          path: 'ratings',
          name: 'Ratings',
          component: Ratings
        },
        {
          path: 'seller',
          name: 'Seller',
          component: Seller
        },
      ]
    },
    // {
    //   path: '/goods',
    //   name: 'Goods',
    //   component: Goods
    // },
    // {
    //   path: '/ratings',
    //   name: 'Ratings',
    //   component: Ratings
    // },
    // {
    //   path: '/seller',
    //   name: 'Seller',
    //   component: Seller
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/passwordLogin',
      name: 'passwordLogin',
      component: passwordLogin
    }
  ]
})
