/**
 * 事件处理
 */
import { valueAreEqual } from '../util/index';
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
  'onCellEditingStopped',
  'onRowSelected'
];
export default {
  methods: {
    gridReady(e) {
      // 设置自适应列宽
      const TIMEID = setTimeout(() => {
        this.gridApi.sizeColumnsToFit();
        clearTimeout(TIMEID);
      }, 150);
      this.$emit('onGridReady', e);
    },
    cellEditingStarted(e) {
      this.addEditedDatas(e.data);
      this.$emit('onCellEditingStarted', e);
    },
    cellValueChanged(e) {
      if (!valueAreEqual(e.newValue, e.oldValue)) {
        this.addUpdatedData(e.data);
      }
      this.$emit('onCellValueChanged', e);
    },
    firstDataRendered(e) {
      this.gridApi.sizeColumnsToFit();
      this.$emit('onFirstDataRendered', e);
    }
  },
  beforeMount() {
    EventNames.forEach(name => {
      this.gridOptions[name] = e => {
        this.$emit(name, e);
      };
    });
    this.gridOptions.onGridReady = this.gridReady;
    this.gridOptions.onCellEditingStarted = this.cellEditingStarted;
    this.gridOptions.onCellValueChanged = this.cellValueChanged;
    this.gridOptions.onFirstDataRendered = this.firstDataRendered;
  }
};
