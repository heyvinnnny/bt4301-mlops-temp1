<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">

        <sidebar-link to="/home" name="Home Page" icon="ti-home" />
        <sidebar-link to="/dashboard" name="Overview" icon="ti-panel" />
        <sidebar-link to="/servicehealth" name="Service Health" icon="ti-shield" />
        <sidebar-link
          to="/datadrift"
          name="Data Drift"
          icon="ti-signal"
        />
        <sidebar-link to="/accuracy" name="Accuracy" icon="ti-target" />
        <sidebar-link to="/predictions" name="Predictions" icon="ti-stats-up" />
        <sidebar-link to="/challengers" name="Challengers" icon="ti-layout-grid4-alt" />
        <sidebar-link
          to="/version-control"
          name="Version Control"
          icon="ti-server"
        />
        <sidebar-link
          to="/performancemonitoring"
          name="Performance Monitor"
          icon="ti-bell"
        />
        <sidebar-link
          to="/codelinting"
          name="Code Linting"
          icon="ti-blackboard"
        />
        <sidebar-link
          to="/codeporting"
          name="Code Porting"
          icon="ti-bell"
        />
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down
          class="nav-item"
          title="5 Notifications"
          title-classes="nav-link"
          icon="ti-bell"
        >
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
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
