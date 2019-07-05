/**
 * 下拉选择编辑器
 */
import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';
export default {
  name: 'VitoGridColumnSelect',

  components: {
    ElSelect,
    ElOption
  },

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
    this.$refs.select.toggleMenu();
  }
};
