<template>
  <div class="wrapper">
    <xxCalendar></xxCalendar>
    <div class="registration_wrap">
      <div class="title">
        <div class="text am">上午</div>
        <div class="time">08:00 ~ 12:00</div>
      </div>
      <div class="list">
        <div class="item">
          <img class="avatar" src="https://tvax1.sinaimg.cn/crop.0.0.473.473.180/78258c21ly8ft5x6jpwepj20d50d5wec.jpg" alt="">
          <div class="content">
            <div class="name">医生</div>
          </div>
          <router-link to="/" class="btn">挂号</router-link>
        </div>
      </div>
    </div>
    <div class="registration_wrap">
      <div class="title">
        <div class="text pm">下午</div>
        <div class="time">08:00 ~ 12:00</div>
      </div>
      <div class="list">
        <div class="item">
          <img class="avatar" src="https://tvax1.sinaimg.cn/crop.0.0.473.473.180/78258c21ly8ft5x6jpwepj20d50d5wec.jpg" alt="">
          <div class="content">
            <div class="name">医生</div>
          </div>
          <router-link to="/" class="btn">挂号</router-link>
        </div>
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
.registration_wrap {
  padding-top: 11px;
  .title {
    display: flex;
    height: 25px;
    line-height: 25px;
    .text {
      display: block;
      width: 60px;
      text-align: center;
      color: #fff;
      border-radius: 0 25px 0 0;
      &.am {
       background: #6ED8E7;
      }
      &.pm {
        background: #3AC7F5;
      }
    }
    .time {
      padding-left: 10px;
      font-size: 12px;
      color: #999;
    }
  }
  .list {
    background: #fff;
    .item {
      padding: 30px 10px 20px 10px;
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
      .btn {
        background: #F8A519;
        color: #fff;
        font-size: 15px;
        padding: 0 5px;
        border-radius: 2px;
      }
    }
  }
}
</style>
