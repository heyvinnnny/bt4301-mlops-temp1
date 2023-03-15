<template>
      <RegisterCard @authenticated="handleAuthenticated" />
</template>
  
  <script>
  import { RegisterCard } from "@/components/index";
  
  
  export default {
  components: {
    RegisterCard
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