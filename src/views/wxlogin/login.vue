<template>
  <div>
    登录中...
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '悉心健康-登录'
  },
  methods: {
    async login () {
      const option = {
        code: this.$route.query.code,
        shopID: this.$route.query.shopID
      }
      // 获取token
      const res = await this.$http.get('/Login', option)
      // const res = await this.$http.get('/LoginTest', {id: this.$route.query.id})
      if (res.data.Code === 100000) {
        localStorage.setItem('user_token', res.data.Data)
        this.$store.dispatch('getAccount').then(() => {
          const path = sessionStorage.getItem('to_path') || '/'
          this.$router.replace(path)
        })
      } else if (res.data.Code === 300010) {
        // 显示
        this.$vux.alert.show({
          title: '提示',
          content: '该账户已被锁定，请联系客服处理'
        })
      }
    }
  },
  created () {
    this.login()
  }
}
</script>