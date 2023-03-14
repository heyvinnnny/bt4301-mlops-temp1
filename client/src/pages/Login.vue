<template>
    <div class="login-view">
      <LoginCard @authenticated="handleAuthenticated" />
    </div>
</template>
  
  <script>
  import { LoginCard } from "@/components/index";

  
  export default {
  components: {
    LoginCard
  },
  methods: {
    handleAuthenticated() {
      // redirect the user to the home page or some other authenticated page
    }
  }
}
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>