<template>
  <div class="has-tabbar">
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="true">
      <xx-tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="25px">
        <xx-tab-item :selected="tabIndex === 0" @on-item-click="onItemClick">已购买</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 1" @on-item-click="onItemClick">服务中</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 2" @on-item-click="onItemClick">已完成</xx-tab-item>
      </xx-tab>
    </sticky>
    <!-- 已购买 -->
    <div class="tabbox" v-show="tabIndex === 0" style="padding-bottom:50px">
      <!-- 单项服务 -->
      <div class="weui-panel" v-if="UserOrderDetailsList.ItemsByDoc.length !== 0">
        <div class="weui-panel_subtitle">单项服务</div>
        <template v-for="(pItem, pIndex) in UserOrderDetailsList.ItemsByDoc">
          <div :key="pIndex">
            <div class="weui-panel_subinfo">
              <div class="icon"><img :src="pItem.ContentOfItems[0].AvatorIMG | transformImgUrl" alt=""></div>
              <div class="mid">
                <div class="name">{{pItem.ContentOfItems[0].DoctorName}}</div>
                <!-- <div class="role">萌宠砖家</div> -->
              </div>
            </div>
            <template v-for="(cItem, cIndex) in pItem.ContentOfItems">
              <div class="weui-list_container" :key="cIndex">
                <template v-for="(mItem, mIndex) in cItem._ItemsDetails">
                  <div class="weui-list_item" :key="mIndex">
                    <div class="icon">
                      <img :src="mItem.OrderDetail.UseType | ItemImageByUseType" alt="">
                    </div>
                    <div class="mid">
                      <div style="display: flex;justify-content: space-between;align-items: baseline;">
                        <div class="title text-overflow-1 text-overflow-1">{{mItem.SingleItem.Name}}</div>
                          <div class="balance">剩余：{{mItem.OrderDetail.LeftNum}}次</div>
                      </div>
                      <div class="describe">到期时间：{{cItem.Order.EffectTime | timeFormat}}</div>
                    </div>
                    <div class="btn">
                      <div v-if="cItem.Order.State !== 1">
                        <button v-if="mItem.OrderDetail.UseType === 1" @click="toReserve(mItem.OrderDetail.ID, mItem.OrderDetail.ItemID, mItem.OrderDetail.UseType)">预约</button>
                        <button v-if="mItem.OrderDetail.UseType === 3" @click="toReserve(mItem.OrderDetail.ID, mItem.OrderDetail.ItemID, mItem.OrderDetail.UseType)">预约</button>
                        <button v-if="mItem.OrderDetail.UseType === 2" @click="toReserve(mItem.OrderDetail.ID, mItem.OrderDetail.ItemID, mItem.OrderDetail.UseType)">咨询</button>
                      </div>
                      <div v-else>
                        <span class="waitPaySuccess" style="font-size:14px;color:#f8a519">付款确认中</span>
                      </div>
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
        <div class="weui-panel_subtitle text-overflow-1">套餐服务</div>
        <template v-for="(pItem, pIndex) in UserOrderDetailsList.PackByDoc">
          <div :key="pIndex">
            <div class="weui-panel_subinfo">
              <div class="icon"><img :src="pItem.ContentOfItems[0].AvatorIMG | transformImgUrl" alt=""></div>
              <div class="mid">
                <div class="name">{{pItem.ContentOfItems[0].DoctorName}}</div>
              </div>
            </div>
            <template v-for="(cItem, cIndex) in pItem.ContentOfItems">
              <div :key="cIndex">
                <div class="weui-panel_category">{{cItem.Package.Name}}</div>
                <div class="weui-list_container">
                  <template v-for="(mItem, mIndex) in cItem._ItemsDetails">
                    <div class="weui-list_item" :key="mIndex">
                      <div class="icon">
                        <img :src="mItem.OrderDetail.UseType | ItemImageByUseType" alt="">
                      </div>
                      <div class="avatar">
                      </div>
                      <div class="mid">
                        <div style="display: flex;justify-content: space-between;align-items: baseline;">
                          <div class="title text-overflow-1">{{mItem.SingleItem.Name}}</div>
                          <div class="balance">剩余：{{mItem.OrderDetail.LeftNum}}次</div>
                        </div>
                        <div class="describe">到期时间：{{cItem.Order.EffectTime | timeFormat}}</div>
                      </div>
                      <div class="btn">
                        <div v-if="cItem.Order.State !== 1">
                          <button v-if="mItem.OrderDetail.UseType === 1" @click="toReserve(mItem.OrderDetail.ID, mItem.OrderDetail.ItemID, mItem.OrderDetail.UseType)">预约</button>
                          <button v-if="mItem.OrderDetail.UseType === 3" @click="toReserve(mItem.OrderDetail.ID, mItem.OrderDetail.ItemID, mItem.OrderDetail.UseType)">预约</button>
                          <button v-if="mItem.OrderDetail.UseType === 2" @click="toReserve(mItem.OrderDetail.ID, mItem.OrderDetail.ItemID, mItem.OrderDetail.UseType)">咨询</button>
                        </div>
                        <div v-else>
                          <span style="font-size:14px;color:#f8a519">付款确认中</span>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
      <!-- 空状态 -->
      <xxOccupiedBox v-if="flag1">
        <p>暂无可预约服务</p>
      </xxOccupiedBox>
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
          <template v-for="(item, index) in dataList">
            <div class="weui-list_item" :key="index" @click="missionDetail(item.ID, item.Type, item.UseType)">
              <div class="avatar">
                <img :src="item.UseType | ItemImageByUseType" alt="">
              </div>
              <div class="mid">
                <div style="display: flex;justify-content: space-between;align-items: baseline;">
                  <div class="title text-overflow-1" style="font-weight:normal">{{item.ItemName}}</div>
                </div>
                <div class="servant">服务人员：{{item.ServantName}}</div>
                <div style="font-size:14px;color:#666;width:160px" class="of-hide" v-if="item.Type === 1 && item.UseType !== 2">内容：{{item.Result ? item.Result.substr(0,20) : '没有备注消息'}}</div>
                <div style="font-size:14px;color:#666;width:160px" class="of-hide" v-if="item.Type === 0 && item.UseType !== 2">内容：{{item.Discription ? item.Discription.substr(0,20) : '没有备注消息'}}</div>
                <!-- <div class="describe">到期时间：{{item.EndTime | timeFormat}}</div> -->
                <div class="describe" v-if="item.Type === 1 && item.UseType !== 2">{{item.ViewTime}}</div>
                <div class="describe" v-if="item.UseType === 2">下单时间：{{item.CreateTime | timeFormat}}</div>
              </div>
              <img v-if="item.State === 0 && item.Type === 0" style="width:50px;height:50px;" src="@/assets/images/ic_dqr.png" alt="">
              <img v-if="item.Type === 1 && [0,1,2,3].indexOf(item.State) !== -1" style="width:50px;height:50px;" src="@/assets/images/ic_dff.png" alt="">
              <img v-if="item.State === 4" style="width:50px;height:50px;" src="@/assets/images/ic_dpj.png" alt="">
            </div>
          </template>
        </div>
      </div>
      <!-- 空状态 -->
      <xxOccupiedBox v-if="flag2">
        <p>暂无当前所选状态的服务</p>
      </xxOccupiedBox>
    </div>
    <!-- 已完成 -->
    <div class="tabbox" v-show="tabIndex === 2">
      <div class="weui-panel">
        <div class="weui-list_container">
          <template v-for="(item, index) in dataListDone">
            <div class="weui-list_item" :key="index" @click="missionDetail(item.ID, item.Type, item.UseType)">
              <div class="avatar">
                <img :src="item.UseType | ItemImageByUseType" alt="">
              </div>
              <div class="mid">
                <div style="display: flex;justify-content: space-between;align-items: baseline;">
                  <div class="title text-overflow-1" style="font-weight:normal">{{item.ItemName}}</div>
                </div>
                <div class="servant">服务人员：{{item.ServantName}}</div>
                <div style="font-size:14px;color:#666;" class="line-clamp">服务结果：{{item.Result ? item.Result : '无内容信息'}}</div>
                <div class="describe">完成时间：{{item.EndTime | timeFormat}}</div>
              </div>
              <img v-if="item.State === 0 && item.Type === 0" style="width:50px;height:50px;" src="@/assets/images/ic_dqr.png" alt="">
              <img v-if="item.Type === 1 && [0,1,2,3].indexOf(item.State) !== -1" style="width:50px;height:50px;" src="@/assets/images/ic_dff.png" alt="">
              <img v-if="item.State === 4" style="width:50px;height:50px;" src="@/assets/images/ic_dpj.png" alt="">
              <img v-if="item.State === 5" style="width:50px;height:50px;" src="@/assets/images/ic_ywj.png" alt="">
              <div class="cancel-icon">
                <svg aria-hidden="true" class="icon" v-if="item.State === -1">
                  <use xlink:href="#icon-yiquxiao"></use>
                </svg>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- 空状态 -->
      <xxOccupiedBox v-if="flag3">
        <p>暂无已完成服务</p>
      </xxOccupiedBox>
    </div>
    <xx-tabbar></xx-tabbar>
  </div>
</template>

<script>
import util from '@/plugins/util'
import { Sticky } from 'vux'
export default {
  filters: {
    timeFormat (value) {
      return util.timeFormat(value)
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
      checkerIndex: this.$store.getters.serviceTabIndex2, // 0、全部；1、待确认；2、待服务；3、待评价
      UserOrderDetailsList: {
        ItemsByDoc: [],
        PackByDoc: []
      },
      userAccount: JSON.parse(sessionStorage.getItem('userAccount')),
      flag1: false,
      flag2: false,
      flag3: false,
      flagText: ''
    }
  },
  watch: {
    serviceTabIndex (val) {
      this.tabIndex = val
    },
    serviceTabIndex2 (val) {
      this.checkerIndex = val
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
          that.getTotalWaitForConfirm()
          break
        case 2:
          that.getAllWaitForService()
          break
        case 3:
          that.getWaitForReview().then(value => {
            that.dataList = value
            this.flag2 = that.dataList.length === 0
          })
          break
      }
    },
    /** 查看全部 */
    async getAll () {
      const that = this
      await that.getWaitForConfirm().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getUserReserveServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getWaitForServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getInServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getWaitForReview().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      this.flag2 = that.dataList.length === 0
    },
    // 待服务、服务中
    async getAllWaitForService () {
      const that = this
      await that.getInServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getWaitForServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      this.flag2 = that.dataList.length === 0
    },
    // 合并待确认
    async getTotalWaitForConfirm () {
      await this.getWaitForConfirm().then(value => {
        this.dataList = this.dataList.concat(value)
      })
      await this.getUserReserveServiceList().then(value => {
        this.dataList = this.dataList.concat(value)
      })
      this.flag2 = this.dataList.length === 0
    },
    // 获取图文待确认
    async getWaitForConfirm () {
      const res = await this.$http.get('/ConsultList/WaitForConfirm')
      return res.data.Data
    },
    /** 获取任务待确认 */
    async getUserReserveServiceList () {
      const res = await this.$http.get('/UserReserveServiceList')
      return res.data.Data
    },
    /** 待服务 */
    async getWaitForServiceList () {
      const res = await this.$http.get('/MissionList/WaitForService')
      return res.data.Data
    },
    /** 服务中 */
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
        const waitPaySuccess = document.querySelectorAll('.waitPaySuccess')
        this.UserOrderDetailsList = res.data.Data
        if (this.UserOrderDetailsList.ItemsByDoc.length === 0 && this.UserOrderDetailsList.PackByDoc.length === 0) {
          this.flag1 = true
        }
        if (waitPaySuccess.length > 0) {
          setTimeout(() => {
            this.getUserOrderDetailsList()
          }, 1000 * 30)
        }
      }
    },
    // 已完成
    async getDone () {
      const res = await this.$http.get('/MissionList/Complate')
      if (res.data.Code === 100000) {
        this.dataListDone = res.data.Data
        if (this.dataListDone.length === 0) {
          this.flag3 = true
        }
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    missionDetail (id, type, useType) {
      if (useType !== 2) {
        this.$router.push(`/service/in/${id}?type=${type}`)
      }
      if (useType === 2) {
        this.$router.push(`/service/consult/${id}?isMission=1`)
      }
    },
    changeChecker (index) {
      this.checkerIndex = index
      this.$store.commit('setServiceTabIndex2', index)
    },
    onItemClick (id) {
      this.$store.commit('setServiceTabIndex', id)
    },
    toDetail (id) {
      this.$router.push(`/service/in/${id}`)
    },
    toReserve (id, ItemID, useType) {
      const that = this
      const url = this.reserveUrl(id, ItemID, useType)
      if (this.userAccount.State === 0) {
        this.$vux.confirm.show({
          title: '提示',
          content: '您尚未完善个人资料',
          confirmText: '去完善',
          onConfirm () {
            sessionStorage.setItem('reserve_path', url)
            that.$router.push(url)
          }
        })
      } else {
        that.$router.push(url)
      }
    },
    reserveUrl (id, ItemID, useType) {
      if (useType === 1 || useType === 3) {
        return `/service/reserve/${id}?ItemID=${ItemID}&useType=${useType}`
      }
      if (useType === 2) {
        return `/service/consult/${id}?isMission=0`
      }
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
    margin: 0 10px;
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
    display: flex;
    align-items: center;
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
  font-size: 13px;
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
        top:-3px;
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

.cancel-icon {
  color: #999;
  .icon {
    width: 50px;
    height: 50px;
    font-size: 50px;
  }
}

.line-clamp {
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>