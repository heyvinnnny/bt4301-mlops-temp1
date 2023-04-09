<template>
    <div>
        <h1>Deployment ID: {{id}}</h1>
        <div v-if="!no_model && !no_data">
            <card title="Drift Monitoring">
                <h3>Model Name: {{ model.modelName }}</h3>
                <h4>Model Version: {{ model.modelVersion }}</h4>
                <div>
                    <select id="metricSelect">
                        <option value="0">AUC</option>
                        <option value="1">Gini Norm</option>
                        <option value="2">LogLoss</option>
                        <option value="3">Kolmogorov-Smirnov</option>
                        <option value="4">Population Stability Index</option>
                    </select>
                    <canvas id="myChart"></canvas>
                </div>
            </card>
        </div>
        <h2 v-if="no_model">No Champion Model!</h2>
        <div v-if="no_data">
            <h2 >No Test Data!</h2>
            <form @submit.prevent="submitForm">
            <div>
                <label for="jsonFile">JSON File Week1:</label>
                <input type="file" id="jsonFile" name="jsonFile" accept=".json" required @change="handleDataJsonUpload1"><br>
                <label for="jsonFile">JSON File Week2:</label>
                <input type="file" id="jsonFile" name="jsonFile" accept=".json" required @change="handleDataJsonUpload2"><br>
                <label for="jsonFile">JSON File Week3:</label>
                <input type="file" id="jsonFile" name="jsonFile" accept=".json" required @change="handleDataJsonUpload3"><br>
                <label for="jsonFile">JSON File Week4:</label>
                <input type="file" id="jsonFile" name="jsonFile" accept=".json" required @change="handleDataJsonUpload4"><br>
            </div>
            <button v-on:click="onUploadFile()" type="submit">Upload Files</button>
            </form>
        </div>
    </div>

</template>


<script>
 import axios from 'axios';
 import Chart from 'chart.js/auto';


export default {
    props: {
        id: {
            type: Number,
            required: true,
            myChart: null,
        }
    },
    data() {
      return {
        model: {},
        no_model: false,
        no_data: false,
        auc: [],
        gini :[],
        logloss : [],
        ks:[],
        psi:[],
        week1:'',
        week2:'',
        week3:'',
        week4:''
      };
    },

    async created() {
        try {
            const response = await axios.get(`http://localhost:3000/viewmodel/${this.id}`);
            this.model = response.data.model;
            const { auc1, gini1, logloss1, ks1, psi1, auc2, gini2, logloss2, ks2, psi2, auc3, gini3, logloss3, ks3, psi3, auc4, gini4, logloss4, ks4, psi4 } = response.data.metrics;
            this.auc = [auc1, auc2, auc3, auc4]
            this.gini = [gini1,gini2,gini3,gini4]
            this.psi = [psi1,psi2,psi3,psi4]
            this.ks = [ks1,ks2,ks3,ks4]
            this.logloss = [logloss1, logloss2, logloss3, logloss4]
            this.initializeChart()
        } catch (error) {
        console.error(`Error retrieving model details: ${error.message}`);
        if (error.response && error.response.status === 404 &&error.response.data.message == "Model not found") {
            console.log(error.response.data.message)
            this.no_model = true;
        } else if (error.response && error.response.status === 404 &&error.response.data.message == "Data not found") {
            this.no_data = true;
        }
      }
    },
    mounted() {
        this.$toast.success("Drift Monitoring");
    },
    methods: {
        initializeChart() {
            var data = {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
                {
                label: "AUC",
                data: this.auc,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
                },
                {
                label: "Gini Norm",
                data: this.gini,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
                },
                {
                label: "LogLoss",
                data: this.logloss,
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1
                },
                {
                label: "Kolmogorov-Smirnov",
                data: this.ks,
                fill: false,
                borderColor: 'rgb(255, 205, 86)',
                tension: 0.1
                },
                {
                label: "Population Stability Index",
                data: this.psi,
                fill: false,
                borderColor: 'rgb(153, 102, 255)',
                tension: 0.1
                }
            ]};

                var ctx = document.getElementById('myChart').getContext('2d');
                this.myChart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    scales: {
                    y: {
                        beginAtZero: true
                    }
                    },
                    plugins: {
                    legend: {
                        display: false
                    }
                    }
                }
                });

        document.getElementById('metricSelect').addEventListener('change', (event) => {
        var selectedMetric = event.target.value;
        for (var i = 0; i < data.datasets.length; i++) {
            if (i == selectedMetric) {
            this.myChart.getDatasetMeta(i).hidden = false;
            } else {
            this.myChart.getDatasetMeta(i).hidden = true;
            }
        }
        this.myChart.update();
        });

        // Hide all datasets except the first one by default
        for (var i = 1; i < data.datasets.length; i++) {
        this.myChart.getDatasetMeta(i).hidden = true;
        }
        this.myChart.update();
        },
    handleDataJsonUpload1(event) {
      this.week1 = event.target.files[0]
    },
    handleDataJsonUpload2(event) {
      this.week2 = event.target.files[0]
    },
    handleDataJsonUpload3(event) {
      this.week3 = event.target.files[0]
    },
    handleDataJsonUpload4(event) {
      this.week4 = event.target.files[0]
    },
    onUploadFile() {
            const formData = new FormData();
            formData.append("week1", this.week1);
            formData.append("week2", this.week2);
            formData.append("week3", this.week3);
            formData.append("week4", this.week4);  // appending file
            formData.append("deployment_id", this.id);
  
       // sending file to the backend
        axios
          .post("http://localhost:3000/upload_data_drift", formData)
          .then(res => {
            console.log("done uploading!")
            alert("Uploaded successfully, please refresh!")
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      },
    }
}



</script>