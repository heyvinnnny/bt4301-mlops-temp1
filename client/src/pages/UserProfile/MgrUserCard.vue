<template>
<div class="container rounded bg-white mt-4 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
              <!-- <span class="font-weight-bold">{{ user.name }}</span> -->
              <span class="text-black-50">{{ user.email }}</span><span> 

              </span></div>
        </div>
        <div class="col-md-9 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" disabled :value="user.name"></div>
                    <div class="col-md-6"><label class="labels">Access Role</label><input type="text" class="form-control" disabled :value="user.access"></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control" disabled :value="user.email"></div>
                </div>
                <div class="mt-5 text-center"><router-link class="btn btn-primary profile-button" to="/mgrapproval">Approval Dashboard</router-link></div>
                <div class="mt-5 text-center"><router-link class="btn btn-primary profile-button" to="/resetpassword">Reset Password</router-link></div>
            </div>
        </div>
    </div>
</div>


</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      userData: {
        name: "",
        email: "",
        access: ""
      },
    };
  },
  computed: {
    user: {
      get() {
        return JSON.parse(localStorage.getItem("user"));
      },
      set(user) {
        localStorage.setItem("user", JSON.stringify(user));
      },
    },
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("http://localhost:3000/users/me", config);
      this.user = res.data;
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    createGravatarUrl(email) {
      if (!email) {
        return null;
      }
      const gravatarBaseUrl = "https://www.gravatar.com/avatar/";
      const md5 = require("md5");
      const emailHash = md5(email.trim().toLowerCase());
      return `${gravatarBaseUrl}${emailHash}?d=identicon`;
    },
  },
};
</script>

<style scoped>
ody {
    background: rgb(99, 39, 120)
}

.form-control:focus {
    box-shadow: none;
    border-color: #BA68C8
}

.profile-button {
    background: rgb(99, 39, 120);
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: #682773
}

.profile-button:focus {
    background: #682773;
    box-shadow: none
}

.profile-button:active {
    background: #682773;
    box-shadow: none
}

.back:hover {
    color: #682773;
    cursor: pointer
}
b
.labels {
    font-size: 11px
}

.add-experience:hover {
    background: #BA68C8;
    color: #fff;
    cursor: pointer;
    border: solid 1px #BA68C8
}
</style>