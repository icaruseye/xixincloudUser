<template>
  <div>
  </div>
</template>

<script>
// import Vconsole from 'vconsole'
export default {
  mounted () {
    // new Vconsole()
    this.getUserPreOrder()
  },
  methods: {
    async getUserPreOrder () {
      const res = await this.$http.post(`/UserPreOrder?packageID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        if (res.data.Data.RedirectState === 0) {
          const userAccount = JSON.parse(sessionStorage.getItem('userAccount'))
          const orderID = res.data.Data.OrderID
          const openID = userAccount.OpenID
          const shopID = userAccount.ShopID
          const payres = await this.$http.post(`/UserOrder?orderID=${orderID}&openID=${openID}&shopID=${shopID}`)
          this.onBridgeReady(payres.data.Data)
        }
      }
    },
    onBridgeReady (data) {
      console.log(data)
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
            const res = await this.$http.post(`/PagePaySuccess?orderID=${data.orderID}`)
            if (res.data.Code === 100000) {
              console.log('支付成功')
              this.$router.replace('/result/paySuccess')
            }
          }
        }
      )
    }
  }
}
</script>

<style scoped>

</style>