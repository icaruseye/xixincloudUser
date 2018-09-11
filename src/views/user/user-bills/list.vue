<template>
  <div class="list_warp">
    <xx-nav-bar
      style="margin-bottom:5px;"
      left-text="返回"
      @click-left="onNavbarClickLeft">
    </xx-nav-bar>
    <template v-if="WalletLogList.length > 0">
      <list-items
        v-for="(WalletLog, index) in WalletLogList"
        @click.native="redirectToDetail(`/user/bills/${WalletLog.ID}/detail`)"
        :key="index"
        :Amount="WalletLog.Amount"
        :Type="WalletLog.OperatingType"
        :CreateTime="WalletLog.CreateTime">
      </list-items>
    </template>
    <div v-else style="font-size: 120px;text-align:center;margin-top:60px">
      <i style="font-size:66px;display:block">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-kong1"></use>
        </svg>
      </i>
      <p style="font-size:12px;color:#999;text-align:center;">账单列表为空</p>
    </div>
  </div>
</template>
<script>
import ListItems from './components/listItems'
export default {
  components: {
    ListItems
  },
  data () {
    return {
      pageNumber: 1,
      WalletLogList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getBills()
    },
    onNavbarClickLeft () {
      this.$router.back()
    },
    getBills () {
      this.$http.get(`/WalletLogList`, {
        page: this.pageNumber
      }).then(result => {
        if (result.data.Code === 100000) {
          this.WalletLogList = result.data.Data
        }
      })
    },
    redirectToDetail (url) {
      this.$router.push(url)
    }
  }
}
</script>
<style lang="less" scoped>
.list_warp
{
  min-height: 100vh;
  background: #fff;
  border: 1px solid #f6f6f6;
  border-left: none;
  border-right: none
}
</style>
