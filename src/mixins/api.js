/**
 * 对外暴露的API
 */

export default {
  methods: {
    /**
     * 设置表格数据
     */
    setRowData(datas) {
      this.updatedDatas = [];
      this.gridApi.setRowData(datas);
    },
    /**
     * 获取已修改的数据
     */
    getUpdatedDatas() {
      return this.updatedDatas;
    }
    /**
     * 修改列配置
     * changeColumns(columns)
     */
  }
};
