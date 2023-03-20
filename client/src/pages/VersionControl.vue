<template>
    <div>
      <template v-if="showView">
        <button @click="showView = false">Return</button>
        <p v-if="versionData">{{ versionData.text }}</p>
        <p v-else>No data available for selected version.</p>
        <!-- The above line will display if no data has been submitted for the selected version -->
      </template>
      <template v-else>
        <label for="version-select">Select version:</label>
        <select id="version-select" v-model="selectedVersion">
          <option v-for="version in versions" :value="version.version">{{ version.title }}</option>
        </select>
        <button @click="viewVersion">View</button>
        <br />
        <label for="title-input">Title:</label>
        <input id="title-input" type="text" v-model="inputTitle" />
        <br />
        <label for="input">Input:</label>
        <textarea id="input" v-model="inputValue" rows="10" cols="100"></textarea>
        <br />
        <button @click="submitInput">Submit</button>
      </template>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        versions: [
          {
            version: 'Version 1.0',
            title: 'Version 1.0',
            data: [],
          },
        ],
        selectedVersion: 'Version 1.0',
        inputTitle: '',
        inputValue: '',
        showView: false,
      };
    },
    computed: {
      versionData() {
        const version = this.versions.find(v => v.title === this.selectedVersion);
        return version ? version.data[0] : null;
      },
    },
    methods: {
      viewVersion() {
        // Handle view version logic here
        this.showView = true;
      },
      submitInput() {
        // Handle input submission logic here
        const version = this.versions.find(v => v.title === this.inputTitle);
        if (!version) {
          this.versions.push({
            version: this.inputTitle,
            title: this.inputTitle,
            data: [],
          });
        }
        const updatedVersion = this.versions.find(v => v.title === this.inputTitle);
        updatedVersion.data.push({
          title: this.inputTitle,
          text: this.inputValue,
        });
        this.inputTitle = '';
        this.inputValue = '';
      },
    },
  };
  </script>