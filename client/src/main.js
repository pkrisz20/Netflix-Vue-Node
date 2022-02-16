import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Axios from 'axios';
import VueAxios from "vue-axios";

Vue.use(VueAxios, Axios);
// Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
