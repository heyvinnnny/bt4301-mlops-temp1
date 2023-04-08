<template>
  <div>
    <div class="row">
      <div class="col-md-6 col-xl-12">
        <card :title="tableChangeRequest.title">
          <div slot="raw-content" class="table-responsive"><br>
            <div>
              <p class="question-wrapper">Replace with:</p>
              <div class="home-wrapper">
                <p><b>Probability of Default (Risk Management) - ElasticNet</b></p>
                <p>All features that are used in both the current model and the replacement model match in name and data type</p>
              </div>
              <p class="question-wrapper">Replacement Reason:</p>
              <div class="home-wrapper">
                <p>Select a reason for replacement:</p>
                <select v-model="selectedReason">
                  <option v-for="reason in reasons" :key="reason.id" :value="reason.value">{{ reason.text }}</option>
                </select>
                <br>
                <br>
              </div>
              <p class="question-wrapper">Manually Apply changes?</p>
              <div class="home-wrapper">
                <input type="radio" id="one" name="apply-change" value="notify" v-model="manuallyApplyChanges">
                <label for="one">Notify me when the change is approved so I can manually apply it</label>
                <br>
                <input type="radio" id="two" name="apply-change" value="apply" v-model="manuallyApplyChanges">
                <label for="two">Apply the change upon approval</label>
                <br>
              </div>

            </div>
            <button @click="submitChangeRequest" class="btn btn-primary">Submit Change Request</button>
            <button @click="redirectChallenger" class="btn btn-primary">Cancel</button> <br>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
  
  
  <script>
  import { PaperTable } from "@/components";
  import axios from 'axios';

  const tableColumns = [
    "DeploymentName",
    "Description",
    "Endpoint",
    "Importance",
  ];
  const tableData = [
    {
      deploymentname: "Loan Default Predictor (Risk Management)",
      description: "Loan default model for the bank",
      endpoint: "https://datarobot-mlops.dynamic.orm.datarobot.com",
      importance: "Moderate",
    },
  ];
  
  export default {
    components: {
      PaperTable,
    },
    data() {
      return {
        models: [],
        selectedReason: 'Accuracy',
        reasons: [
          { id: 1, text: 'Accuracy', value: 'Accuracy' },
          { id: 2, text: 'Data Drift', value: 'Data Drift' },
          { id: 3, text: 'Errors', value: 'Errors' },
          { id: 4, text: 'Refreshed Schedules', value: 'Refreshed Schedules' },
          { id: 5, text: 'Scoring Speed', value: 'Scoring Speed' },
          { id: 6, text: 'Other', value: 'Other' },
        ],
        table1: {
          title: "Deployment Summary",
          columns: [...tableColumns],
          data: [...tableData],
        },
        tableChangeRequest: {
          title: "Submit Change Request",
        },   
      };
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
        async submitChangeRequest() {
        try {
          await axios.put(`http://localhost:3000/models/${this.modelId}`, {
            replacement_reason: this.replacementReason,
            manually_apply_changes: this.manuallyApplyChanges === 'apply',
          });
          // Redirect to the pending change request page after successful submission
          this.$router.push('/pendingChangeRequest');
        } catch (error) {
          console.error(`Error submitting change request: ${error.message}`);
        }
      },
    },
    // async created() {
    //   try {
    //     const response = await axios.get('http://localhost:3000/viewmodel/1718');
    //     this.model = response.data;
    //     console.log(this.model); 
    //   } catch (error) {
    //     console.error(`Error retrieving models information: ${error.message}`);
    //   }
    // },
  };
  </script>

<style scoped>
.home-wrapper {
  padding: 20px; /* Adjust the padding value as needed */
}
.question-wrapper {
  background-color:powderblue;
  text-indent: 0.5cm;
}

</style>
  