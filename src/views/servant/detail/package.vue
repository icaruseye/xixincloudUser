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
        《购买须知》
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
</style>
