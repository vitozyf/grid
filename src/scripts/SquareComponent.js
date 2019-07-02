/**
 * 注册组件-cellRendererFramework
 */
import Vue from 'vue';
import Select from 'element-ui/lib/select';
import Option from 'element-ui/lib/option';
import Checkbox from 'element-ui/lib/checkbox';
import Pagination from 'element-ui/lib/pagination';

Vue.component('el-select', Select);
Vue.component('el-option', Option);
Vue.component('el-checkbox', Checkbox);
Vue.component('el-pagination', Pagination);

/**
 * 下拉选择编辑器
 */
Vue.component('GridColumnSelect', {
  render(h) {
    const vm = this;
    const { editable, dataMap = [] } = vm.params.colDef;
    if (editable) {
      const value = dataMap.find(item => item.key === vm.params.value)
        ? vm.params.value
        : '';
      return h(
        'el-select',
        {
          props: {
            value,
            'popper-class': 'grid-select-popper'
          },

          on: {
            input(v) {
              vm.params.colDef.cellRendererParams.addUpdatedData(
                vm.params.data
              );

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
    const { colDef } = vm.params.column;
    return h('span', colDef.headerName);
  }
});
