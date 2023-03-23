<template>
    <ManagerApproval @authenticated="handleAuthenticated" />
</template>

<script>
import { ManagerApproval } from "@/components/index";


export default {
components: {
    ManagerApproval
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