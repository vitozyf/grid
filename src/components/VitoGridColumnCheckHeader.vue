<template>
  <div class="vito-grid-check-header">
    <i
      :class="[showPopper ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
      @click="showPopper=!showPopper"
    ></i>
    <VitoGridPopper
      popper-class="vito-grid-headerchech-popper"
      :style="popperStyle"
      :visible.sync="showPopper"
    >
      <ul @click="checkedSelectType">
        <li
          data-selectType="CurrentPage"
          :class="{active: params.selectConfig.type === 'CurrentPage' || !params.selectConfig.type}"
        >
          <i
            v-if="params.selectConfig.type === 'CurrentPage' || !params.selectConfig.type"
            class="el-icon-check"
          ></i>
          选择本页
        </li>
        <li
          data-selectType="AllPages"
          :class="{active: params.selectConfig.type === 'AllPages'}"
        >
          <i
            v-if="params.selectConfig.type === 'AllPages'"
            class="el-icon-check"
          ></i>
          选择全部
        </li>
      </ul>
    </VitoGridPopper>
  </div>
</template>
<script>
import VitoGridPopper from './VitoGridPopper';
import { getData } from '../util/dom';
export default {
  name: 'VitoGridColumnCheckHeader',

  data() {
    return {
      clientRect: null,
      showPopper: false
    };
  },

  computed: {
    popperStyle() {
      const style = {};
      if (this.clientRect) {
        style.left = this.clientRect.left + 'px';
        style.top = this.clientRect.top + this.clientRect.height + 'px';
      }
      return style;
    }
  },

  components: {
    VitoGridPopper
  },

  methods: {
    checkedSelectType(e) {
      this.params.api.selectAll();
      this.params.selectConfig.type = getData(e.target, 'selectType');
      this.showPopper = false;
    },
    init() {
      const TYPE = this.params.selectConfig.type;
      this.params.selectConfig.type = TYPE ? TYPE : 'CurrentPage';
    }
  },

  mounted() {
    this.init();
    this.$nextTick(() => {
      if (this.$el.getBoundingClientRect) {
        this.clientRect = this.$el.getBoundingClientRect();
      }
    });
  }
};
</script>
