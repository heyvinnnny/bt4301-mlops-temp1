<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="file" ref="fileInput" @change="handleFileChange">
      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    handleSubmit() {
      const formData = new FormData();
      formData.append('file', this.file);
      // send the file to the server-side endpoint using axios
    },
  },
};
</script>

  <!-- <div class="login-card">
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
  </div> -->
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

import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://localhost:3000/login", user)
        .then((res) => {
          //if successful
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/home");
          }
          // }, err => {
          //   console.log(err.response);
          //   this.error = err.response.data.error
          // })

          //remove from here//
        })
        .catch((err) => {
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
            console.log("Error", err.message);
          }
          console.log(err.config);
        });
      //remove from here//
    },
  },
};
</script>

<style scoped>
p {
  line-height: 1rem;
}
.card {
  padding: 20px;
}
.form-group input {
  margin-bottom: 20px;
}
.login-page {
  align-items: center;
  display: flex;
  height: 100vh;
}
.login-page .wallpaper-login {
  background: url(https://cdn-gcp.new.marutitech.com/robot_humanoid_using_tablet_computer_big_data_analytic_1_94eab7101e.jpg)
    no-repeat center center;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
}
.login-page .fade-enter-active,
.login-page .fade-leave-active {
  transition: opacity 0.5s;
}
.login-page .fade-enter,
.login-page .fade-leave-to {
  opacity: 0;
}

.login-page h1 {
  margin-bottom: 1.5rem;
}
.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}
@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }
  25% {
    transform: translateX(25px);
  }
  50% {
    transform: translateX(-25px);
  }
  75% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
