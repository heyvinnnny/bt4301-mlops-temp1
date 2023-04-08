<template>
    <div>
      <view-summary-card-vue></view-summary-card-vue>
      <view-submit-c-r></view-submit-c-r>
    </div>
  </template>

  <script>
import ViewSubmitCR from "../components/Cards/ViewSubmitCRCard.vue" 
import ViewSummaryCardVue from '../components/Cards/ViewSummaryCard.vue';

  
  export default {
    mounted() {
      this.$toast.success("Update Current model");
    },
    components: {
      ViewSummaryCardVue,
      ViewSubmitCR,
    },
  };
  </script>
<style scoped>
</style> 
  