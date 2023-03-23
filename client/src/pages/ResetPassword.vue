<template>
    <ResetPasswordCard @authenticated="handleAuthenticated" />
</template>

<script>
import { ResetPasswordCard } from "@/components/index";


export default {
components: {
   ResetPasswordCard
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