<template>
    <div class="login">
      <div class="form-container">
        <h1 class="form-title">Forgot Password</h1>
        <form @submit.prevent="forgetpassword">
          <div class="form-group">
            <label class="form-label" for="email">Email:</label>
            <input v-model="email" class="form-input" type="email" name="email" placeholder="Enter your email" required="">
          </div>
          <button type="submit" class="btn btn-primary">Reset Password</button>
        </form>
        <div class="form-text">
          <p>Remember your password? <router-link to="/login">Login Now!</router-link></p>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: '',
      message: '',
      error: ''
    };
  },
  methods: {
    forgetpassword() {
      axios.post('http://localhost:3000/forgetpassword', { email: this.email })
        .then(res => {
          console.log("then");
          this.error = '';
        })
        .catch(err => {
          this.message = '';
          console.log("catch");
        });
    }
  }
};
</script>
  
<style scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .form-container {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 400px;
  }
  
  .form-title {
    font-size: 30px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-label {
    display: block;
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .form-input {
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 18px;
    padding: 10px;
    width: 100%;
  }
  
  .btn {
    background-color: #4CAF50;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    padding: 10px;
    width: 100%;
  }
  
  .btn:hover {
    background-color: #3e8e41;
  }
  
  .form-text {
    margin-top: 20px;
    text-align: center;
  }
  
  .form-text p {
    font-size: 16px;
  }
  
  .form-text a {
    color: #4CAF50;
  }
</style>