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
  'onCellEditingStarted',
  'onRowSelected'
];
export default {
  methods: {
    gridReady(e) {
      // 设置自适应列宽
      const TIMEID = setTimeout(() => {
        this.gridApi.sizeColumnsToFit();
        clearTimeout(TIMEID);
      }, 100);
      this.$emit('onGridReady', e);
    },
    cellEditingStopped(e) {
      const updatedDatas = this.updatedDatas;
      if (
        !updatedDatas.find(
          item => JSON.stringify(item) === JSON.stringify(e.data)
        )
      ) {
        this.updatedDatas.push(e.data);
      }
      this.$emit('onCellEditingStopped', e);
    }
  },
  beforeMount() {
    EventNames.forEach(name => {
      this.gridOptions[name] = e => {
        this.$emit(name, e);
      };
    });
    this.gridOptions.onGridReady = this.gridReady;
    this.gridOptions.onCellEditingStopped = this.cellEditingStopped;
  }
};
