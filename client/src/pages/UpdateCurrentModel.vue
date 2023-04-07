<template>
  <div class="home-wrapper">
    <div class="row">
        <div class="col-md-6 col-xl-12">
          <card :title="tableChangeRequest.title">
            <div slot="raw-content" class="table-responsive">
                <paper-table :data="tableChangeRequest.data" :columns="tableChangeRequest.columns" display:flex>
                </paper-table>
                <div>
                    <p class="headingwrapper">Replace with: </p> 
                    <div class="home-wrapper">
                      <p><b>{{ this.deployments[0].deployment_name}} - {{ this.deployments[0].model_version}}</b></p>
                      <p>All features that are used in both the current model and the replacement model match in name and data type</p>
                      <div>
                      </div>
                      <br>
                    </div>
                    <p class="headingwrapper">Replacement Reason: </p>
                    <div class="home-wrapper">
                      <p>Select a reason for replacement:</p>
                      <select v-model="selectedReason">
                        <option v-for="reason in replacementReason" :key="reason.id" :value="reason.value">{{ reason.text }}</option>
                      </select>
                      <br>
                    </div>
                    <p class="headingwrapper">Manually Apply changes?</p>
                    <div class="home-wrapper">
                      <input type="radio" id="one" value="One" v-model="picked">
                      <label for="one">Notify me when the change is approved so I can manually apply it</label>
                      <br>
                      <input type="radio" id="two" value="Two" v-model="picked">
                      <label for="two">Apply the change upon approval</label>
                      <br>
                    </div>
                </div>
                <button @click="redirectPendingCR" class="btn btn-primary">Accept and Replace</button>
                <button @click="redirectChallenger" class="btn btn-primary">Cancel</button> <br> 
            </div>
          </card>
        </div>
      </div>
  </div>
</template>

<script>
import { PaperTable } from "@/components";
import axios from "axios";

const mongoose = require("mongoose"); 



export default {
  mounted() {
        this.$toast.success("Update Challengers model");
  },
  components: {
    PaperTable,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      selectedDeployment: '9012',
      deployments: [],
      tableChangeRequest: {
            title: "Submit Change Request",
      },
      selectedReason: 'Accuracy',
      replacementReason: [
        { id: 1, text: 'Accuracy', value: 'Accuracy' },
        { id: 2, text: 'Data Drift', value: 'Data Drift' },
        { id: 3, text: 'Errors', value: 'Errors' },
        { id: 4, text: 'Refreshed Schedules', value: 'Refreshed Schedules' },
        { id: 5, text: 'Scoring Speed', value: 'Scoring Speed' },
        { id: 6, text: 'Other', value: 'Other' },
      ],
    };
  },
  async created() {
    try {
      const response = await axios.get(`http://localhost:3000/api/deployments/${this.selectedDeployment}`);
      this.deployments = response.data;
      console.log(this.deployments);
    } catch (error) {
      console.error(error);
      alert("Error fetching data from the API: " + error.message);
    }
  },
  methods: {
    redirectPendingCR() {
        this.$router.push({
          path: '/pendingChangeRequest',
        }) 
      },
    redirectChallenger() {
      this.$router.push({
        path: '/challengers',
      }) 
    },
  },
};


</script>

<style scoped>
.home-wrapper {
  padding: 20px; /* Adjust the padding value as needed */
}
.headingwrapper {
  padding: 10px; /* Adjust the padding value as needed */
  background-color:powderblue;
}
</style>