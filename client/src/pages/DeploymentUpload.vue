<template>
  <div>
    <h1>Upload Deployment</h1>
    <form>
      <div class="form-group">
        <label for="deployment-id">Deployment ID:</label>
        <input
          type="text"
          class="form-control"
          id="deployment-id"
          v-model="deploymentId"
          pattern="[0-9]+"
          required
        />
      </div>
      <div class="form-group">
        <label for="deployment-name">Deployment Name:</label>
        <input
          type="text"
          class="form-control"
          id="deployment-name"
          v-model="deploymentName"
          required
        />
      </div>
      <div class="form-group">
        <label for="importance">Importance:</label>
        <select
          class="form-control"
          id="importance"
          v-model="importance"
          required
        >
          <option value="">Choose an option</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
      <div class="form-group">
        <label for="date-now">Date Now:</label>
        <input
          type="date"
          class="form-control"
          id="date-now"
          v-model="dateNow"
          required
          readonly
        />
      </div>
      <div class="form-group">
        <label for="model-version">Email:</label>
        <input
          type="text"
          class="form-control"
          id="email-version"
          v-model="user.email"
          disabled
          required
        />
      </div>
      <div class="form-group">
        <label for="model-version">Deployment Description:</label>
        <input
          type="text"
          class="form-control"
          id="deployment-description"
          v-model="deployDescription"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="submitForm">
        Submit
      </button>
      <div v-show="isSuccess" class="success-message">
        Deployment created successfully!
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.$toast.success("Deployment Upload");
  },
  data() {
    return {
      deploymentId: "",
      deploymentName: "",
      importance: "",
      dateNow: new Date().toISOString().slice(0, 10),
      deployDescription: "",
      email: "",
      isSuccess: false,
    };
  },
  computed: {
    user: {
      get() {
        return JSON.parse(localStorage.getItem("user"));
      },
      set(user) {
        localStorage.setItem("user", JSON.stringify(user));
      },
    },
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("http://localhost:3000/users/me", config);
      this.user = res.data;
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:3000/deployments", {
          deploymentId: this.deploymentId,
          deploymentName: this.deploymentName,
          importance: this.importance,
          dateNow: this.dateNow,
          deployDescription: this.deployDescription,
          email: this.user.email,
        });

        console.log(response.data);

        // Display a success notification
        this.isSuccess = true;

        // Reset the form fields
        this.deploymentId = "";
        this.deploymentName = "";
        this.importance = "";
        this.dateNow = new Date().toISOString().slice(0, 10);
        this.deployDescription = "";
        this.email = "";
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.success-message {
  background-color: green;
  color: #ffffff;
  font-size: 1.2rem;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation: slide-down 0.3s ease-out;
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
