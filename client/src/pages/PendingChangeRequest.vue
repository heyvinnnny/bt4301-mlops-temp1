<template>
  <div>
    <view-summary-card></view-summary-card>
    <view-pending-cr-card-vue></view-pending-cr-card-vue>

    <div class="row">
      <view-content-card-vue></view-content-card-vue>
      <activity-log-card></activity-log-card>
    </div>
  </div>
</template>

<script>
import ViewSummaryCard from "../components/Cards/ViewSummaryCard.vue";
import ViewContentCardVue from '../components/Cards/ViewContentCard.vue';
import ActivityLogCard from "../components/Cards/ActivityLogCard.vue";
import ViewPendingCRCardVue from "../components/Cards/ViewPendingCRCard.vue";

export default {
  mounted() {
    this.$toast.success("Pending Change Request");
  },
  components: {
    ViewPendingCRCardVue,
    ViewSummaryCard,
    ViewContentCardVue,
    ActivityLogCard,
  },
};
</script>
<style></style>