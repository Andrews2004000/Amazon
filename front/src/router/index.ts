import Vue from 'vue'
import VueRouter from 'vue-router'
import Tecno from '../components/Tecno.vue'
import Main from '../components/Main.vue'
import Book from '../components/Book.vue'
import House from '../components/House.vue'
import Account from '../components/Account.vue'
import Sell from '../components/Sell.vue'
import Upgrade from '../components/Upgrade.vue'
import VendorPage from '../components/Vendor.vue'
import EditProduct from '../components/EditProduct.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import Detail from '../components/Details.vue'
import SendEmail from '../components/Reset.vue'
import Orders from '../components/AllOrders.vue'
import ResetPassword from '../components/ResetPassword.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../components/Main.vue'),
  },
  {
    path: '/Reset',

    component: () => import('../components/Reset.vue'),
  },
  {
    path: '/Orders',
    component: () => import('../components/AllOrders.vue'),
  },
  {
    path: '/Detail/:prodId',
    name: 'Detail',
    component: () => import('../components/Details.vue'),
  },
  {
    path: '/EditProduct',
    name: 'Edit',
    component: () => import('../components/EditProduct.vue'),
  },
  {
    path: '/VendorPageDetails',
    name: 'VendorPage',
    component: () => import('../components/Vendor.vue'),
  },
  {
    path: '/UpgradedUser',
    name: 'UpgradedeUser',
    component: () => import('../components/Upgrade.vue'),
  },
  {
    path: '/Sell',
    name: 'Sell',
    component: () => import('../components/Sell.vue'),
  },
  {
    path: '/ShoppingCart/',
    name: 'ShoppingCart',
    component: () => import('../components/ShoppingCart.vue'),
  },
  {
    path: '/ResetPassword/:token',

    component: () => import('../components/ResetPassword.vue'),
  },
  {
    path: '/Account',
    name: 'Account',
    component: () => import('../components/Account.vue'),
  },
  {
    path: '/House',
    name: 'House',
    component: () => import('../components/House.vue'),
  },
  {
    path: '/Book',
    name: 'Book',
    component: () => import('../components/Book.vue'),
  },
  {
    path: '/Tecnology',
    name: 'Tecno',
    component: () => import('../components/Tecno.vue'),
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
