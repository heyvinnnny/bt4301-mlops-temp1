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
import Timeline from "../components/Timeline.vue"

import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import ForgetPassword from "@/pages/ForgetPassword.vue";
import ResetPassword from "@/pages/ResetPassword.vue";
import ManagerDashboard from "@/pages/ManagerDashboard.vue";
import VersionControl from "@/pages/VersionControl.vue";
import PerformanceMonitoring from "@/pages/PerformanceMonitoring.vue";
import CodeLinting from "@/pages/CodeLinting.vue";
import CodePorting from "@/pages/CodePorting.vue";

import Deployment from "@/pages/Deployment/Deployment.vue";
import Home from "@/pages/Home.vue";
import ServiceHealth from "@/pages/ServiceHealth.vue";
import DataDrift from "@/pages/DataDrift.vue";
import Accuracy from "@/pages/Accuracy.vue";
import Predictions from "@/pages/Predictions.vue";
import Challengers from "@/pages/Challengers.vue";
import UpdateCurrentModel from "@/pages/UpdateCurrentModel.vue";
import PendingChangeRequest from "@/pages/PendingChangeRequest.vue";

import UploadModel from "@/pages/UploadMLModel.vue";

import ChangeRequestApproval from "@/managerpages/ChangeRequestApproval"
import ManagerAccuracy from "@/managerpages/Accuracy.vue";

//Manager Pages
import ManagerHome from "@/managerpages/ManagerHome.vue";


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
        name: "overview",
        component: Dashboard,
        meta: {requireAuth: true},
      },
      {
        path: "timeline",
        name: "timeline",
        component: Timeline,
        meta: {requireAuth: true},
      },
      //managerhome
      {
        path: "managerhome",
        name: "managerhome",
        component: ManagerHome,
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
        name: "version control",
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
      {
        path: "/home",
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
        path: "managerdashboard",
        name: "managerdashboard",
        component: ManagerDashboard,
        meta: {requireAuth: true},
      },
      {
        path: "performancemonitoring",
        name: "performancemonitoring",
        component: PerformanceMonitoring,
        meta: {requireAuth: true},
      },
      {
        path: "deployment",
        name: "deployment",
        component: Deployment,
        meta: {requireAuth: true},
      },
      {
        path: "resetpassword",
        name: "resetpassword",
        component: ResetPassword,
        meta: {requireAuth: true}
      },
      {
        path: "codelinting",
        name: "codelinting",
        component: CodeLinting,
        meta: {requireAuth: true}
      },
      {
        path: "codeporting",
        name: "codeporting",
        component: CodePorting,
        meta: {requireAuth: true}
      },
      {
        path: "servicehealth",
        name: "service health",
        component: ServiceHealth,
      },
      {
        path: "datadrift",
        name: "data drift",
        component: DataDrift,
      },
      {
        path: "accuracy",
        name: "accuracy",
        component: Accuracy,
      },
      {
        path: "predictions",
        name: "predictions",
        component: Predictions,
      },
      {
        path: "challengers",
        name: "challengers",
        component: Challengers,
      },
      {
        path: "updateCurrentModel",
        name: "updateCurrentModel",
        component: UpdateCurrentModel,
      },
      {
        path: "pendingChangeRequest",
        name: "pendingChangeRequest",
        component: PendingChangeRequest,
      },
      {
        path: "upload",
        name: "upload",
        component: UploadModel,
      },
      {
        path: "ChangeRequestApproval",
        name: "ChangeRequestApproval",
        component: ChangeRequestApproval,
      },
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
  {
    path: "/deployment",
    component: Deployment,
    children: [
      {
        path: "deployment",
        name: "deployment",
        component: Deployment,
      },
    ],
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "home",
        name: "home",
        component: Home,
      },
    ],
  },
  {
    path: "/updateCurrentModel",
    component: UpdateCurrentModel,
    children: [
      {
        path: "updateCurrentModel",
        name: "updateCurrentModel",
        component: UpdateCurrentModel,
      },
    ],
  },
  {
    path: "/pendingChangeRequest",
    component: PendingChangeRequest,
    children: [
      {
        path: "pendingChangeRequest",
        name: "pendingChangeRequest",
        component: PendingChangeRequest,
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
