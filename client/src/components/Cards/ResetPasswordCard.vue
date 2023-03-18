<template>
  <div class="reset-password">
    <div class="form-container">
      <h1 class="form-title">Reset Password</h1>
      <form @submit.prevent="resetpassword">
        <div class="form-group">
          <label class="form-label" for="password">New Password:</label>
          <input v-model="password" class="form-input" type="password" name="password" placeholder="Enter new password" required="">
        </div>
        <div class="form-group">
          <label class="form-label" for="passwordConfirmation">Confirm New Password:</label>
          <input v-model="passwordConfirmation" class="form-input" type="password" name="passwordConfirmation" placeholder="Confirm new password" required="">
        </div>
        <button type="submit" class="btn btn-primary">Reset Password</button>
      </form>
    </div>
  </div>
</template>
  
<script>
//https://www.youtube.com/watch?v=WncGAo8Vo0A&t=456s
import axios from "axios";

export default {
  data() {
    return {
      password: "",
      passwordConfirmation: "",
      error: "",
      message: "",
      token: "" //this.$route.params.token, getting token from route params
    };
  },
  created() {
    // Get the token from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    this.token = urlParams.get('token');
    if (!this.token) {
      this.error = 'Invalid or expired password reset token';
    }
  },
  methods: {
    resetpassword() {
      const param = useParams();
      if (this.password !== this.passwordConfirmation) {
        this.error = "Passwords do not match.";
        return;
      }
      axios
        .post(`http://localhost:3000/resetpassword`, {
          password: this.password,
          password: this.passwordConfirmation
        })
        .then((res) => {
          this.message = res.data.message;
          this.error = "";
          this.$router.push("/login");
        })
        .catch((err) => {
          this.message = "";
          this.error = err.response.data.error;
        });
    },
  },
};
</script>