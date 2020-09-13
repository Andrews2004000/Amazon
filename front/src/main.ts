import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import globalStore from './store/global'
import vuetify from './plugins/vuetify';
import vueDebounce from 'vue-debounce';
import JwPagination from 'jw-vue-pagination';
import { getModule } from 'vuex-module-decorators'
import i18n from './i18n';


Vue.component('jw-pagination', JwPagination)
Vue.use(vueDebounce)

Vue.prototype.$global = getModule(globalStore);


Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  i18n,

  render: h => h(App)
}).$mount('#app')
