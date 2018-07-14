<template>
  <div>
    <div :class="[msgType+'_container']">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    msgType: {
      type: String,
      default: 'system'
    }
  }
}
</script>

<style lang="less" scoped>
  .system_container
  {
    background-color: #fff;
    font-size: 12px;
    color: #999;
    padding: 5px 10px;
    line-height: 16px;
    width: 210px;
    border-radius: 4px;
    margin: 0 auto;
    text-align: justify;
  }
  .time_container
  {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    color: #999
  }
</style>

