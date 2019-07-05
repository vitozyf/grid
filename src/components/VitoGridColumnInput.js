/**
 * 文本编辑器
 */
export default {
  name: 'VitoGridColumnInput',
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
        focus() {
          vm.$refs.input.select();
        }
        // blur() {
        //   setTimeout(() => {
        //     vm.params.stopEditing();
        //   }, 50);
        // }
      },
      class: 'vito-grid-input'
    });
  },
  created() {
    this.value = this.params.value;
  },
  data() {
    return {
      value: '',
      CancelAfterEnd: false
    };
  },
  methods: {
    getValue() {
      return this.value;
    },
    isPopup() {
      return false;
    },
    isCancelAfterEnd() {
      return this.CancelAfterEnd;
    }
    // isCancelBeforeStart() {
    //   return true;
    // }
  },
  mounted() {
    this.nextTick(() => {
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    });
  }
};
