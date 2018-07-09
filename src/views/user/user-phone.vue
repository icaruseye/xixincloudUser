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
      <div class="content">
        <ol>
          <li>欢迎您与悉心云健康服务平台经营者（以下简称：平台经营者）签署《服务者服务协议》（以下简称：本协议），并使用悉心云健康服务平台（以下简称：平台）提供的各项服务！ 本协议的双方为悉心云健康服务平台经营者重庆齐悦安康医院股份有限公司与注册、使用平台的患者用户。</li>
          <li>【审慎阅读】您在申请注册流程中点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。如您对协议有任何疑问，可向平台客服人员咨询。如您未满18周岁，或其他限制民事行为能力人，请在监护人的陪同下阅读本协议。</li>
          <li>【签约动作】当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与平台达成一致，成为平台的患者用户。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序或咨询客服人员。</li>
          <li>【词汇定义】本文中所用词汇定义如下：</li>
          <li>1、平台：指悉心健康科技有限责任公司提供的基于微信服务号使用的服务系统</li>
          <li>2、平台经营者：指负责本平台运营管理、提供本平台给用户使用、根据用户请求实际提供全面的诊疗及健康管理、家庭护理等医疗服务的重庆齐悦安康医院股份有限公司。 </li>
          <li>3、医护服务者用户：指阅读和签署本协议，经过本平台注册程序成为本平台各项医护服务的提供者的执业医护人员，及康复师、理疗师、营养师、心理咨询师等专业人员；或经本平台采取合理方式对其身份、资质、能力服务水平进行核实、培训后，通过本平台向患者用户提供相应服务的执业医生、护士及其他专业医疗保健工作人员。</li>
          <li>4、患者用户：指阅读和签署本协议，经过本平台注册程序成为本平台各项医护服务的使用者。</li>
          <li> 5、平台管理规定：包括本协议在内，所有在平台已经发布及后续发布的全部规则、提示、声明文件、解读、公告等内容。</li>
          <li>一、服务内容：</li>
          <li>1.1本协议项下服务的具体内容由平台经营者提供，平台经营者保留随时变更、中断或终止部分或全部网络服务的权利。</li>
          <li>1.2平台仅作为您与医护服务者用户交流互通的工具及医疗护理服务、产品、商品的展示及交易的平台。</li>
          <li>1.3平台在提供服务时，会对部分收费服务给予明确的提示，如拒绝支付此类费用，平台有权拒绝提供相关网络服务。</li>
          <li>二、注册及使用</li>
          <li>2.1您在进行注册时，应按照平台所显示的要求提供注册资料，并保证提供的资料真实、准确、完整且合法有效，如您提供的资料不真实、不准确、不完整、不合法，或用户账号名称、头像和简介等注册信息中出现违法或不良信息的，您个人承担因此引起的法律责任及后果，平台经营者保留终止您使用平台及进一步追究其法律责任的权利。</li>
          <li>2.2您在使用平台时，应遵守国家法律法规及平台管理规定，如您违反约定，由您个人承担因此引起的法律责任及后果，平台经营者保留终止您使用平台及进一步追究其法律责任的权利。</li>
          <li>三、产品及交易</li>
          <li>3.1产品、服务信息的变更平台对其他用户信息、产品、服务等有关信息（数量、价格、种类等）随时可能更新，平台不另行通知。平台发布的信息可能会有一定的滞后性或差错，对此情形请知悉并理解。</li>
          <li>3.2产品交易</li>
          <li>3.2.1产品信息确认</li>
          <li>您在平台对服务产品下订单时，须仔细确认所购服务产品的名称、价格、数量、服务人员、说明、注意事项、联系地址、电话、联系人等信息。联系人与您本人不一致的，联系人的行为和意思表示视为您的行为和意思表示，您应对联系人的行为及意思表示所产生的法律后果承担连带责任。</li>
          <li>3.2.2产品订购合同的成立</li>
          <li> (1)平台上发布的服务产品种类、人员和价格等信息仅仅是使用平台的医护服务用户发出的要约邀请，您下单时系统生成的订单信息是平台信息系统根据您选择、填写的信息（服务人员、服务数量、联系人、联系方式、联系地址（服务合同实际履行地点）、履行方式等）自动生成的数据，是您所发出的合同要约；</li>
          <li>(3) 医护服务用户收到您的订单信息后，将通过电话、短信或其他形式向您确认服务产品订单，该信息一经确认，您与医护服务用户之间的服务合同成立；服务合同的服务内容以平台发出的确认信息为准。如您在服务合同成立后请求调整合同内容的，须向与您订立服务合同的医护服务用户沟通并进行确认，并致电向平台客服更改相关内容。</li>
          <li>3.3平台将尽其努力监督、促使提供产品服务的医护服务用户，根据服务合同提供产品、服务。平台无法保证经确认的订单信息中您希望购买的产品、服务提供方能实际提供；如您拟购买的服务，发生无法实际提供的情形，您有权取消订单。</li>
          <li>四、您的权利和义务</li>
          <li>4.1您自主管理在平台的账号及密码，可随时登陆平台查询您的订单状态，并对您的账号在平台进行的所有活动承担法律责任；</li>
          <li>4.2您应向平台提供真实、准确、完整且合法有效的注册资料，因您提供的资料不真实、不准确、不完整、不合法的，您需承担相应责任及后果；平台保留终止您使用平台及进一步追究有关责任的权利。</li>
          <li>4.3您有权根据平台规定发布、获取信息，进行医患互通交流等。</li>
          <li>4.4您在使用平台时应当遵守国家法律、法规、公共道德及平台管理规定。因违反上述约定发生的法律后果由您承担相应法律责任。</li>
          <li>4.5您不得发布违法信息，不得恶意评价其他医护人员、产品服务及用户。</li>
          <li>4.6您不得以任何形式转让或授权他人使用自己的平台账号，亦不得盗用他人账号，由以上行为造成的后果由您自行承担。</li>
          <li>4.7您如发现其他用户有违法或违反平台规定的行为，可以向平台进行反映要求处理。</li>
          <li>4.8您应当根据经确认的订单按照平台规定支付有关服务费用或其他相关费用。</li>
          <li>五、平台的权利和义务：</li>
          <li>5..1平台经营者除提供必要的网络技术帮助外，对您与医护服务者用户之间的交流进行协助，但平台经营者不对您及其他用户发布的信息的来源和正确性负责，不对医患交流的结果承担任何责任。</li>
          <li>5.2如因系统维护或升级的需要而需暂停平台网络服务，平台经营者将尽可能提前向您告知。</li>
          <li>5.3若您在平台与其它用户产生纠纷，请求平台从中予以调处，经平台审核后，平台经营者有权向纠纷双方了解清况，并将所了解的清况互相通知对方；平台所作出的调处行为不具有法律效力，调处结果系由纠纷双方自愿作出，平台经营者仅协助提供信息的沟通，不对调处结果承担相应法律责任。</li>
          <li>5.4若您将涉及医疗纠纷的问题或其它有责任争议的问题在平台发布，或在平台有不当行为的，平台有权随时删除相关信息并终止您使用平台账户。</li>
          <li>5.5平台有权对您的注册数据及活动行为进行查阅，发现注册数据或活动行为中存在任何问题或怀疑，均有权向您发出询问及要求改正的通知或者直接作出删除等处理。</li>
          <li>5.6如存在下列情况，平台经营者有权根据不同情况选择保留或删除相关信息或继续、停止对您提供服务，并追究相关法律责任：</li>
          <li>(1)平台其他用户或其它第三方通知平台，认为您的具体行为、具体事项可能存在重大问题；</li>
          <li>(2)其他用户或其它第三方向平台告知您在平台上有违法或不当行为的，经平台查证属实的。 </li>
          <li>5.7经国家生效法律文书或行政处罚决定确认您存在违法行为，或者平台有足够事实依据可以认定您存在违法国家法律法规或平台管理规定的行为的，平台有权以合理方式公布您的违法行为。</li>
          <li>六、信息保密与使用</li>
          <li>6.1适用范围</li>
          <li>6.1.1您注册平台时，根据平台要求提供的个人信息；</li>
          <li>6.1.2您使用平台服务、参加相关活动、访问网站网页（或移动客户端/微信公众号/微信小程序）时，网站自动接收并记录服务者浏览器上的服务器数据，包括但不限于IP地址、网站Cookie中的资料及用户要求取用的网页记录；</li>
          <li>6.1.3平台通过合法途径从其他途径取得的您的个人资料。</li>
          <li>6.2信息保密</li>
          <li>6.2.1保护您隐私是平台的一项基本政策，平台不对外公开或向第三方提供您的注册资料及其在使用网络服务时存储的非公开内容，但下列情况除外：事先获得您的明确授权；根据有关的法律法规要求；按照相关政府主管部门的要求；为维护社会公众的利益；为维护平台的合法权益。</li>
          <li>6.2.2平台可能会与第三方合作，为您提供相关的网络服务，确保该第三方同意承担与平台同等的保护您的隐私的责任后，平台有权将您的注册资料等提供给该第三方。</li>
          <li>6.3信息使用：</li>
          <li>6.3.1平台在不透露单独您个人隐私资料的前提下，有权对在平台注册的全部患者用户的数据库进行分析并对患者用户数据库进行商业上的利用。</li>
          <li>6.3.2您与医护服务者用户之间的咨询问题内容在隐去姓名、单位、地址等信息后，平台有权在未征得您同意的情况下公开、编辑、出版、发行。</li>
          <li>七、特别约定</li>
          <li>您一旦接受本协议，即表明您将在本平台发表的任何形式的信息内容（包括但不限于客户评价、客户咨询、各类话题文章等信息内容）的财产性权利等可转让的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），全部独家且不可撤销地转让给平台所有，同意平台经营者有权就其他主体侵权而单独提起诉讼。</li>
          <li>八、协议的变更及终止</li>
          <li>8.1变更</li>
          <li>8.1.1平台可根据国家法律法规变化及维护交易秩序、保护消费者权益等需要，随时修改本协议、拟定新的补充协议，变更后的协议及新拟定的补充协议（下称“变更事项”）将以协议11.1约定的方式通知您。</li>
          <li>8.1.2如您不同意变更事项，您有权于变更事项确定的生效日前联系平台反馈意见。如您对已生效的变更事项仍不同意的，您应当于变更事项确定的生效之日起停止使用平台服务，变更事项对您不产生效力；如您在变更事项生效后仍继续使用平台服务，则视为您同意已生效的变更事项。</li>
          <li>8.2终止</li>
          <li>8.2.1如发生下列任何一种情形，平台有权解除本协议：</li>
          <li>（1）平台发现您提供虚假个人资料的；</li>
          <li>（2）您有盗用他人账户、发布违禁信息、骗取他人财物的行为； </li>
          <li>（3）您有传播虚假信息，歪曲事实的行为并经平台查证属实的；</li>
          <li>（4）您有违反国家有关法律法规或平台管理规定的行为，侵害他人合法权益的；</li>
          <li>（5）您因不当行为被行政或司法机构拘留或起诉的；</li>
          <li>（6）您与医护服务者用户私下交易的，经平台要求纠正而拒不纠正的； </li>
          <li>（7）您自愿注销平台账户的；</li>
          <li>（8） 其它平台认为需要终止服务的情况。</li>
          <li> 8.2.2您在本平台的账户注销后，平台经营者仍有以下权利：</li>
          <li>（1）有权保留您的注册数据及过往的行为记录；</li>
          <li>（2）如注销前在平台上存在违法行为或违反条款的行为，平台经营者仍可行使本服务条款所规定的权利；</li>
          <li>（3）平台经营者仍有权向您追索所欠服务费用或要求承担因违反本协议而应承担的赔偿责任。</li>
          <li>九、违约责任：</li>
          <li>9.1违约认定</li>
          <li>9.1.1使用平台时违反有关法律法规规定的；</li>
          <li>9.1.2违反本协议或本协议补充协议约定的。</li>
          <li>9.2 违约处理措施</li>
          <li>您在平台上发布的信息构成违约的，平台可根据相应规则立即对相应信息进行删除、屏蔽处理或暂停您使用平台账户。</li>
          <li>9.3违约责任</li>
          <li>9.3.1如您的行为使平台经营者遭受损失（包括自身的直接经济损失、商誉损失及对外支付的赔偿金、和解款、律师费、诉讼费等间接经济损失），您应赔偿上述全部损失。</li>
          <li>9.3.2如您的行为使平台经营者遭受第三人主张权利， 平台经营者可在对第三人承担金钱给付等义务后就全部损失向您追偿。</li>
          <li>9.3.3如因您的行为使得第三人遭受损失您应当自行承担赔偿责任。</li>
          <li>十、免责声明：</li>
          <li>10.1您使用平台所存在的风险将完全由您自己承担；因使用平台服务而产生的一切后果也由您自己承担，平台不承担任何责任。</li>
          <li>10.2平台不担保网络服务一定能满足您的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。</li>
          <li>10.3平台不保证为向您提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由平台实际控制的任何网页上的内容，平台均不承担任何责任。</li>
          <li>10.4对于因不可抗力或平台不能控制的原因造成的网络服务中断或其它缺陷，平台不承担任何责任。</li>
          <li>十一、通知送达：</li>
          <li>11.1本协议项下平台的所有的通知均可通过在平台网页公告、页面提示、站内信、电子邮件、手机短信或常规的信件传送等方式通知您；该等通知于发送之日视为已送达至您。</li>
          <li>11.2您向平台发出的通知应当通过平台对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。</li>
          <li>十二、法律管辖及争议解决：</li>
          <li>12.1本服务条款的订立、执行和解释及争议的解决均应适用中国法律。</li>
          <li>12.2如本服务条款内容或其执行发生任何争议，平台将尽可能与您友好协商解决；协商不成时，任何一方均可向平台经营者所在地的人民法院提起诉讼。</li>
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

