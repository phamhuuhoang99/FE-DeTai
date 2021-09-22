import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import LayoutsAdmin from "./components/Admin/components/Layouts/LayoutsAdmin.vue";
import DashBoard from "./components/Admin/components/Dashboard/Dashboard.vue";
import ViewMap from "./components/ViewMap";
import CreateUser from "./components/Admin/components/User/User.vue";
import KieuThamHoa from "./components/Admin/components/ThamHoa/KieuThamHoa.vue";
import Login from "./components/Login/Login.vue";
import QLDonVi from "./components/Admin/components/LucLuong/TimKiem/QLDonVi.vue";

const routes = [
  {
    path: "/admin",
    component: LayoutsAdmin,
    children: [
      {
        path: "/",
        component: DashBoard,
        name: "dashboard",
      },
      {
        path: "/quan-li-nguoi-dung",
        component: CreateUser,
        name: "create-user",
      },
      {
        path: "/kieu-tham-hoa",
        component: KieuThamHoa,
        name: "kieuThamHoa",
      },
      {
        path: "/don-vi-tim-kiem",
        component: QLDonVi,
        name: "donViTimKiem",
      },
    ],
  },
  {
    path: "/",
    component: ViewMap,
    name: "user",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
];

export default new Router({
  mode: "history",
  routes,
});
