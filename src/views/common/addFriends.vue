<template>
  <div style="padding: 5px" v-if="isShow">
    <div class="servant-panel_info">
      <img class="avatar" :src="info.ServAccount.Avatar | transformImgUrl">
      <span class="name">{{info.ServAccount.NickName}}</span>
      <!-- <img class="qrcode" src="@/assets/images/code.png"> -->
    </div>
    <!-- 服务评分 -->
    <div class="servant-panel_data panel-border">
      <!-- <div class="item">
        <div><span class="color-ye">24</span>年</div>
        <div>从业年限</div>
      </div> -->
      <div class="item">
        <div><span class="color-ye">{{info.ServiceTimes ? info.ServiceTimes : '0'}}</span>次</div>
        <div>服务次数</div>
      </div>
      <div class="item">
        <div><span class="color-ye">{{info.ServiceTimes ? (info.AverageScore/info.ServiceTimes).toFixed(1) : '5.0'}}</span>分</div>
        <div>服务评分</div>
      </div>
    </div>
    <div v-if="!userAccount.IsSubscribe">
      <div><img :src="API_PATH + '/SubscribeQRCode/?shopID=' + userAccount.shopID" alt=""></div>
      <div style="text-align: center;font-size: 14px;color: #333;">长按二维码 关注微信公众号</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      addSuccess: false,
      isFollow: false,
      info: {
        ServAccount: {}
      },
      qrcode: '',
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
    this.userAccount = JSON.parse(sessionStorage.getItem('userAccount'))
    // sessionStorage.setItem('isAddFriends', 1)
    // sessionStorage.setItem('friendsID', this.$route.query.id)
  },
  methods: {
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
          this.$router.push(`/servant/service/${this.$route.query.id}`)
        } else {
          this.isShow = true
        }
        this.getServantInfo()
      } else {
        this.$vux.toast.text('出错了')
      }
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
</style>