<template>
  <div>
    <div class="has-tabbar">
      <div class="servant-panel">
        <servantInfo :data="servantInfos"></servantInfo>
      </div>
      <!-- 医生服务 -->
      <div class="servant-panel servant-panel_service">
        <div class="servant-panel_title"><i class="icon icon-2"></i>医生服务</div>
        <div class="servant-pane_subtitle">单项服务</div>
        <servantItemist></servantItemist>
        <div class="servant-unfold_bar">
          <div><i class="iconfont icon-jiantoushang"></i></div>
          <div>展开</div>
        </div>
      </div>
      <!-- 套餐服务 -->
      <div class="servant-panel">
        <div class="servant-pane_subtitle">套餐服务</div>
        <servantItemist></servantItemist>
        <div class="servant-unfold_bar">
          <div><i class="iconfont icon-jiantoushang"></i></div>
          <div>展开</div>
        </div>
      </div>
      <!-- 患者评价 -->
      <!-- <div class="servant-panel servant-panel_comments">
        <div class="servant-panel_title"><i class="icon icon-3"></i>患者评价</div>
        <servantComments :list="comments"></servantComments>
        <div class="servant-unfold_bar">
          <div><i class="iconfont icon-jiantoushang"></i></div>
          <div>更多666条评价</div>
        </div>
      </div> -->
      <button type="button" class="weui-btn weui-btn-bottom weui-btn_primary" @click="gochat">发消息</button>
    </div>
  </div>
</template>

<script>
import servantInfo from '../components/service-info'
import servantItemist from '../components/package-list'
import servantComments from '../components/comments'
export default {
  components: {
    servantInfo,
    servantItemist,
    servantComments
  },
  data () {
    return {
      servantInfos: {},
      itemList: []
      // comments: []
    }
  },
  created () {
    this.getServantInfo()
    this.getItemList()
    // this.getComments()
  },
  methods: {
    // 获取服务人员信息
    async getServantInfo () {
      const res = await this.$http.get(`/ServantFriendInfo?servantID=${this.$route.query.id}`)
      if (res.data.Code === 100000) {
        this.servantInfos = res.data.Data
      }
    },
    // 单项服务
    async getItemList () {
      const res = await this.$http.get(`/PackageList?servantID=${this.$route.query.id}`)
      if (res.data.Code === 100000) {
        this.itemList = res.data.Data
      }
    },
    // 套餐服务
    async getPackageList () {
      const res = await this.$http.get()
      if (res.data.Code === 100000) {
        this.itemList = res.data.Data
      }
    },
    // 评价
    // async getComments () {
    //   const res = await this.$http.get(`/ServantReview/${this.$route.query.id}/top5`)
    //   if (res.data.Code === 100000) {
    //     this.comments = res.data.Data
    //   }
    // },
    gochat () {
      this.$router.push(`/servant/chat/${this.$route.params.id}`)
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
  margin: 10px 7px;
  border-radius: 6px;
  background: #fff;
}

.servant-panel_service {
  padding-top: 10px;
}

.servant-panel_comments {
  padding-top: 15px;
}
.icon-jiantoushang {
  font-size: 12px;
}
</style>
