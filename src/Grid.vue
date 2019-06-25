<template>
  <ag-grid-vue
    class="ag-theme-balham"
    :columnDefs="columns"
    :rowData="datas"
    ref="table"
    v-bind="$attrs"
    v-on="$listeners"
    :gridOptions="gridOptions"
  ></ag-grid-vue>
</template>
<script>
import { AgGridVue } from 'ag-grid-vue';

export default {
  name: 'Grid',

  components: {
    AgGridVue
  },

  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    datas: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      gridOptions: null,
      gridApi: null,
      columnApi: null
    };
  },
  beforeMount() {
    this.gridOptions = {};
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  }
};
</script>

<style lang="scss">
@import './assets/style/index.scss';
</style>