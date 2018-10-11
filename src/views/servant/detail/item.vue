<template>
  <div class="has-tabbar">
    <!-- <img v-if="showPay" class="share-icon" @click="toShare" src="@/assets/images/share-icon.png" alt=""> -->
    <div class="item-info mgt10" v-if="ItemTemplate.Attention">
      <div class="item-info-title">注意事项</div>
      <div class="content mgt10">{{ItemTemplate.Attention}}</div>
    </div>
    <!-- 机构地址 -->
    <div class="item-info mgt10" v-if="ItemTemplate.UseType === 3">
      <div class="item-info-title">机构地址</div>
      <div class="content mgt10">
        <template v-for="(item, index) in AddressList">
          <div class="address-list_item" :key="index" @click="chooseAdress(index)">
            <div class="tag">{{item.Remark}}<span v-if="index === 0">(默认)</span></div>
            <div class="detail">{{item.Province | _transformAddress}}{{item.City | _transformAddress}}{{item.Area | _transformAddress}}{{item.SpecificAddress}}</div>
          </div>
        </template>
      </div>
    </div>
    <div class="item-info mgt10 tips">
      购买前请仔细阅读<span @click="showTips">《购买须知》</span> ，当中包含购买规则及退款规则
    </div>
    <button v-if="showPay && Item.Count > 0" type="button" class="weui-btn weui-btn-bottom weui-btn_primary" @click="getUserPreOrder(Item.ID)">立即购买 ￥{{Item.Price ? (Item.Price/100).toFixed(2) : '0.00'}}</button>
    <button v-if="Item.Count < 0" type="button" class="weui-btn weui-btn-bottom weui-btn_primary" disabled="disabled">卖光了</button>
    <div v-transfer-dom>
      <x-dialog v-model="isShowTips" :hide-on-blur="true">
        <div class="tips-content">
          <!-- <div class="title">{{Agreement.Title}}</div> -->
          <div v-html="Agreement.Content"></div>
        </div>
        <div class="read-btn" @click="isShowTips = false">我已阅读完毕</div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import util from '@/plugins/util'
import packageInfo from '../components/package-info'
import { TransferDomDirective as TransferDom } from 'vux'
import { mapGetters } from 'vuex'
export default {
  directives: {
    TransferDom
  },
  components: {
    packageInfo
  },
  filters: {
    _transformAddress (val) {
      return util.transformAddress(val)
    }
  },
  data () {
    return {
      isShowTips: false,
      showPay: true,
      saleOut: false,
      Item: {},
      ItemActionDetails: [],
      Agreement: {},
      ItemTemplate: {},
      AddressList: []
    }
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ]),
    itemID () {
      return +this.$route.params.id
    },
    servantID () {
      return this.$route.query.ViewID
    }
  },
  created () {
    if (this.$route.query.type === '0') {
      this.showPay = false
    }
    // this.initData()
    this.getPackageDetail().then((res) => {
      this.Item = res.Data.Package
      this.ItemTemplate = res.Data.ItemTemplate
      if (res.Data.ItemTemplate.UseType === 3) {
        this.getAddressList(res.Data.Package)
      }
    })
    this.getShopAgreement()
  },
  methods: {
    // 获取机构地址列表
    async getAddressList (Package) {
      const res = await this.$http.get(`/ServantAddress?servantViewID=${Package.ServantViewID}`)
      if (res.data.Code === 100000) {
        this.AddressList = res.data.Data
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    async getShopAgreement () {
      const res = await this.$http.get(`/ShopAgreement?protocalType=5&itemID=${this.itemID}`)
      if (res.data.Code === 100000 && res.data.Data) {
        this.Agreement = res.data.Data
      }
    },
    async initData () {
      const res = await this.$http.post(`/Item?itemID=${this.$route.query.itemID}`)
      if (res.data.Code === 100000) {
        this.ItemActionDetails = res.data.Data.ItemActionDetails
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    async getPackageDetail () {
      const res = await this.$http.get(`/PackageItem?packageID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        return res.data
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    async getUserPreOrder (id) {
      // 生成预支付订单
      const res = await this.$http.post(`/UserOrder/PreOrder?packageID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        if (res.data.Data.RedirectState === 0) {
          this.$router.push(`/servant/pay/${id}?OrderID=${res.data.Data.OrderID}`)
        } else {
          window.location.href = res.data.Data.RedirectUrl
        }
      } else {
        this.$vux.toast.show({
          type: 'cancel',
          text: res.data.Msg,
          time: 800
        })
      }
    },
    showTips () {
      this.isShowTips = true
    },
    toShare () {
      console.log(this.data)
      this.$router.push(`/activity/share?packageID=${this.itemID}&userID=${this.userAccount.ID}&servantID=${this.servantID}`)
    }
  }
}
</script>

<style lang="less" scoped>
.weui-list-panel {
  background: #fff;
  .weui-panel_subtitle {
    position: relative;
    padding: 16px 15px 4px 15px;
    font-size: 15px;
    color: #666;
    &::before {
      content: " ";
      position: absolute;
      bottom: 0;
      left: 15px;
      right: 15px;
      height: 1px;
      border-top: 1px solid #d9f7f5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
  }
}

.item-info {
  padding: 15px 14px;
  background: #fff;
  &.flex {
    display: flex;
    .left {
      margin-right: 18px;
      width: 72px;
      font-size: 16px;
      color: #333;
    }
    .right {
      font-size: 14px;
      color: #999;
      li {
        height: 25px;
        line-height: 25px;
      }
    }
  }
  .title {
    width: 72px;
    font-size: 16px;
    color: #333;
  }
  .content {
    font-size: 14px;
    color: #999;
  }
}

.item-info-time {
  position: relative;
  background: #fff;
  padding: 15px 12px;
  display: flex;
  justify-content: space-between;
  &::before {
    content: " ";
    position: absolute;
    top: 0;
    left: 12px;
    right: 12px;
    height: 1px;
    border-top: 1px solid #d9f7f5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  .right {
    font-size: 12px;
    color: #999;
    .number {
      font-size: 18px;
    }
  }
}

.tips {
  font-size: 12px;
  color: #999;
  span {
    color: #f8a519;
  }
}

.tips-content {
  padding: 10px;
  text-align: left;
    color: #666;
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
.address-list_item {
  position: relative;
  background: #fff;
  padding: 10px 0;
  display: flex;
  align-items: center;
  font-size: 12px;
  &::after {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    border-bottom: 1px solid #f1f1f1;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  &:last-child::after {
    border: 0;
  }
  .tag {
    width: 100px;
    color: #999;
  }
  .detail {
    flex: 1;
    color: #666;
    padding-right: 10px;
  }
}

.share-icon {
  position: absolute;
  top: 10px;
  right: 15px;
  width: 22px;
  height: 22px;
}
</style>
