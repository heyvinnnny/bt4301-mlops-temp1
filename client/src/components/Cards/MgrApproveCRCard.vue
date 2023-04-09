<template>
    <div class="row">
        <div class="col-md-6 col-xl-12">
        <card :title="tableChangeRequest.title">
          <div slot="raw-content" class="table-responsive">
              <paper-table :data="tableChangeRequest.data" :columns="tableChangeRequest.columns" display:flex>
              </paper-table>
              <div>
                <p class="question-wrapper">Change Summary:  </p>
                    <p  class="home-wrapper"> Model to be replaced with Probability of Default (Risk Management) - ElasticNet</p>
                <p class="question-wrapper">Approve or request updates from Owner: </p>
                    <div class="home-wrapper">
                    <input type="radio" id="one" name="apply-change" value="approved" v-model="IsApproved">
                    <label for="one">Approve</label>
                    <br>
                    <input type="radio" id="two" name="apply-change" value="denied" v-model="IsApproved">
                    <label for="two">Deny and request for updates</label>
                    <br>
                    </div>
                <p class="question-wrapper">Additional Comments: </p>
                <textarea id="freeform" name="freeform" >
                </textarea>
              </div>
              <button @click="redirectPendingCR" class="btn btn-primary">Approve</button>
              <button @click="redirectChallenger" class="btn btn-primary">Cancel</button> <br> 
          </div>
        </card>
      </div>
    </div>
  </template>
    
    
    <script>
    import { PaperTable } from "@/components";
    import axios from 'axios';
  
    
    export default {
      components: {
        PaperTable,
      },
      data() {
        return {
          tableChangeRequest: {
            title: "Approve Change Request",
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
                deployed: this.IsApproved === 'approved',
                approval_status: this.IsApproved,
            });
            // Redirect to the pending change request page after successful submission
            this.$router.push('/pendingChangeRequest');
          } catch (error) {
            console.error(`Error submitting change request: ${error.message}`);
          }
        },
      },
      // async 
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
    