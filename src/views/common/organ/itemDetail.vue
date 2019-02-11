<template>
  <div class="has-tabbar">
    <!-- 服务包头部信息 -->
    <div class="package-header-info">
      <div class="icon"><img :src="Item.Package.PackageType | ItemImageByUseType" alt=""></div>
      <div class="mid">
        <div class="name">{{Item.Package.Name}}</div>
        <div class="sales">
          <div class="price">{{Item.DispatchService.Price ? (Item.DispatchService.Price/100).toFixed(2) : '0.00'}}<span>元</span></div>
          <div class="volume" v-if="Item.Package.SoldAmount">已售：{{Item.Package.SoldAmount}}份</div>
        </div>
      </div>
    </div>
    <!-- 服务包介绍 -->
    <div class="packageInfo mgt10">
      <div class="title">
        <span class="left">服务套餐介绍</span>
      </div>
      <div class="content">
        {{Item.Package.Description}}
      </div>
    </div>
    <!-- 注意事项 -->
    <div class="packageInfo mgt10" v-if="Item.Attention">
      <div class="title">
        <span class="left">注意事项</span>
      </div>
      <div class="content">
        {{Item.ItemTemplate.Attention}}
      </div>
    </div>
     <button type="button" class="weui-btn weui-btn-bottom weui-btn_primary" @click="getUserPreOrder(Item.DispatchService.ID)">预约服务</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Item: {},
      Package: {}
    }
  },
  computed: {
    itemID () {
      return +this.$route.params.id
    }
  },
  created () {
    this.getItemTemplate()
  },
  methods: {
    async getItemTemplate () {
      const res = await this.$http.get(`/DispatchService?id=${this.itemID}`)
      if (res.data.Code === 100000) {
        this.Item = res.data.Data
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    async getUserPreOrder (id) {
      // 生成预支付订单
      const res = await this.$http.post(`/UserOrder/PreOrder?packageID=${this.itemID}&orderType=7&servantViewID=&refereeType=${this.refereeType}&refereeViewID=${this.refereeViewID}`)
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
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../servant/components/index.less);
.mgt10 {
  margin-top: 10px;
}
.package-header-info {
  background: #fff;
  padding: 20px 12px 12px;
  display: flex;
  .icon {
    margin-top: 5px;
    width: 29px;
    height: 29px;
  }
  .mid {
    margin: 0 15px;
    flex: 1;
    .name {
      font-weight: bold;
      font-size: 18px;
      color: #666;
      font-weight: bold;
    }
    .describe {
      font-size: 13px;
      color: #999;
    }
    .sales {
      display: flex;
      align-items: baseline;
      .price {
        font-size: 24px;
        color: #FF5F5F;
        span {
          font-size: 11px;
        }
      }
      .volume {
        padding-left: 30px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
.packageInfo {
  padding: 16px 12px;
  background: #fff;
  .title {
    margin-bottom: 9px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .left {
      font-size: 16px;
      color: #333;
    }
    .right {
      font-size: 11px;
      color: #999;
    }
  }
  .content {
    font-size: 13px;
    color: #666;
  }
}
</style>
