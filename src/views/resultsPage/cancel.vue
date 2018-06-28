<template>
  <div class="wrap">
    <xxResultView title="取消成功">
      <button class="btn" @click="to('/')">返回首页</button>
      <button class="btn" @click="to('/user')">个人中心</button>
    </xxResultView>
  </div>
</template>

<script>
export default {
  methods: {
    to (path) {
      this.$router.replace(path)
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
  min-height: 100vh;
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