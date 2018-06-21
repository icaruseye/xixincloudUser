<template>
  <div class="wrap">
    <img class="icon" src="@/assets/images/result_success.png" alt="">
    <div class="text">{{title}}</div>
    <div style="display:flex;justify-content: center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="less">
.wrap {
  margin: 12px 0;
  padding: 20px 0 50px;
  background: #fff;
  text-align: center;
  .icon {
    width: 70px;
    height: auto;
    margin-bottom: 20px;
  }
  .text {
    font-size: 18px;
    color: #666;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .btn {
    display: block;
    border: 0;
    width: 90px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    font-size: 15px;
    text-align: center;
    &:nth-child(1) {
      background: #d8d8d8;
      color: #fff;
    }
    &:nth-child(2) {
      margin-left: 50px;
      background: #3ECCCC;
      color: #fff;
    }
  }
}
</style>