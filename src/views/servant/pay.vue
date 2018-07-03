<template>
  <div class="wrap">
    <img class="icon" src="@/assets/images/ic_paying.png" alt="">
    <div class="text">支付中...</div>
    <div class="weui-cell">
      <div class="left" style="font-size:14px;">{{packageInfo.ShopName}}</div>
      <div class="right" style="font-size:10px;color:#999">服务者: {{packageInfo.ServantName}}</div>
    </div>
    <div class="weui-cell" style="padding: 20px 15px">
      <div class="left" style="font-size:0;"><img class="package_icon" src="@/assets/images/icon_picc.png" alt=""></div>
      <div class="mid">
        {{packageInfo.PackageName}}
      </div>
      <div class="right">
        <span style="color:#999;font-size:13px">价格：</span><span style="color:#FF5F5F;font-size:18px;">{{packageInfo.Price ? (packageInfo.Price/100).toFixed(2) : '0.00'}}</span><span style="color:#FF5F5F;font-size:12px;">元</span>
      </div>
    </div>
    <div style="width:100%;position:fixed;bottom:30px;font-size:10px;color:#C0C0C0;text-align: center;">支付服务由“悉心健康”平台提供技术支持</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      packageInfo: {}
    }
  },
  mounted () {
    this.getPackageInfo()
  },
  methods: {
    async getPackageInfo () {
      const res = await this.$http.get(`/PayShopInfo?orderID=${this.$route.query.OrderID}`)
      if (res.data.Code === 100000) {
        this.packageInfo = res.data.Data
        this.getCreateOrder()
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 创建订单
    async getCreateOrder () {
      const userAccount = JSON.parse(sessionStorage.getItem('userAccount'))
      const orderID = this.$route.query.OrderID
      const openID = userAccount.OpenID
      const shopID = userAccount.ShopID
      const payres = await this.$http.post(`/UserOrder/CreateOrder?orderID=${orderID}&openID=${openID}&shopID=${shopID}`)
      if (payres.data.Code === 100000) {
        if (payres.data.Data.Price === 0) {
          this.$router.replace('/result/paySuccess')
        } else {
          this.onBridgeReady(payres.data.Data)
        }
      } else {
        // 生成订单失败
        this.$vux.toast.text(payres.data.Msg)
      }
    },
    // 跳转微信支付
    onBridgeReady (data) {
      const that = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          'appId': data.appId, // 公众号名称，由商户传入
          'timeStamp': data.timeStamp, // 时间戳，自1970年以来的秒数
          'nonceStr': data.nonceStr, // 随机串
          'package': data.package,
          'signType': 'MD5', // 微信签名方式：
          'paySign': data.paySign // 微信签名
        },
        async function (res) {
          console.log(res)
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            const res = await that.$http.post(`/PagePaySuccess?orderID=${data.orderID}`)
            if (res.data.Code === 100000) {
              that.$router.replace('/result/paySuccess')
            } else {
              that.$vux.toast.text('出错了')
            }
          }
        }
      )
    }
  }
}
</script>

<style scoped lang="less">
.wrap {
  overflow: hidden;
  background: #fff;
  margin-top: 10px;
  .icon {
    display: block;
    width: 60px;
    height: auto;
    margin: 17px auto 20px;
  }
  .text {
    font-size: 18px;
    text-align: center;
    color: #666;
    font-weight: bold;
    margin-bottom: 20px;
  }
}

.weui-cell {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: #666;
  justify-content: space-between;
  .package_icon {
    margin-right: 12px;
    width: 29px;
    height: 29px;
  }
  .mid {
    flex: 1;
    font-size: 18px;
  }
}
</style>