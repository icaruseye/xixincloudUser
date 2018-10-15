<template>
  <div class="wrapper">
    <div class="servant_info">
      <img class="avatar" src="https://tvax1.sinaimg.cn/crop.0.0.473.473.180/78258c21ly8ft5x6jpwepj20d50d5wec.jpg" alt="">
      <div class="content">
        <div class="name">123</div>
      </div>
    </div>
    <xxCalendar></xxCalendar>
    <div class="servant_list">
      <div class="item">
        <div class="text">上午</div>
        <div class="time">(08：00~12：00)</div>
        <div class="price">99元</div>
        <router-link to="/" class="btn">挂号</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.servant_info {
  padding: 15px 20px;
  background: #fff;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  .avatar {
    margin-right: 10px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
  .content {
    flex: 1;
  }
  .name {
    font-size: 18px;
    color: #333;
  }
}
.servant_list {
  border-top: 1px solid RGBA(0, 180, 171, .2);
  .item {
    display: flex;
    background: #fff;
    align-items: center;
    padding: 20px 10px;
    border-bottom: 1px solid RGBA(0, 180, 171, .2);
    &:last-child {
      border: 0;
    }
    .text {
      font-size: 15px;
      color: #666;
    }
    .time {
      margin: 0 5px;
      flex: 1;
      font-size: 12px;
      color: #999
    }
    .price {
      font-size: 15px;
      color: #FF5F66;
    }
    .btn {
      margin-left: 15px;
      background: #F8A519;
      color: #fff;
      padding: 0 10px;
      border-radius: 2px;
    }
  }
}
</style>
