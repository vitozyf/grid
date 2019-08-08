/**
 * 列处理
 */
import VitoGridColumnSelect from '../components/VitoGridColumnSelect.vue';
import VitoGridColumnCheckHeader from '../components/VitoGridColumnCheckHeader.vue';
import { valueIsEqual } from '../util/index';
export default {
  components: {
    VitoGridColumnSelect,
    VitoGridColumnCheckHeader
  },
  methods: {
    changeColumns(columns) {
      const VM = this;
      columns.forEach(column => {
        let cellClass = column.cellClass || '';
        // 选择编辑组件
        if (column.dataMap && column.dataMap.length > 0) {
          column.cellEditorFramework = 'VitoGridColumnSelect';
          column.cellRenderer = params => {
            const CellMapItem = column.dataMap.find(
              item => item.key === params.value
            );
            return `<span>${
              CellMapItem ? CellMapItem.value : ''
            }</span><i class="el-icon-arrow-down"></i>`;
          };
        }

        // 只读类
        if (VM.type === 'edit') {
          if (column.editable === false) {
            if (typeof cellClass === 'function') {
              column.cellClass = params => {
                return cellClass(params) + ' vito-grid-column-readonly';
              };
            } else {
              cellClass += ' vito-grid-column-readonly';
              column.cellClass = cellClass;
            }
          } else {
            if (typeof cellClass === 'function') {
              column.cellClass = params => {
                return cellClass(params).replace(
                  /vito-grid-column-readonly/g,
                  ''
                );
              };
            } else {
              cellClass = cellClass.replace(/vito-grid-column-readonly/g, '');
              column.cellClass = cellClass;
            }
          }
        }

        // 不可编辑列
        column.editable =
          column.editable === false ? false : VM.type === 'edit';

        // 自动调整列宽时不包含设置宽度的列
        column.suppressSizeToFit = !!column.width;

        // 单元格样式
        const UserCellStyle = column.cellStyle;
        const SystemCellStyle = params => {
          let style = {};
          const CacheData = params.context.getCacheData();
          if (CacheData[params.node.rowIndex]) {
            if (
              !valueIsEqual(
                params.value,
                CacheData[params.node.rowIndex][params.colDef.field]
              )
            ) {
              style.backgroundColor = '#ffe174';
            }
          }
          if (UserCellStyle) {
            style = Object.assign({}, UserCellStyle(params), style);
          }
          return style;
        };

        column.cellStyle = VM.type === 'edit' ? SystemCellStyle : UserCellStyle;
      });

      // 选择列
      const checkboxSelectionColumn = columns.find(
        item => item.checkboxSelection
      );
      if (this.selection && !checkboxSelectionColumn && columns.length > 0) {
        const CheckedColumn = {
          checkboxSelection: true,
          headerCheckboxSelection: true,
          width: !this.selectConfig ? 40 : 46,
          pinned: 'left',
          editable: false,
          headerClass: 'vito-grid-header-selection',
          cellClass: 'vito-grid-cell-selection',
          resizable: false,
          suppressSizeToFit: true,
          lockPosition: true,
          suppressMovable: true
        };
        if (this.selectConfig) {
          // 本页、全部
          CheckedColumn.headerComponentFramework = 'VitoGridColumnCheckHeader';
          CheckedColumn.headerComponentParams = {
            selectConfig: this.selectConfig
          };
        }
        columns.unshift(CheckedColumn);
      }

      // 调用api设置列
      this.setColumnDefs(columns);
    },

    /**
     * 调用api设置表格列
     */
    setColumnDefs(columns) {
      if (this.gridApi) {
        this.gridApi.setColumnDefs(columns);
      }
    }
  }
};
