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
      this.updatedDatas = [];
      this.editedDatas = [];
      this.gridApi.setRowData(datas);
      this.setCacheData();
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
      return this.gridAPi.selectAll();
    },
    /**
     * 清除所有选择
     */
    deselectAll() {
      return this.gridAPi.deselectAll();
    }
    /**
     * 修改列配置
     * changeColumns(columns)
     */
  }
};
