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
      
    }
  
  },
  actions: {
    async setProducts({commit}){
    const products =  await Api.fetchData('/products')
      commit('GET_PRODUCTS',products)

    }
    
},
  getters:{
  
    
  },
  modules: {
  }
})
