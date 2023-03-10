import Vue from "vue";
import App from "./App";
import router from "./router/index";
import firebase from "@/uifire.js";
import 'firebase/auth'
import 'firebase/app'
import "firebase/compat/auth";
import "firebaseui/dist/firebaseui.css";
import "firebase/firestore"
import "firebase/compat/firestore"
import firebaseConfig from './firebaseConfig.js'
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, collection, query, where, connectFirestoreEmulator} from "firebase/firestore";
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

Vue.use(VueToast);

firebase.initializeApp(firebaseConfig)

//export const auth = firebase.auth()
export const db = firebase.firestore();

Vue.config.productionTip = false

Vue.use(PaperDashboard);

/* eslint-disable no-new */
// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount("#app");

let app;
const auth = getAuth();
const user = auth.currentUser;
onAuthStateChanged(auth, user => {
  console.log(user);
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});

export default firebase
