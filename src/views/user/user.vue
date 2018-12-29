<template>
  <div>
    <div class="has-tabbar">
      <div class="user-info">
        <img class="avatar" :src="userAccount.Avatar | transformImgUrl" alt="">
        <div class="mid-info">
          <div class="name">{{userAccount.NickName}}</div>
          <!-- <div class="times">已被服务：1次</div> -->
          <span class="auth" v-if="userInfo.IDCard">实名认证</span>
        </div>
        <!-- <img class="qrcode" src="@/assets/images/code.png" alt="" @click="toggleMask"> -->
      </div>
      <div class="user-panel">
        <router-link to="/servant" class="user-panel_item">
            <img src="@/assets/images/icon-my-manager.png" alt="">
            <div class="text">服务者</div>
        </router-link>
        <router-link to="/service" class="user-panel_item">
            <img src="@/assets/images/icon-my-service.png" alt="">
            <div class="text">服务</div>
        </router-link>
        <router-link to="/user/order" class="user-panel_item">
            <img src="@/assets/images/icon-my-calendar.png" alt="">
            <div class="text">订单</div>
        </router-link>
      </div>
      <div class="setting-panel vux-1px-t vux-1px-b" style="margin-top:10px">
        <router-link to="/user/info?edit=1" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-info.png" alt="">
          <span class="title">个人资料</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/account" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-info.png" alt="">
          <span class="title">我的账户</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/recommend" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-tuijian.png" alt="">
          <span class="title">推荐奖励</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
      </div>
      <div class="setting-panel vux-1px-t vux-1px-b" style="margin-top:10px">
        <router-link to="/user/activity" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-info.png" alt="">
          <span class="title">我的活动</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/complaint" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-comp.png" alt="">
          <span class="title">我的投诉</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/address" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-address.png" alt="">
          <span class="title">常用地址</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <!-- <router-link to="/user" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-help.png" alt="">
          <span class="title">帮助</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link> -->
        <router-link to="/user/phone" class="setting-panel_item item vux-1px-b">
          <img src="@/assets/images/icon-my-phone.png" alt="">
          <span class="title">手机认证</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/article/list" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-info.png" alt="">
          <span class="title">文章资讯</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
      </div>
      <!-- <div class="setting-panel vux-1px-t vux-1px-b" style="margin-top:10px">
        <router-link to="/user" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-set.png" alt="">
          <span class="title">设置</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
      </div> -->
    </div>
    <xx-tabbar></xx-tabbar>
    <!-- <div class="weui-mask" v-show="maskShow">
      <div class="weui-mask-layer" @click="toggleMask(false)"></div>
      <img :src="userAccount.QRCodeStr" alt="">
    </div> -->
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
    ])
  },
  created () {
    this.$store.dispatch('getAccount')
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
    display: block;
    font-size: 10px;
    color: #fff;
    border-radius: 10px;
    width: 50px;
    height: 14px;
    line-height: 16px;
    text-align: center;
    border: 1px solid #fff;
  }
}
.user-info_percent {
  background: #fff;
  padding: 15px 20px;
  font-size: 12px;
  color: @theme-color;
}
.user-panel {
  margin: -40px 12px 0;
  padding: 10px 0;
  display: flex;
  background: #fff;
  border-radius: 4px;
  font-size: 12px;
  box-shadow: 0 13px 15px RGBA(211, 211, 211, 0.5);
  .user-panel_item {
    text-align: center;
    flex: 1;
    border-right: #d9f7f5  1px solid;
    color: #666;
    &:last-child {
      border: 0;
    }
    img {
      width: 20px;
    }
    .text {
      font-size: 14px;
      color: #666;
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
    font-size: 15px;
    &.vux-1px-b:after {
      border-color: #daf6f5;
    }
    img {
      width: 15px;
      height: auto;
      padding-right: 10px;
    }
    .title {
      flex: 1;
    }
    .iconfont {
      color: #ccc;
      font-size: 15px;
    }
  }
}
</style>