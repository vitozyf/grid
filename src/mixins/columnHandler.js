/**
 * 列处理
 */
import VitoGridColumnSelect from '../components/VitoGridColumnSelect.vue';
export default {
  components: {
    VitoGridColumnSelect
  },
  methods: {
    changeColumns(columns) {
      columns.forEach(column => {
        let cellClass = column.cellClass || '';

        // 选择编辑组件
        if (column.dataMap && column.dataMap.length > 0) {
          column.cellEditorFramework = 'VitoGridColumnSelect';
          column.valueFormatter = params => {
            const CellMapItem = column.dataMap.find(
              item => item.key === params.value
            );
            return CellMapItem ? CellMapItem.value : '';
          };
          cellClass += ' vito-grid-select-cell';
        }
        // else {
        //   column.cellEditorFramework = 'VitoGridColumnInput';
        // }

        // 只读类
        if (column.editable === false && this.type === 'edit') {
          cellClass += ' vito-grid-column-readonly';
        }
        column.cellClass = cellClass;

        // 不可编辑列
        column.editable =
          column.editable === false ? false : this.type === 'edit';

        // 自动调整列宽时不包含设置宽度的列
        column.suppressSizeToFit = !!column.width;
      });

      // 选择列
      if (this.selection && !columns.find(item => item.checkboxSelection)) {
        columns.unshift({
          checkboxSelection: true,
          headerCheckboxSelection: true,
          width: 40,
          pinned: 'left',
          editable: false,
          headerClass: 'vito-grid-header-selection',
          resizable: false,
          suppressSizeToFit: true
        });
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
