import Vue from 'vue';
import { Select, Input, Option } from 'element-ui';
Vue.component('el-input', Input);
Vue.component('el-select', Select);
Vue.component('el-option', Option);
Vue.component('GridColumnSelect', {
  render(h) {
    const vm = this;
    const { editable, dataMap = [] } = vm.params.colDef;
    if (editable) {
      return h(
        'el-select',
        {
          attrs: {
            value: vm.params.value,
            'popper-class': 'grid-select-popper'
          },
          on: {
            input(v) {
              vm.params.setValue(v);
            }
          },
          class: 'grid-select'
        },
        [
          dataMap.map(item => {
            return h('el-option', {
              props: {
                label: item.value,
                value: item.key
              }
            });
          })
        ]
      );
    }
    return h('span', vm.params.value);
  }
});

Vue.component('GridColumnHeader', {
  render(h) {
    const vm = this;
    console.log(vm.params);
    // const { column, columnApi } = vm.params;
    // sizeColumnsToFit
    // columnApi.autoSizeColumn(column.colId);
    const { colDef } = vm.params.column;
    return h('span', colDef.headerName);
  }
});
