<template>
  <div>
    <div class="log-entry">
      <h3>Select Deployment:</h3>
      <select v-model="selectedDeployment" @change="onChange($event)">
        <option v-for="deployment in deployments" :key="deployment._id" :value="deployment">{{ deployment.deploymentId }}</option>
      </select>
    </div><br>

    <!--Stats cards-->
    <div class="row">
      <div
        class="col-md-6 col-xl-6"
        v-for="stats in statsCards"
        :key="stats.title"
      >
        <stats-card>
          <div
            class="icon-big text-center"
            :class="`icon-${stats.type}`"
            slot="header"
          >
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{ stats.title }}</p>
            {{ stats.value }}
          </div>
        </stats-card>
      </div>      
    </div>
    <br />

    
    <div class="log-entry">
      <h3>Deployment Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Deployment ID</th>
            <th>Deployment Name</th>
            <th>Deployment Description</th>
            <th>Importance</th>
          </tr>
        </thead>
        <tbody>
            <td> {{ selectedDeployment.deploymentId }} </td>
            <td> {{ selectedDeployment.deploymentName }} </td>            
            <td> {{ selectedDeployment.deployDescription  }}</td>
            <td> {{ selectedDeployment.importance }} </td>
        </tbody>
      </table>
    </div>
    <br>

    <div class="log-entry">
      <h3>Champion Model</h3>
      <card :title="Govern">
        <div class="log-entry">
          <div class="main-info">
            <p>Model Name : {{ champion_model.modelName}} {{ champion_model.modelVersion}}</p>
            <p>Approved By: {{ selectedDeployment.dateNow}} </p>
            <p>Uploaded By: {{ champion_model.email}}</p>
          </div>
        </div>
    </card>
    </div>

    <div class="log-entry">
      <h3>Challengers Models</h3>
      <table>
        <thead>
          <tr>
            <th>Model Name</th>
            <th>Model Version</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="model in models.filter(m => m._id !== champion_model._id)" :key="model._id">
            <td>{{ model.modelName }}</td>
            <td>{{ model.modelVersion }}</td>
            <td>
              <router-link :to="{ name: 'ViewSubmitCRCard', params: { id: model._id } }">
                <button>Replace</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="log-entry">
      <h3>Governance</h3>
      <card :title="Govern">
        <div class="log-entry">
          <div class="main-info">
            <p>Deployment Created</p>
            <p> {{ selectedDeployment.dateNow}} </p>
            <p> {{ selectedDeployment.email}} </p>
          </div>

          <div class="main-info">
            <p>Model Last Updated</p>
            <p> {{ selectedDeployment.dateNow}} </p>
            <p> {{ champion_model.email}} </p>
          </div>

          <button @click="toggleDetails">
            {{ showMore ? "Show more details" : "Show less details" }}
          </button>

          <div v-if="!showMore" class="extended-info">
            <div class="updated-request">
              <h4>Updated requested</h4>
              <p>Requested by {{ champion_model.email}} on  {{ selectedDeployment.dateNow}} </p>
              <p>Comments if any:</p>
            </div>

            <div class="approval-request">
              <h4>Approval Given</h4>
              <p>Approved by  {{ selectedDeployment.email}}  on  {{ selectedDeployment.dateNow}}</p>
              <p>Comments if any:</p>
            </div>

            <div class="reviewers">
              <h4>Reviewers</h4>
              <p>John Doe</p>
            </div>
          </div>
        </div>
    </card>
    </div>
      

    <br/>

    <!--Charts-->
    <div class="log-entry">
      <div class="col-md-6 col-xl-12" v-if="populated">
        <h4> {{ selectedDeployment.deploymentName }}</h4>
        <h5> {{ selectedDeployment.deployDescription  }}</h5>
        <chart-card
          :chart-data="usersChart.data"
          :chart-options="usersChart.options"
        >
        </chart-card>
      </div>
    </div>
  </div>
</template>

<script>
import { StatsCard, ChartCard } from "@/components/index";
import { PaperTable } from "@/components";
import Chartist from "chartist";
import axios from 'axios';

export default {
  mounted() {
    this.$toast.success("Overview");
  },
  components: {
    StatsCard,
    ChartCard,
    PaperTable,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      selectedDeployment: {},
      deployments: [],
      models: [],
      champion_model : {},
      showMore: true,
      populated: false,
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Avg Predictions / Day",
          value: "329",
        },
        {
          type: "warning",
          icon: "ti-pulse",
          title: "Last Prediction",
          value: "2 hours ago",
        },
      ],
      usersChart: {
        data: {
          labels: [
            "12:00AM",
            "3:00AM",
            "6:00AM",
            "9:00AM",
            "12:00PM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
          ],
          series: [
            [0.867, 0.896, 0.763, 0.812, 0.845, 0.833, 0.67, 0.64],
            // [67, 152, 193, 240, 387, 435, 535, 642, 744],
            // [23, 113, 67, 108, 190, 239, 307, 410, 410],
          ],
        },
        options: {
          low: 0,
          high: 1,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3,
          }),
          showLine: true,
          showPoint: false,
        },
      },
    };
  },
  async created() {
      try {
        //const response = await axios.get('http://localhost:3000/viewdeploy');
        // Get the user object from localStorage
        const user = JSON.parse(localStorage.getItem("user"));

        // Get the logged-in user's ID from the user object
        const userId = user.id;

        // Get the token from localStorage
            const token = localStorage.getItem("token");

        // Set up the headers for the request, including the Authorization header
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://localhost:3000/deployments/assigned/${userId}`, config);
        this.deployments = response.data;
      } catch (error) {
        console.error(`Error retrieving deployment information: ${error.message}`);
      }
    },
    methods: {
      toggleDetails() {
          this.showMore = !this.showMore;
        },
      async onChange(event) {
        try {
          console.log(event.target.value);
          const response = await axios.get(`http://localhost:3000/models_deploymentid/${this.selectedDeployment.deploymentId}`);
          this.populated = true
          this.models = response.data
          console.log(response)
          for (let i = 0; i< this.models.length; i++) {
              console.log(this.models[i])
              if (this.models[i].deployed == true) {
                this.champion_model = this.models[i]
              }
            }
        } catch (error) {
          console.log(error)
        }
      },      
    }
};
</script>


<style scoped>
.log-entry {
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
.main-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.extended-info {
  margin-top: 15px;
}

</style>