<template>
  <div>
    <table class="table" :class="tableClass">
      <thead>
        <slot name="columns">
          <th v-for="column in columns" :key="column">{{ column }}</th>
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
                v-if="
                  typeof itemValue(item, column) === 'object' &&
                  itemValue(item, column).icon &&
                  itemValue(item, column).class
                "
              >
                <i
                  :class="[
                    itemValue(item, column).icon,
                    itemValue(item, column).class,
                  ]"
                ></i>
              </span>
              <span v-else>{{ itemValue(item, column) }}</span>
            </td>
          </slot>
        </tr>
      </tbody>
    </table>
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
  },
};
</script>
<style scoped>
.add-deployment-btn {
  /* Add styles for the Add Deployment button */
  margin-top: 10px;
  margin-left: 10px;
}
</style>
