<template>
  <div>
    <div class="has-tabbar">
      <div class="user-info">
        <img class="avatar" :src="userAccount.Avatar | transformImgUrl" alt="">
        <div class="mid-info">
          <div class="name">{{userAccount.NickName}}</div>
          <!-- <div class="times">已被服务：1次</div> -->
          <span class="auth" v-if="userInfo.IDCard"><i class="iconfont icon-shimingrenzheng"></i> 实名认证</span>
        </div>
        <!-- <img class="qrcode" src="@/assets/images/code.png" alt="" @click="toggleMask"> -->
      </div>
      <div class="user-info_percent">
        你的资料完整度为 {{dataScore}}%，完善资料和验证手机后您才能为用户提供服务
      </div>
      <div class="user-panel">
        <router-link to="/" class="user-panel_item">
            <img src="@/assets/images/icon-my-manager.png" alt="">
            <span>管家</span>
        </router-link>
        <router-link to="/" class="user-panel_item">
            <img src="@/assets/images/icon-my-service.png" alt="">
            <span>服务</span>
        </router-link>
        <router-link to="/" class="user-panel_item">
            <img src="@/assets/images/icon-my-calendar.png" alt="">
            <span>日程</span>
        </router-link>
      </div>
      <div class="setting-panel vux-1px-t vux-1px-b" style="margin-top:10px">
        <router-link to="/user/info" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-set.png" alt="">
          <span class="title">个人资料</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/address" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-address.png" alt="">
          <span class="title">常用地址</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/phone" class="setting-panel_item item vux-1px-b">
          <img src="@/assets/images/icon-my-phone.png" alt="">
          <span class="title">手机认证</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/order" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-info.png" alt="">
          <span class="title">我的订单</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/complaint" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-info.png" alt="">
          <span class="title">我的投诉</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
      </div>
    </div>
    <xx-tabbar></xx-tabbar>
    <div class="weui-mask" v-show="maskShow">
      <div class="weui-mask-layer" @click="toggleMask(false)"></div>
      <img :src="userAccount.QRCodeStr" alt="">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      maskShow: false
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo'
    ]),
    dataScore () {
      const userInfo = this.userInfo
      let res = userInfo.IDCardType + userInfo.IsFillingInfo + userInfo.IsMobileChecked
      return res === 3 ? '100' : res * 33
    }
  },
  methods: {
    toggleMask (val) {
      this.maskShow = val
    }
  }
}
</script>

<style lang="less">
.mid-info {
  flex: 1;
  padding: 0 10px;
  color: #fff;
  .name {
    padding: 0;
  }
  .times {
    font-size: 12px;
  }
  .auth {
    font-size: 12px;
    background: #fff;
    color: @theme-color;
    border-radius: 10px;
    padding: 2px 5px;
    .iconfont {
      font-size: 16px;
      position: relative;
      top: 1px;
    }
  }
}
.user-info_percent {
  background: #fff;
  padding: 15px 20px;
  font-size: 12px;
  color: @theme-color;
}
.user-panel {
  padding: 10px 0;
  display: flex;
  background: #fff;
  border-bottom: #9fe6e6 1px solid;
  font-size: 12px;
  .user-panel_item {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    border-right: #d9f7f5  1px solid;
    color: #666;
    &:last-child {
      border: 0;
    }
    img {
      width: 31px;
      margin-right: 10px;
    }
  }
}

.setting-panel {
  background: #fff;
  &.vux-1px-t:before {
    border-color: #e5e5e5;
  }

  &.vux-1px-b:after {
    border-color: #e5e5e5;
  }
  .setting-panel_item {
    width: 90%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 15px 0;
    display: flex;
    align-items: center;
    color: #666;
    font-size: 12px;
    &.vux-1px-b:after {
      border-color: #daf6f5;
    }
    img {
      width: 24px;
      height: 24px;
      padding-right: 10px;
    }
    .title {
      flex: 1;
    }
    .iconfont {
      color: #f8a519
    }
  }
}
</style>
