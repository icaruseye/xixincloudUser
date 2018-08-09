<template>
  <div class="wrap">
    <div class="container">
      <div class="userinfo-pannel">
        <img :src="userAccount.Avatar | transformImgUrl" alt="">
        <div class="name">{{userAccount.NickName}}</div>
        <!-- <div class="tag">推荐二维码</div> -->
      </div>
      <div style="width:200px;margin: 0 auto 10px">
        <button-tab v-model="index" height="30">
          <button-tab-item>推荐用户</button-tab-item>
          <button-tab-item>推荐服务者</button-tab-item>
        </button-tab>
      </div>
      <div class="qrcode">
        <img v-show="index === 0" :src="API_PATH+'/QrCodeToUser/?userID=' + userAccount.ID" alt="">
        <img v-show="index === 1" :src="API_PATH+'/QrCodeToServant/?userID=' + userAccount.ID" alt="">
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
  data() {
    return {
      index: 0
    }
  },
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
    padding-top: 120px;
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
    width: 85px;
    height: 22px;
    line-height: 22px;
    margin: 0 auto;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    background: linear-gradient(to right, #41CCCB, #BEF3CA);
  }
}
</style>