<template>
  <div id="app">
    <button @click="clickHandler">点击</button>
    <grid
      :columns="columns"
      :datas="datas"
      :headerHeight="30"
      :defaultColDef="{editable: true}"
      :stopEditingWhenGridLosesFocus="false"
      :enterMovesDown="true"
      :pagination="true"
      :paginationAutoPageSize="true"
      :localeText="localeText"
      rowSelection="multiple"
      :rowMultiSelectWithClick="true"
      :suppressRowClickSelection="true"
      ref="table"
    />
  </div>
</template>

<script>
import Grid from './Grid.vue';

export default {
  name: 'app',
  components: {
    Grid
  },
  data() {
    return {
      columns: [
        {
          checkboxSelection: true,
          width: 40,
          pinned: 'left'
        },
        {
          headerName: 'Athlete',
          field: 'athlete',
          pinned: 'left'
        },
        {
          headerName: 'Age',
          field: 'age',
          headerClass: 'abc',
          resizable: true
        },
        {
          headerName: 'Country',
          field: 'country',
          editable: false
        },
        {
          headerName: 'Year',
          field: 'year',
          singleClickEdit: true
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
      datas: [],
      localeText: {
        page: '当前',
        more: '更多',
        to: '到',
        of: '共',
        next: '下一页',
        last: '最后一页',
        first: '第一页'
      }
    };
  },
  mounted() {},
  computed: {
    rowClass(params) {
      console.log(params);
      return ' aaa';
    }
  },
  methods: {
    clickHandler() {
      console.log(111, this.$refs.table.gridApi);
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

<style>
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
}
</style>
