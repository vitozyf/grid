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