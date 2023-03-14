<template>
  <div class="login-card">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
      {{ error }}
    </form>
  </div>
</template>
  
<script>
// import axios from 'axios';

// export default {
//   data() {
//     return {
//       email: '',
//       password: '',
//       error: ''
//     }
//   },
//   methods: {
//     async login() {
//       try {
//         const response = await axios.post('http://localhost:3000/login', {
//           email: this.email,
//           password: this.password
//         });
//         const { token } = response.data;
//         localStorage.setItem('token', token);
//         this.$router.push('/dashboard');
//       } 
//       catch (error) {
//         console.log(error.response)
//         this.error = error.response.data.message;
//       }
//     }
//   }
// }

import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:3000/login', user)
        .then(res => {
          //if successful
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            this.$router.push('/dashboard');
          }
        // }, err => {
        //   console.log(err.response);
        //   this.error = err.response.data.error
        // })

//remove from here//
      })
  .catch(err => {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', err.message);
    }
    console.log(err.config);
  });
//remove from here//


    }
  }
}
  </script>
  
  <style scoped>
  .login-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  display: block;
  background-color: #3490dc;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  width: 100%;
}

.error-message {
  color: red;
  margin-top: 10px;
}
  </style>
  