<template>
  <div id="app">
    <div class="header">
      <button @click="clickHandler">已选数据</button>

    </div>
    <grid
      :columns="columns"
      :datas="datas"
      :headerHeight="30"
      :selection="true"
      ref="table"
      type="edit"
      :getRowClass="getRowClass"
    />
  </div>
</template>

<script>
import Vue from 'vue';
// import Grid from './Grid.vue';
import Grid from './index.js';
// import Grid from '../dist/grid.umd.min';
// const Grid = require('../dist/grid.umd.min.js').default;
// import './components/SquareComponent';
// const Grid = require('./index.js').default;
Vue.component('Grid', Grid);

export default {
  name: 'app',
  data() {
    return {
      columns: [
        {
          headerName: 'Athlete',
          field: 'athlete',
          cellClass: 'aaaaa',
          maxWidth: 100
        },
        {
          headerName: 'Age',
          field: 'age',
          headerClass: 'abc',
          resizable: true,
          editable: true,
          width: 100,
          dataMap: [
            {
              key: 23,
              value: '天'
            },
            {
              key: 19,
              value: '地'
            },
            {
              key: 27,
              value: '地'
            }
          ]
          // cellRendererFramework: 'SquareComponent'
        },
        {
          headerName: 'Country',
          field: 'country',
          editable: false
        },
        {
          headerName: 'Year',
          field: 'year'
        },
        {
          headerName: 'Date',
          field: 'date'
        },
        {
          headerName: 'Sport',
          field: 'sport'
        },
        {
          headerName: 'Gold',
          field: 'gold'
        },
        {
          headerName: 'Silver',
          field: 'silver'
        },
        {
          headerName: 'Bronze',
          field: 'bronze'
        },
        {
          headerName: 'Total',
          field: 'total'
        }
      ],
      datas: []
    };
  },
  methods: {
    getRowClass(row) {
      if (row.data.athlete === 'Michael Phelps') {
        return 'aaaaa';
      }
      return '';
    },
    clickHandler() {
      console.log(this.$refs.table.gridApi);
      console.log(this.$refs.table.gridApi.getSelectedRows());
    },
    getDatas() {
      const vm = this;
      const httpRequest = new XMLHttpRequest();
      httpRequest.open(
        'GET',
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json'
      );
      httpRequest.send();
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          vm.datas = JSON.parse(httpRequest.responseText);
        }
      };
    }
  },
  created() {
    this.getDatas();
  }
};
</script>

<style lang="scss">
body,
html {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  .header {
    line-height: 30px;
  }
}
</style>
