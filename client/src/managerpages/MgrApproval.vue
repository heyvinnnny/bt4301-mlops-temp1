<template>
  <div>
    <ManagerApproval @authenticated="handleAuthenticated" />
    <ActivityLogCard></ActivityLogCard>
  </div>
</template>

<script>
import { ManagerApproval } from "@/components/index";
import { ActivityLogCard } from "@/components/index";


export default {
  mounted() {
      this.$toast.success("Approval Dashboard");
    },
components: {
    ManagerApproval,
    ActivityLogCard
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