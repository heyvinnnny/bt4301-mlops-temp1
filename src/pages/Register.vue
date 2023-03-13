<template>
    <div class="register-view">
      <RegisterCard @authenticated="handleAuthenticated" />
    </div>
</template>
  
  <script>
  import { RegisterCard } from "@/components/index";
  import firebase from "@/uifire.js";
  import "firebase/compat/auth";
  import * as firebaseui from "firebaseui";
  import "firebaseui/dist/firebaseui.css";
  
  
  export default {
  components: {
    RegisterCard
  },
  methods: {
    handleAuthenticated() {
      // redirect the user to the home page or some other authenticated page
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.register-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>