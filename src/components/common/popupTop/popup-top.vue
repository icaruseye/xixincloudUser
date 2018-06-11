<template>
  <div>
    <div class="popup-top" v-show="showWrap" :class="showContent ? 'fadeout':'fadein'">
      {{text}}
    </div>
  </div>
</template>

<style lang="less" scoped>
.popup-top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  transform: translateY(0%);
  background: #f28a89;
}

.fadein {
  animation: animate_in 0.25s ease;
}
.fadeout {
  animation: animate_out 0.25s ease;
}
@keyframes animate_in {
  0% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(-50%);
  }
  100%{
    transform: translateY(-100%);
  }
}
@keyframes animate_out {
  0% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(-50%);
  }
  100%{
    transform: translateY(0%);
  }
}


</style>
