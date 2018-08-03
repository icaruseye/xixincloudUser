<template>
  <div style="padding: 5px" v-if="isShow">
    <div class="servant-panel_info">
      <img class="avatar" :src="info.ServantAccount.Avatar | transformImgUrl">
      <span class="name">{{info.ServantAccount.NickName}}</span>
      <!-- <img class="qrcode" src="@/assets/images/code.png"> -->
    </div>
    <!-- 服务评分 -->
    <div class="servant-panel_data panel-border">
      <!-- <div class="item">
        <div><span class="color-ye">24</span>年</div>
        <div>从业年限</div>
      </div> -->
      <div class="item">
        <div><span class="color-ye">{{info.ServiceTimes}}</span>次</div>
        <div>服务次数</div>
      </div>
      <div class="item">
        <div><span class="color-ye">{{info.AverageScore}}</span>分</div>
        <div>服务评分</div>
      </div>
    </div>
    <div v-if="!userAccount.IsSubscribe">
      <div><img :src="API_PATH + '/SubscribeQRCode/?shopID=' + userAccount.ShopID" alt=""></div>
      <div style="text-align: center;font-size: 14px;color: #f8a519;">长按二维码点击识别， 点击关注公众号。</div>
      <div style="text-align: center;font-size: 12px;color: #666;">不知道如何操作？请看<a href="javascript:;" style="color:#3ecccc" @click="showDialog">《关注》</a> 帮助文档</div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" hide-on-blur :dialog-style="{height: '75%', 'background-color': '#fff'}">
        <div class="tips-content">
          <div class="title">{{AgreementList.Title}}</div>
          <div class="content" v-html="AgreementList.Content"></div>
          <div class="read-btn" @click="showHideOnBlur = false">我已阅读完毕</div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { XDialog, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog
  },
  data () {
    return {
      isShow: false,
      addSuccess: false,
      isFollow: false,
      showHideOnBlur: false,
      AgreementList: {},
      info: {
        ServantAccount: {}
      },
      qrcode: '',
      ShopID: JSON.parse(sessionStorage.getItem('userAccount')).ShopID,
      userAccount: ''
    }
  },
  computed: {
    API_PATH () {
      return process.env.API_PATH
    }
  },
  mounted () {
    this.addFirends()
    this.getShopAgreement()
    this.userAccount = JSON.parse(sessionStorage.getItem('userAccount'))
  },
  methods: {
    async getShopAgreement () {
      const res = await this.$http.get(`/ShopAgreement?protocalType=21&itemID=0`)
      if (res.data.Code === 100000 && res.data.Data) {
        this.AgreementList = res.data.Data
      }
    },
    async getServantInfo () {
      const res = await this.$http.get(`/ServantFriendInfo?servantID=${this.$route.query.id}`)
      if (res.data.Code === 100000) {
        this.info = res.data.Data
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    async addFirends () {
      const res = await this.$http.get(`/AddFriend/${this.$route.query.id}`)
      if (res.data.Code === 100000) {
        if (this.userAccount.IsSubscribe) {
          this.$router.replace(`/servant/service/${this.$route.query.id}?isShare=1`)
        } else {
          this.isShow = true
        }
        this.getServantInfo()
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    showDialog () {
      this.showHideOnBlur = true
    }
  }
}
</script>

<style scoped lang="less">
.servant-panel_info {
  padding: 12px 8px 12px 12px;
  border-radius: 6px 6px 0 0;
  background: #3ECCCC;
  display: flex;
  align-items: center;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .name {
    padding: 0 10px;
    font-size: 18px;
    color: #fff;
    flex: 1;
  }
  .qrcode {
    width: 60px;
    height: 60px;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, .3);
    padding: 5px;
  }
}
.servant-panel_data {
  position: relative;
  padding: 15px 0;
  display: flex;
  background: #fff;
  font-size: 12px;
  .item {
    display: block;
    flex: 1;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: #999;
    .color-ye {
      font-size: 18px;
    }
    img {
      width: 31px;
      margin-right: 10px;
    }
  }
}

.tips-content {
  max-height: 400px;
  padding: 10px;
  text-align: left;
  overflow: scroll;
  color: #666;
  background: #fff;
  font-size: 15px;
  .title {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  p {
    line-height: 1.8;
    margin-bottom: 10px;
    font-size: 13px;
  }
}

.read-btn {
  margin: 15px auto 0;
  width: 130px;
  height: 50px;
  line-height: 50px;
  border: 1px solid #3ecccc;
  border-radius: 4px;
  box-sizing: border-box;
  background: #fff;
  text-align: center;
  font-size: 16px;
  color: #3ecccc;
}
</style>