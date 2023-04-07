<style>
.bold {
  font-weight: bold;
}

.label-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h3 class="card-title" style="font-weight: bold;">Assemble Model</h3>
            <div class="mb-3">
          <div class="label-container">
            <label for="version-select" class="form-label bold">Version:</label>
            <a href="#" class="btn-link bold" @click.prevent="selectVersionFile">+ New Version</a>
          </div>
              <div class="mt-2">
                <select class="form-select w-100" id="version-select" v-model="selectedVersion">
                  <option v-for="version in versions" :value="version.version">{{ version.title }}</option>
                </select>
                <input type="file" ref="versionFileInput" @change="uploadVersion" class="d-none" />
              </div>
            </div>
          <div class="label-container">
            <label for="contentFileInput" class="form-label bold">Content:</label>
            <a href="#" class="btn-link bold" @click.prevent="selectContentFile">+ Add files</a>
          </div>
            <input type="file" ref="contentFileInput" @change="uploadContent" class="d-none" />
            <ul class="list-group mt-2">
              <li v-for="file in contentFiles" class="list-group-item">{{ file.name }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <h3 class="card-title" style="font-weight: bold;">NOT TESTED</h3>
            <a href="#" class="btn-link mb-3" @click.prevent="testModel">Test Model</a>
            <hr>
            <h3 class="mb-3">NOT DEPLOYED</h3>
            <div>
              <a href="#" class="btn-link mb-2 me-3" @click.prevent="addToRegistry">Add to Registry</a>
              <a href="#" class="btn-link ms-2 mb-2" @click.prevent="deploy">Deploy</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h3 class="card-title" style="font-weight: bold;">Environment</h3>
            <div class="mb-3">
          <div class="label-container">
            <label for="environment-select" class="form-label bold">Environment:</label>
            <a href="#" class="btn-link bold" @click.prevent="selectEnvironmentFile">+ Add New Environment</a>
          </div>
              <div class="mt-2">
                <select class="form-select w-100" id="environment-select" v-model="selectedEnvironment">
                  <option v-for="environment in environments" :value="environment">{{ environment }}</option>
                </select>
                <input type="file" ref="environmentFileInput" @change="uploadEnvironment" class="d-none" />
              </div>
            </div>
            <div class="mb-3">
          <div class="label-container">
            <label for="version-select-env" class="form-label bold">Version:</label>
            <a href="#" class="btn-link bold" @click.prevent="selectVersionFileEnv">+ New Version</a>
          </div>
              <div class="mt-2">
                <select class="form-select w-100" id="version-select-env" v-model="selectedVersionEnv">
                  <option v-for="version in versionsEnv" :value="version.version">{{ version.title }}</option>
                </select>
                <input type="file" ref="versionFileInputEnv" @change="uploadVersionEnv" class="d-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  mounted() {
    this.$toast.success("Version Control");
  },
  data() {
    return {
      versions: [
        // ...
      ],
      versionsEnv: [
        // ...
      ],
      environments: [
        // ...
      ],
      selectedVersion: '',
      selectedEnvironment: '',
      selectedVersionEnv: '',
      contentFiles: [],
    };
  },
  methods: {
    selectVersionFile() {
      this.$refs.versionFileInput.click();
    },
    uploadVersion(event) {
      const file = event.target.files[0];
      if (file) {
        const newVersion = {
          version: file.name,
          title: file.name,
          description: '',
          data: [],
        };
        this.versions.push(newVersion);
        this.selectedVersion = newVersion.version;
      }
    },
    selectContentFile() {
      this.$refs.contentFileInput.click();
    },
    uploadContent(event) {
      const file = event.target.files[0];
      if (file) {
        this.contentFiles.push(file);
      }
    },
    testModel() {
      // Implement test model 
    },
    addToRegistry() {
      // Implement add to registry
    },
    deploy() {
      // Implement deploy
    },
    selectEnvironmentFile() {
      this.$refs.environmentFileInput.click();
    },
    uploadEnvironment(event) {
      const file = event.target.files[0];
      if (file) {
        this.environments.push(file.name);
        this.selectedEnvironment = file.name;
      }
    },
    selectVersionFileEnv() {
      this.$refs.versionFileInputEnv.click();
    },
    uploadVersionEnv(event) {
      const file = event.target.files[0];
      if (file) {
        const newVersion = {
          version: file.name,
          title: file.name,
          description: '',
          data: [],
        };
        this.versionsEnv.push(newVersion);
        this.selectedVersionEnv = newVersion.version;
      }
    },
  },
};
</script>
