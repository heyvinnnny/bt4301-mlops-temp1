<template>
  <div class="code-uploader">
    <h2>Code Uploader</h2>
    <label for="title-input">Title:</label>
    <input id="title-input" type="text" v-model="inputTitle" />
    <br />
    <label for="code-input">Code:</label>
    <textarea id="code-input" v-model="inputCode" rows="10" cols="100"></textarea>
    <br />
    <a href="#" @click.prevent="submitCode">Submit</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputTitle: '',
      inputCode: '',
    };
  },
  methods: {
    async submitCode() {
      // Handle code submission logic here
      try {
        const response = await fetch('/api/code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: this.inputTitle,
            code: this.inputCode,
          }),
        });
        const data = await response.json();
        console.log(data);
        // Reset input fields after successful submission
        this.inputTitle = '';
        this.inputCode = '';
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.code-uploader {
  max-width: 600px;
  margin: auto;
}
input[type="text"], textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  font-size: 16px;
}
a {
  color: #4CAF50;
  font-size: 16px;
  text-decoration: none;
}
a:hover {
  color: #3e8e41;
}
</style>
