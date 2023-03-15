<template>
      <LoginCard @authenticated="handleAuthenticated" />
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
</style>