<template>
  <div>
    <h1>Code Converter</h1>
    <label for="input-code">Enter your Python code:</label>
    <textarea
      id="input-code"
      v-model="inputCode"
      rows="10"
      cols="50"
      placeholder="Paste your Python code here"
    ></textarea>

    <button :disabled="!inputCode" @click="convertCode">Convert</button>

    <div v-if="convertedCode">
      <h2>Converted Code:</h2>
      <pre>{{ convertedCode }}</pre>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.$toast.success("Code Porting");
  },
  data() {
    return {
      inputCode: "",
      convertedCode: "",
    };
  },
  methods: {
    async convertCode() {
      try {
        const response = await axios.post("http://localhost:3000/convert", { code: this.inputCode });
        this.convertedCode = response.data.convertedCode;
      } catch (error) {
        console.error("Error during conversion:", error);
      }
    },
  },
};
</script>
