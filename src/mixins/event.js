/**
 * 事件处理
 */
import { valueIsEqual } from '../util/index';
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
  'onRowSelected',
  'onColumnMoved'
];
export default {
  data() {
    return {
      SizeColumnsToFitTimeID: null,
      contextMenuParams: null
    };
  },
  methods: {
    sizeColumnsToFit() {
      // 设置自适应列宽
      clearTimeout(this.SizeColumnsToFitTimeID);
      this.SizeColumnsToFitTimeID = setTimeout(() => {
        this.gridApi.sizeColumnsToFit();
        clearTimeout(this.SizeColumnsToFitTimeID);
      }, 150);
    },
    gridReady(e) {
      this.sizeColumnsToFit();
      this.$emit('onGridReady', e);
    },
    cellEditingStarted(e) {
      this.$emit('onCellEditingStarted', e);
    },
    cellValueChanged(e) {
      if (!valueIsEqual(e.newValue, e.oldValue)) {
        this.addUpdatedData(e.data);
      }
      this.$emit('onCellValueChanged', e);
    },
    firstDataRendered(e) {
      this.gridApi.sizeColumnsToFit();
      this.$emit('onFirstDataRendered', e);
    },
    gridSizeChanged(e) {
      this.sizeColumnsToFit();
      this.$emit('onGridSizeChanged', e);
    },
    cellContextMenu(e) {
      const event = e.event;
      Object.assign(this.RightMenuConfig, {
        visible: true,
        pageX: event.pageX,
        pageY: event.pageY
      });
      this.contextMenuParams = e;
      this.$emit('onCellContextMenu', e);
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
    this.gridOptions.onGridSizeChanged = this.gridSizeChanged;
    this.gridOptions.onCellContextMenu = this.cellContextMenu;
  }
};
