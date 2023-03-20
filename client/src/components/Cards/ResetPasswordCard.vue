<template>
    <div>
      <h2>Reset Password</h2>
      <div v-if="!showForm">
        <p>A password reset email has been sent to your email address. Please follow the instructions in the email to reset your password.</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
      <div v-else>
        <form @submit.prevent="resetpassword">
          <p>Email: {{ email }}</p>
          <label for="password">New Password:</label>
          <input type="password" id="password" v-model="password" required>
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showForm: true,
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: ''
      }
    },
    mounted() {
      // get the email from the query parameters or local storage
      const searchParams = new URLSearchParams(window.location.search)
      const email = searchParams.get('email') || localStorage.getItem('resetEmail')
      if (email) {
        this.email = email
        localStorage.setItem('resetEmail', email)
      } else {
        this.showForm = false
      }
    },
    methods: {
      resetpassword() {
        if (this.password !== this.confirmPassword) {
          this.errorMessage = "Passwords don't match"
          return
        }
  
        const data = {
          email: this.email,
          password: this.password
        }
  
        // make API request to reset password
        fetch('http://localhost:3000/resetpassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => {
            if (response.ok) {
              this.showForm = false
              localStorage.removeItem('resetEmail')
            } else {
              this.errorMessage = 'An error occurred while resetting your password. Please try again.'
            }
          })
          .catch(() => {
            this.errorMessage = 'An error occurred while resetting your password. Please try again.'
          })
      }
    }
  }
  </script>
  