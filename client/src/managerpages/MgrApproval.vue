<template>
  <div>
    <ManagerApproval @authenticated="handleAuthenticated" />
    <ActivityLogCard></ActivityLogCard>
    <ViewDeployCard></ViewDeployCard>
    
  </div>
</template>

<script>
import { ManagerApproval } from "@/components/index";
import { ActivityLogCard } from "@/components/index";
import ViewDeployCard from "../components/Cards/ViewDeployCard.vue"


export default {
  mounted() {
      this.$toast.success("Approval Dashboard");
    },
components: {
    ManagerApproval,
    ActivityLogCard,
    ViewDeployCard
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