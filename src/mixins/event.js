/**
 * 事件处理
 */
const EventNames = [
  'onCellClicked',
  'onCellDoubleClicked',
  'onCellFocused',
  'onCellMouseOver',
  'onCellMouseOut',
  'onCellMouseDown',
  'onRowClicked',
  'onRowDoubleClicked',
  'onRowSelected',
  'onSelectionChanged',
  'onCellContextMenu',
  'onCellValueChanged',
  'onCellEditingStarted'
];
export default {
  beforeMount() {
    EventNames.forEach(name => {
      this.gridOptions[name] = e => {
        this.$emit(name, e);
      };
    });
    this.gridOptions.onCellEditingStopped = e => {
      const updatedDatas = this.updatedDatas;
      if (
        !updatedDatas.find(
          item => JSON.stringify(item) === JSON.stringify(e.data)
        )
      ) {
        this.updatedDatas.push(e.data);
      }
      // console.dir(e);
      // e.api.sizeColumnsToFit();
      // console.log(e.column.getColId());
      // console.log(e.rowIndex);
      // console.log(e.columnApi.getColumnState());
      // const colDef = e.colDef;
      // colDef.cellStyle = params => {
      //   // console.log(params);
      //   if (JSON.stringify(e.data) === JSON.stringify(params.data)) {
      //     return {
      //       backgroundColor: '#ccc'
      //     };
      //   }
      //   return null;
      // };
      // this.setColumnDefs(this.columns);
      this.$emit('onCellEditingStopped', e);
    };
  }
};
