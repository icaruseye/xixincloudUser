<template>
  <div class="wrap">
    <div class="container">
      <div class="userinfo-pannel">
        <div class="earnings"><span>￥</span>123</div>
        <div class="text">邀请收入总金额</div>
        <div class="help">帮助说明</div>
      </div>
      <div class="btn-panel">
        <router-link to="/recommend?isUser=1" class=" btn btn-user">推荐用户</router-link>
        <router-link to="/recommend?isUser=0" class="btn btn-servant">推荐服务者</router-link>
      </div>
    </div>
    <div class="list-panel">
      <div class="title">推荐奖励明细</div>
      <div class="item">
        <div class="left">
          <div class="name">原煤配置</div>
          <div class="time"><span>2018-07-25 15:00</span><span>用户：张**</span></div>
        </div>
        <div class="right"><span>￥</span>299元</div>
      </div>
      <div class="item">
        <div class="left">
          <div class="name">原煤配置</div>
          <div class="time"><span>2018-07-25 15:00</span><span>用户：张**</span></div>
        </div>
        <div class="right"><span>￥</span>299元</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ButtonTab, ButtonTabItem } from 'vux'
export default {
  components: {
    ButtonTab,
    ButtonTabItem
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ]),
    API_PATH () {
      return process.env.API_PATH
    }
  },
  data () {
    return {
      index: 0
    }
  }
}
</script>

<style scoped lang="less">
.wrap {
  min-height: 100vh;
  box-sizing: border-box;
}
.userinfo-pannel {
  z-index: 10;
  position: relative;
  overflow: hidden;
  height: 135px;
  text-align: center;
  background: linear-gradient(to right, #9EC2FB, #42C7F6, #3CC7F5);
  .earnings {
    margin-top: 15px;
    font-size: 30px;
    color: #fff;
    span {
      font-size: 25px;
    }
  }
  .text {
    font-size: 13px;
    color: #fff;
  }
  .help {
    position: absolute;
    top: 12px;
    right: 12px;
    border: 1px solid #fff;
    border-radius: 12px;
    font-size: 12px;
    color: #fff;
    height: 20px;
    line-height: 20px;
    padding: 0 5px;
  }
}
.btn-panel {
  z-index: 99;
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: -30px;
  .btn {
    margin: 0 20px 10px;
    display: block;
    padding-top: 40px;
    width: 100px;
    height: 75px;
    border: 0;
    color: #fff;
    border-radius: 4px;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    box-sizing: border-box;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, .1);
  }
  .btn-user {
    background: #3ecccc;
  }
  .btn-servant {
    background: #687CFF;
  }
}
.list-panel {
  background: #fff;
  .title {
    height: 66px;
    line-height: 66px;
    text-align: center;
    font-size: 15px;
    color: #333;
  }
  .item {
    position: relative;
    padding: 12px;
    display: flex;
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #CCF0EE;
      color: #CCF0EE;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    .left {
      flex: 1;
      .name {
        font-size: 15px;
        color: #333;
      }
      .time {
        font-size: 12px;
        color: #999;
        span {
          margin-right: 25px;
        }
      }
    }
    .right {
      width: 80px;
      text-align: right;
      color: #FF5F5F;
      font-size: 15px;
      span {
        font-size: 13px;
      }
    }
  }
}
</style>