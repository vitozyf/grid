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
      this.$emit('onCellEditingStopped', e);
    };
  }
};
