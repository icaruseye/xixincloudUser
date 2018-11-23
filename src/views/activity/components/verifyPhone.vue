<template>
  <div v-transfer-dom>
    <x-dialog :show.sync="modelValue" class="dialog-wrapper">
      <div class="form-panel">
        <div class="weui-form-cell">验证手机号</div>
        <div class="weui-form-cell">
          <div class="weui-cell-top">
            <input v-model="mobile" name="phone" type="text" placeholder="请输入手机号">
          </div>
        </div>
        <div class="weui-form-cell weui-cell_vcode">
          <div class="weui-cell-top">
            <input v-model="code" name="code" type="number" placeholder="请输入验证码" style="width:80px">
            <button type="button" class="weui-vcode-btn" :disabled="disabled_code" @click="getCode">{{codeText}}</button>
          </div>
        </div>
      </div>
      <button type="button" class="weui-btn weui-btn-all weui-btn_primary" @click="submit" :disabled="disabledSubmit">提交</button>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog
  },
  props: {
    value: Boolean
  },
  computed: {
    modelValue: {
      get () {
        return this.value
      },
      set (val) {
        return this.$emit('input', val)
      }
    },
    codeText: function () {
      return this.time < 60 ? `重新获取(${this.time}s)` : '获取验证码'
    }
  },
  data () {
    return {
      disabledSubmit: false,
      mobile: '',
      code: '',
      disabled_code: false,
      time: sessionStorage.getItem('AuthCodeTime') || 60
    }
  },
  created () {
    if (this.time < 60) {
      this.setTimer()
      this.disabled_code = true
    }
  },
  methods: {
    async getCode () {
      const mobile = this.mobile
      if (!(mobile.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(mobile))) {
        return this.$vux.toast.text('请填写正确的手机号')
      }
      const res = await this.$http.post('/SendingVCode?MobilePhone=' + this.mobile)
      if (res.data.Code === 100000) {
        this.$vux.toast.text('已发送，请注意查收')
        this.setTimer()
      } else {
        this.$vux.toast.text(res.data.Msg)
        clearInterval(this.timer)
      }
    },
    setTimer: function () {
      if (!this.timer) {
        this.disabled_code = true
        this.timer = setInterval(() => {
          if (this.time > 0 && this.time <= 60) {
            this.time--
            sessionStorage.setItem('AuthCodeTime', this.time)
          } else {
            this.disabled_code = false
            sessionStorage.setItem('AuthCodeTime', 60)
            this.time = 60
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    async submit () {
      if (!this.mobile) {
        return this.$vux.toast.text('请填写正确的手机号')
      }
      if (!this.code) {
        return this.$vux.toast.text('请填写验证码')
      }
      this.disabledSubmit = true
      const res = await this.$http.post(`/ValidateMobile?MobilePhone=${this.mobile}&VCode=${this.code}`)
      if (res.data.Code === 100000) {
        this.$vux.toast.text('验证成功')
        this.modelValue = false
      } else {
        this.$vux.toast.text(res.data.Msg)
        this.disabledSubmit = false
      }
    },
    onNavbarClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-wrapper {
  background: #fff;
}
.form-panel {
  .weui-form-cell {
    padding: 13px 0;
    &.weui-cell_vcode {
      .weui-cell-top {
        align-items: center;
        height: 50px;
        .weui-vcode-btn {
          margin-left: 10px;
          border: 0;
          color: #fff;
          font-size: 12px;
          background: #3ecccc;
          height: 35px;
          line-height: 35px;
          width: 100px;
          text-align: center;
          border-radius: 3px;
          &:disabled {
            background: #cacaca;
          }
        }
      }
    }
  }
}

</style>

