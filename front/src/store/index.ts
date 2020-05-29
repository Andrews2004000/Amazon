import Vue from 'vue'
import Vuex from 'vuex'
import {Api} from './api'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prods:[]
  },
  mutations: {
    SET_PRODUCTS(state,products){
      state.prods = products
      
    },
    LOGIN_USER(state,userLogin){
      
    }
  
  },
  actions: {
    async setProducts({commit}){
    const products =  await Api.fetchData('products')
      commit('SET_PRODUCTS',products)

    },
    async Login({commit}){
      const userLogin = await Api.fetchData('user/login')
      commit('LOGIN_USER',userLogin)
    }
    
},
  getters:{
  
    
  },
  modules: {
  }
})
