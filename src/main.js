import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import Muse from './muse-ui.config'
import '../public/scss/_icon.scss'
import axios from "axios";
import Toast from 'muse-ui-toast';
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.use(Toast);

Vue.use(Muse)
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
