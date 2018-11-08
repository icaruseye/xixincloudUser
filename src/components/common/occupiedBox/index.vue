<template>
  <div class="occupied_container">
    <img class="occupied_img" src="@/assets/images/empty_icon.png" alt="">
    <p class="occupied_text">
      <slot></slot>
    </p>
  </div>
</template>

<style lang="less" scoped>
  .occupied_container
  {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
  .occupied_img
  {
    display: block;
    width: 40%;
    margin: 0 auto;
  }
  .occupied_text
  {
    margin-top: 10px;
    font-size: 14px;
    color: #999;
    text-align: center;
  }
</style>
