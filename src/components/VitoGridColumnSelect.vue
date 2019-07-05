<template>
  <div
    class="vito-grid-select"
    :style="gridCellSelectStyle"
  >
    <ul>
      <li
        v-for="(item, index) in params.colDef.dataMap"
        :key="index"
        class="vito-grid-select-row"
        :class="{active: params.value === item.key}"
        @click="() => {selectHandler(item)}"
      >
        {{item.value}}
      </li>
    </ul>
  </div>
</template>
<script>
/**
 * 下拉选择编辑器
 */
export default {
  name: 'VitoGridColumnSelect',
  created() {
    this.value = this.params.value;
  },
  computed: {
    gridCellSelectStyle() {
      const style = {};
      style.width = this.cellWidth + 'px';
      return style;
    }
  },
  data() {
    return {
      value: '',
      cellWidth: 100
    };
  },
  methods: {
    selectHandler(item) {
      this.value = item.key;
      this.params.stopEditing();
    },
    getValue() {
      return this.value;
    },
    isPopup() {
      return true;
    }
  },
  mounted() {
    this.cellWidth = this.params.eGridCell.offsetWidth;
  }
};
</script>

