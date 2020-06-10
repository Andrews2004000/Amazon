import Vue from 'vue'
import Vuex from 'vuex'
import  Api  from './api'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prod:[],
    cart:[],
    videogames: [],
    AllProducts:[],
    TecnologyProducts : [],
    HouseProducts:[],
    BookProducts:[],
   AllTags:{
     Tecno:['videogames','phones','computers'],
     House:['livingRoom','bedroom','garden'],
     Book:['fantasy','history','action']
   },
    userData:{
      username:null,
      email:null,
      password:null,
      confirmPassword:null,
      role:null,
    },
    isLoggedIn:false
  },
  mutations: {
SETUP_RODUCTS_DATA<T>(state:T,payload:{type:string;data:any}){
const type = payload.type;
const data = payload.data;
state[type as keyof T] = data;
},
LOAD_USER_DATA(state,payload){
  state.userData = payload;
  state.isLoggedIn = true;
},
    
SIGNUP(state,payload){
state.userData = payload;
state.isLoggedIn = true;
},

LOGIN(state,payload){
state.userData = payload;
state.isLoggedIn = true;
},

LOGOUT(state){
  state.userData = {} as any;
state.isLoggedIn = false;
},

DELETE_ACCOUNT(state){
state.isLoggedIn = false;
},
CREATE_NEW_PRODUCTS(state,payload){
state.prod = payload;
},
CREATE_NEW_ORDER(state,payload){
state.cart = payload;
},
CHANGE_ACCOUNT_DETAILS(state,payload){
  state.isLoggedIn = true;
  state.userData = payload;
},

ALL_PRODUCTS(state,payload){
  state.AllProducts = payload;
},
TECNOLOGY_PRODUCTS(state,payload){
  state.TecnologyProducts = payload;
},

BOOKS_PRODUCTS(state,payload){
  state.BookProducts = payload;
},
HOUSE_PRODUCTS(state,payload){
  state.HouseProducts = payload;
}
    },
  actions: {
    async Signup({ commit },payload){
      const result = await Api.fetchData(`user`,true,'PUT',payload);
     
      if(!result.ok){
        return
      }
      const data = result.data;
      commit('SIGNUP',data)

    },
    async load({commit}){
const result = await Api.fetchData(`user/userUpdatings`)
if(!result.ok){
     
  return;
}
const data = result.data;
console.log(data)
commit('LOAD_USER_DATA',data)


    },
    async Login({commit},payload){
      const result = await Api.fetchData(`user`,true,'POST',payload)
  
      if(!result.ok){
        return
      }
      const data = result.data;
      commit('LOGIN',data)

    },
    async Logout({commit}){
      const result = await Api.fetchData(`user/userUpdatings`,true,'POST')
     
      if(!result.ok){
        return;
      }
      commit('LOGOUT')

    },
    async deleteMe({commit}){
      const result = await Api.fetchData(`user/userUpdatings`,true,'DELETE')
if(!result.ok){
  return;
}
console.log(result)
commit('LOGOUT')
    },
    async getAllUsers({commit}){
      const result = await Api.fetchData(`user`)
      if(!result.ok){
        return;
      }
      const data = result.data
      return data;

    },
    

    //changeAccountDetails
    async changeAccountDetails({ commit }, payload) {
      console.log(payload)
      const result = await Api.fetchData(`user/userUpdatings`, true, 'PATCH', payload);
      console.log('7')
      console.log(result)
      if (!result.ok) {
          return;
      }
      console.log('5')
      const data = result.data;
      console.log('6')
      console.log(data)
      commit('CHANGE_ACCOUNT_DETAILS', data);
      return data;
  },

  //Create Product
    async CreteNewProducts({commit},userInputs){
const result = await Api.fetchData(`products`,true,'POST',userInputs)
console.log(result)
if(!result.ok){
  return;
}
const data = result.data;
console.log(data)
console.log('3')
commit('CREATE_NEW_PRODUCTS',data)

    },

 

   
   
    async SearchProducts({commit},{searchQuery,categoryType}){
      
      const result = await Api.fetchData(
        `products?search=${searchQuery}`
      )
      console.log(result)
      if(!result.ok){
        return;
      }
      const data = result.data;
      commit('SETUP_RODUCTS_DATA',{data,type:categoryType})

    },
    async LoadAllProducts({commit}){
    const result = await Api.fetchData(`products`,true,'GET')
  
    if(!result.ok){
      return;
    }
  
    const data = result.data;

   
   
    commit('ALL_PRODUCTS',data);
    

    },
    async getOneProduct({commit},productId){
      const result = await Api.fetchData(`products/${productId}`)

    },
    
    async LoadTecnologyProducts({commit}){
      const result = await Api.fetchData(`products?category=Tecnology`,true,'GET')
      if(!result.ok){
        return;
      }
      const data = result.data;
 
      
      commit('TECNOLOGY_PRODUCTS',data);
      
  
      },
      
      async LoadHouseProducts({commit}){
        const result = await Api.fetchData(`products?category=House`,true,'GET')
        console.log(result)
        if(!result.ok){
          return;
        }
        const data = result.data;
        commit('HOUSE_PRODUCTS',data)
        
    
        },
        async LoadBooksProducts({commit}){
          const result = await Api.fetchData(`products?category=Book`,true,'GET')
          if(!result.ok){
            return;
          }
          const data = result.data;
          commit('BOOKS_PRODUCTS',data)
          
      
          }
   
},
})
