/**
 * 对外暴露的API
 */

export default {
  methods: {
    forEachNode(method) {
      return this.gridApi.forEachNode(method);
    },
    /**
     * 设置表格数据
     */
    setRowData(datas) {
      this.setCacheData(datas);
      this.updatedDatas = [];
      this.editedDatas = [];
      this.gridApi.setRowData(datas);
    },
    /**
     * 获取已修改的数据
     */
    getUpdatedDatas() {
      return this.updatedDatas;
    },
    /**
     * 获取已选择的数据
     */
    getSelectedRows() {
      return this.gridApi.getSelectedRows();
    },
    /**
     * 全选数据
     */
    selectAll() {
      return this.gridApi.selectAll();
    },
    /**
     * 清除所有选择
     */
    deselectAll() {
      return this.gridApi.deselectAll();
    },
    /**
     * 更新行数据
     */
    updateRowData(rows) {
      if (rows instanceof Array) {
        rows.forEach(item => {
          this.addUpdatedData(item);
        });
      } else if (rows instanceof Object) {
        this.addUpdatedData(rows);
      }
      return this.gridApi.updateRowData(rows);
    },
    /**
     * 设置单元格焦点
     */
    setFocusedCell(rowIndex, colKey) {
      return this.gridApi.setFocusedCell(rowIndex, colKey);
    },
    /**
     * 开始编辑单元格
     */
    startEditingCell(rowIndex, colKey) {
      return this.gridApi.startEditingCell({ rowIndex, colKey });
    }
    /**
     * 修改列配置
     * changeColumns(columns)
     */
  }
};
