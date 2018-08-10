<template>
  <div>
    <div class="has-tabbar">
      <div class="user-card-container">
        <div class="user-card">
          <div class="userinfo">
            <img class="avatar" :src="userAccount.Avatar | transformImgUrl" alt="">
            <div class="mid-info">
              <div class="name">{{userAccount.NickName}}</div>
              <!-- <div class="times">已被服务：1次</div> -->
            </div>
            <span class="auth" v-if="userInfo.IDCard">实名认证</span>
            <!-- <img class="qrcode" src="@/assets/images/code.png" alt="" @click="toggleMask"> -->
          </div>
          <div class="user-panel">
            <router-link to="/servant" class="user-panel_item">
              <i class="iconfont icon-ren" style="color:#3AC7F5"></i>
              <div class="text">服务者</div>
            </router-link>
            <router-link to="/service" class="user-panel_item">
              <i class="iconfont icon-fuwu" style="color:#3ECCCC"></i>
              <div class="text">服务</div>
            </router-link>
            <router-link to="/user/order" class="user-panel_item">
              <i class="iconfont icon-dingdan1" style="color:#f58779"></i>
              <div class="text">订单</div>
            </router-link>
            <router-link to="/user/complaint" class="user-panel_item">
              <i class="iconfont icon-tousu1" style="color:rgb(78, 203, 115)"></i>
              <div class="text">投诉</div>
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="setting-panel" style="margin-top:10px">
        <router-link to="/user/info?edit=1" class="setting-panel_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-ziliao-"></use>
          </svg>
          <span class="title vux-1px-b">个人资料</span>
        </router-link>
        <router-link to="/user/address" class="setting-panel_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dizhi1"></use>
          </svg>
          <span class="title vux-1px-b">常用地址</span>
        </router-link>
        <router-link to="/user/phone?edit=1" class="setting-panel_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shoujihong"></use>
          </svg>
          <span class="title vux-1px-b">手机认证</span>
        </router-link>
        <router-link to="/user/recommend" class="setting-panel_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tuijian"></use>
          </svg>
          <span class="title vux-1px-b">推荐</span>
        </router-link>
        <!-- <router-link to="/user" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-help.png" alt="">
          <span class="title">帮助</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link> -->
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
    console.log(navigator.userAgent)
  }
}
</script>

<style lang="less">
.user-card-container {
  position: relative;
  background: #3ecccc;
  margin-bottom: 60px;
  height: 120px;
}
.user-card {
  position: relative;
  top: 20px;
  background: #fff;
  margin: 0 10px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, .05);
}
// 用户信息栏
.userinfo {
  width: 100%;
  padding: 15px 20px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-size: cover;
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .name {
    flex: 1;
    padding: 0 10px;
    color: #333;
    font-weight: bold;
    font-size: 18px;
    .tag {
      font-size: 12px;
    }
  }
  .qrcode {
    width: 60px;
    height: 60px;
  }
}
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
}
.auth {
  display: block;
  padding: 2px 8px;
  font-size: 14px;
  color: #fff;
  border-radius: 15px;
  text-align: center;
  border: 1px solid #fff;
  background: #3ecccc;
  box-sizing: border-box;
}
.user-info_percent {
  background: #fff;
  padding: 15px 20px;
  font-size: 12px;
  color: @theme-color;
}
.user-panel {
  padding: 0 0 10px 0;
  display: flex;
  background: #fff;
  font-size: 12px;
  border-radius: 0 0 5px 5px;
  .user-panel_item {
    text-align: center;
    flex: 1;
    color: #666;
    line-height: 1.4;
    &:last-child {
      border: 0;
    }
    .iconfont {
      font-size: 34px;
    }
    .text {
      font-size: 13px;
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
    display: block;
    width: 90%;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: #333;
    font-size: 15px;
    img {
      width: 15px;
      height: auto;
      padding-right: 10px;
    }
    .title {
      position: relative;
      color: #333;
      flex: 1;
      font-size: 15px;
      margin: 15px 0 15px 15px;
      -webkit-font-smoothing: antialiased;
      &.vux-1px-b:after {
        position: absolute;
        bottom: -15px;
        border-color: #f1f1f1;
      }
    }
    .icon {
      width: 1.5em;
      height: 1.5em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    .iconfont {
      position: absolute;
      left: 0;
      left: 15px;
      color: #999;
      font-size: 24px;
      margin-right: 15px;
    }
  }
}
</style>
