<template>
  <div
    class="grid-container"
    @click.stop="gridContainerClickHandler"
    @contextmenu="oncontextmenu"
  >
    <ag-grid-vue
      class="ag-theme-balham"
      v-bind="$attrs"
      v-on="$listeners"
      :columnDefs="columns"
      :rowData="datas"
      ref="table"
      :gridOptions="gridOptions"
      :defaultColDef="defaultColDefComputed"
      :enterMovesDown="true"
      :enterMovesDownAfterEdit="true"
      :rowMultiSelectWithClick="false"
      :suppressRowClickSelection="true"
      rowSelection="multiple"
      :singleClickEdit="true"
      :overlayNoRowsTemplate="overlayNoRowsTemplate"
      :stopEditingWhenGridLosesFocus="true"
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
    <VitoGridRightMenu
      :RightMenuConfig="RightMenuConfig"
      :contextMenuParams="contextMenuParams"
      :enableContextmenu="enableContextmenu"
    ></VitoGridRightMenu>
  </div>
</template>
<script>
import { AgGridVue } from 'ag-grid-vue';
import ElPagination from 'element-ui/lib/pagination';
import Event from './mixins/event';
import columnHandler from './mixins/columnHandler';
import api from './mixins/api';
import VitoGridRightMenu from './components/VitoGridRightMenu';
import copy from './util/clipboard';
export default {
  name: 'Grid',

  components: {
    AgGridVue,
    ElPagination,
    VitoGridRightMenu
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
    // 空数据模版
    overlayNoRowsTemplate: {
      type: String,
      default: '<span>暂无数据</span>'
    },
    selectConfig: {
      type: Object
    },
    enableContextmenu: {
      type: Boolean,
      default: true
    },
    contextmenu: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  computed: {
    defaultColDefComputed: {
      get() {
        return Object.assign({}, this.defaultColDef, this.defaultColPro);
      },
      set(col) {
        this.defaultColDef = col;
      }
    }
  },

  watch: {
    contextmenu() {
      this.dealContextmenus();
    }
  },

  data() {
    return {
      gridApi: null,
      columnApi: null,
      defaultColDef: {},
      updatedDatas: [],
      cacheData: [],
      RightMenuConfig: {
        visible: false,
        pageX: 0,
        pageY: 0,
        menus: [
          {
            text: '复制单元格',
            click(params) {
              copy(params.value, {
                debug: process.env.NODE_ENV === 'development'
              });
            }
          },
          {
            text: '复制当前行',
            click(params) {
              let Text = '';
              for (const key in params.data) {
                if (params.data.hasOwnProperty(key)) {
                  Text += params.data[key] + '\t';
                }
              }
              copy(Text, {
                debug: process.env.NODE_ENV === 'development'
              });
            }
          },
          {
            text: '复制选中行',
            click(params) {
              const SelectRows = params.api.getSelectedRows();
              let Text = '';
              SelectRows.forEach(item => {
                for (const key in item) {
                  if (item.hasOwnProperty(key)) {
                    Text += item[key] + '\t';
                  }
                }
                Text += '\n';
              });
              copy(Text, {
                debug: process.env.NODE_ENV === 'development'
              });
            }
          }
        ]
      }
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
    },
    /**
     * 初始化表格(挂载后)
     */
    initMounted() {
      this.changeColumns(this.columns);
      this.setCacheData(this.datas);
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
    },
    /**
     * 设置数据缓存
     */
    setCacheData(datas) {
      this.cacheData = Object.freeze(
        datas.map(row => {
          return { ...row };
        })
      );
    },
    /**
     * 阻止浏览器默认右击事件
     */
    oncontextmenu(event) {
      const e = event || window.event;
      e.cancelBubble = true;
      e.returnValue = false;
      return false;
    },
    /**
     * 合并用户的右键菜单
     */
    dealContextmenus() {
      this.RightMenuConfig.menus = this.RightMenuConfig.menus.concat(
        this.contextmenu
      );
    },
    gridContainerClickHandler() {
      this.RightMenuConfig.visible = false;
    }
  },
  created() {
    this.initCreated();
    this.dealContextmenus();
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
    this.initMounted();
  }
};
</script>

<style lang="scss">
@import './assets/style/index.scss';
</style>