<template>
  <div class="has-tabbar">
    <!-- 服务套餐头部信息 -->
    <packageInfo :data="Package"></packageInfo>
    <router-view></router-view>
  </div>
</template>

<script>
import packageInfo from '../components/package-info'
export default {
  components: {
    packageInfo
  },
  data () {
    return {
      Package: {}
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const res = await this.$http.get(`/PackageItem?packageID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.Package = res.data.Data.Package
        this.Package.ViewID = res.data.Data.Package.ServantViewID
      } else {
        this.$vux.toast.text('出错了')
      }
    }
  }
}
</script>
<style lang="less">
@import url(../components/index.less);
</style>
