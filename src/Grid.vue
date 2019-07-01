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
      :defaultColDef="defaultColDefComputed"
      :enterMovesDown="true"
      :enterMovesDownAfterEdit="true"
      :stopEditingWhenGridLosesFocus="true"
      :rowMultiSelectWithClick="false"
      :suppressRowClickSelection="true"
      :singleClickEdit="true"
      :paginationPageSize="200"
      rowSelection="multiple"
      :overlayNoRowsTemplate="overlayNoRowsTemplate"
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
import './scripts/SquareComponent';
import Event from './mixins/event';
import columnHandler from './mixins/columnHandler';
import api from './mixins/api';
export default {
  name: 'Grid',

  components: {
    AgGridVue
  },

  mixins: [Event, columnHandler, api],

  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    defaultColPro: {
      type: Object,
      default() {
        return {};
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
    onPageChanged: Function,
    overlayNoRowsTemplate: {
      type: String,
      default: '<span>暂无数据</span>'
    }
  },

  computed: {
    options: {
      get() {
        return Object.assign(this.insideOptions, this.gridOptions);
      },
      set(o) {
        this.insideOptions = o;
      }
    },
    defaultColDefComputed: {
      get() {
        return Object.assign({}, this.defaultColDef, this.defaultColPro);
      },
      set(col) {
        this.defaultColDef = col;
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
    initCreated() {
      this.defaultColDef.editable = this.type === 'edit';
      this.defaultColDef.resizable = true;
      this.defaultColDef.minWidth = 50;
      this.defaultColDef.suppressMovable = true;
    },
    /**
     * 初始化表格(挂载后)
     */
    initMounted() {
      this.changeColumns(this.columns);
    },

    /**
     * 增加已修改的数据集合
     */
    addUpdatedData(updatedData) {
      if (
        !this.updatedDatas.find(
          item => JSON.stringify(item) === JSON.stringify(updatedData)
        )
      ) {
        this.updatedDatas.push(updatedData);
      }
    }
  },
  created() {
    this.initCreated();
  },
  beforeMount() {
    this.insideOptions = {};
  },
  mounted() {
    this.gridApi = this.insideOptions.api;
    this.gridColumnApi = this.insideOptions.columnApi;
    this.initMounted();
    // console.log(this.$el.querySelector('.ag-overlay-no-rows-center'));
  }
};
</script>

<style lang="scss">
@import './assets/style/index.scss';
</style>