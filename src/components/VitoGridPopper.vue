<template>
  <div
    class="vito-grid-popper"
    :class="[popperClass]"
    tabindex="-1"
    v-if="visible"
    @blur="$emit('update:visible', false)"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'VitoGridPopper',

  props: {
    popperClass: String,
    visible: Boolean
  },

  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$el.focus();
        });
      }
    }
  },

  mounted() {
    document.body.appendChild(this.$el);
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>

