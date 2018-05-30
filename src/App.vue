<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/reset.less';
@import '/styles/cover.less';
@import '/styles/public.less';
body {
  background-color: #f6f6f6;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.weui-cells::before,
.weui-cells:after {
  border: 0 !important;
}

.vux-datetime {
  font-size: 14px;
  p {
    color: @yellow;
    font-size: 14px;
  }
}
</style>
