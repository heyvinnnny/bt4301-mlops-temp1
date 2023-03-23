<template>
  <card class="card-user">
    <div slot="image">
      <img src="@/assets/img/background.jpg" alt="..." />
    </div>
    <div>
      <div class="author">
        <img
          class="avatar border-white"
          :src="createGravatarUrl(user.email)"
          alt="..."
        />
        <h4 class="title">
          {{ user.name }}
          <br />
          <a href="#">
          <small>@{{ user.username }}</small>
          </a>
          </h4>
        </div>
      <br>
      <br>
      <br>
    </div>
    <hr />

    <div class="text-center">
      <div class="row">
        <div
          v-for="(info, index) in details"
          :key="index"
          :class="getClasses(index)"
        >
          <h5>
            {{ info.title }}
            <br />
            <small>{{ info.subTitle }}</small>
          </h5>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
      },
      details: [
        {
          title: "12",
          subTitle: "Files",
        },
        {
          title: "2GB",
          subTitle: "Used",
        },
        {
          title: "24,6$",
          subTitle: "Spent",
        },
      ],
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");

    // Include the token in the Authorization header
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
      const gravatarBaseUrl = "https://www.gravatar.com/avatar/";
      const md5 = require("md5");
      const emailHash = md5(email.trim().toLowerCase());
      return `${gravatarBaseUrl}${emailHash}?d=identicon`;
    },
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-lg-3 offset-lg-1";
      } else if (remainder === 2) {
        return "col-lg-4";
      } else {
        return "col-lg-3";
      }
    },
  },
};
</script>
<style></style>
