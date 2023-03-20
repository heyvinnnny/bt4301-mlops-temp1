<template>
  <div id="app">
    <div class="login-page">
      <transition name="fade">
        <div class="wallpaper-login"></div>
      </transition>
      <div class="wallpaper-register"></div>

      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div class="card login">
              <h3 style="text-align: center"><b>Login to DataPower</b></h3>
              <form @submit.prevent="login" class="card login">
                <div class="form-group">
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    required
                  />
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    required
                  />

                  <button type="submit" class="btn btn-primary">Login</button>
                  <br />

                  <!-- May not need this line bcause users are not expected to create by themselves
                    <p style="padding-top:20px;">Don't have an account? <router-link to="/register">Register</router-link> </p>
                    -->

                  <p style="padding-top: 20px">
                    <router-link to="/forgetpassword"
                      >Forget your password?</router-link
                    >
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

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
            this.$router.push("/dashboard");
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
