<template>
  <div class="has-tabbar">
    <!-- <div class="item-info-time"><span class="left">服务时长</span> <span class="right"><span class="number">90</span>分钟/次</span></div> -->
    <!-- <div class="item-info flex mgt10">
      <div class="left">操作动作</div>
      <div class="right">
        <ul>
          <li v-for="item in ItemActionDetails" :key="item.ID">{{item.Name}}</li>
        </ul>
      </div>
    </div> -->
    <div class="item-info mgt10">
      <div class="item-info-title">注意事项</div>
      <div class="content mgt10">用户必须具备正规医疗机构开具的处方、药品及病历证明；服务人员只提供上门输液服务，不提供相关药品；年龄不满18岁者不提供上门服务；普通输液服务为扎针技术服务，包含看护时间至少20分钟。</div>
    </div>
    <div class="item-info mgt10 tips">
      购买前请仔细阅读<span @click="showTips">《购买须知》</span> ，当中包含购买规则及退款规则
    </div>
    <button v-if="showPay" type="button" class="weui-btn weui-btn-bottom weui-btn_primary" @click="getUserPreOrder(Item.ID)">立即购买 ￥{{Item.Price ? (Item.Price/100).toFixed(2) : '0.00'}}</button>
    <button v-if="saleOut" type="button" class="weui-btn weui-btn-bottom weui-btn_primary" disabled="disabled">卖光了</button>
    <div v-transfer-dom>
      <x-dialog v-model="isShowTips" :hide-on-blur="true">
        <div class="tips-content" v-html="Agreement.Content">
        </div>
        <div class="close" @click="isShowTips = false" style="padding: 0 0 10px">
          <i class="iconfont icon-shanchuguanbicha2" style="font-size:20px;color:#999;"></i>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import packageInfo from '../components/package-info'
import { TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    packageInfo
  },
  data () {
    return {
      isShowTips: false,
      showPay: true,
      saleOut: false,
      Item: {},
      ItemActionDetails: [],
      Agreement: {}
    }
  },
  created () {
    if (this.$route.query.type === '0') {
      this.showPay = false
    }
    if (this.$route.query.count === '0') {
      this.showPay = false
      this.saleOut = true
    }
    // this.initData()
    this.getPackageDetail()
    this.getShopAgreement()
  },
  methods: {
    async getShopAgreement () {
      const res = await this.$http.get(`/ShopAgreement?ProtocalType=5&ShopCertificateID=0`)
      if (res.data.Code === 100000) {
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
        this.Item = res.data.Data.Package
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
    }
  }
}
</script>

<style lang="less" scoped>
.weui-list-panel {
  background: #fff;
  .weui-pane_subtitle {
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
</style>
