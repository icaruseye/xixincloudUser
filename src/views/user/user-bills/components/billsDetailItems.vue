<template>
  <div class="billsDetailItem_container clearfix" :class="className">
    <label class="billsDetailItem_label" :style="{color: labelColor}">
      {{label}}
    </label>
    <div class="value_container">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    labelColor: {
      type: String,
      default: '#999999'
    },
    className: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.billsDetailItem_container
{
  padding: 10px 10px;
  .billsDetailItem_label
  {
    font-size: 14px;
    float: left;
  }
  .value_container
  {
    font-size: 14px;
    float: right;
    color: #666;
  }
  &.bottomLine
  {
    border-bottom: 1px solid #ddd
  }
}
</style>
