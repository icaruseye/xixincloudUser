<template>
  <div>
    <!-- 服务介绍 -->
    <div class="servant-panel servant-panel_service" v-if="itemList.length > 0">
      <div class="servant-panel_title"><i class="icon icon-2"></i>服务介绍</div>
      <div class="servant-panel_subtitle">单项服务</div>
      <servantItemist :list="itemList" :ViewID="ViewID" :isItem="true" :limit="10"></servantItemist>
    </div>
    <!-- 套餐服务 -->
    <div class="servant-panel" v-if="packageList.length > 0" style="">
      <div class="servant-panel_subtitle">套餐服务</div>
      <servantItemist :list="packageList" :ViewID="ViewID" :isItem="false" :limit="10"></servantItemist>
    </div>
  </div>
</template>

<script>
import servantItemist from '../components/packageList'
export default {
  components: {
    servantItemist
  },
  data () {
    return {
      itemList: [],
      packageList: []
    }
  },
  computed: {
    ViewID () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getItemList()
    console.log(this.$route.params.id)
  },
  methods: {
    // 服务列表
    async getItemList () {
      const res = await this.$http.get(`/PackageList/${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.splitList(res.data.Data)
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    splitList (list) {
      list.map((item) => {
        if (item.IsContentSingleItem) {
          this.packageList.push(item)
        } else {
          this.itemList.push(item)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../components/index.less);
.vux-1px-t::before {
  border-top: 1px solid #d9f7f5;
}
.servant-panel {
  background: #fff;
  padding: 0 10px;
}
.servant-panel_service {
  padding-top: 10px;
}
</style>
