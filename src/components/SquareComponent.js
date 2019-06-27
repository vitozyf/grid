import Vue from 'vue';
import Select from 'element-ui/lib/select';
import Option from 'element-ui/lib/option';
import Pagination from 'element-ui/lib/pagination';

Vue.component('el-select', Select);
Vue.component('el-option', Option);
Vue.component('el-pagination', Pagination);

/**
 * 下拉选择编辑器
 */
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

/**
 * 默认自定义表头
 */
Vue.component('GridColumnHeader', {
  render(h) {
    const vm = this;
    // const { column, columnApi } = vm.params;
    // console.log(vm.params, column, columnApi);
    // sizeColumnsToFit
    // columnApi.autoSizeColumn(column.colId);
    const { colDef } = vm.params.column;
    return h('span', colDef.headerName);
  }
});
