<template>
  <div>
    <div class="has-tabbar">
      <sticky
        ref="sticky"
        :offset="0"
        :check-sticky-support="false">
        <tab :line-width="2">
          <tab-item selected @on-item-click="onItemClick">代付款</tab-item>
          <tab-item @on-item-click="onItemClick">已付款</tab-item>
          <tab-item @on-item-click="onItemClick">已取消</tab-item>
        </tab>
      </sticky>
      <!-- 代付款 -->
      <div v-show="tabIndex === 0">
        <div class="item-list">
          <div class="weui-cell">
            <div class="left">
              <img src="https://avatars1.githubusercontent.com/u/30564946?v=4" alt="">
              <span>伊卡洛斯</span>
            </div>
            <div class="mid">
              <div class="title">测试服务包</div>
              <ul>
                <!-- <li>订单编号：<br>01804271821318114692</li> -->
                <li>实际付款：<span class="color-ye">¥0.00 </span></li>
                <li>下单时间：2018-04-27</li>
            </ul>
            </div>
            <div class="right">
              <a href="javascript:;">去付款</a>
            </div>
          </div>
          <div class="weui-cell">
            <div class="left">
              <img src="https://avatars1.githubusercontent.com/u/30564946?v=4" alt="">
              <span>代达罗斯</span>
            </div>
            <div class="mid">
              <div class="title">迷楼服务包2</div>
              <ul>
                <!-- <li>订单编号：<br>01804271821318114692</li> -->
                <li>实际付款：<span class="color-ye">¥10.00 </span></li>
                <li>下单时间：2018-04-27</li>
            </ul>
            </div>
            <div class="right">
              <a href="javascript:;">去付款</a>
            </div>
          </div>
        </div>
      </div>
      <!-- 已付款 -->
      <div v-show="tabIndex === 1">
        <div class="item-list">
          <div class="weui-cell">
            <div class="left">
              <img src="https://avatars1.githubusercontent.com/u/30564946?v=4" alt="">
              <span>伊卡洛斯</span>
            </div>
            <div class="mid">
              <div class="title">测试服务包</div>
              <ul>
                <!-- <li>订单编号：<br>01804271821318114692</li> -->
                <li>实际付款：<span class="color-ye">¥0.00 </span></li>
                <li>下单时间：2018-04-27</li>
            </ul>
            </div>
            <div class="right">
              <a href="javascript:;" @click="goServiceList(1)">立即预约</a>
            </div>
          </div></div>
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
import { Tab, TabItem, Sticky } from 'vux'
export default {
  components: {
    Sticky,
    Tab,
    TabItem
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
        font-size: 14px;
        color: #333;
      }
    }
    .right {
      a {
        display: block;
        padding: 5px 10px;
        font-size: 14px;
        color: #fff;
        background: @theme-color;
        border-radius: 2px;
      }
    }
  }
}
</style>
