<template>
  <div>
    <table class="table" :class="tableClass">
      <thead>
        <slot name="columns">
          <th v-for="column in columns" :key="column.key">
            {{ column.header }}
          </th>
        </slot>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="index"
          @click="handleRowClick(item)"
        >
          <slot :row="item">
            <td v-for="(column, index) in columns" :key="index">
              <span
                v-if="['service', 'drift', 'accuracy'].includes(column.key)"
              >
                <i
                  :class="['circle', circleClass(itemValue(item, column.key))]"
                ></i>
              </span>
              <span v-else>{{ itemValue(item, column.key) }}</span>
            </td>
          </slot>
        </tr>
      </tbody>
    </table>
    <p-button class="add-deployment-btn" @click.native="onAddDeploymentClick">
      + Add Deployment
    </p-button>
  </div>
</template>
<script>
import PButton from "./Button.vue"; // Import your custom button component

export default {
  components: {
    PButton,
  },
  name: "paper-table",
  props: {
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped",
    },
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    handleRowClick(item) {
      this.$emit("row-click", item);
    },
    onAddDeploymentClick() {
      // Navigate to the desired page
      this.$router.push({ path: "/add-deployment" });
    },
    circleClass(value) {
      if (value === 0) return "circle-red";
      if (value === 1) return "circle-orange";
      if (value === 2) return "circle-green";
      return "";
    },
  },
};
</script>
<style scoped>
.add-deployment-btn {
  /* Add styles for the Add Deployment button */
  margin-top: 10px;
  margin-left: 10px;
}
.circle {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.circle-red {
  background-color: red;
}

.circle-orange {
  background-color: orange;
}

.circle-green {
  background-color: green;
}
</style>
