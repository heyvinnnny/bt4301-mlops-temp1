<template>
    <div class="register-form" id="app">
      <form @submit.prevent="register">
        <div>
          <label>Name</label>
          <input v-model="name" type="text" required />
        </div>
        <div>
          <label>Email</label>
          <input v-model="email" type="email" required />
        </div>
        <div>
          <label>Password</label>
          <input v-model="password" type="password" required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input v-model="confirmPassword" type="password" required />
        </div>
        <div>
          <label>Role</label>
          <select v-model="access" required>
            <option value="User">User</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
      
        <button type="submit">Register</button>
      </form>
    </div>

    
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      access: ''
    };
  },
  methods: {
    async register() {
      try {
        // Check that password and confirm password match
        if (this.password !== this.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        // Make an HTTP POST request to the backend API endpoint
        const response = await axios.post('http://localhost:3000/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          access: this.access
        });

        // Show a success message to the user
        alert(response.data.message);
        this.$router.push('/login');

        // Reset the form
        this.name = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.access = 'User';
      } catch (error) {
        // Show an error message to the user
        alert(error.message);
      }
    }
  }
};
</script>


<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.register-form input {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  background-color: #f3f3f3;
  font-size: 16px;
  width: 300px;
}

.register-form button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #0080ff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  width: 300px;
  transition: all 0.3s ease;
}

.register-form button:hover {
  background-color: #0066cc;
}

.register-form .error-message {
  color: red;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}
</style>
  

   <!-- <template>
    <div class="register-card">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required>
        </div>
        <div class="form-group">
          <label for="access">Access Role:</label>
          <select id="access" v-model="access" required>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit" @click="() => registerUser()">Register</button>
      </form>
    </div>
  </template>
  
<script>
import { ref } from 'vue'
import firebase from "@/uifire.js";
import db from "@/main.js";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { doc, getDocs, getFirestore, collection } from "firebase/firestore";
import { projectAuth, projectFirestore } from '@/main'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  
export default {
  name: 'RegisterCard',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      access: 'user'
    }
  },
  methods: {
    async registerUser() {
      try {
        const auth = firebase.auth()
        const { user } = await auth.createUserWithEmailAndPassword(this.email, this.password)
        await firebase.firestore().collection('users').doc(user.uid).set({
          name: this.name,
          email: this.email,
          password: this.password,
          access: this.access
        })
        this.$router.push('/login')
      } catch (error) {
        console.error(error)
        alert(error.message)
      }
    }
  }
}
  </script> -->