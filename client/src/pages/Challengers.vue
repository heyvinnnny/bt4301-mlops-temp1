<template>
  <div>  
    <view-summary-card></view-summary-card>
    <view-challenger-card></view-challenger-card>
    <div class="row">
      <view-content-card-vue></view-content-card-vue>
      <activity-log-card></activity-log-card>
    </div>
    <br/>
  </div>
</template>

<script>
import ViewSummaryCard from "../components/Cards/ViewSummaryCard.vue";
import ViewContentCardVue from '../components/Cards/ViewContentCard.vue';
import ActivityLogCard from "../components/Cards/ActivityLogCard.vue";
import ViewChallengerCard from "../components/Cards/ViewChallengerCard.vue";

export default {
  mounted() {
    this.$toast.success("Challengers");
  },
  components: {
    ViewSummaryCard,
    ViewContentCardVue,
    ActivityLogCard,
    ViewChallengerCard,
  },
};
</script>
<style></style>