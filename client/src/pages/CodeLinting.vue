<template>
    <div>
      <h1>Code Linting</h1>
      <select v-model="selectedLanguage">
        <option value="cpp">C++</option>
        <option value="cs">C#</option>
        <option value="java">Java</option>
        <option value="C">C</option>
      </select>
      <br />
      <textarea v-model="code" :placeholder="`Enter your ${selectedLanguage.toUpperCase()} code here`" rows="15" cols="80"></textarea>
      <br />
      <button @click="lintCode">Lint Code</button>
      <div v-if="errors.length > 0">
        <h2>Linting Errors</h2>
        <pre class="terminal">
          <code v-for="(error, index) in errors" :key="index">
            {{ error }}<br />
          </code>
        </pre>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "CodeLinting",
    mounted() {
    this.$toast.success("Code Linting");
    },
    data() {
      return {
        code: "",
        errors: [],
        selectedLanguage: "java",
      };
    },
    computed: {
      languageConfig() {
        switch (this.selectedLanguage) {
          case "cpp": //can work
            return {
              compiler: "clang-head",
              options: "-Wall -Wextra",
            };
          case "cs": //c# works, swift can work
            return {
              compiler: "mono-6.12.0.122",
              //compiler: "cpython-3.10.2",
              options: "-Wall -Wextra",
            };
          case "java": //can work
            return {
              compiler: "openjdk-jdk-15.0.3+2",
              options: "-Wall -Wextra",
            };
          case "c": //can work
            return {
              compiler: "gcc-4.9.4-c",
              options: "-Wall -Wextra",
            };
          
        }
      },
    },
    methods: {
      async lintCode() {
        const requestBody = {
          code: this.code,
          compiler: this.languageConfig.compiler,
          options: this.languageConfig.options,
        };
  
        try {
          const response = await axios.post("https://wandbox.org/api/compile.json", requestBody);
          const result = response.data;
  
          if (result.compiler_error) {
            this.errors = result.compiler_error.split("\n").filter((error) => error.trim() !== "");
          } else {
            this.errors = [];
            alert("No linting errors found.");
          }
        } catch (error) {
          console.error("Error linting code:", error);
          alert("Error linting code. Please try again later.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  textarea {
    width: 100%;
    resize: none;
  }
  
  .terminal {
    background-color: #2e2e2e;
    color: #f8f8f8;
    font-family: monospace;
    padding: 15px;
    margin-top: 10px;
    white-space: pre-wrap;
    overflow-x: auto;
    max-height: 400px;
    border-radius: 4px;
  }
  </style>
  