<template>
  <div class="wrapper">
    <side-bar data-background-color="darkblue">
      <template slot="links">

        <sidebar-link to="/home" name="Home Page" icon="ti-home" />
        <sidebar-link to="/dashboard" name="Overview" icon="ti-panel" />
        <sidebar-link
          to="/datadrift"
          name="Drift Monitoring"
          icon="ti-signal"
        />
        <sidebar-link to="/challengers" name="Challengers" icon="ti-layout-grid4-alt" />
        <sidebar-link
          to="/version-control"
          name="Version Control"
          icon="ti-server"
        />
        <sidebar-link
          to="/performancemonitoring"
          name="Performance Monitor"
          icon="ti-list-ol"
        />
        <sidebar-link to="/deployment-upload" name="Deployment Upload" icon="ti-upload" />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
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
