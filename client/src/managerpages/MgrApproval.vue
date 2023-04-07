<template>
  <div>
    <ManagerApproval @authenticated="handleAuthenticated" />
    <ActivityLogCard></ActivityLogCard>
    <MgrViewDeployCard></MgrViewDeployCard>
    
  </div>
</template>

<script>
import { ManagerApproval } from "@/components/index";
import { ActivityLogCard } from "@/components/index";
import ViewDeployCard from "../components/Cards/ViewDeployCard.vue"
import MgrViewDeployCard from "../components/Cards/MgrViewDeployCard.vue"


export default {
  mounted() {
      this.$toast.success("Approval Dashboard");
    },
components: {
    ManagerApproval,
    ActivityLogCard,
    ViewDeployCard,
    MgrViewDeployCard,
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