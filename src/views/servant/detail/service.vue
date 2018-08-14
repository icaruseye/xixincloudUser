<template>
  <div>
    <div class="has-tabbar">
      <xx-nav-bar
        left-text="返回"
        :right-text="userAccount.NickName"
        :avatar="userAccount.Avatar | transformImgUrl"
        @click-left="onNavbarClickLeft">
      </xx-nav-bar>
      <router-link to="/" class="share-btn" v-if="isShare"><i class="iconfont icon-qushouye"></i></router-link>
      <div class="servant-panel">
        <servantInfo :data="servantInfos"></servantInfo>
      </div>
      <!-- 服务介绍 -->
      <div class="servant-panel servant-panel_service" v-if="itemList.length > 0">
        <div class="servant-panel_title"><i class="icon icon-2"></i>服务介绍</div>
        <div class="servant-pane_subtitle">单项服务</div>
        <servantItemist :list="itemList" :isItem="true" :limit="10"></servantItemist>
      </div>
      <!-- 套餐服务 -->
      <div class="servant-panel" v-if="packageList.length > 0">
        <div class="servant-pane_subtitle">套餐服务</div>
        <servantItemist :list="packageList" :isItem="false" :limit="10"></servantItemist>
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
import { mapGetters } from 'vuex'
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
      itemList: [],
      packageList: []
      // comments: []
    }
  },
  computed: {
    isShare () {
      return this.$route.query.isShare === '1'
    },
    ...mapGetters([
      'userAccount'
    ])
  },
  mounted () {
    this.init()
    // this.getComments()
  },
  methods: {
    async init () {
      await this.getServantInfo()
      await this.getItemList()
    },
    // 获取服务人员信息
    async getServantInfo () {
      const res = await this.$http.get(`/ServantFriendInfo?servantID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.servantInfos = Object.assign(res.data.Data.ServantAccount, {AverageScore: res.data.Data.AverageScore, ServiceTimes: res.data.Data.ServiceTimes}, {ViewName: res.data.Data.ViewName})
        sessionStorage.setItem('myServantInfo', JSON.stringify(this.servantInfos))
      } else {
        this.$vux.toast.text('出错了')
      }
    },
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
    },
    onNavbarClickLeft () {
      this.$router.push('/servant')
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
.share-btn {
  position: fixed;
  bottom: 70px;
  right: 10px;
  font-size: 30px;
  width: 45px;
  height: 45px;
  line-height: 45px;
  z-index: 99;
  .iconfont {
    border-radius: 50%;
    font-size: 45px;
    color: #3ecccc;
    background: #fff;
  }
}
</style>
