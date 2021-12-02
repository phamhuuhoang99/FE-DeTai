import Vue from "vue";
import Vuex from "vuex";

// Import modules
import auth from "./modules/auth";
import map from "./modules/map";
import mission from "./modules/mission";
import scheme from "./modules/scheme";

Vue.use(Vuex);

const storeData = {
  modules: {
    auth,
    map,
    mission,
    scheme,
  },
};

const store = new Vuex.Store(storeData);

export default store;
