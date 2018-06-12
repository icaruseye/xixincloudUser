<template>
  <div>
    <div class="has-tabbar">
      <sticky
        ref="sticky"
        :offset="0"
        :check-sticky-support="false">
        <xx-tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="25px">
          <xx-tab-item selected @on-item-click="onItemClick">全部</xx-tab-item>
          <xx-tab-item @on-item-click="onItemClick">待付款</xx-tab-item>
          <xx-tab-item @on-item-click="onItemClick">已付款</xx-tab-item>
        </xx-tab>
      </sticky>
      <!-- 代付款 -->
      <div v-show="tabIndex === 0">
        <div class="item-list">
          <div class="weui-cell">
            <div class="left">
              <img src="https://avatars1.githubusercontent.com/u/30564946?v=4" alt="">
            </div>
            <div class="mid">
              <div class="title">
                <span class="left">PICC换药</span>
                <span class="mid">医生：贾秉仁</span>
                <button class="btn">去付款</button>
                <!-- <span class="right">已付款</span> -->
              </div>
              <div class="content">内容：阿莫西林3颗含服</div>
              <div class="time">
                <span>2018/01/01 13:30</span>
                <span>订单编号:201806031508</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 已付款 -->
      <div v-show="tabIndex === 1">
      </div>
      <!-- 已取消 -->
      <div v-show="tabIndex === 2">
        <div class="empty-box">
          <div><i class="iconfont icon-zanwushuju"></i></div>
          <div>暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sticky } from 'vux'
export default {
  components: {
    Sticky
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  methods: {
    onItemClick (index) {
      console.log(index)
      this.tabIndex = index
    },
    goServiceList (id) {
      this.$router.push(`/service/list/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.item-list {
  padding: 0 15px;
  background: #fff;
  .weui-cell {
    display: flex;
    align-items: center;
    .left {
      margin-right: 15px;
      text-align: center;
      font-size: 12px;
      color: @theme-color;
      img {
        border-radius: 50%;
        margin: 0 auto 5px;
        display: block;
        width: 40px;
        height: 40px;
      }
    }
    .mid {
      flex: 1;
      font-size: 12px;
      color: #666;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        .left {
          font-size: 18px;
          color: #333;
        }
        .mid {
          margin-right: 30px;
          font-size: 13px;
          color: #3ecccc;
          text-align: right;
        }
        .right {
          font-size: 14px;
          color: #999;
        }
        .btn {
          display: block;
          width: 60px;
          height: 23px;
          line-height: 23px;
          box-sizing: border-box;
          border: 1px solid #F8A519;
          border-radius: 4px;
          font-size: 14px;
          color: #F8A519;
          text-align: center;
          background: transparent;
        }
      }
      .content {
        font-size: 14px;
        color: #666;
      }
      .time {
        font-size: 12px;
        color: #999;
        span:first-child {
          margin-right: 30px;
        }
      }
    }
    .right {
    }
  }
}
</style>
