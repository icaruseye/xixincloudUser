<template>
  <div class="has-tabbar">
    <xx-step-bar step="1">
      <xx-step-items slot="items">
        用户提交
      </xx-step-items>
      <xx-step-items slot="items">
        服务者提交
      </xx-step-items>
      <xx-step-items slot="items">
        客服介入
      </xx-step-items>
      <xx-step-items slot="items">
        结果
      </xx-step-items>
    </xx-step-bar>
    <div class="weui-panel">
      <div class="weui-panel_title">投诉原因</div>
      <div>
        <input v-model="AddComplaintParam.ComplaintReason" type="text" placeholder="请输入投诉原因">
      </div>
      <div class="weui-panel_title">其他备注</div>
      <div style="position:relative">
        <textarea v-model="AddComplaintParam.Remark" name="" placeholder="请输入其他备注" @keyup="limitCount(200)"></textarea>
        <span class="remark_textarea_nums_count" :class="{warn: exceedText}">{{AddComplaintParam.Remark.length}} / 200</span>
      </div>
      <div class="weui-panel_title">相关图片上传</div>
        <xx-uploader
          class="upload"
          :limit="9"
          :maxSize="1024 * 1024 * 5"
          :imgList="imgList1"
          @onUpdate="onUpdate1"
        ></xx-uploader>
    </div>
    <button style="position:fixed;bottom:0" class="weui-btn weui-btn-bottom weui-btn_primary" @click="submitComplaint" :disabled="disabled">提交</button>
  </div>
</template>

<script>
import util from '@/plugins/util'
export default {
  data () {
    return {
      exceedText: false,
      disabled: false,
      imgList1: [],
      AddComplaintParam: {
        ComplaintReason: '',
        Remark: '',
        Imgs: '',
        MissionID: ''
      },
      authText: {
        ComplaintReason: {
          text: '投诉原因',
          required: true
        },
        Remark: {
          text: '投诉备注',
          required: true
        }
      }
    }
  },
  methods: {
    limitCount (max) {
      this.exceedText = this.AddComplaintParam.Remark.length > max
    },
    async submitComplaint () {
      const that = this
      const validate = util.validateForm(this.AddComplaintParam, this.authText)
      if (!validate) return false
      if (this.exceedText) {
        this.$vux.toast.text('备注字数超出限制')
        return false
      }
      this.disabled = true
      this.AddComplaintParam.MissionID = this.$route.params.id
      if (this.AddComplaintParam.Imgs === '') {
        this.AddComplaintParam.Imgs = null
      }
      const res = await this.$http.post('/Complaint', this.AddComplaintParam)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: '提交成功',
          time: 500,
          onHide () {
            that.$router.push(`/result/complaint`)
          }
        })
      } else {
        this.$vux.toast.text(res.data.Msg)
        this.disabled = false
      }
    },
    onUpdate1 (id) {
      this.AddComplaintParam.Imgs = id.join(',')
    }
  }
}
</script>

<style scoped lang="less">
.weui-panel {
  padding-top: 10px;
  padding-bottom: 25px;
  overflow: hidden;
}
.weui-panel_title {
  margin-bottom: 12px;
  font-size: #333;
  color: 15px;
}

input,
textarea {
  padding: 7px 12px;
  width: 100%;
  display: block;
  background: #F6F6F6;
  border: 0;
  border-radius: 4px;
  margin-bottom: 18px;
  box-sizing: border-box;
}

input {
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
}

textarea {
  resize: none;
  height: 115px;
  padding-bottom: 30px;
}

.remark_textarea_nums_count {
  position: absolute;
  right: 16px;
  bottom: 7px;
  height: 18px;
  line-height: 18px;
  color: #999999;
  font-size: 13px;
  &.warn {
    color: #f44336
  }
}
</style>