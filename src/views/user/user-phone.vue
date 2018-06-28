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
      <label for="userAgreement">我知晓并同意<a href="JavaScript:;" @click="showDialog">《悉心健康用户协议》</a></label>
    </div>
  </div>
  <button type="button" class="weui-btn weui-btn-all weui-btn_primary" @click="submit" :disabled="disabledSubmit">提交</button>
  <x-dialog v-model="showHideOnBlur" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
    <div class="dialog-content">
      <div class="title">用户协议</div>
      <div class="content">
        <ol>
          <li>用户注册成功后，知乎将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</li>
          <li>用户须对在知乎的注册信息的真实性、合法性、有效性承担全部责任，用户不得冒充他人；不得利用他人的名义发布任何信息；不得恶意使用注册帐号导致其他用户误认；否则知乎有权立即停止提供服务，收回其帐号并由用户独自承担由此而产生的一切法律责任。</li>
          <li>用户直接或通过各类方式（如 RSS 源和站外 API 引用等）间接使用知乎服务和数据的行为，都将被视作已无条件接受本协议全部内容；若用户对本协议的任何条款存在异议，请停止使用知乎所提供的全部服务。</li>
          <li>知乎是一个信息分享、传播及获取的平台，用户通过知乎发表的信息为公开的信息，其他第三方均可以通过知乎获取用户发表的信息，用户对任何信息的发表即认可该信息为公开的信息，并单独对此行为承担法律责任；任何用户不愿被其他第三人获知的信息都不应该在知乎上进行发表。</li>
          <li>用户承诺不得以任何方式利用知乎直接或间接从事违反中国法律以及社会公德的行为，知乎有权对违反上述承诺的内容予以删除。</li>
          <li>
          <p>用户不得利用知乎服务制作、上载、复制、发布、传播或者转载如下内容：</p>
          <ul>
          <li>反对宪法所确定的基本原则的；</li>
          <li>危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</li>
          <li>损害国家荣誉和利益的；</li>
          <li>煽动民族仇恨、民族歧视，破坏民族团结的；</li>
          <li>破坏国家宗教政策，宣扬邪教和封建迷信的；</li>
          <li>散布谣言，扰乱社会秩序，破坏社会稳定的；</li>
          <li>散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</li>
          <li>侮辱或者诽谤他人，侵害他人合法权益的；</li>
          <li>含有法律、行政法规禁止的其他内容的信息。</li>
          </ul>
          </li>
          <li>所有用户同意遵守<a href="/terms2">知乎社区管理规定（试行）</a>和<a href="/terms/video">知乎视频服务协议（试行）</a>。</li>
          <li>机构用户同意遵守<a href="/org_service_agreement">知乎机构号服务协议</a>，以及<a href="/org_use_norm">知乎机构号使用规范（试行）</a>。</li>
          <li>知乎有权对用户使用知乎的情况进行审查和监督，如用户在使用知乎时违反任何上述规定，知乎或其授权的人有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户张贴的内容、暂停或终止用户使用知乎的权利）以减轻用户不当行为造成的影响。</li>
          </ol>
      </div>
    </div>
    <p style="color:#fff;text-align:center;margin-top:10px;">
      <x-icon type="ios-close-outline" style="fill:#fff;" @click="showHideOnBlur = false"></x-icon>
    </p>
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
    async getCode () {
      const mobile = this.mobile
      if (!(mobile.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(mobile))) {
        return this.$vux.toast.text('请填写正确的手机号')
      }
      const res = await this.$http.post('/SendingVCode?MobilePhone=' + this.mobile)
      if (res.data.Code === 100000) {
        this.$vux.toast.text('已发送，请注意查收')
        this.setTimer()
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
  height: 80vh;
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
</style>

