<template>
  <div class="wrap">
    <div class="header-bg" :class="{ isuser: isUser }"></div>
    <div class="userinfo-panel">
      <div class="avatar">
        <img :src="userAccount.Avatar | transformImgUrl" alt="">
      </div>
      <div class="name">{{userAccount.NickName}}</div>
      <div class="text" v-show="isUser === 0">{{userAccount.NickName}}邀请您成为他的服务者</div>
      <div class="text isuser" v-show="isUser === 1">需要优质的上门服务 我推荐您找{{ShopInfo.ShopName}}</div>
    </div>
    <div class="qrcode" v-if="userAccount.ID">
      <img v-show="isUser === 1" :src="API_PATH+'/QrCodeToUser/?userID=' + userAccount.ID" alt="">
      <img v-show="isUser === 0" :src="API_PATH+'/QrCodeToServant/?userID=' + userAccount.ID" alt="">
      <div class="text">长按识别二维码，{{ isUser ? '接受我的邀请' : '注册成为我的服务者'}}</div>
    </div>
    <div class="items-panel">
      <div class="title" :class="{ isuser: isUser }"></div>
      <div class="items-list">
        <template v-for="(item, index) in userAccount.ItemTemplateResponses">
          <div class="item" :key="index">
            <div class="icon"><img :src="item.UseType | ItemImageByUseType" alt=""></div>
            <div class="content">
              <div class="name">{{index + 1}}.{{item.Name}}</div>
              <div class="dec">{{item.Content}}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="footer" :class="{ isuser: isUser }">长按或扫一扫上方二维码，使用{{ShopInfo.ShopName}}</div>
  </div>
</template>

<script>
import wxShare from '@/plugins/wxShare'
import util from '@/plugins/util'
export default {
  computed: {
    API_PATH () {
      return process.env.API_PATH
    },
    isUser () {
      return +this.$route.query.isUser
    },
    viewId () {
      return this.$route.query.viewId
    }
  },
  data () {
    return {
      userAccount: {},
      ShopInfo: {}
    }
  },
  mounted () {
    document.title = this.isUser ? '我推荐给您优质的上门医疗护理服务' : '我邀请你能成为我的服务者'
    this.getItemTemplate()
    this.getShopInfo()
  },
  methods: {
    async getItemTemplate () {
      const res = await this.$http.get(`/UserRecommend/UserItemTemplate?viewId=${this.viewId}`)
      if (res.data.Code === 100000) {
        this.userAccount = res.data.Data
        wxShare({
          title: this.isUser ? '我推荐给您优质的上门医疗护理服务' : '我邀请你能成为我的服务者',
          desc: this.isUser ? '亲测服务很棒' : '希望您能为我服务',
          logo: util.transformImgUrl(res.data.Data.Avatar),
          link: `/recommend?isUser=${this.isUser}&viewId=${this.viewId}`
        })
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async getShopInfo () {
      const res = await this.$http.get(`/ShopInfo?host=${window.location.host}`)
      if (res.data.Code === 100000) {
        this.ShopInfo = res.data.Data
      }
    }
  }
}
</script>

<style scoped lang="less">
.wrap {
  min-height: 100vh;
  background: #fff;
  .header-bg {
    height: 130px;
    background: url(../../assets/images/recommend-header-2.png) no-repeat top;
    background-size: 100% 100%;
    &.isuser {
      background: url(../../assets/images/recommend-header-1.png) no-repeat top;
      background-size: 100% 100%;
    }
  }
  .userinfo-panel {
    display: block;
    margin-top: -35px;
    text-align: center;
    .avatar {
      img {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 10px;
      }
    }
    .name {
      margin-bottom: 15px;
      font-weight: bold;
      font-size: 20px;
      color: #333;
    }
    .text {
      width: 250px;
      margin: 0 auto;
      font-size: 18px;
      background: linear-gradient(to right, #45C8F5, #9AC3FA);
      -webkit-background-clip: text;
      color: transparent;
      &.isuser {
        background: linear-gradient(to right, #99EBBB, #6AE3D1);
        -webkit-background-clip: text;
        color: transparent;
      }
    }
  }
  .qrcode {
    text-align: center;
    img {
      width: 200px;
      height: 200px;
    }
    .text {
      font-size: 12px;
      color: #999;
    }
  }
  .items-panel {
    .title {
      height: 41px;
      margin: 40px auto;
      background: url(../../assets/images/recommend-title-2.png) no-repeat center;
      background-size: 235px auto;
      &.isuser {
        background: url(../../assets/images/recommend-title-1.png) no-repeat center;
        background-size: 235px auto;
      }
    }
    .items-list {
      .item {
        padding: 20px;
        display: flex;
        .icon {
          margin-top: 5px;
          width: 30px;
          height: 30px;
          border-radius: 4px;
        }
        .content {
          flex: 1;
          margin-left: 20px;
          .name {
            font-size: 18px;
            color: #333;
            border-bottom: 1px dashed #ddd;
            margin-bottom: 5px;
            padding-bottom: 5px;
          }
          .dec {
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }
  .footer {
    padding-top: 45px;
    box-sizing: border-box;
    font-size: 12px;
    color: #fff;
    text-align: center;
    height: 79px;
    background: url(../../assets/images/recommend-footer-2.png) no-repeat;
    background-size: cover;
    &.isuser {
      background: url(../../assets/images/recommend-footer-1.png) no-repeat;
      background-size: cover;
    }
  }
}
</style>