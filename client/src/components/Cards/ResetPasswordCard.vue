<template>
  <div>
    <h1>Change Password</h1>
    <form @submit.prevent="resetpassword">
      <div>
        <label for="oldPassword">Old Password:</label>
        <input type="password" id="oldPassword" v-model="oldPassword" required />
      </div>
      <div>
        <label for="newPassword">New Password:</label>
        <input type="password" id="newPassword" v-model="newPassword" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm New Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
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
    };
  },
  methods: {
    async resetpassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert('New passwords do not match');
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
        alert('Password updated successfully');
        this.$router.push('/dashboard');
      } catch (err) {
        console.error(err);
        alert('Error updating password');
      }
    },
  },
};
</script>
  