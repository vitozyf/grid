<template>
  <div class="grid-container">
    <ag-grid-vue
      class="ag-theme-balham"
      v-bind="$attrs"
      v-on="$listeners"
      :columnDefs="columns"
      :rowData="datas"
      ref="table"
      :gridOptions="options"
      :defaultColDef="defaultColDef"
      :enterMovesDown="true"
      :enterMovesDownAfterEdit="true"
      :stopEditingWhenGridLosesFocus="true"
      :rowMultiSelectWithClick="false"
      :suppressRowClickSelection="true"
      :singleClickEdit="true"
      :paginationPageSize="200"
      rowSelection="multiple"
    ></ag-grid-vue>
    <el-pagination
      v-if="!!onPageChanged"
      small
      layout="prev, pager, next, total"
      :page-size="pageSize"
      :total="totalCount"
      :current-page="pageIndex"
      @current-change="onPageChanged"
    >
    </el-pagination>
  </div>
</template>
<script>
import { AgGridVue } from 'ag-grid-vue';
import './components/SquareComponent';
import Event from './components/event';
export default {
  name: 'Grid',

  components: {
    AgGridVue
  },

  mixins: [Event],

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
    },
    gridOptions: {
      type: Object,
      default() {
        return {};
      }
    },
    // 表格类型
    type: {
      type: String,
      validator(value) {
        return ['base', 'edit'].indexOf(value) !== -1;
      }
    },
    // 开启选择
    selection: Boolean,
    pageSize: {
      type: Number,
      default: 20
    },
    totalCount: {
      type: Number,
      default: 1
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    onPageChanged: Function
  },

  computed: {
    options: {
      get() {
        return Object.assign(this.gridOptions, this.insideOptions);
      },
      set(o) {
        this.insideOptions = o;
      }
    }
  },

  data() {
    return {
      insideOptions: null,
      gridApi: null,
      columnApi: null,
      defaultColDef: {},
      updatedDatas: []
    };
  },

  methods: {
    /**
     * 初始化表格
     */
    init() {
      this.defaultColDef.editable = this.type === 'edit';
      this.defaultColDef.resizable = true;
      this.defaultColDef.minWidth = 50;
      this.changeColumns(this.columns);
    },
    changeColumns(columns) {
      // const columns = this.columns;
      columns.forEach(column => {
        let cellClass = column.cellClass || '';
        // 选择编辑组件
        if (column.dataMap && column.dataMap.length > 0) {
          column.cellRendererFramework = 'GridColumnSelect';
          column.cellRendererParams = this.updatedDatas;
          cellClass += ' grid-select-cell';
          column.singleClickEdit = true;
        }
        // 只读类
        if (column.editable === false && this.type === 'edit') {
          cellClass += ' grid-column-readonly';
        }
        column.cellClass = cellClass;
        // 通用表头
        if (!column.headerComponentFramework) {
          column.headerComponentFramework = 'GridColumnHeader';
        }
        // 不可编辑列
        column.editable =
          column.editable === false ? false : this.type === 'edit';
      });

      // return columns;
      if (this.selection && !columns.find(item => item.checkboxSelection)) {
        columns.unshift({
          checkboxSelection: true,
          headerCheckboxSelection: true,
          width: 40,
          pinned: 'left',
          editable: false,
          headerClass: 'grid-header-selection',
          resizable: false
        });
      }

      // autoSizeColumns
      // console.log(this.gridOptions);
      // console.log(this.gridOptions.columnDefs.filter(item => !item.width));
      // this.gridOptions.columnApi.autoSizeColumns(
      //   this.gridOptions.columnDefs.filter(item => !item.width)
      // );
      this.setColumnDefs(columns);
    },
    /**
     * 设置表格数据
     */
    setRowData(datas) {
      this.updatedDatas = [];
      this.gridApi.setRowData(datas);
    },
    /**
     * 设置表格列
     */
    setColumnDefs(columns) {
      if (this.gridApi) {
        this.gridApi.setColumnDefs(columns);
      }
    },
    /**
     * 获取已修改的数据
     */
    getUpdatedDatas() {
      return this.updatedDatas;
    }
  },
  beforeMount() {
    this.insideOptions = {};
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
    this.init();
  }
};
</script>

<style lang="scss">
@import './assets/style/index.scss';
</style>