<template>
  <ag-grid-vue
    class="ag-theme-balham"
    :columnDefs="columnDefs"
    :rowData="datas"
    ref="table"
    v-bind="$attrs"
    v-on="$listeners"
    :gridOptions="options"
    :defaultColDef="defaultColDef"
    :enterMovesDown="true"
    :enterMovesDownAfterEdit="true"
    :stopEditingWhenGridLosesFocus="true"
    :rowMultiSelectWithClick="false"
    :suppressRowClickSelection="true"
    :singleClickEdit="true"
    rowSelection="multiple"
  ></ag-grid-vue>
</template>
<script>
import { AgGridVue } from 'ag-grid-vue';
import './components/SquareComponent';

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
    selection: Boolean
  },

  computed: {
    options: {
      get() {
        return Object.assign(this.gridOptions, this.insideOptions);
      },
      set(o) {
        this.insideOptions = o;
      }
    },
    columnDefs() {
      const columns = this.columns;
      for (const column of columns) {
        let cellClass = column.cellClass;
        // 选择编辑组件
        if (column.dataMap && column.dataMap.length > 0) {
          column.cellRendererFramework = 'GridColumnSelect';
          cellClass += ' grid-select-cell';
          column.singleClickEdit = true;
        }
        // 只读类
        if (column.editable === false && this.type === 'edit') {
          cellClass += ' grid-column-readonly';
        }
        // 最大宽度
        // if (column.maxWidth && !isNaN(column.maxWidth)) {
        //   column.cellStyle = column.cellStyle ? column.cellStyle : {};
        //   column.cellStyle.maxWidth = `${column.maxWidth}px`;
        // }
        column.cellClass = cellClass;
        // 通用表头
        if (!column.headerComponentFramework) {
          column.headerComponentFramework = 'GridColumnHeader';
        }
        // 不可编辑列
        column.editable =
          column.editable === false ? false : this.type === 'edit';
      }
      if (this.selection) {
        columns.unshift({
          checkboxSelection: true,
          headerCheckboxSelection: true,
          width: 40,
          pinned: 'left',
          editable: false
        });
      }
      return columns;
    }
  },

  data() {
    return {
      insideOptions: null,
      gridApi: null,
      columnApi: null,
      defaultColDef: {}
    };
  },

  methods: {
    init() {
      this.defaultColDef.editable = this.type === 'edit';
    }
  },
  beforeMount() {
    this.insideOptions = {};
    this.init();
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