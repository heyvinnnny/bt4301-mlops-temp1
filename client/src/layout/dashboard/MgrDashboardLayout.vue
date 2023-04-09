<template>
  <div class="wrapper">
    <side-bar data-background-color="white">
      <template slot="links">

        <sidebar-link to="/mgrhome" name="Home Page" icon="ti-home" />
        <sidebar-link to="/mgrdashboard" name="Overview" icon="ti-panel" />
        <sidebar-link
          to="/mgrdatadrift"
          name="Drift Monitoring"
          icon="ti-signal"
        />
        <sidebar-link to="/mgrchallengers" name="Challengers" icon="ti-layout-grid4-alt" />
        <sidebar-link
          to="/mgrversioncontrol"
          name="Version Control"
          icon="ti-server"
        />
        <sidebar-link
          to="/mgrperformancemonitoring"
          name="Performance Monitor"
          icon="ti-list-ol"
        />
        <sidebar-link
          to="/mgrcodelinting"
          name="Code Linting"
          icon="ti-blackboard"
        />
        <sidebar-link
          to="/mgrcodeporting"
          name="Code Porting"
          icon="ti-bell"
        />
        <sidebar-link to="/mgr-deployment-upload" name="Deployment Upload" icon="ti-upload" />
      </template>
    </side-bar>
    <div class="main-panel">
      <mgr-top-navbar></mgr-top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import MgrTopNavbar from "./MgrTopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    MgrTopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
