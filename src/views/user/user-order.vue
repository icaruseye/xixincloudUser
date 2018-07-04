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
      <!-- 全部 -->
      <div v-show="tabIndex === 0">
        <template v-for="(item, index) in dataList">
          <div class="weui-cells" :key="index">
            <div class="row-1">
              <div>订单编号:{{item.UserOrder.OrderID}}</div>
              <div v-if="item.UserOrder.State === 0">需支付：￥{{item.UserOrder.ShouldPayPrice ? (item.UserOrder.ShouldPayPrice/100).toFixed(2) : '0.0'}}元</div>
              <div v-if="item.UserOrder.State === 2">已付款</div>
            </div>
            <div class="row-2">
              <div class="left">
                <img :src="item.Avatar | transformImgUrl" alt="">
              </div>
              <div class="mid">
                <div class="title">{{item.PackageName}}</div>
                <div>服务者: {{item.ServantName}}</div>
                <div class="time">
                  <span>{{item.UserOrder.PayTime}}</span>
                </div>
              </div>
            </div>
            <div class="row-3">
              <div class="text" v-if="item.UserOrder.State === 0"><button class="btn">待付款</button></div>
              <!-- <div class="text" v-if="item.UserOrder.State === 0"><button class="btn">去付款</button></div> -->
              <div class="text" v-if="item.UserOrder.State === 2">已付款：￥{{item.UserOrder.ShouldPayPrice ? (item.UserOrder.ShouldPayPrice/100).toFixed(2) : '0.0'}}元</div>
            </div>
          </div>
        </template>
        <xxOccupiedBox v-if="flag1">
          <p>暂无订单</p>
        </xxOccupiedBox>
      </div>
      <!-- 待付款 -->
      <div v-show="tabIndex === 1">
        <template v-for="(item, index) in dataList">
          <div class="weui-cells" :key="index">
            <div class="row-1">
              <div>订单编号:{{item.UserOrder.OrderID}}</div>
              <div v-if="item.UserOrder.State === 0">需支付：￥{{item.UserOrder.ShouldPayPrice ? (item.UserOrder.ShouldPayPrice/100).toFixed(2) : '0.0'}}元</div>
              <div v-if="item.UserOrder.State === 2">已付款</div>
            </div>
            <div class="row-2">
              <div class="left">
                <img :src="item.Avatar | transformImgUrl" alt="">
              </div>
              <div class="mid">
                <div class="title">{{item.PackageName}}</div>
                <div>服务者: {{item.ServantName}}</div>
                <div class="time">
                  <span>{{item.UserOrder.PayTime}}</span>
                </div>
              </div>
            </div>
            <div class="row-3">
              <div class="text" v-if="item.UserOrder.State === 0"><button class="btn">待付款</button></div>
              <!-- <div class="text" v-if="item.UserOrder.State === 0"><button class="btn" @canplay="toPay">去付款</button></div> -->
              <div class="text" v-if="item.UserOrder.State === 2">已付款：￥{{item.UserOrder.ShouldPayPrice ? (item.UserOrder.ShouldPayPrice/100).toFixed(2) : '0.0'}}元</div>
            </div>
          </div>
        </template>
        <xxOccupiedBox v-if="flag2">
          <p>暂无未付款订单</p>
        </xxOccupiedBox>
      </div>
      <!-- 已付款 -->
      <div v-show="tabIndex === 2">
        <template v-for="(item, index) in dataList">
          <div class="weui-cells" :key="index">
            <div class="row-1">
              <div>订单编号:{{item.UserOrder.OrderID}}</div>
              <div v-if="item.UserOrder.State === 0">需支付：￥{{item.UserOrder.ShouldPayPrice ? (item.UserOrder.ShouldPayPrice/100).toFixed(2) : '0.0'}}元</div>
              <div v-if="item.UserOrder.State === 2">已付款</div>
            </div>
            <div class="row-2">
              <div class="left">
                <img :src="item.Avatar | transformImgUrl" alt="">
              </div>
              <div class="mid">
                <div class="title">{{item.PackageName}}</div>
                <div>服务者: {{item.ServantName}}</div>
                <div class="time">
                  <span>{{item.UserOrder.PayTime}}</span>
                </div>
              </div>
            </div>
            <div class="row-3">
              <div class="text" v-if="item.UserOrder.State === 0"><button class="btn">去付款</button></div>
              <div class="text" v-if="item.UserOrder.State === 2">已付款：￥{{item.UserOrder.ShouldPayPrice ? (item.UserOrder.ShouldPayPrice/100).toFixed(2) : '0.0'}}元</div>
            </div>
          </div>
        </template>
      <!-- 空状态 -->
      <xxOccupiedBox v-if="flag3">
        <p>暂无已付款订单</p>
      </xxOccupiedBox>
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
      tabIndex: 0,
      dataList: [],
      flag1: false,
      flag2: false,
      flag3: false
    }
  },
  watch: {
    tabIndex () {
      this.initData()
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const that = this
      that.dataList = []
      switch (that.tabIndex) {
        case 0:
          that.getAll()
          break
        case 1:
          that.getWaitToPay().then(value => {
            that.dataList = value
            this.flag2 = that.dataList.length === 0
          })
          break
        case 2:
          that.getPayed().then(value => {
            that.dataList = value
            this.flag3 = that.dataList.length === 0
          })
          break
      }
    },
    async getAll () {
      const that = this
      await that.getWaitToPay().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getPayed().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      this.flag1 = this.dataList.length === 0
    },
    async getWaitToPay () {
      const res = await this.$http.get('/UserOrder/WaitToPay')
      if (res.data.Code === 100000) {
        return res.data.Data
      }
    },
    async getPayed () {
      const res = await this.$http.get('/UserOrder/Payed')
      if (res.data.Code === 100000) {
        return res.data.Data
      }
    },
    async toPay () {

    },
    onItemClick (index) {
      this.tabIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.weui-cells {
  padding: 0;
  margin-top: 15px;
  background: #fff;
  .row-1 {
    padding: 0 15px;
    display: flex;
    font-size: 13px;
    color: #999;
    height: 35px;
    line-height: 35px;
    justify-content: space-between;
  }
  .row-2 {
    background: #f7f7f7;
    padding: 10px 15px;
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
        font-size: 15px;
        font-weight: bold;
        color: #666;
      }
      .time {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .row-3 {
    display: flex;
    height: 40px;
    padding: 0 15px;
    align-items: center;
    flex-direction: row-reverse;
    .text {
      font-size: 14px;
      color: #666;
    }
    .btn {
      margin-left: 5px;
      width: 60px;
      height: 23px;
      line-height: 23px;
      box-sizing: border-box;
      border: 1px solid #F8A519;
      border-radius: 15px;
      font-size: 14px;
      color: #F8A519;
      text-align: center;
      background: transparent;
    }
  }
}
</style>
