<template>
  <div class="wrap has-tabbar">
    <xx-nav-bar
      left-text="返回"
      @click-left="onNavbarClickLeft">
    </xx-nav-bar>
    <xx-step-bar :step="steps" v-if="serviceItemInfo.State !== -1">
      <xx-step-items slot="items">
        预约
      </xx-step-items>
      <xx-step-items slot="items">
        服务中
      </xx-step-items>
      <xx-step-items slot="items">
        已完成
      </xx-step-items>
    </xx-step-bar>
    <div class="cancel-box" v-if="serviceItemInfo.State === -1">
      <div class="">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yiquxiao"></use>
        </svg>
      </div>
      <div style="padding: 0 10px;">
        <div class="title">{{serviceItemInfo.CancelTypeMsg ? serviceItemInfo.CancelTypeMsg : '该任务已取消'}}</div>
        <div class="describe">{{serviceItemInfo.CancelDescription ? serviceItemInfo.CancelDescription : '没有备注信息'}}</div>
      </div>
    </div>
    <xx-timeLine :step="timeLines" class="mgt10">
      <xx-timeLine-items
        slot="items"
        :title="title1"
        :subhead="subhead1">
        <div class="content" v-if="serviceItemInfo.Type === 0">
          服务者还未确认服务时间
        </div>
        <div class="content" v-if="serviceItemInfo.Type === 1">
          服务项：{{serviceItemInfo.ItemName}} <br/>
          服务单号：{{serviceItemInfo.ServiceID}} <br/>
        </div>
      </xx-timeLine-items>
      <xx-timeLine-items
        slot="items"
        :title="title2"
        :subhead="subhead2">
        <div class="content">
          <div>服务项：{{serviceItemInfo.ItemName}}</div>
          <div v-if="serviceItemInfo.Result">服务内容：{{serviceItemInfo.Result}}</div>
        </div>
      </xx-timeLine-items>
      <xx-timeLine-items
        slot="items"
        :title="title3"
        :subhead="subhead3">
        <div class="content nobor">
          <!-- 未完成 -->
          <div v-if="[4,5,6].indexOf(serviceItemInfo.State) === -1">服务还未完成，不能进行评价</div>
          <!-- 待评价 -->
          <div v-if="serviceItemInfo.Type === 1 && serviceItemInfo.State === 4">
            <div class="comments">
              <div class="label">服务评价</div>
              <div class="right">
                <rater v-model="ReviewInfoParameter.Score" active-color="#F8A519" :font-size="14"></rater>
              </div>
            </div>
            <div>
              <textarea class="comments-textarea" v-model="ReviewInfoParameter.Remark" name="" id="" placeholder="请输入评价内容..."></textarea>
              <span style="font-size:11px;display:flex;align-items: center;"><img class="ic_gth" src="@/assets/images/ic_gth.png" alt=""> 超过72小时自动默认好评</span>
            </div>
          </div>
          <!-- 已评价 -->
          <div v-if="serviceItemInfo.Type === 1 && serviceItemInfo.State === 5" class="comments-done">
            <div class="title">服务评价</div>
            <div class="comment">{{ServantReview.Remark}}</div>
            <div class="rates" style="text-align: right;">
              <rater v-model="ServantReview.Score" disabled="disabled" active-color="#F8A519" :font-size="14"></rater>
            </div>
          </div>
        </div>
      </xx-timeLine-items>
    </xx-timeLine>
    <div class="tips warn" style="margin-top:10px" v-html="Agreement.Content">
    </div>
    <div class="btn-bar" v-if="serviceItemInfo.State === 0 && serviceItemInfo.Type === 0">
      <button type="button" class="weui-btn weui-btn_primary" style="background: #ffc349;flex:1;" @click="toChat(serviceItemInfo.ServantViewID)">发消息</button>
      <button type="button" class="weui-btn weui-btn_primary" style="flex:1" @click="showCancelReserve = true" v-show="serviceItemInfo.CanCancel">取消预约</button>
    </div>
    <div class="btn-bar" v-if="(serviceItemInfo.State === 3 || serviceItemInfo.State === 0) && serviceItemInfo.Type === 1">
      <button type="button" class="weui-btn weui-btn_primary" style="background: #ffc349;flex:1;" @click="toChat(serviceItemInfo.ServantViewID)">发消息</button>
      <button type="button" class="weui-btn weui-btn_primary" style="flex:1" @click="showCancelMission = true" v-show="serviceItemInfo.CanCancel">取消任务</button>
    </div>
    <div class="btn-bar" v-if="serviceItemInfo.State === 4">
      <button class="weui-btn weui-btn_primary" style="background: #ffc349;flex:1" @click="toComplaint">投诉</button>
      <button type="button" class="weui-btn weui-btn_primary" @click="submitComments" :disabled="disabled">确定</button>
    </div>
    <!-- 取消预约 -->
    <cancel-mission-popup v-model="showCancelReserve" @confirmCancel="cancelReserve"></cancel-mission-popup>
    <cancel-mission-popup v-model="showCancelMission" @confirmCancel="cancelMission"></cancel-mission-popup>
    <!-- <div v-transfer-dom>
      <confirm v-model="showCancel"
        class="cancel-wrap"
        title="取消预约"
        @on-confirm="cancelReserve">
        <div>
          <select v-model="CancelType">
            <option :value="1">时间冲突</option>
            <option :value="2">地点冲突</option>
            <option :value="3">其他</option>
          </select>
          <input type="text" v-model="CancleDescription" placeholder="取消描述(可选)">
        </div>
      </confirm>
    </div> -->
  </div>
</template>

<script>
import CancelMissionPopup from '@/components/cancelMissionPopup'
import { TransferDom, Rater } from 'vux'
import util from '@/plugins/util'
export default {
  directives: {
    TransferDom
  },
  components: {
    Rater,
    CancelMissionPopup
  },
  data () {
    return {
      disabled: false,
      showCancelReserve: false,
      showCancelMission: false,
      steps: '1',
      timeLines: '0',
      rate: 5,
      comments: '',
      title1: '待确认',
      title2: '待服务',
      title3: '待评价',
      subhead1: '',
      subhead2: '',
      subhead3: '',
      serviceItemInfo: {},
      CancelType: 1,
      CancleDescription: '',
      ReviewInfoParameter: {
        Score: 5,
        Remark: '',
        MissionID: ''
      },
      ServantReview: {},
      Agreement: {}
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async getShopAgreement () {
      const res = await this.$http.get(`/ShopAgreement?protocalType=15&itemID=${this.serviceItemInfo.ItemID}`)
      if (res.data.Code === 100000 && res.data.Data) {
        this.Agreement = res.data.Data
      }
    },
    async initData () {
      let url = this.$route.query.type === '0' ? `/UserReserveService/${this.$route.params.id}` : `/Mission?missionID=${this.$route.params.id}`
      const res = await this.$http.get(url)
      if (res.data.Code === 100000) {
        this.serviceItemInfo = res.data.Data
        this.setState()
        this.getShopAgreement()
        if (res.data.Data.State === 5) {
          this.getComments()
        }
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    // 提交评价
    async submitComments () {
      const that = this
      this.disabled = true
      this.ReviewInfoParameter.MissionID = this.serviceItemInfo.ID
      const res = await this.$http.post(`/ServantReview`, this.ReviewInfoParameter)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: res.data.Msg,
          time: 500,
          onHide () {
            that.initData()
          }
        })
      } else {
        this.$vux.toast.show({
          type: 'text',
          text: res.data.Msg,
          time: 500,
          onHide () {
            that.disabled = false
          }
        })
      }
    },
    // 获取评价
    async getComments () {
      const res = await this.$http.get(`/ServantReview?missionID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.ServantReview = res.data.Data
        this.setState()
      } else {
        this.$vux.toast.show({
          type: 'text',
          text: res.data.Msg
        })
      }
    },
    // 取消预约
    async cancelReserve (opt) {
      const that = this
      const res = await this.$http.put(`/ReserveService/Cancel?ID=${this.serviceItemInfo.ID}`, opt)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: res.data.Msg,
          time: 500,
          onHide () {
            that.$router.back()
          }
        })
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 取消任务
    async cancelMission (opt) {
      const that = this
      const res = await this.$http.put(`/Mission/Cancel?missionID=${this.serviceItemInfo.ID}`, opt)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: res.data.Msg,
          time: 500,
          onHide () {
            that.$router.back()
          }
        })
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    toComplaint (id) {
      this.$router.push(`/service/complaint/${this.$route.params.id}`)
    },
    setState () {
      // 已确认
      if (this.serviceItemInfo.Type === 1) {
        this.steps = '2'
        this.timeLines = '1'
        this.title1 = '已确认'
        this.subhead1 = `确认时间：${util.timeFormat(this.serviceItemInfo.CreateTime)}`
      }
      // 待服务
      if (this.serviceItemInfo.Type === 1 && [0, 1, 2, 3].indexOf(this.serviceItemInfo.State) !== -1) {
        this.steps = '2'
        this.timeLines = '2'
      }
      // 已服务
      if (this.serviceItemInfo.Type === 1 && [4, 5, 6].indexOf(this.serviceItemInfo.State) !== -1) {
        this.steps = '2'
        this.timeLines = '2'
        this.title2 = '已服务'
        this.subhead2 = `服务时间：${util.timeFormat(this.serviceItemInfo.EndTime)}`
      }
      // 已评价
      if (this.serviceItemInfo.Type === 1 && [5, 6].indexOf(this.serviceItemInfo.State) !== -1) {
        this.steps = '3'
        this.timeLines = '3'
        this.title3 = '已评价'
        this.subhead3 = `评价时间：${util.timeFormat(this.ServantReview.ReviewTime)}`
      }
      // 已取消
      if (this.serviceItemInfo.Type === 1 && this.serviceItemInfo.State === -1) {
        this.timeLines = '0'
      }
    },
    // 跳转聊天
    toChat (ViewID) {
      this.$router.push(`/servant/chat/${ViewID}`)
    },
    onNavbarClickLeft () {
      if (this.serviceItemInfo.Type === 0 && this.serviceItemInfo.State === 0) {
        this.$store.commit('SET_SERVICE_TAB', 1)
        this.$store.commit('SET_SERVICE_IN_TAB', 1)
      }
      if (this.serviceItemInfo.Type === 1 && this.serviceItemInfo.State <= 4) {
        this.$store.commit('SET_SERVICE_TAB', 1)
        this.$store.commit('SET_SERVICE_IN_TAB', 0)
      }
      if (this.serviceItemInfo.Type === 1 && (this.serviceItemInfo.State >= 5 || this.serviceItemInfo.State < 0)) {
        this.$store.commit('SET_SERVICE_TAB', 2)
      }
      this.$router.push('/service')
    }
  }
}
</script>

<style scoped lang="less">
.content {
  position: relative;
  font-size: 13px;
  color: #999;
  padding-bottom: 12px;
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
  &.nobor:after {
    border: 0;
  }
}
.btn-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  .weui-btn:nth-child(2) {
    width: 250px;
  }
}

.comments {
  margin-bottom: 9px;
  display:flex;
  align-items: center;
  justify-content: space-between;
  .label {
    font-size: 13px;
    color: #999;
  }
}

.comments-textarea {
  resize: none;
  padding: 5px;
  font-size: 13px;
  border: 0;
  color: #666;
  width: 100%;
  border-radius: 3px;
  box-sizing: border-box;
  height: 120px;
}

.comments-done {
  position: relative;
  margin-top: 15px;
  padding: 12px 12px 9px 12px;
  background: #F2F2F2;
  border-radius: 4px;
  &::after {
    content: "";
    position: absolute;
    top: -20px;
    left: 10px;;
    width:0;
    height:0;
    border:10px solid #f00283;
    border-color: transparent transparent #F2F2F2 transparent;
  }
}

.cancel-wrap {
  select {
    width: 100%;
    border: 0;
    height: 30px;
    line-height: 30px;
  }
  input {
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
}

.ic_gth {
  position: relative;
  top: -1px;
  margin-right: 5px;
  width: 12px;
  height: 12px;
  background: #F6E5C8;
  border-radius: 50%;
}

.tips {
  margin-top: 10px;
  padding: 10px;
  font-size: 12px;
  color: #e64340;
  background: #fff;
  border-radius: 4px;
}

.tips.warn {
  margin: 0 10px;
  padding: 11px;
  font-size: 12px;
  color: #999;
  background: #FFFBF2;
  border: 1px solid #FFDCA1;
  border-radius: 2px;
}

.cancel-box {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 15px;
  .icon {
    font-size: 60px;
    color: #ff5f5f;
  }
  .title {
    font-size: 16px;
    color: #666;
  }
  .describe {
    font-size: 14px;
    color: #999;
  }
}
</style>