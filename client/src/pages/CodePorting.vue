<template>
  <div>
    <textarea v-model="inputCode"></textarea>
    <button @click="convertCode">Convert</button>
    <textarea v-model="outputCode"></textarea>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputCode: '',
      outputCode: ''
    }
  },
  methods: {
    async convertCode() {
      const requestBody = {
        "text": this.inputCode,
        "from": "javascript",
        "to": "typescript"
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      try {
        const response = await axios.post('https://www.web-code-converter.com/convert', requestBody, config);
        this.outputCode = response.data.text;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style>
textarea {
  width: 100%;
  height: 150px;
}
</style>
