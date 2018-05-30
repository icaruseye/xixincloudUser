<template>
  <div class="has-tabbar">
    <div class="doctor-banner"></div>
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="false">
      <tab :line-width="2">
        <!-- <span class="weui-badge">1</span> -->
        <tab-item :selected="tabIndex === 0" @on-item-click="onItemClick">已预约</tab-item>
        <tab-item :selected="tabIndex === 1" @on-item-click="onItemClick">待服务</tab-item>
        <tab-item :selected="tabIndex === 2" @on-item-click="onItemClick">待评价</tab-item>
        <tab-item :selected="tabIndex === 3" @on-item-click="onItemClick">已完成</tab-item>
      </tab>
    </sticky>
    <!-- 已预约 -->
    <div class="tabbox" v-show="tabIndex === 0" style="padding-bottom:50px">
      <div class="weui-cell" @click="toDetail(1)">
        <div class="title">哦-上门输液</div>
        <div class="name">王二狗</div>
        <div class="time color-theme">预约服务时间:2018-04-24 04:20</div>
      </div>
      <div class="weui-cell" @click="toDetail(1)">
        <div class="title">哦-上门输液</div>
        <div class="name">王二狗</div>
        <div class="time color-theme">预约服务时间:2018-04-24 04:20</div>
      </div>
      <div class="weui-cell" @click="toDetail(1)">
        <div class="title">哦-上门输液</div>
        <div class="name">王二狗</div>
        <div class="time color-theme">预约服务时间:2018-04-24 04:20</div>
      </div>
      <div class="weui-cell" @click="toDetail(1)">
        <div class="title">哦-上门输液</div>
        <div class="name">王二狗</div>
        <div class="time color-theme">预约服务时间:2018-04-24 04:20</div>
      </div>
      <div class="weui-cell" @click="toDetail(1)">
        <div class="title">哦-上门输液</div>
        <div class="name">王二狗</div>
        <div class="time color-theme">预约服务时间:2018-04-24 04:20</div>
      </div>
      <div class="weui-cell" @click="toDetail(1)">
        <div class="title">哦-上门输液</div>
        <div class="name">王二狗</div>
        <div class="time color-theme">预约服务时间:2018-04-24 04:20</div>
      </div>
      <div class="weui-cell" @click="toDetail(1)">
        <div class="title">哦-上门输液</div>
        <div class="name">王二狗</div>
        <div class="time color-theme">预约服务时间:2018-04-24 04:20</div>
      </div>
      <div class="weui-cell" @click="toDetail(1)">
        <div class="title">哦-上门输液</div>
        <div class="name">王二狗</div>
        <div class="time color-theme">预约服务时间:2018-04-24 04:20</div>
      </div>
      <a class="weui-fixed weui-btn weui-btn_primary" href="/Service/ReserveServiceList">预约上门服务</a>
    </div>
    <!-- 待服务 -->
    <div class="tabbox" v-show="tabIndex === 1">
      <div class="weui-cell" @click="toDetail(1)">
        <div class="title">哦-上门输液</div>
        <div class="name">王二狗</div>
        <div class="time color-theme">预约服务时间:2018-04-24 04:20</div>
      </div>
    </div>
    <!-- 待评价 -->
    <div class="tabbox" v-show="tabIndex === 2">3</div>
    <!-- 已完成 -->
    <div class="tabbox" v-show="tabIndex === 3">4</div>
    <user-tabbar></user-tabbar>
  </div>
</template>

<script>
import { Tab, TabItem, Sticky } from 'vux'
import userTabbar from '@/components/common/userTabbar'
export default {
  components: {
    Tab,
    TabItem,
    Sticky,
    userTabbar
  },
  data () {
    return {
      tabIndex: this.$store.getters.serviceTabIndex
    }
  },
  watch: {
    serviceTabIndex (val) {
      this.tabIndex = val
    }
  },
  methods: {
    onItemClick (id) {
      this.$store.commit('setServiceTabIndex', id)
    },
    toDetail (id) {
      this.$router.push(`/service/detail/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.doctor-banner {
  height: 150px;
  background: url(../../assets/images/banner.png) no-repeat center;
  background-size: cover;
}

.tabbox {
  padding: 0 15px;
  background: #fff;
  .weui-cell {
    display: block;
    line-height: 1.5;
    .title {
      font-size: 14px;
      color: #333;
    }
    .name {
      font-size: 12px;
      color: #999
    }
    .time {
      font-size: 12px;
    }
  }
}
.weui-fixed {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  z-index: 99;
}
</style>