<template>
  <div class="time-line_container">
    <slot name="items"></slot>
  </div>
</template>
<script>
export default {
  props: {
    step: {
      type: String,
      default: '0'
    }
  },
  methods: {
    init () {
      const that = this
      that.$slots.items.map((item, index) => {
        let _index = index + 1
        item.componentInstance.index = _index
        if (_index <= parseInt(that.step)) {
          item.componentInstance.active = true
        }
      })
    }
  },
  mounted () {
    const that = this
    that.init()
  }
}
</script>
<style scoped>

  .time-line_container
  {
    padding: 30px 0;
    background-color: #fff;
  }
</style>
