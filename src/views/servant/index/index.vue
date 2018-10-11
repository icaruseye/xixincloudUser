<template>
  <div>
    <div class="has-tabbar">
      <xx-nav-bar
        left-text="返回"
        @click-left="onNavbarClickLeft">
      </xx-nav-bar>
      <router-link to="/" class="share-btn" v-if="isShare"><i class="iconfont icon-qushouye"></i></router-link>
      <div class="servant-panel">
        <servantInfo :data="servantInfos"></servantInfo>
      </div>
      <xx-tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="25px" style="border-bottom: 1px solid rgba(238, 238, 238, .3)">
        <xx-tab-item :selected="tabIndex === 0" @on-item-click="tabItemClick" @click.native="to('service')">服务</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 1" @on-item-click="tabItemClick" @click.native="to('course')">课程</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 2" @on-item-click="tabItemClick" @click.native="to('registration')">预约挂号</xx-tab-item>
      </xx-tab>
      <router-view></router-view>
      <button type="button" class="weui-btn weui-btn-bottom weui-btn_primary" @click="gochat">购买咨询</button>
    </div>
  </div>
</template>

<script>
import servantInfo from '../components/service-info'
export default {
  components: {
    servantInfo
  },
  data () {
    return {
      servantInfos: {},
      tabIndex: 0
    }
  },
  computed: {
    isShare () {
      return this.$route.query.isShare === '1'
    }
  },
  mounted () {
    this.getServantInfo()
  },
  methods: {
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
    gochat () {
      this.$router.push(`/servant/chat/${this.$route.params.id}`)
    },
    to (url) {
      this.$router.replace(`/servant/${this.$route.params.id}/${url}`)
    },
    onNavbarClickLeft () {
      this.$router.push(`/servant`)
    },
    tabItemClick (val) {
      this.tabIndex = val
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../components/index.less);
.xixin-tab {
  box-shadow: 0;
}
.vux-1px-t::before {
  border-top: 1px solid #d9f7f5;
}
.servant-panel {
  margin: 10px;
  border-radius: 4px;
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
