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
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/EditProduct/:id',
    name: 'Edit',
    component: EditProduct
  },
  {
    path: '/VendorPageDetails',
    name: 'VendorPage',
    component: VendorPage
  },
  {
    path: '/UpgradedUser',
    name: 'UpgradedeUser',
    component: Upgrade
  },
  {
    path: '/Sell',
    name: 'Sell',
    component: Sell
  },
  {
    path: '/ShoppingCart',
    name: 'ShoppingCart',
    component: ShoppingCart
  },
  {
    path: '/Account',
    name: 'Account',
    component: Account
  },
  {
    path: '/House',
    name: 'House',
    component: House
  },
  {
    path: '/Book',
    name: 'Book',
    component: Book
  },
  {
    path: '/Tecnology',
    name: 'Tecno',
    component: Tecno
  },
 

 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
