<template>
  <div class="has-tabbar">
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="false">
      <xx-tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="25px">
        <xx-tab-item :selected="tabIndex === 0" @on-item-click="onItemClick">已购买</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 1" @on-item-click="onItemClick">服务中</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 2" @on-item-click="onItemClick">已完成</xx-tab-item>
      </xx-tab>
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
                <div class="title" style="font-size:18px;">院内陪诊院内陪诊…</div>
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
      <div class="checker-bar">
        <span class="">筛选条件：</span>
        <ul>
          <li :class="checkerIndex === 0 ? 'active' : ''" @click="changeChecker(0)">全部</li>
          <li :class="checkerIndex === 1 ? 'active' : ''" @click="changeChecker(1)">待确认</li>
          <li :class="checkerIndex === 2 ? 'active' : ''" @click="changeChecker(2)">待服务</li>
          <li :class="checkerIndex === 3 ? 'active' : ''" @click="changeChecker(3)">待评价</li>
        </ul>
      </div>
      <div class="weui-panel" style="margin-top:0">
        <div class="weui-list_container">
          <div class="weui-list_item">
            <div class="avatar"><img src="https://tva1.sinaimg.cn/crop.0.0.180.180.50/5e9d399fjw1e8qgp5bmzyj2050050aa8.jpg" alt=""></div>
            <div class="mid">
              <div style="display: flex;justify-content: space-between;align-items: baseline;">
                <div class="title" style="font-weight:normal">PICC换药</div>
                <div class="servant">护士：肖丽涵</div>
              </div>
              <div style="font-size:14px;color:#666;">内容：阿莫西林3颗含服</div>
              <div class="describe">到期时间：2018/06/08</div>
            </div>
            <img style="width:50px;height:50px;" src="@/assets/images/ic_dqr.png" alt="">
          </div>
          <div class="weui-list_item">
            <div class="avatar"><img src="@/assets/images/icon_picc.png" alt=""></div>
            <div class="mid">
              <div style="display: flex;justify-content: space-between;align-items: baseline;">
                <div class="title" style="font-weight:normal">PICC换药</div>
                <div class="servant">护士：肖丽涵</div>
              </div>
              <div style="font-size:14px;color:#666;">内容：阿莫西林3颗含服</div>
              <div class="describe">到期时间：2018/06/08</div>
            </div>
            <img style="width:50px;height:50px;" src="@/assets/images/ic_dff.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 已完成 -->
    <div class="tabbox" v-show="tabIndex === 2">
      <div class="weui-panel">
        <div class="weui-list_container">
          <div class="weui-list_item" @click="toDetail(1)">
            <div class="avatar"><img src="https://tva1.sinaimg.cn/crop.0.0.180.180.50/5e9d399fjw1e8qgp5bmzyj2050050aa8.jpg" alt=""></div>
            <div class="mid">
              <div style="display: flex;justify-content: space-between;align-items: baseline;">
                <div class="title" style="font-weight:normal">PICC换药</div>
                <div class="servant">护士：肖丽涵</div>
              </div>
              <div style="font-size:14px;color:#666;">内容：阿莫西林3颗含服</div>
              <div class="describe">到期时间：2018/06/08</div>
            </div>
            <img style="width:50px;height:50px;" src="@/assets/images/ic_ywj.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <xx-tabbar></xx-tabbar>
  </div>
</template>

<script>
import { Sticky } from 'vux'
export default {
  metaInfo: {
    title: '服务'
  },
  components: {
    Sticky
  },
  data () {
    return {
      tabIndex: this.$store.getters.serviceTabIndex,
      checkerIndex: 0
    }
  },
  watch: {
    serviceTabIndex (val) {
      this.tabIndex = val
    }
  },
  methods: {
    changeChecker (index) {
      this.checkerIndex = index
    },
    onItemClick (id) {
      this.$store.commit('setServiceTabIndex', id)
    },
    toDetail (id) {
      this.$router.push(`/service/in/${id}`)
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
  position: relative;
  padding: 13px 5px;
  display: flex;
  align-items: center;
  &::after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #d9f7f5;
    color: #d9f7f5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  &:last-child::after {
    border: 0;
  }
  .icon {
    width: 29px;
    height: 29px;
  }
  .avatar {
    border-radius: 50%;
    width: 37px;
    height: 37px;
    overflow: hidden;
  }
  .mid {
    flex: 1;
    margin: 0 19px;
    color: #999;
    .title {
      font-size: 15px;
      color: #666;
      font-weight: bold;
    }
    .balance {
      font-size: 12px;
    }
    .servant {
      font-size: 13px;
      color: #3ecccc;
    }
    .describe {
      font-size: 12px;
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
.checker-bar {
  padding: 10px 12px;
  display: flex;
  font-size: 15px;
  color: #999;
  ul {
    display: flex;
    li {
      position: relative;
      padding: 0 10px;
      &::after {
        content: "";
        position: absolute;
        right: 0;
        background: #999;
        height: 25px;
        border-right: 1px solid #D8D8D8;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      &:last-child::after {
        border: 0;
      }
    }
    li.active {
      color: #3ecccc;
    }
  }
}
</style>