<template>
    <div>
      <vue-slider v-model="value" :min="min" :max="max" @change="updateValue" />
    </div>
  </template>
  
  <script>
  import VueSlider from "vue-slider-component";
  import "vue-slider-component/theme/default.css";
  
  export default {
    components: {
      VueSlider,
    },
    data() {
      return {
        value: [new Date("2019-08-05").getTime(), new Date("2020-03-19").getTime()],
        min: new Date("2019-08-05").getTime(),
        max: new Date("2020-03-19").getTime(),
      };
    },
    methods: {
      updateValue(value) {
        this.$emit("input", value);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles for the timeline component here */
  </style>
  
  