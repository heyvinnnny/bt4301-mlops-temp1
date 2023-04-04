<template>
  <div>
    <h1>Upload Model Files</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="model-bin">Weights (bin):</label>
        <input type="file" class="form-control" id="model-bin" @change="modelBin = $event.target.files[0]" required>
      </div>
      <div class="form-group">
        <label for="model-json">Model (json):</label>
        <input type="file" class="form-control" id="model-bin" @change="modelBin = $event.target.files[0]" required>
      </div>
      <div class="form-group">
        <label for="deployment-id">Deployment ID:</label>
        <input type="text" class="form-control" id="deployment-id" v-model="deploymentId" required>
      </div>
      <div class="form-group">
        <label for="deployment-name">Deployment Name:</label>
        <input type="text" class="form-control" id="deployment-name" v-model="deploymentName" required>
      </div>
      <div class="form-group">
        <label for="importance">Importance:</label>
        <select class="form-control" id="importance" v-model="importance" required>
          <option value="">Choose an option</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
      <div class="form-group">
        <label for="date-created">Date Created:</label>
        <input type="date" class="form-control" id="date-created" v-model="dateCreated" required>
      </div>
      <div class="form-group">
        <label for="date-now">Date Now:</label>
        <input type="date" class="form-control" id="date-now" v-model="dateNow" required readonly>
      </div>
      <div class="form-group">
        <label for="manager-name">Manager Name:</label>
        <input type="text" class="form-control" id="manager-name" v-model="managerName" required>
      </div>
      <div class="form-group">
        <label for="manager-email">Manager Email:</label>
        <input type="email" class="form-control" id="manager-email" v-model="managerEmail" required>
      </div>
      <div class="form-group">
        <label for="user-name">User Name:</label>
        <input type="text" class="form-control" id="user-name" v-model="userName" required>
      </div>
      <div class="form-group">
        <label for="user-email">User Email:</label>
        <input type="email" class="form-control" id="user-email" v-model="userEmail" required>
      </div>
      <div class="form-group">
        <label for="model-version">Model Version:</label>
        <input type="text" class="form-control" id="model-version" v-model="modelVersion" required>
      </div>
      <div class="form-group">
        <label for="env-version">Environment Version:</label>
        <input type="text" class="form-control" id="env-version" v-model="envVersion" required>
      </div>
      <div class="form-group">
        <label for="replacement-reason">Replacement Reason:</label>
        <textarea class="form-control" id="replacement-reason" v-model="replacementReason" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelBin: '',
      modelJson: '',
      deploymentId: '',
      deploymentName: '',
      importance: '',
      dateCreated: '',
      dateNow: new Date().toISOString().slice(0, 10),
      managerName: '',
      managerEmail: '',
      userName: '',
      userEmail: '',
      modelVersion: '',
      envVersion: '',
      replacementReason: '',
    }
  },
  methods: {
    submitForm() {
      // add your submit form logic here
    }
  }
}
</script>
