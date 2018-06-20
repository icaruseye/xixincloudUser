<template>
    <div class="operation_steps_container">
        <slot name="items"></slot>
    </div>
</template>
<script>
export default {
  props: {
    step: {
      type: String,
      default: '1'
    }
  },
  watch: {
    step () {
      this.init()
    }
  },
  computed: {
    items () {
      return this.$slots.items
    }
  },
  methods: {
    init () {
      const that = this
      that.items.map((item, index) => {
        let _index = index + 1
        item.componentInstance.index = _index
        if (_index <= that.step) {
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
.operation_steps_container
{
  display: flex;
  flex-flow: wrap;
  height: 90px;
  background-color: #fff
}
</style>
