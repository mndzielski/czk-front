import Vue from "vue";
import Vuetify from "vuetify";
import moment from "moment";

import { store } from "./_store";
import { router } from "./_helpers";
import { sync } from "vuex-router-sync";
import { rules } from "./_rules/rules";
import App from "./app/App";
import "vuetify/dist/vuetify.css";
import GlobalComponents from "./components/globals/_index";

import "material-icons/iconfont/material-icons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

Vue.filter("lowercase", function(value) {
  return value.toLowerCase();
});

Object.keys(GlobalComponents).forEach(key => {
  Vue.component(key, GlobalComponents[key]);
});

Vue.prototype.$moment = moment;
Vue.prototype.$moment.locale("pl");

Vue.prototype.$rules = rules;

sync(store, router);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
