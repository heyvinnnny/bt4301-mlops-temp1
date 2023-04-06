<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <div class="navbar-toggler-bar" v-if="loggedInUserName">
      
    </div>
      <a class="navbar-brand" href="#">{{ routeName }}</a>
      <!-- <p style=" font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
  color: black; margin-top:18px;">Welcome {{ user.name }}</p> -->
      <button
        class="navbar-toggler navbar-burger"
        type="button"
        @click="toggleSidebar"
        :aria-expanded="$sidebar.showSidebar"
        aria-label="Toggle navigation"
      >
      


        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <drop-down
            class="nav-item"
            title="5 Notifications"
            title-classes="nav-link"
            icon="ti-bell"
          >
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </drop-down>
          <li class="nav-item">
            <router-link class="nav-link" to="/mgrapproval">Approval Requests</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/mgruserprofile">Manager Profile</router-link>
          </li>
          <li class="nav-item">
            <button @click="logout" class="nav-link" style="border:0px">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    user: {
      get() {
        return JSON.parse(localStorage.getItem("user"));
      },
      set(user) {
        localStorage.setItem("user", JSON.stringify(user));
      },
    },
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },

    loggedInUserName() {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    // Retrieve user information from a store or local storage
    // This example assumes you have stored the user object in local storage as a JSON string
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.name : null;
      },
    },
  data() {
    return {
      activeNotifications: false,
      userData: {
        name: "",
        email: "",
      },
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
  },
};
</script>
<style></style>
