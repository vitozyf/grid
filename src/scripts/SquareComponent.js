/**
 * 注册组件-cellRendererFramework
 */
import Vue from 'vue';
import Select from 'element-ui/lib/select';
import Option from 'element-ui/lib/option';
// import Checkbox from 'element-ui/lib/checkbox';
import Pagination from 'element-ui/lib/pagination';

Vue.component('el-select', Select);
Vue.component('el-option', Option);
// Vue.component('el-checkbox', Checkbox);
Vue.component('el-pagination', Pagination);

/**
 * 下拉选择编辑器
 */
Vue.component('VitoGridColumnSelect', {
  render(h) {
    const vm = this;
    const { dataMap = [] } = vm.params.colDef;
    const value = dataMap.find(item => item.key === vm.params.value)
      ? vm.params.value
      : '';
    return h(
      'el-select',
      {
        ref: 'select',

        props: {
          value,
          'popper-class': 'vito-grid-select-popper'
        },

        on: {
          input(v) {
            vm.value = v;
            vm.params.stopEditing();
          }
        },
        class: 'vito-grid-select'
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
  },
  created() {
    this.value = this.params.value;
  },
  data() {
    return {
      value: ''
    };
  },
  methods: {
    getValue() {
      return this.value;
    },
    isPopup() {
      return false;
    }
  },
  mounted() {
    // this.params.eGridCell.setAttribute('clasa', 'aaa');
    this.$refs.select.toggleMenu();
  }
});

/**
 * 文本编辑器
 */
Vue.component('VitoGridColumnInput', {
  render(h) {
    const vm = this;
    const value = vm.params.value;
    return h('input', {
      ref: 'input',

      attrs: {
        value
      },

      on: {
        input(event) {
          vm.value = event.target.value;
        },
        blur() {
          vm.params.stopEditing();
        }
      },
      class: 'vito-grid-input'
    });
  },
  created() {
    this.value = this.params.value;
  },
  data() {
    return {
      value: ''
    };
  },
  methods: {
    getValue() {
      return this.value;
    },
    isPopup() {
      return false;
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.input.focus();
    }, 100);
  }
});
