import Vue from "vue";
import App from "./App.vue";
import ViewUI from "view-design";
// import Routers from "./router.js";
import VueRouter from "vue-router";
import "view-design/dist/styles/iview.css";

Vue.use(ViewUI);
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
