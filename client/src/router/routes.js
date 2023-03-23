import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";

import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import ForgetPassword from "@/pages/ForgetPassword.vue";
import ResetPassword from "@/pages/ResetPassword.vue";
import ManagerDashboard from "@/pages/ManagerDashboard.vue";
import VersionControl from "@/pages/VersionControl.vue";

import Deployment from "@/pages/Deployment/Deployment.vue";
import Home from "@/pages/Home.vue";

const routes = [
  {
    path: "/",
    mode: 'history',
    component: DashboardLayout,
    redirect: "/login",
    meta: {requireAuth: true},
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {requireAuth: true},
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile,
        meta: {requireAuth: true},
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
        meta: {requireAuth: true},
      },
      {
        path: "version-control",
        name: "version-control",
        component: VersionControl,
        meta: {requireAuth: true},
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
        meta: {requireAuth: true},
      },
      {
        path: "maps",
        name: "maps",
        component: Maps,
        meta: {requireAuth: true},
      },
      {
        path: "typography",
        name: "typography",
        component: Typography,
        meta: {requireAuth: true},
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList,
        meta: {requireAuth: true},
      },
<<<<<<< Updated upstream
=======
      {
        path: "servicehealth",
        name: "service health",
        component: ServiceHealth,
        meta: {requireAuth: true},
      },
      {
        path: "datadrift",
        name: "data drift",
        component: DataDrift,
        meta: {requireAuth: true},
      },
      {
        path: "accuracy",
        name: "accuracy",
        component: Accuracy,
        meta: {requireAuth: true},
      },
      {
        path: "predictions",
        name: "predictions",
        component: Predictions,
        meta: {requireAuth: true},
      },
      {
        path: "challengers",
        name: "challengers",
        component: Challengers,
        meta: {requireAuth: true},
      },
      {
        path: "home",
        name: "home",
        component: Home,
        meta: {requireAuth: true},
      },
      {
        path: "userprofile",
        name: "userprofile",
        component: UserProfile,
        meta: {requireAuth: true},
      },
      {
        path: "/managerdashboard",
        name: "managerdashboard",
        component: ManagerDashboard,
        meta: {requireAuth: true},
      },
      {
        path: "/deployment",
        name: "deployment",
        component: Deployment,
        meta: {requireAuth: true},
      }
>>>>>>> Stashed changes
    ],
  },
  //Create a new route component for login since it users a different default layout
  { path: "*", component: NotFound },
  {
    path: "/register",
    component: Register,
    children: [
      {
        path: "register",
        name: "register",
        component: Register,
      },
    ],
  },
  {
    path: "/forgetpassword",
    component: ForgetPassword,
    children: [
      {
        path: "forgetpassword",
        name: "forgetpassword",
        component: ForgetPassword,
      },
    ],
  },
  {
    path: "/resetpassword",
    component: ResetPassword,
    children: [
      {
        path: "resetpassword",
        name: "resetpassword",
        component: ResetPassword,
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    children: [
      {
        path: "login",
        name: "login",
        component: Login,
      },
    ],
  },
 
];


/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
