import Vue from "vue";
import App from "./App.vue";
import ViewUI from "view-design";
import Vuex from "vuex";
// import Routers from "./router.js";
import router from "./router";
import "view-design/dist/styles/iview.css";
import common from "./common";
import storeConfig from "./store/index";
import "ol/ol.css";

export const eventBus = new Vue();

Vue.use(ViewUI);
Vue.use(Vuex);
Vue.mixin(common);

const store = new Vuex.Store(storeConfig);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
