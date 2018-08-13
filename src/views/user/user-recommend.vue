<template>
  <div class="wrap">
    <div class="container">
      <div class="userinfo-pannel">
        <img :src="userAccount.Avatar | transformImgUrl" alt="">
        <div class="name">{{userAccount.NickName}}</div>
        <div class="tag">点击按钮发起推荐</div>
      </div>
      <div class="btn-panel">
        <router-link to="/recommend?isUser=1" class=" btn btn-user">推荐用户</router-link>
        <router-link to="/recommend?isUser=0" class="btn btn-servant">推荐服务者</router-link>
      </div>
      <!-- <div style="width:200px;margin: 0 auto 10px">
        <button-tab v-model="index" :height="30">
          <button-tab-item>推荐用户</button-tab-item>
          <button-tab-item>推荐服务者</button-tab-item>
        </button-tab>
      </div>
      <div class="qrcode">
        <img v-show="index === 0" :src="API_PATH+'/QrCodeToUser/?userID=' + userAccount.ID" alt="">
        <img v-show="index === 1" :src="API_PATH+'/QrCodeToServant/?userID=' + userAccount.ID" alt="">
      </div> -->
    </div>
    <div class="rule">
      <div class="title">推荐规则</div>
      <ul>
        <li>1 1.1 本《饿了么网上订餐平台服务协议》（以下简称本协议）为您（即商户）与上海拉扎斯信息科技有限公司（以下简称饿了么）就饿了么网上订餐服务达成的协议。饿了么在此特别提醒您认真阅读、充分理解本协议。商户应认真阅读、充分理解本协议中各条款，特别涉及免除或者限制饿了么责任的免责条款，对商户的权利限制的条款，法律适用、争议解决方式的条款。</li>
        <li>2.1饿了么平台：是搭建、提供及维护网上订餐服务信息发布的平台，用户和商户通过饿了么平台对订餐及外卖服务达成合意。</li>
      </ul>
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
  padding-top: 70px;
  box-sizing: border-box;
  background: #3ecccc;
  .container {
    position: relative;
    padding: 120px 0 1px 0;
    margin: 0 20px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
    .qrcode {
      position: relative;
      width: 250px;
      margin: 0 auto;
      font-size: 0;
    }
  }
}
.userinfo-pannel {
  position: absolute;
  width: 100%;
  top: -50px;
  text-align: center;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #fff;
  }
  .name {
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
  }
  .tag {
    width: 125px;
    height: 22px;
    line-height: 22px;
    margin: 0 auto;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    background: linear-gradient(to right, #41CCCB, #BEF3CA);
  }
}
.btn-panel {
  display: flex;
  .btn {
    margin: 0 auto 40px;
    display: block;
    width: 120px;
    height: 40px;
    line-height: 44px;
    border: 0;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
  }
  .btn-user {
    background: #3ecccc;
    box-shadow: 0px 7px 0px #2babab;
  }
  .btn-servant {
    background: #4EC7F6;
    box-shadow: 0px 7px 0px #3facd6;
  }
}

.rule {
  margin: 20px;
  color: #fff;
  .title {
    font-size: 14px;
    margin-bottom: 10px;
  }
  ul {
    li {
      margin-bottom: 5px;
      line-height: 1.8;
      font-size: 12px;
    }
  }
}
</style>