<template>
  <div>
    <xxOccupiedBox>
      <p>登录中...</p>
    </xxOccupiedBox>
  </div>
</template>

<script>
export default {
  methods: {
    async login () {
      const inviteCode = JSON.parse(sessionStorage.getItem('inviteCode')) || {}
      const option = {
        code: this.$route.query.code,
        shopID: this.$route.query.shopID,
        viewID: inviteCode.id
      }
      // 获取token
      const res = await this.$http.get('/Login', option)
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