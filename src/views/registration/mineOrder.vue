<template>
  <div class="wrapper order_wrap">
    <div class="title">挂号信息</div>
    <div class="content" v-if="servantInfos.DoctorName">
      <div class="row">
        <span class="label">排号状态：</span>
        <span>{{servantInfos.State | _State}}</span>
      </div>
      <div class="row">
        <span class="label">挂号排号：</span>
        <span>第{{servantInfos.Code}}号</span>
      </div>
      <div class="row">
        <span class="label">医生姓名：</span>
        <span>{{servantInfos.DoctorName}}</span>
      </div>
      <div class="row">
        <span class="label">就诊时间：</span>
        <span>{{servantInfos.StartTime | dateFormat('YYYY年MM月DD日')}} {{servantInfos.StartTime | dateFormat('HH:mm')}} ~ {{servantInfos.EndTime | dateFormat('HH:mm')}}</span>
      </div>
      <div class="row">
        <span class="label">就诊地点：</span>
        <span>{{servantInfos.Address}}</span>
      </div>
      <div class="row">
        <span class="label">挂号费：</span>
        <span class="price">{{(servantInfos.RegistrationFee / 100).toFixed(2)}}元</span>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  data () {
    return {
      servantInfos: {}
    }
  },
  filters: {
    dateFormat (val, format = 'YYYY-MM-DD HH:mm:ss') {
      return dateFormat(new Date(val), format)
    },
    _State (val) {
      switch (val) {
        case -1:
          return '已删除'
        case 0:
          return '正常'
        case 1:
          return '已使用'
        case 2:
          return '已失效'
        case 4:
          return '已取消'
        default:
          break
      }
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getRegistration()
  },
  methods: {
    async getRegistration () {
      this.$vux.loading.show()
      const res = await this.$http.get(`/Registration/Details?registrationID=${this.id}`)
      this.$vux.loading.hide()
      if (res.data.Code === 100000) {
        this.servantInfos = res.data.Data
      }
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
    background: #fff;
    border-bottom: 1px solid #e1e1e1;
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
