<template>
  <div class="has-tabbar">
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="false">
      <tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="25px">
        <tab-item :selected="tabIndex === 0" @on-item-click="onItemClick">已购买</tab-item>
        <tab-item :selected="tabIndex === 1" @on-item-click="onItemClick">服务中</tab-item>
        <tab-item :selected="tabIndex === 2" @on-item-click="onItemClick">已完成</tab-item>
      </tab>
    </sticky>
    <!-- 已购买 -->
    <div class="tabbox" v-show="tabIndex === 0" style="padding-bottom:50px">
      <div class="weui-panel">
        <div class="weui-panel_subtitle">单项服务</div>
        <div class="weui-panel_subinfo">
          <div class="icon"><img src="https://img3.doubanio.com/icon/u53078059-35.jpg" alt=""></div>
          <div class="mid">
            <div class="name">陈医师</div>
            <div class="role">萌宠砖家</div>
          </div>
        </div>
        <div class="weui-list_container">
          <div class="weui-list_item">
            <div class="icon"><img src="@/assets/images/icon_picc.png" alt=""></div>
            <div class="mid">
              <div style="display: flex;justify-content: space-between;align-items: baseline;">
                <div class="title">院内陪诊院内陪诊…</div>
                <div class="balance">剩余：2次</div>
              </div>
              <div class="describe">到期时间：2018/06/08</div>
            </div>
            <div class="btn">
              <button>预约</button>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-panel">
        <div class="weui-panel_subtitle">套餐服务</div>
        <div class="weui-panel_subinfo">
          <div class="icon"><img src="https://img3.doubanio.com/icon/u53078059-35.jpg" alt=""></div>
          <div class="mid">
            <div class="name">陈医师</div>
            <div class="role">萌宠砖家</div>
          </div>
        </div>
        <div class="weui-panel_category">医护上门套餐包</div>
        <div class="weui-list_container">
          <div class="weui-list_item">
            <div class="icon"><img src="@/assets/images/icon_picc.png" alt=""></div>
            <div class="mid">
              <div style="display: flex;justify-content: space-between;align-items: baseline;">
                <div class="title">院内陪诊院内陪诊…</div>
                <div class="balance">剩余：2次</div>
              </div>
              <div class="describe">到期时间：2018/06/08</div>
            </div>
            <div class="btn">
              <button>预约</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 服务中 -->
    <div class="tabbox" v-show="tabIndex === 1">
      <div class="weui-cell" @click="toDetail(1)">
        <div class="title">哦-上门输液</div>
        <div class="name">王二狗</div>
        <div class="time color-theme">预约服务时间:2018-04-24 04:20</div>
      </div>
    </div>
    <!-- 已完成 -->
    <div class="tabbox" v-show="tabIndex === 2">2</div>
    <user-tabbar></user-tabbar>
  </div>
</template>

<script>
import { Tab, TabItem } from '@/components/common/tab'
import { Sticky } from 'vux'
import userTabbar from '@/components/common/userTabbar'
export default {
  metaInfo: {
    title: '服务'
  },
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
.weui-panel {
  padding: 0 12px;
}

.weui-panel_subtitle {
  padding-top: 17px;
  font-size: 15px;
  color: #666;
}

.weui-panel_subinfo {
  position: relative;
  padding: 17px 0 6px 0;
  display: flex;
  align-items: center;
  &::after {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d9f7f5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  .icon {
    width: 37px;
    height: 37px;
    border-radius: 50%;
    overflow: hidden;
  }
  .mid {
    margin-left: 9px;
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 18px;
    color: #333;
    .role {
      margin: 0 5px;
      font-size: 12px;
      color: #3ecccc;
    }
  }
}

.weui-list_item {
  padding: 13px 5px;
  display: flex;
  align-items: center;
  .icon {
    width: 29px;
    height: 29px;
  }
  .mid {
    flex: 1;
    margin: 0 19px;
    .title {
      font-size: 15px;
      color: #666;
      font-weight: bold;
    }
    .balance {
      font-size: 12px;
      color: #999;
    }
    .describe {
      font-size: 12px;
      color: #999;
    }
  }
  .btn {
    button {
      width: 50px;
      height: 22px;
      line-height: 22px;
      background: #3ecccc;
      color: #fff;
      text-align: center;
      font-size: 15px;
      border: 0;
      border-radius: 4px;
    }
  }
}

.weui-panel_category {
  position: relative;
  padding: 15px 5px;
  font-size: 15px;
  color: #666;
  font-weight: bold;
  &::after {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
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
</style>