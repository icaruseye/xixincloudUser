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
                      <div class="describe">到期时间：{{cItem.Order.EffectTime | timeFormat('YYYY-MM-DD')}}</div>
                    </div>
                    <div class="btn">
                      <div v-if="cItem.Order.State !== 1">
                        <button v-if="mItem.OrderDetail.UseType === 1" @click="toReserve(mItem.OrderDetail.ID, mItem.OrderDetail.ItemID, mItem.OrderDetail.UseType, cItem.Package.ServantViewID)">预约</button>
                        <button v-if="mItem.OrderDetail.UseType === 3" @click="toReserve(mItem.OrderDetail.ID, mItem.OrderDetail.ItemID, mItem.OrderDetail.UseType, cItem.Package.ServantViewID)">预约</button>
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
                        <div class="describe">到期时间：{{cItem.Order.EffectTime | timeFormat('YYYY-MM-DD')}}</div>
                      </div>
                      <div class="btn">
                        <div v-if="cItem.Order.State !== 1">
                          <button v-if="mItem.OrderDetail.UseType === 1" @click="toReserve(mItem.OrderDetail.ID, mItem.OrderDetail.ItemID, mItem.OrderDetail.UseType, cItem.Package.ServantViewID)">预约</button>
                          <button v-if="mItem.OrderDetail.UseType === 3" @click="toReserve(mItem.OrderDetail.ID, mItem.OrderDetail.ItemID, mItem.OrderDetail.UseType, cItem.Package.ServantViewID)">预约</button>
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
      <!-- 挂号列表 -->
      <div class="weui-panel" v-if="UserOrderDetailsList.RegistrationList.length > 0">
        <div class="weui-panel_subtitle text-overflow-1">挂号</div>
        <div class="weui-list_container schedule-list">
          <template v-for="(item, index) in UserOrderDetailsList.RegistrationList">
              <router-link :to="`/organ/registration/order/${item.ScheduleID}?read=1`" :key="index" class="list-item">
                <div class="item">
                  <div class="icon">
                    <img src="../../assets/images/icon_picc_gh.png" alt="">
                  </div>
                  <div style="flex:1">
                    <div class="text">{{item.DoctorName}}</div>
                    <div class="time">预约时间：{{item.StartTime | timeFormat('YYYY-MM-DD')}} ({{item.StartTime | timeFormat('HH:mm')}} - {{item.EndTime | timeFormat('HH:mm')}})</div>
                  </div>
                  <!-- <div class="price">{{(item.RegistrationFee / 100).toFixed(2)}}元</div> -->
                </div>
              </router-link>
          </template>
        </div>
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
      <div class="weui-panel" style="margin-top:0" v-if="!flag2">
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
                <div class="describe" v-if="item.UseType === 2">下单时间：{{item.CreateTime | timeFormat('YYYY-MM-DD HH:mm:ss')}}</div>
              </div>
              <img v-if="(item.State === 0 && item.Type === 0) || (item.State === 0 && item.Type === 1 && item.UseType === 2)" style="width:50px;height:50px;" src="@/assets/images/ic_dqr.png" alt="">
              <img v-if="item.Type === 1 && [0,1,2,3].indexOf(item.State) !== -1 && !(item.State === 0 && item.Type === 1 && item.UseType === 2)" style="width:50px;height:50px;" src="@/assets/images/ic_dff.png" alt="">
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
      <div class="weui-panel" v-if="!flag3">
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
                <div class="describe">完成时间：{{item.FinishTime | timeFormat('YYYY-MM-DD HH:mm:ss')}}</div>
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
        <!-- 挂号 -->
        <div class="weui-panel" v-if="registrationListDone.length > 0">
          <div class="weui-panel_subtitle text-overflow-1">挂号</div>
          <div class="weui-list_container schedule-list">
            <template v-for="(item, index) in registrationListDone">
                <router-link :to="`/organ/registration/order/${item.ScheduleID}?read=1`" :key="index" class="list-item">
                  <div class="item">
                    <div class="icon">
                      <img src="../../assets/images/icon_picc_gh.png" alt="">
                    </div>
                    <div style="flex:1">
                      <div class="text">{{item.DoctorName}}</div>
                      <div class="time">预约时间：{{item.StartTime | timeFormat('YYYY-MM-DD')}} ({{item.StartTime | timeFormat('HH:mm')}} - {{item.EndTime | timeFormat('HH:mm')}})</div>
                    </div>
                    <img style="width:50px;height:50px;" src="@/assets/images/ic_ywj.png" alt="">
                    <!-- <div class="price">{{(item.RegistrationFee / 100).toFixed(2)}}元</div> -->
                  </div>
                </router-link>
            </template>
          </div>
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
import { Sticky, dateFormat } from 'vux'
import { mapGetters } from 'vuex'
export default {
  filters: {
    timeFormat (value, m) {
      return dateFormat(new Date(value), m)
    }
  },
  components: {
    Sticky
  },
  data () {
    return {
      dataList: [],
      dataListDone: [], // 已完成服务列表
      registrationListDone: [], // 已完成挂号列表
      tabIndex: this.$store.getters.serviceTabIndex,
      checkerIndex: this.$store.getters.serviceTabIndex2, // 0、全部；1、待确认；2、待服务；3、待评价
      UserOrderDetailsList: {
        ItemsByDoc: [],
        PackByDoc: [],
        RegistrationList: []
      },
      flag1: false,
      flag2: false,
      flag3: false,
      flagText: ''
    }
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ])
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
    this.fromTabIndexGetData(this.tabIndex)
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
    fromTabIndexGetData (index) {
      switch (index) {
        case 0:
          // 预约列表
          this.getBuyAll()
          break
        case 1:
          // 服务中列表
          this.initData()
          break
        case 2:
          // 已完成列表
          this.getAllDone()
          break
        default:
          // 预约列表
          this.getUserOrderDetailsList()
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
    async getBuyAll () {
      await this.getUserOrderDetailsList()
      await this.getRegistrationList()
      if (this.UserOrderDetailsList.ItemsByDoc.length === 0 && this.UserOrderDetailsList.PackByDoc.length === 0 && this.UserOrderDetailsList.RegistrationList.length === 0) {
        this.flag1 = true
      }
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
    // 挂号列表
    async getRegistrationList () {
      const res = await this.$http.get('/Registration/List')
      if (res.data.Code === 100000 && res.data.Data.length > 0) {
        this.UserOrderDetailsList.RegistrationList = res.data.Data
      } else {
        this.UserOrderDetailsList.RegistrationList = []
      }
    },
    /** 预约列表 */
    async getUserOrderDetailsList () {
      const res = await this.$http.get('/UserOrderDetailsList')
      if (res.data.Code === 100000) {
        this.UserOrderDetailsList.ItemsByDoc = res.data.Data.ItemsByDoc
        this.UserOrderDetailsList.PackByDoc = res.data.Data.PackByDoc
        this.$nextTick(() => {
          const waitPaySuccess = document.querySelectorAll('.waitPaySuccess')
          if (waitPaySuccess.length > 0) {
            setTimeout(() => {
              this.getUserOrderDetailsList()
            }, 15 * 1000)
          }
        })
      }
    },
    async getAllDone () {
      await this.getDone()
      await this.getRegistrationDone()
      if (this.dataListDone.length === 0 && this.registrationListDone.length === 0) {
        this.flag3 = true
      }
    },
    // 已完成
    async getDone () {
      const res = await this.$http.get('/MissionList/Complate')
      if (res.data.Code === 100000) {
        this.dataListDone = res.data.Data
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    // 已完成挂号
    async getRegistrationDone () {
      const res = await this.$http.get('/Registration/ComplateList')
      if (res.data.Code === 100000) {
        this.registrationListDone = res.data.Data
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
      this.fromTabIndexGetData(id)
      this.$store.commit('setServiceTabIndex', id)
    },
    toDetail (id) {
      this.$router.push(`/service/in/${id}`)
    },
    toReserve (id, ItemID, useType, viewId) {
      const that = this
      const url = this.reserveUrl(id, ItemID, useType, viewId)
      if (this.userAccount.State === 0) {
        this.$vux.confirm.show({
          title: '提示',
          content: '您尚未完善个人资料',
          confirmText: '去完善',
          onConfirm () {
            sessionStorage.setItem('reserve_path', url)
            that.$router.push(`/user/info`)
          }
        })
      } else {
        that.$router.push(url)
      }
    },
    reserveUrl (id, ItemID, useType, viewId) {
      if (useType === 1 || useType === 3) {
        return `/service/reserve/${id}?ItemID=${ItemID}&useType=${useType}&viewId=${viewId}`
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

.weui-list_container {
  padding: 0;
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

.schedule-list {
  padding: 10px 0;
  .title {
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
  .list-item {
    display: block;
    border-bottom: 1px solid RGBA(0, 180, 171, .1);
    &:last-child {
      border: 0;
    }
  }
  .item {
    display: flex;
    background: #fff;
    align-items: center;
    padding: 10px 0;
    .icon {
      width: 28px;
      height: 28px;
      margin-right: 10px;
    }
    .text {
      font-size: 15px;
      color: #666;
    }
    .time {
      font-size: 12px;
      color: #999
    }
    .price {
      font-size: 15px;
      color: #FF5F66;
    }
    .btn {
      margin-left: 15px;
      background: #F8A519;
      color: #fff;
      padding: 0 10px;
      border-radius: 2px;
    }
  }
}
</style>