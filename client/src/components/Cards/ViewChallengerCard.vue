<template>
  <div>
    <h2>Models</h2>
    <table>
      <thead>
        <tr>
          <th>Model Name</th>
          <th>Model Version</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="model in models" :key="model._id">
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
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      models: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/models');
      this.models = response.data;
      console.log(response)
    } catch (error) {
      console.error(`Error retrieving model information: ${error.message}`);
    }
  },
};
</script>

<style scoped>
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
</style>
