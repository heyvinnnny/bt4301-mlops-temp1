import Vue from "vue";
import App from "./App";
import router from "./router/index";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";


Vue.use(VueToast);

Vue.config.productionTip = false

Vue.use(PaperDashboard);

/* eslint-disable no-new */
// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount("#app");


new Vue({
    router,
    render: h => h(App)
}).$mount("#app");


