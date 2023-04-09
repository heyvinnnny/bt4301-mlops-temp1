<template>
  <div>
    <view-summary-card></view-summary-card>

    <mgr-approve-c-r-card></mgr-approve-c-r-card>
    <div class="row">
      <div class="row">
        <view-content-card-vue></view-content-card-vue>
        <activity-log-card></activity-log-card>
      </div>
    </div>
    <br />

  </div>
</template>

<script>
import { PaperTable } from "@/components";
import ViewSummaryCard from "../components/Cards/ViewSummaryCard.vue";
import ViewContentCardVue from '../components/Cards/ViewContentCard.vue';
import ActivityLogCard from "../components/Cards/ActivityLogCard.vue";
import MgrApproveCRCard from "../components/Cards/MgrApproveCRCard.vue";


export default {
  mounted() {
    this.$toast.success("Pending Change Request");
  },
  components: {
    PaperTable,
    ViewSummaryCard,
    ViewContentCardVue,
    ActivityLogCard,
    MgrApproveCRCard

  },
};
</script>
<style scoped>
.pendingText {
position: relative;
left: -500px;
padding-left: 150px;
text-align: center;
color: aqua;
}
