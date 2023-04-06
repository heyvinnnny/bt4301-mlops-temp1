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

                  
                  <p style="padding-top:20px;">Don't have an account? <router-link to="/register">Register!</router-link> </p>
                  

                  <p style="padding-top: 20px">
                    <router-link to="/forgetpassword"
                      >Forget your password?</router-link
                    >
                  </p>
                  <br>
                  <p v-if="error" class="error" id="error-message" style="color:red;">{{ error }}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
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
            // check the user's access level
                  const { access } = res.data.user;

                  if (access === "User") {
                    this.$router.push("/home");
                  } else if (access === "Manager") {
                    this.$router.push("/mgrhome");
                  }
            //this.$router.push("/home");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.error = "Invalid username or password. Please try again later.";
          } if (error.response && error.response.status === 400) {
            this.error = "Invalid username or password. Please try again later.";
          } 
          if (error.response && error.response.status === 403) {
            this.error = "Your account is still subjected to approval. Please try again later.";
          } 
        });
    },
  },
};
</script>

<style scoped>

.error-message {
  animation: shake 0.5s;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
}

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
