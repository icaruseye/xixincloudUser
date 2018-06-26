<template>
  <div id="app">
    <InlineLoading class="vertical" v-if="routerLoading"></InlineLoading>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { InlineLoading } from 'vux'
export default {
  name: 'app',
  components: {
    InlineLoading
  },
  computed: {
    ...mapGetters([
      'routerLoading'
    ])
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/reset.less';
@import '/styles/common.less';
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
.vertical {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
