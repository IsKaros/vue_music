import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import Muse from './muse-ui.config'
import '../public/scss/_icon.scss'
import axios from "axios";
import Toast from 'muse-ui-toast';

import Helpers from 'muse-ui/lib/Helpers';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Loading from 'muse-ui-loading';
import VueLazyload from 'vue-lazyload'
import initializeSongs from '../public/js/songDom'

Vue.use(VueLazyload)
Vue.use(Helpers)
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Muse)
Vue.prototype.initializeSongs = initializeSongs
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
