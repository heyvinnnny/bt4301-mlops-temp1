<template>
    <ForgetPasswordCard @authenticated="handleAuthenticated" />
</template>

<script>
import { ForgetPasswordCard } from "@/components/index";


export default {
components: {
    ForgetPasswordCard
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