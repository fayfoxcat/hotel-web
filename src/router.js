import Vue from 'vue'
import Router from 'vue-router'
import Home from './Home'
import Order from '@/components/User/Order'
import PersonInfo from '@/components/User/PersonInfo'
import OrderDetails from '@/components/User/OrderDetails'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/Home'
    },
    {
      path: '/Home',
      component: Home,
      children:[
        { path:'Order',component: Order },
        { path:'PersonInfo',component: PersonInfo },
        { path:'OrderDetails',name:'OrderDetails',component: OrderDetails},
      ]
    },
  ]
})
