/**
 * 列处理
 */
export default {
  methods: {
    changeColumns(columns) {
      columns.forEach(column => {
        let cellClass = column.cellClass || '';

        // 选择编辑组件
        if (column.dataMap && column.dataMap.length > 0) {
          column.cellRendererFramework = 'GridColumnSelect';
          column.cellRendererParams = {
            addUpdatedData: this.addUpdatedData
          };
          cellClass += ' grid-select-cell';
          column.singleClickEdit = true;
          column.suppressClickEdit = true;
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

        // 自动调整列宽时不包含设置宽度的列
        column.suppressSizeToFit = !!column.width;
      });

      // 选择列
      // const vm = this;
      if (this.selection && !columns.find(item => item.checkboxSelection)) {
        columns.unshift({
          checkboxSelection: true,
          headerCheckboxSelection: true,
          width: 40,
          pinned: 'left',
          editable: false,
          headerClass: 'grid-header-selection',
          resizable: false,
          suppressSizeToFit: true
          // headerComponentFramework: 'GridColumnHeaderChecked',
          // headerComponentParams: {
          //   selectedRows: 111
          // }
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
