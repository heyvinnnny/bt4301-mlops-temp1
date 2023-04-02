<template>
  <div>
    <h1>Change Password</h1>
    <div v-if="message" :class="['alert', 'alert-' + messageType]">
      {{ message }}
    </div>
    <form @submit.prevent="resetpassword">
      <div>
        <label for="oldPassword">Old Password:</label>
        <input type="password" id="oldPassword" class="oldPassword" v-model="oldPassword" required />
      </div>
      <div>
        <label for="newPassword">New Password:</label>
        <input type="password" id="newPassword" class="newPassword" v-model="newPassword" required />
        <div v-if="newPasswordError" class="invalid-feedback">{{ newPasswordError }}</div>
      </div>
      <div>
        <label for="confirmPassword">Confirm New Password:</label>
        <input type="password" id="confirmPassword" class="confirmPassword" v-model="confirmPassword" required />
      </div>
      <button type="submit">Change Password</button>
    </form>
  </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      newPasswordError: '',
      message: '',
      messageType: ''
    };
  },
  methods: {
    async resetpassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert('New passwords do not match');
        return;
      }

      if (!this.isValidPassword(this.newPassword)) {
        this.newPasswordError = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        return;
      }

      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };


      try {
        await axios.put(
          'http://localhost:3000/resetpassword',
          {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
          },
          config
        );
        this.message = 'Password updated successfully';
        this.messageType = 'success';
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      } catch (err) {
        console.error(err);
        this.message = 'Error updating password';
        this.messageType = 'error';
      }
    },
    isValidPassword(password) {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      return regex.test(password);
    },
  },
};
</script>

<style scoped>
h1 {
  color: #5C5E60;
  font-size: 36px;
  margin-bottom: 30px;
  font-weight:800;
  text-align:center;
}

form {
  max-width: 500px;
  margin: 0 auto;
}

label {
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

input {
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  padding: 8px 12px;
  width: 100%;
  margin-bottom: 20px;
}

button {
  background-color: #5C5E60;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 18px;
  padding: 12px 24px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
}

button:hover {
  background-color: #44464a;
}

button:active {
  transform: translateY(1px);
}
</style>
  