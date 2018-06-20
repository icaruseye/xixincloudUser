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
      <!-- 空状态 -->
      <div v-if="UserOrderDetailsList.ItemsByDoc.length === 0 && UserOrderDetailsList.ItemsByDoc.length === 0">暂无可预约的服务</div>
      <!-- 单项服务 -->
      <div class="weui-panel" v-if="UserOrderDetailsList.ItemsByDoc.length !== 0">
        <div class="weui-panel_subtitle">单项服务</div>
        <template v-for="(pItem, pIndex) in UserOrderDetailsList.ItemsByDoc">
          <div :key="pIndex">
            <div class="weui-panel_subinfo">
              <div class="icon"><img :src="pItem.ContentOfItems[0].AvatorIMG" alt=""></div>
              <div class="mid">
                <div class="name">{{pItem.ContentOfItems[0].DoctorName}}</div>
                <div class="role">萌宠砖家</div>
              </div>
            </div>
            <template v-for="(cItem, cIndex) in pItem.ContentOfItems">
              <div class="weui-list_container" :key="cIndex">
                <template v-for="(mItem, mIndex) in cItem._ItemsDetails">
                  <div class="weui-list_item" :key="mIndex">
                    <div class="icon"><img src="@/assets/images/icon_picc.png" alt=""></div>
                    <div class="mid">
                      <div style="display: flex;justify-content: space-between;align-items: baseline;">
                        <div class="title">{{mItem.SingleItem.Name}}</div>
                        <div class="balance">剩余：{{mItem.OrderDetail.LeftNum}}次</div>
                      </div>
                      <div class="describe">到期时间：2018/06/08</div>
                    </div>
                    <div class="btn">
                      <button @click="toReserve(mItem.OrderDetail.ID, pItem.ContentOfItems[0].DoctorName, mItem.SingleItem.Name)">预约</button>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </template>
      </div>
      <!-- 套餐服务 -->
      <div class="weui-panel" v-if="UserOrderDetailsList.PackByDoc.length !== 0">
        <div class="weui-panel_subtitle">套餐服务</div>
        <template v-for="(pItem, pIndex) in UserOrderDetailsList.PackByDoc">
          <div :key="pIndex">
            <div class="weui-panel_subinfo">
              <div class="icon"><img :src="pItem.ContentOfItems[0].AvatorIMG" alt=""></div>
              <div class="mid">
                <div class="name">{{pItem.ContentOfItems[0].DoctorName}}</div>
                <div class="role">萌宠砖家</div>
              </div>
            </div>
            <template v-for="(cItem, cIndex) in pItem.ContentOfItems">
              <div :key="cIndex">
                <div class="weui-panel_category">{{cItem.Package.Name}}</div>
                <div class="weui-list_container">
                  <template v-for="(mItem, mIndex) in cItem._ItemsDetails">
                    <div class="weui-list_item" :key="mIndex">
                      <div class="icon"><img src="@/assets/images/icon_picc.png" alt=""></div>
                      <div class="mid">
                        <div style="display: flex;justify-content: space-between;align-items: baseline;">
                          <div class="title">{{mItem.SingleItem.Name}}</div>
                          <div class="balance">剩余：{{mItem.OrderDetail.LeftNum}}次</div>
                        </div>
                        <div class="describe">到期时间：2018/06/08</div>
                      </div>
                      <div class="btn">
                      <button @click="toReserve(mItem.OrderDetail.ID, pItem.ContentOfItems[0].DoctorName, mItem.SingleItem.Name)">预约</button>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </template>
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
        <div class="weui-list_container" v-if="dataList.length >0">
          <template v-for="(item, index) in dataList">
            <div class="weui-list_item" :key="index" @click="missionDetail(item.ID, item.Type)">
              <div class="avatar"><img src="@/assets/images/icon_picc.png" alt=""></div>
              <div class="mid">
                <div style="display: flex;justify-content: space-between;align-items: baseline;">
                  <div class="title" style="font-weight:normal">{{item.ItemName}}</div>
                  <div class="servant">护士：{{item.ServantName}}</div>
                </div>
                <div style="font-size:14px;color:#666;">内容：</div>
                <div class="describe">到期时间：{{item.EndTime | timeFormat}}</div>
              </div>
              <img v-if="item.State === 0 && item.Type === 0" style="width:50px;height:50px;" src="@/assets/images/ic_dqr.png" alt="">
              <img v-if="item.Type === 1 && [0,1,2,3].indexOf(item.State) !== -1" style="width:50px;height:50px;" src="@/assets/images/ic_dff.png" alt="">
              <img v-if="item.State === 4" style="width:50px;height:50px;" src="@/assets/images/ic_dpj.png" alt="">
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 已完成 -->
    <div class="tabbox" v-show="tabIndex === 2">
      <div class="weui-panel">
        <div class="weui-list_container">
          <template v-for="(item, index) in dataListDone">
            <div class="weui-list_item" :key="index" @click="missionDetail(item.ID, item.Type)">
              <div class="avatar"><img src="@/assets/images/icon_picc.png" alt=""></div>
              <div class="mid">
                <div style="display: flex;justify-content: space-between;align-items: baseline;">
                  <div class="title" style="font-weight:normal">{{item.ItemName}}</div>
                  <div class="servant">护士：{{item.ServantName}}</div>
                </div>
                <div style="font-size:14px;color:#666;">内容：</div>
                <div class="describe">到期时间：{{item.EndTime | timeFormat}}</div>
              </div>
              <img v-if="item.State === 0 && item.Type === 0" style="width:50px;height:50px;" src="@/assets/images/ic_dqr.png" alt="">
              <img v-if="item.Type === 1 && [0,1,2,3].indexOf(item.State) !== -1" style="width:50px;height:50px;" src="@/assets/images/ic_dff.png" alt="">
              <img v-if="item.State === 4" style="width:50px;height:50px;" src="@/assets/images/ic_dpj.png" alt="">
            </div>
          </template>
        </div>
      </div>
    </div>
    <xx-tabbar></xx-tabbar>
  </div>
</template>

<script>
import { Sticky, dateFormat } from 'vux'
export default {
  metaInfo: {
    title: '服务'
  },
  filters: {
    timeFormat (value) {
      return dateFormat(new Date(value), 'YYYY-MM-DD HH:mm:ss')
    }
  },
  components: {
    Sticky
  },
  data () {
    return {
      dataList: [],
      dataListDone: [],
      tabIndex: this.$store.getters.serviceTabIndex,
      checkerIndex: 0, // 0、全部；1、待确认；2、待服务；3、待评价
      UserOrderDetailsList: {
        ItemsByDoc: [],
        PackByDoc: []
      }
    }
  },
  watch: {
    serviceTabIndex (val) {
      this.tabIndex = val
    },
    checkerIndex () {
      this.initData()
    }
  },
  created () {
    // 预约列表
    this.getUserOrderDetailsList()
    // 服务中列表
    this.initData()
    // 已完成列表
    this.getDone()
  },
  methods: {
    /** 初始化 */
    initData () {
      const that = this
      that.dataList = []
      switch (that.checkerIndex) {
        case 0:
          that.getAll()
          break
        case 1:
          that.getUserReserveServiceList().then(value => {
            that.dataList = value
          })
          break
        case 2:
          that.getInServiceList().then(value => {
            that.dataList = value
          })
          break
        case 3:
          that.getWaitForReview().then(value => {
            that.dataList = value
          })
          break
      }
    },
    /** 查看全部 */
    async getAll () {
      const that = this
      await that.getUserReserveServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getInServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getWaitForReview().then(value => {
        that.dataList = that.dataList.concat(value)
      })
    },
    /** 待确认 */
    async getUserReserveServiceList () {
      const res = await this.$http.get('/UserReserveServiceList')
      return res.data.Data
    },
    /** 待服务 */
    async getInServiceList () {
      const res = await this.$http.get('/MissionList/InService')
      return res.data.Data
    },
    /** 待评价 */
    async getWaitForReview () {
      const res = await this.$http.get('/MissionList/WaitForReview')
      return res.data.Data
    },
    /** 预约列表 */
    async getUserOrderDetailsList () {
      const res = await this.$http.get('/UserOrderDetailsList')
      if (res.data.Code === 100000) {
        this.UserOrderDetailsList = res.data.Data
      }
    },
    // 已完成
    async getDone () {
      const res = await this.$http.get('/MissionList/Complate')
      if (res.data.Code === 100000) {
        this.dataListDone = res.data.Data
      }
    },
    missionDetail (id, type) {
      this.$router.push(`/service/in/${id}?type=${type}`)
    },
    changeChecker (index) {
      this.checkerIndex = index
    },
    onItemClick (id) {
      this.$store.commit('setServiceTabIndex', id)
    },
    toDetail (id) {
      this.$router.push(`/service/in/${id}`)
    },
    toReserve (id, servant, name) {
      this.$router.push(`/service/reserve/${id}?servant=${servant}&name=${name}`)
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
      border-radius: 2px;
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