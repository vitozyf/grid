<template>
  <div
    id="app"
    class="appdemo"
  >
    <div class="header">
      <button @click="addNew">新增一行</button>
      <button @click="getSelectedRows">已选数据</button>
      <button @click="getModel">获取行模型</button>
      <button @click="paginationGetPageSize">每页行数</button>
      <button @click="setDataSource">设置数据</button>
      <button @click="getUpdatedDatas">获取修改数据</button>
      <button @click="updateColumn">更新列状态</button>
      <button @click="forEachNode">选择部分数据</button>
      <button @click="selectAllType">全选项</button>
      <button @click="updateRowData">更新行数据</button>
      <button @click="startEditingCell">编辑API</button>
    </div>
    <div class="header">
      <button @click="moveColumn">移动列</button>
    </div>
    <div :style="{height: '800px', padding: '0 10px'}">

      <grid
        :columns="columns"
        :datas="datas"
        :headerHeight="28"
        :selection="true"
        ref="table"
        type="edit"
        :getRowClass="getRowClass"
        :total-count="10000"
        :page-size="20"
        :page-index="1"
        :onPageChanged="onPageChanged"
        :selectConfig="selectConfig"
        :gridOptions="gridOptions"
        :contextmenu="contextmenu"
        @onCellClicked="onCellClicked"
        @onColumnMoved="onColumnMoved"
      ></grid>

      <!-- domLayout='autoHeight' -->
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
      gridOptions: null,
      columns: [
        {
          headerName: 'Athlete',
          field: 'athlete',
          cellClass: 'aaaaa',
          rowDrag: true,
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
          valueFormatter(params) {
            if (params.value > 201910) {
              return '展示中1';
            }
            return '未展示2';
          }
          // cellRenderer(params) {
          //   if (params.value > 201910) {
          //     return '展示中';
          //   }
          //   return '未展示';
          // }
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
          field: 'total'
        }
      ],
      datas: [],
      selectConfig: {},
      contextmenu: []
    };
  },
  methods: {
    moveColumn() {
      this.$refs.table.moveColumns(['age', 'year'], 8);
    },
    onColumnMoved(a, b, c) {
      console.log(a, b, c);
    },
    startEditingCell() {
      this.$refs.table.setFocusedCell(0, 'sport');
      this.$refs.table.startEditingCell(0, 'sport');
    },
    updateRowData() {
      this.datas[0].athlete = 999;
      this.datas[1].athlete = 888;
      // console.log(this.$refs.table.updateRowData);
      this.$refs.table.updateRowData([this.datas[0], this.datas[1]]);
    },
    selectAllType() {
      console.log(this.selectConfig);
    },
    forEachNode() {
      this.$refs.table.forEachNode(node => {
        if (node.data.year < 201910) {
          node.setSelected(true);
        }
      });
    },
    onCellClicked() {
      // console.log(111);
    },
    updateColumn() {
      const YearColumn = this.columns.find(item => item.field === 'year');
      YearColumn.editable = !YearColumn.editable;
      // this.$set(YearColumn, 'editable', false);
      // this.$refs.table.changeColumns(this.columns);
    },
    getUpdatedDatas() {
      console.log(this.$refs.table.getUpdatedDatas());
      console.log(this.$refs.table.cacheData);
    },
    setDataSource() {
      const Datas = [];
      for (let index = 0; index < 100; index++) {
        Datas.push({
          athlete: `zhang${index}`,
          age: index,
          country: 'USA',
          year: `2019${index}`,
          date: '2019-06-30',
          sport: 'sport',
          gold: 'gold',
          silver: 'silver',
          bronze: 'bronze',
          total: 'total'
        });
      }
      this.$refs.table.setRowData(Datas);
    },
    addNew() {
      this.datas.unshift({});
    },
    paginationGetPageSize() {
      console.log(this.$refs.table.gridApi.paginationGetPageSize());
    },
    onPageChanged(index) {
      console.log(index);
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
      // const gridOptions = this.$refs.table.gridOptions;
      console.log(this.$refs.table.getSelectedRows());
      // this.$refs.table.gridApi.deselectAll();

      // this.$refs.table.gridColumnApi.autoSizeColumns();
      // this.$refs.table.gridApi.updateRowData([{ age: 0 }]);
    },
    getModel() {
      console.log(this.$refs.table.gridApi.getModel());
    },
    getDatas() {
      // const vm = this;
      // const httpRequest = new XMLHttpRequest();
      // httpRequest.open(
      //   'GET',
      //   'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json'
      // );
      // httpRequest.send();
      // httpRequest.onreadystatechange = () => {
      //   if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      //     vm.datas = JSON.parse(httpRequest.responseText);
      //   }
      // };
      const Datas = [];
      for (let index = 0; index < 100; index++) {
        Datas.push({
          athlete: `vito${index}`,
          age: index,
          country: '中国',
          year: `2019${index}`,
          date: '2019-06-30',

          gold: '',
          silver: 0,
          bronze: '0',
          total: 'total'
        });
      }
      this.datas = Datas;
      // this.$refs.table.setRowData(Datas);
    }
  },
  created() {
    this.getDatas();
    this.gridOptions = {};
    // this.contextmenu = [
    //   {
    //     text: '测试',
    //     click(e) {
    //       console.log(333, e);
    //     }
    //   }
    // ];
    // setTimeout(() => {
    //   this.contextmenu = [
    //     {
    //       text: '测试1',
    //       click(e) {
    //         console.log(444, e);
    //       }
    //     }
    //   ];
    // }, 2000);
  }
  // mounted() {
  //   document.oncontextmenu = function(e) {
  //     console.log(123);
  //     var e = e || window.event;
  //     //阻止冒泡
  //     e.cancelBubble = true;
  //     //阻止触发默认事件
  //     e.returnValue = false;
  //     return false;
  //   };
  // }
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
