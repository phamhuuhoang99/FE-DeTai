import Vue from "vue";
import Router from "vue-router";
// import store from "./store/state";
Vue.use(Router);

import LayoutsAdmin from "./components/Admin/components/Layouts/LayoutsAdmin.vue";
import DashBoard from "./components/Admin/components/Dashboard/Dashboard.vue";
import Layouts from "./components/Layouts/Layouts.vue";
import CreateUser from "./components/Admin/components/User/User.vue";
import KieuThamHoa from "./components/Admin/components/ThamHoa/KieuThamHoa.vue";
import Login from "./components/Login/Login.vue";
import Unit from "./components/Admin/components/LucLuong/Unit.vue";
import Personnel from "./components/Admin/components/Personel/Personnel.vue";

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
        component: Unit,
        name: "donViTimKiem",
      },
      {
        path: "/don-vi-quan-y",
        component: Unit,
        name: "donViQuanY",
      },
      {
        path: "/nhan-su-quan-y",
        component: Personnel,
        name: "nhanSuQuanY",
      },
      {
        path: "/nhan-su-tim-kiem",
        component: Personnel,
        name: "nhanSuTimKiem",
      },
    ],
  },
  {
    path: "/",
    component: Layouts,
    name: "layout",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
];

export const router = new Router({
  mode: "history",
  routes,
});

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ["/login", "/register"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = store.user;

//   // if (!authRequired && loggedIn) return next('/');

//   if (authRequired && !loggedIn) {
//     return next("/login");
//   }

//   next();
// });
