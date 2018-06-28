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
      Package: {},
      PackageItemDetailsList: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const res = await this.$http.get(`/PackageItem?packageID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        const info = JSON.parse(sessionStorage.getItem('myServantInfo'))
        this.Package = res.data.Data.Package
        this.Package.ViewID = res.data.Data.Package.ServantViewID
        this.Package.Avatar = info.Avatar
        this.Package.NickName = info.NickName
      }
    }
  }
}
</script>
<style lang="less">
@import url(../components/index.less);
</style>
