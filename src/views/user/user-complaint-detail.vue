<template>
  <div class="has-tabbar" v-if="data !== null">
    <xx-step-bar :step="steps">
      <xx-step-items slot="items">
        用户资料
      </xx-step-items>
      <xx-step-items slot="items">
        服务者资料
      </xx-step-items>
      <xx-step-items slot="items">
        客服介入
      </xx-step-items>
      <xx-step-items slot="items">
        结果
      </xx-step-items>
    </xx-step-bar>
    <h2 class="cells_title">订单编号   </h2>
    <div class="cells">
      <div class="icon"><img src="@/assets/images/icon_picc.png" alt=""></div>
      <div class="mid">
        <div style="display:flex;justify-content: space-between;">
          <div class="title">{{data.MissionName}}</div>
          <div class="orderid">服务单号：201806031203</div>
        </div>
        <div class="describe"></div>
      </div>
    </div>
    <h2 class="cells_title" v-if="data.State !== -1">客服仲裁结果</h2>
    <div class="cells cells_result" v-if="data.State === 0">
      <div class="title">服务者还未提交相关资料</div>
      <div><span><xxTimeCountDown :startTime="startTime"></xxTimeCountDown></span>内还未提交， 该投诉服务单系统将自动判定投诉成功。</div>
      <div><span>（备注：自动判定时间为用户提交时间的72小时之后）</span></div>
    </div>
    <div class="cells cells_result" v-if="data.State === 1">
      <div class="title">客服还未提交仲裁结果</div>
      <div><span>请耐心等待，谢谢！</span></div>
    </div>
    <div class="cells cells_result" v-if="data.State === 2">
      <div class="title">您好，根据您和服务者所提交的资料中和判定 结果为：<span>投诉成功</span></div>
    </div>
    <div class="cells cells_result" v-if="data.State === 3">
      <div class="title">您好，根据您和服务者所提交的资料中和判定 结果为：<span>投诉未通过</span></div>
    </div>
    <h2 class="cells_title">用户投诉内容 <span>用户提交时间：{{data.CreateTime | timeFormat}}</span></h2>
    <div class="complaint_content">
      <div class="cell">
        <div class="label">投诉原因</div>
        <div class="right">{{data.UserComplaintTitle}}</div>
      </div>
      <div class="cell">
        <div class="label">其他备注</div>
        <div class="right">{{data.UserComplaintContent}}</div>
      </div>
      <div class="cell">
        <div class="label">相关图片</div>
        <div class="right">
          <image-preview-item v-if="data.UserComplaintImgs.length > 0" :list="data.UserComplaintImgs"></image-preview-item>
          <span v-else>无相关图片</span>
        </div>
      </div>
      <div class="cell" v-if="data.State === 0 || data.State === 1">
        <div class="label"></div>
        <div class="right">
          <button class="cancel" @click="showCancelConfirm" :disabled="disabled">取消投诉</button>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showCancel"
        title="取消投诉"
        @on-confirm="cancel(data.ID)">
        <p style="text-align:center;">确认取消投诉吗？</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import { Confirm, TransferDom } from 'vux'
import ImagePreviewItem from '@/components/ImagePreViewItem'
export default {
  directives: {
    TransferDom
  },
  components: {
    ImagePreviewItem,
    Confirm
  },
  data () {
    return {
      steps: '2',
      data: null,
      showCancel: false,
      disabled: false,
      startTime: null
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const res = await this.$http.get(`/Complaint?complaintID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.data = res.data.Data
        this.startTime = new Date(res.data.Data.CreateTime).getTime()
        if (this.data.State === 0 || this.data.State === 1) {
          this.steps = '2'
        }
        if (this.data.State === 1) {
          this.steps = '3'
        }
        if (this.data.State === 2 || this.data.State === 3 || this.data.State === -1) {
          this.steps = '4'
        }
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    async cancel (id) {
      const that = this
      this.disabled = true
      const res = await this.$http.put(`/Complaint/${id}/Cancel`)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: '成功',
          time: 500,
          onHide () {
            that.$router.push('/result/payCancel')
            this.disabled = false
          }
        })
      } else {
        this.$vux.toast.text(res.data.Msg)
        this.disabled = false
      }
    },
    showCancelConfirm () {
      this.showCancel = true
    }
  }
}
</script>

<style scoped lang="less">
.cells_title {
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  font-size: 15px;
  color: #999;
  font-weight: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 10px;
  }
}

.cells {
  padding: 15px 12px 20px 12px;
  background: #fff;
  display: flex;
  align-items: center;
  .icon {
    width: 29px;
    height: 29px;
  }
  .mid {
    flex: 1;
    margin-left: 16px;
    .title {
      font-size: #666;
      font-weight: bold;
    }
    .orderid {
      font-size: 12px;
      color: #999;
    }
    .describe {
      font-size: 12px;
      color: #999;
    }
  }
}

.cells_result {
  display: block;
  padding: 50px 42px;
  text-align: center;
  font-size: 12px;
  color: #999;
  span {
    color: #F8A519;
  }
  .title {
    font-size: 13px;
    color: #666;
    font-weight: bold;
  }
}

.complaint_content {
  overflow: hidden;
  background: #fff;
  padding: 50px 12px 0 12px;
  .cell {
    margin-bottom: 36px;
    display: flex;
    .label {
      min-width: 70px;
      text-align: left;
      font-size: 13px;
      color: #333
    }
    .right {
      flex: 1;
      font-size: 13px;
      color: #999;
      display: flex;
      word-break:break-all;
      .preview_img {
        margin-right: 10px;
        width: 65px;
        height: 65px;
      }
    }
  }
}

.cancel {
  width: 80px;
  height: 28px;
  line-height: 28px;
  color: #fff;
  background: #F8A519;
  text-align: center;
  font-size: 14px;
  border: 0;
  border-radius: 14px;
}
</style>