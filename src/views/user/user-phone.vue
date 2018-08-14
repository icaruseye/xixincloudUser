<template>
  <div v-if="userInfo.IsMobileChecked !== 1">
    <xx-nav-bar
      left-text="返回"
      :right-text="userAccount.NickName"
      :avatar="userAccount.Avatar | transformImgUrl"
      @click-left="onNavbarClickLeft">
    </xx-nav-bar>
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
    <x-dialog v-model="showHideOnBlur" hide-on-blur :dialog-style="{height: '75%', 'background-color': 'transparent'}">
      <div class="tips-content">
        <div class="title">{{AgreementList.Title}}</div>
        <div class="content" v-html="AgreementList.Content"></div>
        <div class="read-btn" @click="showHideOnBlur = false">我已阅读完毕</div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { AlertModule, XDialog, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ]),
    codeText: function () {
      return this.time < 60 ? `重新获取(${this.time}s)` : '获取验证码'
    }
  },
  data () {
    return {
      disabledSubmit: false,
      showHideOnBlur: false,
      mobile: '',
      code: '',
      disabled_code: false,
      time: sessionStorage.getItem('AuthCodeTime') || 60,
      userAgreement: false,
      AgreementList: {},
      userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
    }
  },
  created () {
    if (this.userInfo.IsMobileChecked) {
      AlertModule.show({
        title: '提示',
        content: '已绑定过手机号',
        onHide () {
          history.back()
        }
      })
    }
    if (this.time < 60) {
      this.setTimer()
      this.disabled_code = true
    }
    this.getShopAgreement()
  },
  methods: {
    isBindPhone () {
      return false
    },
    showDialog () {
      this.showHideOnBlur = true
    },
    async getShopAgreement () {
      const res = await this.$http.get(`/ShopAgreement?protocalType=17&itemID=0`)
      if (res.data.Code === 100000 && res.data.Data) {
        this.AgreementList = res.data.Data
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
              // 从user页进入
              if (that.$route.query.edit === '1') {
                that.$router.back()
              } else {
                // 从预约页进入
                const path = sessionStorage.getItem('reserve_path') || '/'
                that.$router.replace(path)
              }
            })
          }
        })
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
  max-height: 100%;
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
  margin: 15px auto 0;
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

.tips-content {
  max-height: 400px;
  padding: 10px;
  text-align: left;
  overflow: scroll;
  color: #666;
  background: #fff;
  font-size: 15px;
  .title {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  p {
    line-height: 1.8;
    margin-bottom: 10px;
    font-size: 13px;
  }
}
</style>

