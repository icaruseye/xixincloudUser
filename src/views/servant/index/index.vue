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
        <xx-tab-item :selected="selectName === 'service'" @click.native="changeTab('service')">服务</xx-tab-item>
        <xx-tab-item v-if="moduleSwitch.CourseSwitch" :selected="selectName === 'course'" @click.native="changeTab('course')">课程</xx-tab-item>
        <xx-tab-item v-if="moduleSwitch.RegisterSwitch" :selected="selectName === 'registration'" @click.native="changeTab('registration')">预约挂号</xx-tab-item>
      </xx-tab>
      <service :ViewID="this.ViewID" v-show="selectName === 'service'"></service>
      <course :ViewID="this.ViewID" v-show="selectName === 'course'"></course>
      <registration :ViewID="this.ViewID" v-show="selectName === 'registration'"></registration>
      <button type="button" v-show="isShowChatButton" class="weui-btn weui-btn-bottom weui-btn_primary" @click="gochat">购买咨询</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import servantInfo from '../components/serviceInfo'
import service from './service'
import course from './course'
import registration from './registration'
export default {
  components: {
    servantInfo,
    service,
    course,
    registration
  },
  data () {
    return {
      isShowChatButton: true,
      selectName: this.$store.getters.servantTabIndex,
      tabIndex: this.$store.getters.servantTabIndex,
      servantInfos: {}
    }
  },
  computed: {
    isShare () {
      return this.$route.query.isShare === '1'
    },
    ViewID () {
      return this.$route.params.id
    },
    ...mapGetters([
      'moduleSwitch'
    ])
  },
  watch: {
    SET_SERVANT_TAB (val) {
      this.selectName = val
    }
  },
  mounted () {
    this.setButtonStatus(this.selectName)
    this.getServantInfo()
  },
  methods: {
    // 获取服务人员信息
    async getServantInfo () {
      this.$vux.loading.show()
      const res = await this.$http.get(`/ServantFriendInfo?servantID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.servantInfos = Object.assign(res.data.Data.ServantAccount, {AverageScore: res.data.Data.AverageScore, ServiceTimes: res.data.Data.ServiceTimes}, {ViewName: res.data.Data.ViewName})
        sessionStorage.setItem('myServantInfo', JSON.stringify(this.servantInfos))
      } else {
        this.$vux.toast.text('出错了')
      }
      this.$vux.loading.hide()
    },
    gochat () {
      this.$router.push(`/servant/chat/${this.$route.params.id}`)
    },
    onNavbarClickLeft () {
      this.$router.push(`/servant`)
    },
    changeTab (name) {
      this.selectName = name
      this.$store.commit('SET_SERVANT_TAB', name)
      this.setButtonStatus(name)
    },
    setButtonStatus (name) {
      if (name === 'registration') {
        this.isShowChatButton = false
      } else {
        this.isShowChatButton = true
      }
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
