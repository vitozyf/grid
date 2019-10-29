<template>
  <div
    id="app"
    class="appdemo"
  >
    <div class="header">
      <button @click="addNew">新增一行</button>
      <button @click="getSelectedRows">已选数据</button>
      <button @click="getUpdatedDatas">获取修改数据</button>
      <button @click="updateColumn">更新列状态</button>
      <button @click="forEachNode">选择部分数据</button>
      <button @click="selectAllType">全选项</button>
      <button @click="updateRowData">更新行数据</button>
      <button @click="startEditingCell">编辑API</button>
      <button @click="editFirstData">修改首行数据</button>
    </div>
    <div class="header">
      <button @click="moveColumn">移动列</button>
    </div>
    <div :style="{height: '400px', padding: '0 10px'}">

      <grid
        :columns="columns"
        :datas="datas1"
        :selection="true"
        ref="table1"
        type="edit"
        :getRowClass="getRowClass"
        :total-count="10000"
        :page-size="20"
        :page-index="1"
        :onPageChanged="onPageChanged"
        :contextmenu="contextmenu"
        :context="{a: 1}"
        @onRowClicked="onRowClicked"
      ></grid>
    </div>
    <div :style="{height: '400px', padding: '50px 10px'}">
      <grid
        :columns="columns1"
        :datas="datas2"
        :selection="true"
        ref="table2"
        type="edit"
        :total-count="10000"
        :page-size="20"
        :page-index="1"
        :onPageChanged="onPageChanged"
        :contextmenu="contextmenu"
        @onRowClicked="onRowClicked"
      ></grid>
    </div>
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
      gridOptionsFirst: null,
      gridOptionsSecond: null,
      columns: [],
      columns1: [
        {
          headerName: 'Athlete',
          field: 'athlete',
          cellClass: 'aaaaa',
          cellStyle() {
            return { color: 'blue' };
          }
        },
        {
          headerName: 'Age',
          field: 'age',
          headerClass: 'abc',
          resizable: false,
          width: 120,
          suppressMovable: true,
          dataMap: [
            {
              key: 0,
              value: '天'
            },
            {
              key: 1,
              value: '地'
            },
            {
              key: 2,
              value: '人'
            }
          ],
          editable: true
        },
        {
          headerName: 'Country',
          field: 'country',
          editable: false
        },
        {
          headerName: 'Year',
          field: 'year',
          editable: true,
          cellClass(params) {
            if (params.value - 1 === 0) {
              return 'bg-orange';
            }
            return '';
          }
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
          field: 'gold',
          cellClass() {
            return 'bg-orange';
          }
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
      datas1: [],
      datas2: [],
      selectConfig: {},
      contextmenu: []
    };
  },
  methods: {
    moveColumn() {
      this.$refs.table1.moveColumns(['age', 'year'], 8);
    },
    startEditingCell() {
      this.$refs.table1.setFocusedCell(0, 'sport');
      this.$refs.table1.startEditingCell(0, 'sport');
    },
    updateRowData() {
      this.datas1[0].athlete = 999;
      this.datas1[1].athlete = 888;
      // console.log(this.$refs.table1.updateRowData);
      this.$refs.table1.updateRowData([this.datas1[0], this.datas1[1]]);
    },
    selectAllType() {
      console.log(this.selectConfig);
    },
    forEachNode() {
      this.$refs.table1.forEachNode(node => {
        if (node.data.year < 201910) {
          node.setSelected(true);
        }
      });
    },
    onRowClicked() {
      // console.log(111);
    },
    updateColumn() {
      const YearColumn = this.columns.find(item => item.field === 'year');
      YearColumn.editable = !YearColumn.editable;

      const AgeColumn = this.columns.find(item => item.field === 'age');
      AgeColumn.dataMap = null;
      this.$refs.table1.changeColumns(this.columns);
    },
    getUpdatedDatas() {
      console.log(this.$refs.table1.getUpdatedDatas());
    },
    addNew() {
      const Datas = this.datas1.map(item => {
        return { ...item };
      });
      Datas.unshift({});

      this.$refs.table1.setRowData(Datas);
    },
    onPageChanged(i) {
      const Datas = [];
      for (let index = 0; index < 100; index++) {
        Datas.push({
          athlete: `vito${index}---${i}`,
          age: index,
          country: '中国',
          year: `2019${index}---${i}`,
          date: '2019-06-30',
          sport: 'sport',
          gold: 'gold',
          silver: i,
          bronze: '0',
          total: 'total'
        });
      }
      // this.datas1 = Datas;
      setTimeout(() => {
        this.$refs.table1.setRowData(Datas);
      }, 500);
    },
    onPaginationChanged(e) {
      console.log(111, e);
    },
    getRowClass(row) {
      if (row.data.athlete === 'vito0') {
        return 'rrrrr';
      }
      return '';
    },
    getSelectedRows() {
      console.log(this.$refs.table1.getSelectedRows());
    },
    editFirstData() {
      console.log(123);
      this.datas1[0].athlete = 'aaa';
      this.$refs.table1.updateRowData(this.datas1[0]);
      console.log(this.$refs.table1.gridApi.redrawRows());
      // redrawRows
    },
    getDatas() {
      const Datas1 = [];
      const Datas2 = [];
      for (let index = 0; index < 200; index++) {
        Datas1.push({
          athlete: `vito${index}`,
          age: index,
          country: '中国',
          year: `2019${index}`,
          date: '2019-06-30',
          sport: !!(index % 2 === 0),
          silver: 0,
          bronze: '0',
          total: 'total'
        });
        Datas2.push({
          athlete: `aaaa${index}`,
          age: index,
          country: '美国',
          year: `${index}`,
          date: '2019-06-20',
          gold: null,
          silver: 'slice',
          bronze: '0',
          total: 'total22'
        });
      }
      this.datas1 = Datas1;
      this.datas2 = Datas2;
      this.$refs.table1.setRowData(Datas1);
      this.$refs.table2.setRowData(Datas2);
    }
  },
  created() {
    this.gridOptionsFirst = {};
    // this.gridOptionsSecond = {};
    this.gridOptionsSecond = { alignedGrids: [this.gridOptionsFirst] };
  },
  mounted() {
    this.$refs.table1.changeColumns([
      {
        headerName: 'Athlete',
        field: 'athlete',
        cellClass: 'aaaaa',
        cellStyle() {
          return { color: 'blue' };
        }
      },
      {
        headerName: 'Age',
        field: 'age',
        headerClass: 'abc',
        resizable: false,
        width: 120,
        suppressMovable: true,
        dataMap: [
          {
            key: 0,
            value: '天'
          },
          {
            key: 1,
            value: '地'
          },
          {
            key: 2,
            value: '人'
          }
        ],
        editable: true
      },
      {
        headerName: 'Country',
        field: 'country',
        editable: false
      },
      {
        headerName: 'Year',
        field: 'year',
        editable: true
      },
      {
        headerName: 'Date',
        field: 'date'
      },
      {
        headerName: 'Sport',
        field: 'sport',
        valueFormatter(params) {
          if (params.value) {
            return '展示中';
          } else {
            return '未展示';
          }
        }
      },
      {
        headerName: 'Gold',
        field: 'gold',
        cellClass: 'bg-orange'
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
        field: 'total',
        cellRenderer(){
          return `<i>eee</i>`
        }
      }
    ]);
    this.getDatas();
  }
};
</script>

<style lang="scss">
body,
html {
  height: 100%;
  margin: 0;
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
.appdemo {
  .bg-orange {
    background-color: #fcf4e7;
  }
}
</style>
