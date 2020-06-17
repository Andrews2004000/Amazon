
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import store from './index'
import Api from './api'
import router from '../router/index'
export interface IGenericObject {
  [key: string]: any
}

//Vue.use(Vuex)
@Module({ dynamic: true, store, name: 'global-store' })

//export default new Vuex.Store({
export default class App extends VuexModule {

  prod = [];
  cart = [];


  product = []
  order = []
  itemFromCart = []
  videogames = []
  Products = []
  TecnologyProducts = []
  HouseProducts = []
  BookProducts = []
  AllTags = {
    Tecno: ['videogames', 'phones', 'computers'],
    House: ['livingRoom', 'bedroom', 'garden'],
    Book: ['fantasy', 'history', 'action']
  };
  userData: IGenericObject = {};






  isLoggedIn = false;


  @Mutation
  SETUP_RODUCTS_DATA(payload: { type: string; data: any }) {
    const type = payload.type;
    const data = payload.data;
    this[type] = data;
    //this[type] = data;
  }
  @Mutation
  LOAD_USER_DATA(payload: IGenericObject) {
    this.userData = payload;
    this.isLoggedIn = true;
  }
  @Mutation
  SIGNUP(payload: IGenericObject) {
    this.userData = payload;
    this.isLoggedIn = true;
  }
  @Mutation
  LOGIN(payload: IGenericObject) {
    this.userData = payload;
    this.isLoggedIn = true;
  }
  @Mutation
  LOGOUT() {
    this.userData = {} as any;
    this.isLoggedIn = false;
  }
  @Mutation
  DELETE_ACCOUNT() {
    this.isLoggedIn = false;
  }
  @Mutation
  CREATE_NEW_PRODUCTS(payload: any) {
    this.prod = payload;
  }
  @Mutation
  ADD_PRODUCT_TO_CART(payload?) {

    this.cart = payload;
  }
  @Mutation
  GET_ITEM_FROM_CART(payload) {

    this.itemFromCart = payload;
  }

  @Mutation
  ADD_PRODUCT_TO_PAYMENT(payload: any) {
    this.order = payload

  }


  @Mutation
  CHANGE_ACCOUNT_DETAILS(payload: any) {
    this.isLoggedIn = true;
    this.userData = payload;
  }
  @Mutation
  ALL_PRODUCTS(payload: any) {
    this.Products = payload;
  }
  @Mutation
  TECNOLOGY_PRODUCTS(payload: any) {
    this.TecnologyProducts = payload;
  }
  @Mutation
  BOOKS_PRODUCTS(payload: any) {
    this.BookProducts = payload;
  }
  @Mutation
  HOUSE_PRODUCTS(payload: any) {
    this.HouseProducts = payload;
  }
  @Mutation
  GET_ONE_PRODUCT(payload) {
    this.product = payload;
  }

  @Action
  async Signup(payload: any) {
    const result = await Api.fetchData(`user`, true, 'PUT', payload);

    if (!result.ok) {
      return
    }
    const data = result.data;
    this.SIGNUP(data)

  }

  @Action
  async load() {
    const result = await Api.fetchData(`user/userUpdatings`)
    if (!result.ok) {

      return;
    }
    const data = result.data;
    console.log(data)
    this.LOAD_USER_DATA(data)

  }
  @Action
  async Login(payload: any) {
    const result = await Api.fetchData(`user`, true, 'POST', payload)

    if (!result.ok) {
      return
    }
    const data = result.data;
    console.log(data)
    this.LOGIN(data)

  }
  @Action
  async Logout() {
    const result = await Api.fetchData(`user/userUpdatings`, true, 'POST')

    if (!result.ok) {
      return;
    }
    this.LOGOUT

  }
  @Action
  async deleteMe() {
    const result = await Api.fetchData(`user/userUpdatings`, true, 'DELETE')
    if (!result.ok) {
      return;
    }
    console.log(result)
    this.LOGOUT
  }
  @Action
  async getAllUsers() {
    const result = await Api.fetchData(`user`)
    if (!result.ok) {
      return;
    }
    const data = result.data
    return data;

  }


  //changeAccountDetails
  @Action
  async changeAccountDetails(payload: any) {
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
    this.CHANGE_ACCOUNT_DETAILS(data)
    return data;
  }

  //Create Product
  @Action
  async CreteNewProducts(userInputs: any) {
    const result = await Api.fetchData(`products`, true, 'POST', userInputs)
    console.log(result)
    if (!result.ok) {
      return;
    }
    const data = result.data;
    console.log(data)
    console.log('3')
    this.CREATE_NEW_PRODUCTS(data)

  }




  @Action
  async SearchProducts({ searchQuery, categoryType }) {

    const result = await Api.fetchData(
      `products?search=${searchQuery}`
    )
    console.log(result)
    if (!result.ok) {
      return;
    }
    const data = result.data;
    this.SETUP_RODUCTS_DATA({ data, type: categoryType })

  }
  @Action
  async LoadAllProducts() {
    const result = await Api.fetchData(`products`, true, 'GET')
    console.log('Ok')
    if (!result.ok) {
      return;
    }

    const data = result.data;
    console.log('1')
    this.ALL_PRODUCTS(data)


  }
  @Action
  async getOneProduct() {
    const currentRoute = router.currentRoute;
    const id = currentRoute.params.prodId;
    const result = await Api.fetchData(`products/${id}`)
    if (!result.ok) {
      return;

    }

    const data = result.data;
    console.log(data)
    this.GET_ONE_PRODUCT(data)



  }

  @Action
  async LoadTecnologyProducts() {
    const result = await Api.fetchData(`products?category=Tecnology`, true, 'GET')
    if (!result.ok) {
      return;
    }
    const data = result.data;


    this.TECNOLOGY_PRODUCTS(data)


  }
  @Action
  async LoadHouseProducts() {
    const result = await Api.fetchData(`products?category=House`, true, 'GET')
    console.log(result)
    if (!result.ok) {
      return;
    }
    const data = result.data;
    this.HOUSE_PRODUCTS(data)


  }
  @Action
  async LoadBooksProducts() {
    const result = await Api.fetchData(`products?category=Book`, true, 'GET')
    if (!result.ok) {
      return;
    }
    const data = result.data;
    this.BOOKS_PRODUCTS(data)


  }
  @Action
  async AddToCart(userInputs: any) {
    const result = await Api.fetchData(`cart`, true, 'POST', userInputs)
    if (!result.ok) {
      return;
    }
    const data = result.data;
    this.ADD_PRODUCT_TO_CART(data)

  }
  @Action
  async AddFakePaymentToDatabase() {
    const result = await Api.fetchData(`order`, true, 'POST')
    if (!result.ok) {
      return;
    }
    const data = result.data;
    this.ADD_PRODUCT_TO_PAYMENT(data)

  }
  @Action
  async getCartItem() {
    const result = await Api.fetchData(`cart`, true, 'GET')
    if (!result.ok) {
      return;
    }
    const data = result.data;
    console.log(data)
    this.GET_ITEM_FROM_CART(data)
  }
  @Action
  async DeleteFromCart(id: string) {

    const result = await Api.fetchData(`cart/${id}`, true, 'DELETE')
    if (!result.ok) {
      return;
    }
    this.getCartItem()



  }


}
