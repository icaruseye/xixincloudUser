<template>
  <div class="has-tabbar">
    <!-- 服务列表 -->
    <div class="weui-list-panel mgt10">
      <div class="weui-pane_subtitle">服务列表</div>
      <div class="weui-list_container">
        <template v-for="(item, index) in PackageItemDetailsList">
          <div class="weui-list_item" :key="index" @click="toItem(Package.ID, item.ID)">
            <div class="icon"><img src="@/assets/images/icon_picc.png" alt=""></div>
            <div class="mid">
              <div class="title">{{item.ItemName}}</div>
              <div class="describe">{{item.ItemContent}}</div>
            </div>
            <div class="count">{{item.ItemNumber}}次</div>
          </div>
        </template>
      </div>
    </div>
    <div class="item-info mgt10 tips">
      购买前请仔细阅读<span @click="showTips">《购买须知》</span> ，当中包含购买规则及退款规则（包括找客服退款）
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="isShowTips" :hide-on-blur="true">
        <div class="tips-content">
          <div class="title">购买须知</div>
          <p>① 服务包购买下单需在15min中完成支付，24h未支付后台将关闭订单。</p>
          <p>②用户购买后若需要退款需在购买7天内发起退款申请。7天内未预约服务（或预约服务后医护并未实际服务），经后台审核后方可退款，审核周期为1~2个工作日。其余情况平台不予退款。</p>
          <p>Notice：需要服务者提供医疗/护理服务，请保证预约时能提供正规医院的处方、医嘱，且保障处方、医嘱的真实有效，服务者审核处方、医嘱不符合规范，或者医疗风险性较高，有权不接受您的预约。所以，请尽量避免因处方问题导致购买后退费，以免影响您的使用体验。</p>
        </div>
      </x-dialog>
    </div>
    <button type="button" class="weui-btn weui-btn-bottom weui-btn_primary" @click="getUserPreOrder(Package.ID)">立即购买 ￥{{(Package.Price/100).toFixed(2) || '0.00'}} 元</button>
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
      Package: {},
      PackageItemDetailsList: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    showTips () {
      this.isShowTips = true
    },
    async initData () {
      const res = await this.$http.get(`/PackageItem?packageID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.Package = res.data.Data.Package
        this.PackageItemDetailsList = res.data.Data.PackageItemDetailsList
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    toItem (id, itemID) {
      this.$router.push(`/servant/detail/item/${id}?type=0&itemID=${itemID}`)
    },
    async getUserPreOrder (id) {
      // 生成预支付订单
      const that = this
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
          time: 800,
          onHide () {
            that.$router.back()
          }
        })
      }
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

.tips {
  padding: 10px;
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
