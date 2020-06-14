import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import globalStore from './store/global'
import vuetify from './plugins/vuetify';
import vueDebounce from 'vue-debounce';
import { getModule } from 'vuex-module-decorators'
Vue.use(vueDebounce)
Vue.prototype.$global = getModule(globalStore);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
