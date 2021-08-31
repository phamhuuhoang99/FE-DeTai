import Vue from "vue";
import App from "./App.vue";
import ViewUI from "view-design";
import locale from "view-design/dist/locale/en-US";
import Vuex from "vuex";
import router from "./router";
import "view-design/dist/styles/iview.css";
import common from "./common";
import storeConfig from "./store/index";
import Fragment from "vue-fragment";
import "ol/ol.css";

export const eventBus = new Vue();

Vue.use(Fragment.Plugin);
Vue.use(ViewUI, { locale: locale });
Vue.use(Vuex);
Vue.mixin(common);

const store = new Vuex.Store(storeConfig);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
