<template>
  <div class="wrap">
    <div class="container">
      <div class="userinfo-pannel">
        <div class="earnings"><span>￥</span>{{Wallet.TotalIncome}}</div>
        <div class="text">邀请收入总金额</div>
        <div class="help" @click="tipsIsShow = true">帮助说明</div>
      </div>
      <div class="btn-panel">
        <router-link :to="'/recommend?isUser=1&viewId='+userAccount.ViewID" class=" btn btn-user"><img class="icon-user" src="@/assets/images/recommend-4.png">推荐用户</router-link>
        <router-link :to="'/recommend?isUser=0&viewId='+userAccount.ViewID" class="btn btn-servant"><img class="icon-servant" src="@/assets/images/recommend-5.png">推荐服务者</router-link>
      </div>
    </div>
    <div class="list-panel">
      <div class="title">推荐奖励明细</div>
      <template v-if="WalletLogList.length > 0">
        <list-items
          v-for="(WalletLog, index) in WalletLogList"
          @click.native="redirectToDetail(`/user/bills/${WalletLog.ID}/detail`)"
          :key="index"
          :Amount="WalletLog.Amount"
          :Type="WalletLog.OperatingType"
          :CreateTime="WalletLog.CreateTime">
        </list-items>
        <xx-loadmore
          style="margin:15px"
          :pageindex="pageIndex"
          :pageTotal="pageTotal"
          :loadText="loadText"
          @onClick="loadmore">
        </xx-loadmore>
      </template>
      <div v-else style="font-size: 120px;text-align:center;margin-bottom:40px;">
        <i style="font-size:66px;display:block">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kong1"></use>
          </svg>
        </i>
        <p style="font-size:12px;color:#999;text-align:center;">邀请列表为空</p>
      </div>
    </div>
    <x-dialog
      v-model="tipsIsShow"
      class="dialog"
      :hide-on-blur="true">
      <div class="content">
        <div class="title">推荐用户及推荐服务者加入平台，均有相应的返利，返利会在用户预约服务完成后发放到推荐者系统钱包。</div>
        <ul>
          <li>①	推荐用户：通过平台生成的二维码，推荐给用户加入平台，在用户消费服务完成后会给到相应的推荐奖励。</li>
          <li>②	邀请服务者：邀请您身边的医护好友加入平台，在服务者完成给用户的每一单服务后，会得到相应的推荐奖励。</li>
        </ul>
        <button class="close" @click="tipsIsShow = false">关闭</button>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ButtonTab, ButtonTabItem, XDialog, dateFormat } from 'vux'
import ListItems from '../user-bills/components/listItems'
export default {
  components: {
    ButtonTab,
    ButtonTabItem,
    XDialog,
    ListItems
  },
  filters: {
    timeFormat (value, m) {
      return dateFormat(new Date(value), m)
    }
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
      tipsIsShow: false,
      pageIndex: 1,
      pageTotal: 20,
      loadText: '查看更多',
      WalletLogList: [],
      Wallet: {}
    }
  },
  watch: {
    pageIndex () {
      this.getWalletLogList()
    }
  },
  mounted () {
    this.getWalletLogList()
    this.getWallet()
  },
  methods: {
    showTips () {
      this.tipsIsShow = true
    },
    loadmore () {
      this.pageIndex++
    },
    redirectToDetail (url) {
      this.$router.push(url)
    },
    async getWalletLogList () {
      const res = await this.$http.get(`/WalletLogList?page=${this.pageIndex}`)
      if (res.data.Code === 100000) {
        if (res.data.Data.length === 0) {
          this.pageTotal = this.pageIndex
          return false
        }
        this.WalletLogList.push(...res.data.Data)
      }
    },
    async getWallet () {
      const res = await this.$http.get(`/Wallet`)
      if (res.data.Code === 100000) {
        this.Wallet = res.data.Data
      }
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
  background: url(../../../assets/images/recommend-3.jpg) no-repeat center;
  background-size: cover;
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
    position: relative;
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
  }
  .icon-user {
    position: absolute;
    top: 10px;
    left: 50%;
    margin-left: -12px;
    width: 25px;
    height: auto;
  }
  .icon-servant {
    position: absolute;
    top: 10px;
    left: 50%;
    margin-left: -12px;
    width: 25px;
    height: auto;
  }
  .btn-user {
    background: url(../../../assets/images/recommend-1.png) no-repeat center;
    background-size: cover;
  }
  .btn-servant {
    background: url(../../../assets/images/recommend-2.png) no-repeat center;
    background-size: cover;
  }
}
.list-panel {
  overflow: hidden;
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
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 80px;
      color: #FF5F5F;
      font-size: 15px;
      span {
        font-size: 13px;
      }
    }
  }
}
.dialog {
  .content {
    padding: 15px;
    text-align: left;
    line-height: 2;
    color: #666;
    .title {
      font-size: 15px;
      color: #333;
      text-align: left;
    }
    li {
      margin-bottom: 10px;
      font-size: 14px;
    }
    .close {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: 30px;
      line-height: 30px;
      border: 0;
      border-radius: 2px;
      background: #f1f1f1;
      color: #999;
    }
  }
}
</style>