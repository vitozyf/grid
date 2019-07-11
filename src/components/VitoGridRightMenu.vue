<template>
  <transition
    name="vito-grid-fade"
    v-if="enableContextmenu"
  >
    <div
      class="vito-grid-right-menu"
      v-show="RightMenuConfig.visible"
      :style="menuStyle"
      tabindex="-1"
      @blur="RightMenuConfig.visible = false"
      @click="rightMenuEventHandler"
    >
      <ul>
        <li
          class="vito-grid-right-menu_row"
          v-for="(item, index) in RightMenuConfig.menus"
          :key="index"
          :data-menutext="item.text"
        >
          {{item.text}}
        </li>

      </ul>
    </div>
  </transition>
</template>
<script>
import { getData } from '../util/dom';
export default {
  name: 'VitoGridRightMenu',
  props: {
    RightMenuConfig: Object,
    contextMenuParams: Object,
    enableContextmenu: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    menuStyle() {
      const style = {};
      style.left = this.RightMenuConfig.pageX + 'px';
      style.top = this.RightMenuConfig.pageY + 'px';
      return style;
    },
    visible() {
      return this.RightMenuConfig.visible;
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          if (this.$el && this.$el.focus) {
            this.$el.focus();
          }
        });
      }
    }
  },
  methods: {
    rightMenuEventHandler(e) {
      const TargetMenu = this.RightMenuConfig.menus.find(
        item => item.text === getData(e.target, 'menutext')
      );
      if (TargetMenu) {
        TargetMenu.click(this.contextMenuParams);
        this.RightMenuConfig.visible = false;
      }
    }
  },
  mounted() {
    document.body.appendChild(this.$el);
  },
  beforeDestroy() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>

