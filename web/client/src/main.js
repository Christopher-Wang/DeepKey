import Vue from "vue"
import App from "./App.vue"
import VueRouter from "vue-router";
import VueAxios from 'vue-axios';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

import Sample from "./components/Sample.vue";

const routes = [
  {
      name: "sample",
      path: "/",
      component: Sample
  }
];

const router = new VueRouter({ mode: "history", routes: routes});
new Vue(
  Vue.util.extend({ router }, App)
).$mount("#app");