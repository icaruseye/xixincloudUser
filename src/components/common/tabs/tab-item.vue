<template>
  <div
    class="xixin-tab-item"
    :class="[currentSelected ? activeClass : '', {
      'xixin-tab-selected': currentSelected
    }]"
    :style="style"
    @click="onItemClick">
  <slot></slot>
  </div>
</template>

<script>
import { childMixin } from '../../mixins/multi-items'
export default {
  name: 'tab-item',
  mixins: [childMixin],
  props: {
    activeClass: String
  },
  computed: {
    style () {
      return {
        borderWidth: this.$parent.lineWidth + 'px',
        borderColor: this.$parent.activeColor,
        color: this.currentSelected ? this.$parent.activeColor : this.$parent.defaultColor,
        border: this.$parent.animate ? 'none' : 'auto'
      }
    }
  }
}
</script>