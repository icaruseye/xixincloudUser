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
    
    <button type="button" class="weui-btn weui-btn-bottom weui-btn_primary" @click="toPay(Package.ID)">立即购买 ￥{{(Package.ViewPrice/100).toFixed(2) || '0.00'}} 元</button>
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
        this.Package = res.data.Data.Package
        this.PackageItemDetailsList = res.data.Data.PackageItemDetailsList
      }
    },
    toItem (id, itemID) {
      this.$router.push(`/servant/detail/item/${id}?type=0&itemID=${itemID}`)
    },
    toPay (id) {
      this.$router.push(`/servant/pay/${id}`)
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
</style>
