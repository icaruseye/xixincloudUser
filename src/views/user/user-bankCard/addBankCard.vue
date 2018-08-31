<template>
  <div>
    <xx-go-back></xx-go-back>
    <p style="height: 45px;line-height:45px;color:#999;padding-left:12px;font-size:12px">请绑定持卡人本人的银行卡</p>
    <div class="form_container">
      <div class="form_items" @click="hintDialogVisible = true">
        <label class="form_label">
          持卡人
        </label>
        <div class="form_content">
          <p class="form_content_p">{{userInfo.RealName}}</p>
        </div>

        <i class="exclamation_mark_icon"></i>
      </div>
      <div class="form_items" v-if = "currentCardType != null">
        <label class="form_label" for="bankCard">
          银行
        </label>
        <div class="form_content">
          <p class="form_content_p" style="background-color: #fff;position: relative">
            {{currentCardType.bankName}}
            <span style="position: absolute;right:0;top: 0;color: #3ecccc">{{currentCardType.cardTypeName}}</span>
          </p>
        </div>
      </div>
      <div class="form_items">
        <label class="form_label" for="bankCard">
          卡号
        </label>
        <div class="form_content">
          <input type="text" @blur="bankCardBlur" id="bankCard" placeholder="请输入银行卡号" v-model="bankCard">
        </div>
      </div>
      <div style="margin: 20px 10px;">
        <button class="weui-btn weui-btn_primary" style="border-radius:4px;box-sizing: border-box" @click="submitEvent">确认绑定</button>
      </div>
      <p style="text-align:center;font-size:14px;color:#3ecccc" @click="supportBankListVisble=true">查看当前支持的银行卡</p>
    </div>
    <x-dialog v-model="hintDialogVisible">
      <div class="hint_dialog_container">
        <h1 class="hint_title">持卡人说明</h1>
        <p class="hint_text">为了保证账户资金安全，<br/>只能绑定认证账户本人的银行卡。</p>
        <a class="hint_dialog_close_btn" href="javascript:void(0)" @click="hintDialogVisible = false">知道了</a>
      </div>
    </x-dialog>
    
    <x-dialog v-model="supportBankListVisble" :hide-on-blur="true">
      <div class="hint_dialog_container">
        <p class="supportBank_items" v-for="(item, index) in supportBankList" :key="index">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon"></use>
          </svg>
          {{item.name}}
        </p>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {XDialog} from 'vux'
import getBankNameByCard from '@/plugins/getBankNameByCard'
import util from '@/plugins/util'
export default {
  components: {
    XDialog
  },
  data () {
    return {
      supportBankListVisble: false,
      hintDialogVisible: true,
      submitLocked: false,
      currentCardType: null,
      bankCard: '',
      supportBankList: util.getSupportBankList()
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    bankCardBlur () {
      if (this.bankCard !== null && this.bankCard !== '') {
        let cardType = getBankNameByCard(this.bankCard)
        if (cardType === 'error') {
          this.$vux.toast.text('无效的银行卡号')
          this.currentCardType = null
        } else {
          this.currentCardType = getBankNameByCard(this.bankCard)
        }
      }
    },
    async submitEvent () {
      const that = this
      if (that.currentCardType === null) {
        this.$vux.toast.text('请填写正确的银行卡号')
        return false
      }
      if (that.currentCardType.cardType !== 'DC') {
        that.$vux.toast.text('当前仅支持储蓄卡')
        return false
      }
      if (!util.bankIsSupport(that.currentCardType.bankCode)) {
        that.$vux.toast.text(`目前还不支持${that.currentCardType.bankName}`)
        return false
      }

      that.$vux.loading.show('正在提交')
      that.submit().then(value => {
        if (value.Code === 100000) {
          that.$vux.toast.show({
            text: '添加成功',
            onHide () {
              that.$vux.loading.hide()
              that.$router.go(-1)
            }
          })
        } else {
          that.$vux.loading.hide()
          that.$vux.toast.show({
            width: '60%',
            type: 'text',
            position: 'middle',
            text: value.Msg
          })
        }
      })
    },
    async submit () {
      const res = await this.$http.post('/ServantBankInfo', {
        BankCard: this.bankCard,
        BankName: this.currentCardType.bankName
      })
      return res.data
    }
  }
}
</script>

<style lang="less" scoped>
.form_items
{
  position: relative;
  display: flex;
  flex-flow: nowrap;
  height: 60px;
  position: relative;
  background-color: #fff;
  .form_label
  {
    display: flex;
    align-items: center;
    padding-left: 15px;
    color: #666;
    font-size: 18px;
    flex: 0 0 70px;
  }
  .form_content
  {
    display: flex;
    align-items: center;
    flex: 0 0 260px;
    .form_content_p,
    input[type=text] {
      height: 35px;
      width: 100%;
      color: #999;
      padding: 0 10px;
      font-size: 14px;
      line-height: 35px;
      background-color: #f6f6f6;
      outline: none;
      -webkit-tap-highlight-color: rgba(0,0,0,0)
    }
    input::-webkit-input-placeholder{
      color:#ccc;
    }
  }
}

.form_items::after
{
  position: absolute;
  content: '';
  display: block;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E7E7E7;
  transform: scaleY(.5);
  height: 1px;
}
.form_items:last-child:after
{
  display: none;
}
.hint_dialog_container
{
  background-color: #fff;
  border-radius: 4px;
  padding: 20px 45px;
  .hint_title
  {
    font-size: 18px;
    color: #333;
    font-weight: normal;
    text-align: center;
  }
  .hint_text
  {
    margin-top: 14px;
    color: #666;
    font-size: 14px;
    text-align: center;
  }
  .hint_dialog_close_btn
  {
    display: inline-block;
    height: 30px;
    margin-top: 25px;
    line-height: 30px;
    padding: 0 24px;
    color: #fff;
    font-size: 14px;
    background-color: #3ecccc;
    border-radius: 15px;
  }
}

  .exclamation_mark_icon
  {
    position: relative;
    width: 15px;
    height: 15px;
    display: flex;
    flex-flow: column;
    background-color: #3ecccc;
    font-size: 4px;
    text-align: center;
    line-height: 1;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
    align-content: center;
    align-items: center;
  }
  .exclamation_mark_icon::before,
  .exclamation_mark_icon::after
  {
    content: "";
    display: block;
    width: 1px;
    background-color: #fff;
  }
  .exclamation_mark_icon::before
  {
    height: 1px;
    margin-top: 4px;
  }
  .exclamation_mark_icon::after
  {
    margin-top: 2px;
    content: "";
    display: block;
    height: 4px;
  }
  .supportBank_container
  {
    padding: 15px;
    p
    {
      font-size: 14px;
      color: #999;
    }
  }
  .supportBank_items
  {
    height: 35px;
    color: #999;
    text-align: left
  }
</style>

