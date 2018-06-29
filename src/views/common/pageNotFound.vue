<template>
  <div class="warp">
    <div class="bg-image">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon-test1"></use>
      </svg>
      <div class="text">你访问的页面被外星人抓走了啦~</div>
      <a href="/" class="button">首页</a>
    </div>

  </div>
</template>

<style scoped lang="less">
.warp {
  min-height: 100vh;
  background: #f7fbfd;
}
.bg-image {
  width: 100%;
  position: fixed;
  top: 45%;
  transform: translate(0, -50%);
  text-align: center;
  .icon {
    font-size: 100px;
    margin-bottom: 10px;
  }
  .text {
    font-size: 13px;
    color: #c1c1c1;
  }
  .button {
    margin: 10px auto;
    display: block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    background: #3ecccc;
    color: #fff;
    font-size: 14px;
  }
}
</style>