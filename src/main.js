import Vue from "vue";
import App from "./App.vue";
import ViewUI from "view-design";
// import Routers from "./router.js";
import router from "./router";
import "view-design/dist/styles/iview.css";

import common from "./common";

Vue.use(ViewUI);
Vue.mixin(common);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
