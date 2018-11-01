<template>
  <div class="wrapper order_wrap">
    <div class="title">预诊信息</div>
    <div class="content" v-if="servantInfos.DoctorName">
      <!-- <div class="row">
        <span class="label">就诊科室：</span>
        <span>123</span>
      </div> -->
      <div class="row">
        <span class="label">医生姓名：</span>
        <span>{{servantInfos.DoctorName}}</span>
      </div>
      <div class="row">
        <span class="label">就诊时间：</span>
        <span>{{servantInfos.StartTime | dateFormat('YYYY年MM月DD日')}} {{servantInfos.StartTime | dateFormat('HH:mm')}} ~ {{servantInfos.EndTime | dateFormat('HH:mm')}}</span>
      </div>
      <!-- <div class="row">
        <span class="label">就诊时段：</span>
        <span>123</span>
      </div> -->
      <div class="row">
        <span class="label">就诊地点：</span>
        <span>{{servantInfos.Address}}</span>
      </div>
      <div class="row">
        <span class="label">挂号费：</span>
        <span class="price">{{(servantInfos.RegistrationFee / 100).toFixed(2)}}元</span>
      </div>
    </div>
    <div class="tips" v-if="!readOnly">注意事项：请在30分钟之内支付，逾期作废，一个自然月 内只能退三次号</div>
    <div class="btns" v-if="!readOnly">
      <button @click="back">取消预约</button>
      <button class="order" @click="getUserPreOrder">立即支付</button>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  filters: {
    dateFormat (val, format = 'YYYY-MM-DD HH:mm:ss') {
      return dateFormat(new Date(val), format)
    }
  },
  data () {
    return {
      servantInfos: {}
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    readOnly () {
      return +this.$route.query.read || 0
    },
    refereeType () {
      return this.$route.query.refereeType || ''
    },
    refereeViewID () {
      return this.$route.query.refereeViewID || ''
    }
  },
  mounted () {
    this.getServantSchedule()
  },
  methods: {
    async getServantSchedule () {
      this.$vux.loading.show()
      const res = await this.$http.get(`/Schedule/bespoke-registration-detail?scheduleId=${this.id}`)
      this.$vux.loading.hide()
      if (res.data.Code === 100000) {
        this.servantInfos = res.data.Data
      }
    },
    async getUserPreOrder (id) {
      // 生成预支付订单
      const res = await this.$http.post(`/UserOrder/PreOrder?packageID=${this.servantInfos.ScheduleID}&orderType=3&servantViewID=&refereeType=${this.refereeType}&refereeViewID=${this.refereeViewID}`)
      if (res.data.Code === 100000) {
        if (res.data.Data.RedirectState === 0) {
          this.$router.push(`/servant/pay/${this.servantInfos.ScheduleID}?OrderID=${res.data.Data.OrderID}`)
        } else {
          window.location.href = res.data.Data.RedirectUrl
        }
      } else {
        this.$vux.toast.show({
          type: 'cancel',
          text: res.data.Msg,
          time: 800
        })
      }
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.order_wrap {
  .title {
    font-size: 16px;
    color: #3ecccc;
    text-align: center;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid RGBA(0, 180, 171, .2);
    background: #fff;
  }
  .content {
    background: #fff;
    padding: 20px 12px;
    .row {
      &:last-child {
        padding: 0;
      }
      padding-bottom: 13px;
      font-size: 15px;
      color: #333;
      .label {
        color: #666
      }
      .price {
        color: #FF5F5F;
      }
    }
  }
  .tips {
    width: 80%;
    font-size: 11px;
    color: #FF5F5F;
    padding: 5px 12px;
  }
  .btns {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 12px 0;
    button {
      margin: 0 12px;
      flex: 1;
      height: 52px;
      line-height: 52px;
      text-align: center;
      font-size: 18px;
      border-radius: 4px;
      border: 0;
      color: #999;
      background: transparent;
      border: 1px solid #979797;
      &.order {
        color: #fff;
        background: #3ECCCC;
        border:  1px solid #3ecccc;
      }
    }
  }
}
</style>
