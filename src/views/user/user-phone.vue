<template>
<div v-show="isShow">
  <div class="form-panel">
    <div class="weui-form-cell">
      <div class="weui-cell-top">
          <label class="label" for="">手机号</label>
          <input v-model="mobile" name="phone" type="text" placeholder="请输入手机号">
      </div>
    </div>
    <div class="weui-form-cell weui-cell_vcode">
      <div class="weui-cell-top">
          <label class="label" for="">验证码</label>
          <input v-model="code" name="code" type="number" placeholder="请输入验证码" style="width:80px">
          <button type="button" class="weui-vcode-btn" :disabled="disabled_code" @click="getCode">{{codeText}}</button>
      </div>
    </div>
    <div class="weui-form-cell userAgreement">
      <input type="checkbox" id="userAgreement" value="" v-model="userAgreement">
      <label for="userAgreement">我知晓并同意<a href="JavaScript:;" @click="showDialog">《患者用户服务协议》</a></label>
    </div>
  </div>
  <button type="button" class="weui-btn weui-btn-all weui-btn_primary" @click="submit" :disabled="disabledSubmit">提交</button>
  <x-dialog v-model="showHideOnBlur" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
    <div class="dialog-content">
      <div class="title">患者用户服务协议</div>
      <div class="content" style="overflow:hidden;">
        123
      </div>
      <div class="read-btn" @click="showHideOnBlur = false">我已阅读完毕</div>
    </div>
  </x-dialog>
</div>
</template>

<script>
import { AlertModule, XDialog, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog
  },
  data () {
    return {
      disabledSubmit: false,
      showHideOnBlur: false,
      isShow: true,
      mobile: '',
      code: '',
      disabled_code: false,
      time: sessionStorage.getItem('AuthCodeTime') || 60,
      userAgreement: false
    }
  },
  created () {
    const userInfo = this.$store.getters.userInfo
    if (userInfo.IsMobileChecked === 1) {
      history.back()
      AlertModule.show({
        title: '提示',
        content: '已绑定过手机号'
      })
    }
    if (this.time < 60) {
      this.setTimer()
      this.disabled_code = true
    }
    this.getShopAgreement()
  },
  computed: {
    codeText: function () {
      return this.time < 60 ? this.time + 's 后重新获取' : '获取验证码'
    }
  },
  methods: {
    isBindPhone () {
      return false
    },
    showDialog () {
      this.showHideOnBlur = true
    },
    async getShopAgreement () {
      const res = await this.$http.get(`/ShopAgreement?ProtocalType=4&ShopCertificateID=0`)
      if (res.data.Code === 100000) {
        console.log(res)
      }
    },
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
      if (!this.userAgreement) {
        return this.$vux.toast.text('请填勾选同意用户协议')
      }
      const that = this
      this.disabledSubmit = true
      const res = await this.$http.post(`/ValidateMobile?MobilePhone=${this.mobile}&VCode=${this.code}`)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: '验证成功',
          time: 500,
          onHide () {
            that.$store.dispatch('getAccount').then(() => {
              that.$router.push('/user')
              this.disabledSubmit = false
            })
          }
        })
      } else {
        this.$vux.toast.text(res.data.Msg)
        this.disabledSubmit = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form-panel {
  padding: 0 15px;
  .weui-form-cell {
    padding: 13px 0;
    &.weui-cell_vcode {
      padding: 0;
      .weui-cell-top {
        align-items: center;
        height: 50px;
        .weui-vcode-btn {
          border: 0;
          color: #fff;
          font-size: 12px;
          background: #3ecccc;
          height: 30px;
          line-height: 30px;
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

.weui-btn {
  position: fixed;
  bottom: 0;
}

.dialog-content {
  background: #fff;
  margin: 0 30px;
  padding: 20px;
  border-radius: 2px;
  color: #666;
  overflow: auto;
  line-height: 2;
  text-align: left;
  .title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin:  0 0 10px 0;
    text-align: center;
  }
}

.userAgreement {
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    margin-right: 5px;
  }
  a {
    color: @yellow;
  }
}

.read-btn {
  margin: 0 auto;
  width: 130px;
  height: 50px;
  line-height: 50px;
  border: 1px solid #3ecccc;
  border-radius: 4px;
  box-sizing: border-box;
  background: #fff;
  text-align: center;
  font-size: 16px;
  color: #3ecccc;
}
</style>

