<template>
  <div>
    <h2>Model Upload</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="jsonFile">JSON File:</label>
        <input type="file" id="jsonFile" name="jsonFile" accept=".json" required @change="handleJsonUpload">
      </div>
      <div>
        <label for="binaryFile">Binary File:</label>
        <input type="file" id="binaryFile" name="binaryFile" accept=".bin" required @change="handleBinUpload">
      </div>
      <button v-on:click="onUploadFile()" type="submit">Upload Files</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      json :'',
      bin:''
    }
  },
  methods: {
    handleJsonUpload(event) {
      this.json = event.target.files[0]
    },
    handleBinUpload(event) {
      this.bin = event.target.files[0]
    },
    onUploadFile() {
            const formData = new FormData();
            formData.append("jsonFile", this.json);  // appending file
            formData.append("binaryFile", this.bin);  // appending file
  
       // sending file to the backend
        axios
          .post("http://localhost:3000/upload", formData)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
  }
}
</script>