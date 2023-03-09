import Vue from "vue";
import App from "./App";
import router from "./router/index";
import firebase from "@/uifire.js";
import 'firebase/auth'
import "firebase/compat/auth";
import "firebaseui/dist/firebaseui.css";
import firebaseConfig from './firebaseConfig.js'
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.use(VueToast);

// import firebaseApp from "./firebase.js";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

Vue.use(PaperDashboard);

/* eslint-disable no-new */
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
