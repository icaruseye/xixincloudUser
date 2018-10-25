<template>
  <div>
    <xx-nav-bar
      left-text="返回"
      @click-left="onNavbarClickLeft">
    </xx-nav-bar>
    <div class="step_container">
      <xx-step-bar step="1">
        <xx-step-items slot="items">
          发起提现
        </xx-step-items>
        <xx-step-items slot="items">
          到账成功
        </xx-step-items>
      </xx-step-bar>
    </div>
    <div class="box_warp_container">
      <div class="select_bank_card_container" @click="withdrawTypeVisible = true">
        <div class="select_bank_card_title">
          到账银行卡
        </div>
        <div class="select_bank_card_box">
          <template v-if="currentWithdrawType">
            <div class="bank_info_box clearfix">
              <i class="bank_logo">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="currentWithdrawType.icon | xxGetBankCardLogoFilter"></use>
                </svg>
              </i>
              <h3 class="bank_name">
                {{currentWithdrawType.name}}
              </h3>
            </div>
            <p class="bankCard_desc">尾号为{{currentWithdrawType.code}}的储蓄卡</p>
          </template>
          <template v-else>
            <div class="bank_info_box clearfix">
              <i class="bank_logo">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yinhangqia"></use>
                </svg>
              </i>
              <h3 class="bank_name">
                请先选择提现方式
              </h3>
            </div>
            <p class="bankCard_desc">选择提现方式后才可以提现</p>
          </template>
        </div>
      </div>

      <div class="input_container">
        <h4 class="input_container_title">提现金额</h4>
        <div class="amount_input_control clearfix" @click="numberKeyboardVisible = true">
          <span class="amount_input_prefix">￥</span>
          <span :class="['amount_text_container', numberKeyboardVisible ? 'amount_text_focus_container' : '']">
            {{withdrawAmount}}
          </span>
          <span class="placeholder" v-if="withdrawAmount.length == 0">
              余额：{{canWithdrawAmount}}元
            </span>
          <span class="allin_amount" @click.stop="withdrawAmount = (canWithdrawAmount + '')">全部提现</span>
        </div>
        <div class="amount_input_balance">
          <span v-if="withdrawAmount < minWithAmount" style="color:#ff0000">
            每次提现最少{{minWithAmount}}元
          </span>
          <span v-if="withdrawAmount > maxWithAmount" style="color:#ff0000">
            每次提现最多{{maxWithAmount}}元
          </span>
          <template v-if="withdrawAmount >= minWithAmount && withdrawAmount <= maxWithAmount">
            扣除¥{{amountCompute(HandlingFee)}}手续费，实际到账
            <span style="color:#3ecccc">¥{{realityWithdrawAccount}}</span>
          </template>
          <p>{{HandingFeeDiscription}}</p>
        </div>
      </div>

      <div class="apply_withdraw_btn_box">
        <template v-if="amountIsOverflow">
          <button class="disabled apply_withdraw_btn">
            余额不足
          </button>
        </template>
        <template v-if ="this.currentWithdrawType === null">
          <button class="apply_withdraw_btn" @click="withdrawTypeVisible = true">
            请选择提现方式
          </button>
        </template>
        <template v-if="!amountIsOverflow && (this.currentWithdrawType !== null)">
          <button :class="`apply_withdraw_btn ${canWithDraw ? '' : 'disabled'}`" @click="submitWithdrawApply">
            提现
          </button>
        </template>
      </div>
    </div>

    <van-number-keyboard
      :show="numberKeyboardVisible"
      extra-key="."
      theme="custom"
      close-button-text="确定"
      @input="numberKeyboardInput"
      @delete="numberKeyboardDelete"
      @blur="numberKeyboardVisible = false"
    />

    <xx-select-Bank-card 
      v-model="withdrawTypeVisible"
      @change="bankCardChange"
      :currentWithdrawType="currentWithdrawType"
    ></xx-select-Bank-card>
  </div>
</template>
<script>
import 'vant/lib/vant-css/base.css'
import xxSelectBankCard from '@/components/common/selectBankCard'
export default {
  components: {
    xxSelectBankCard
  },
  data () {
    return {
      minWithAmount: 10, // 最低提现金额
      maxWithAmount: 50 * 1000, // 最大提现金额
      currentWithdrawType: null,
      withdrawTypeVisible: false,
      numberKeyboardVisible: false,
      withdrawAmount: '', // 提现金额
      blance: 0, // 余额
      HandlingFee: 0, // 提现手续费
      HandingFeeDiscription: '' // 提现手续费描述
    }
  },
  computed: {
    canWithdrawAmount () { // 可提现金额
      return this.amountCompute(this.blance)
    },
    realityWithdrawAccount () { // 实际到账金额
      return this.amountCompute(this.withdrawAmount * 100 - this.HandlingFee)
    },
    amountIsOverflow () { // 提现金额是否溢出
      return parseFloat(this.withdrawAmount) > (this.canWithdrawAmount + this.HandlingFee)
    },
    canWithDraw () { // 是否能提现（金额无溢出，提现方式不为空，提现金额大于等于最低提现金额并且小于等于最大提现金额
      const withdrawAmount = parseFloat(this.withdrawAmount)
      return !this.amountIsOverflow && (this.currentWithdrawType !== null) && withdrawAmount >= this.minWithAmount &&
      withdrawAmount <= this.maxWithAmount
    }
  },
  watch: {
    withdrawAmount () {
      this.getWithdrawFee()
    }
  },
  created () {
    this.getWithdrawInfo()
    this.getWithdrawFee()
  },
  methods: {
    onNavbarClickLeft () {
      this.$router.back()
    },
    amountCompute (amount = null) {
      return amount === null ? 0 : (parseFloat(amount) / 100).toFixed(2)
    },
    submitWithdrawApply () {
      if (this.canWithDraw) {
        const that = this
        that.$vux.confirm.show({
          content: `确定要提现到（*${this.currentWithdrawType.code}）吗？？`,
          confirmText: '确定',
          cancelText: '放弃提现',
          onConfirm () {
            that.applyWithdraw()
          }
        })
      }
    },
    widthDrawDescAlertShow () {
      this.$vux.alert.show({
        content: 'T+1个工作日指发起提现后的第一个工作日'
      })
    },
    /**
     * 申请提现
     */
    applyWithdraw () {
      const withdrawAmount = parseFloat(this.withdrawAmount) * 100
      this.$http.post('/Withdraw', {
        Amount: withdrawAmount,
        bankInfoID: this.currentWithdrawType.id
      }).then(result => {
        if (result.data.Code === 100000) {
          this.$router.replace(`/user/bills/${result.data.Data}/detail`)
        }
      })
    },
    /**
     * 获取提现信息
     */
    getWithdrawInfo () {
      this.$http.get('/Withdraw').then(result => {
        if (result.data.Code === 100000) {
          this.blance = result.data.Data.Amount
          this.HandingFeeDiscription = result.data.Data.HandingFeeDiscription
        }
      })
    },
    /**
     * 计算手续费
     */
    getWithdrawFee () {
      let withdrawAmount = parseFloat(this.withdrawAmount || 0).toFixed(0)
      if (withdrawAmount > 0) {
        this.$http.get(`/HandlingFee?amount=${withdrawAmount * 100}`).then(result => {
          this.HandlingFee = result.data.Data
        })
      } else {
        this.HandlingFee = 0
      }
    },
    /**
     * 当银行卡发生改变
     */
    bankCardChange (bankCard) {
      this.currentWithdrawType = bankCard
    },
    clearAmount () {
      this.withdrawAmount = ''
    },
    numberKeyboardInput (key) {
      this.setWithdrawAmount(this.withdrawAmount + '' + key)
    },
    numberKeyboardDelete () {
      let len = this.withdrawAmount.length
      this.setWithdrawAmount(this.withdrawAmount.substring(0, len - 1))
    },
    setWithdrawAmount (amount) {
      const reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
      if (amount.length <= 0) {
        this.withdrawAmount = ''
        return false
      } else if (!reg.test(amount)) {
        return false
      } else if (parseFloat(amount) > this.canWithdrawAmount) {
        this.withdrawAmount = this.canWithdrawAmount
        return false
      } else {
        this.withdrawAmount = amount
        return false
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .step_container
  {
    height: 90px;
    background-color: #fff;
  }
  .box_warp_container
  {
    margin: 10px 6px 100px;
    background-color: #fff;
    border-radius: 4px;
    padding-bottom: 18px;
  }
  .select_bank_card_container
  {
    position: relative;
    height: 72px;
    background-color: #F8FCFC;
    border-radius: 4px 4px 0 0;
    text-align: center;
    .select_bank_card_title
    {
      float: left;
      width: 143px;
      text-align: right;
      font-size: 15px;
      color: #333;
      padding-top: 22px;
      height: 22px;
      line-height: 22px;

    }
    .select_bank_card_box
    {
      position: relative;
      float: left;
      margin-left: 19px;
      padding-top: 22px;
      .bank_info_box
      {
        .bank_logo
        {
          float: left;
          font-size: 14px;
          height: 22px;
          line-height: 22px;
          vertical-align: middle;
        }
        .bank_name
        {
          float: left;
          font-size: 12px;
          height: 22px;
          line-height: 22px;
          font-weight: normal;
          color: #3ecccc;
          margin-left: 10px;
        }
      }
      .bankCard_desc
      {
        height: 20px;
        color: #CCCCCC;
        font-size: 12px;
        text-align: left;
      }
    }
  }
  .input_container
  {
    margin-top: 20px;
    background-color: #fff;
    .input_container_title
    {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: normal;
      padding: 0 31px;
      color: #333;
    }
    .amount_input_control
    {
      position: relative;
      margin: 0 31px;
      border-bottom: 1px solid #D8F4F2;
      font-size: 24px;
      color: #333;
      padding: 5px 0 2px;
      .placeholder
      {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 15px;
        color: #ccc;
      }
      .allin_amount
      {
        position: absolute;
        right: 0;
        top: 50%;
        font-size: 12px;
        transform: translateY(-50%);
        color: #3ecccc;
      }
      .amount_input_prefix
      {
        display: block;
        float: left;
        height: 30px;
        line-height: 30px;
        color: #333;
        margin-right: 10px;
      }
      .clear_amout_btn
      {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #999
      }
      .amount_text_container
      {
        display: block;
        float: left;
        padding-right: 5px;
        height: 30px;
        line-height: 30px;
      }
      .amount_text_focus_container
      {
        position: relative;
        &::after
        {
          position: absolute;
          right: 0;
          top: 2px;
          bottom: 2px;
          width: 2px;
          display: block;
          content: '';
          animation: blinkAnimation 1s linear infinite;
        }
      }
    }
    .amount_input_balance
    {
      line-height: 20px;
      font-size: 12px;
      padding: 10px 31px;
      text-align: justify;
      color: #999;
    }
  }
  @keyframes blinkAnimation {
    0% {
      background-color: rgba(58, 199, 245, 0)
    }
    50% {
      background-color: #3ecccc;
    }
    100% {
      background-color: rgba(58, 199, 245, 0)
    }
  }
  .apply_withdraw_btn_box
  {
    margin: 9px 31px 0;
    .apply_withdraw_btn
    {
      display: block;
      height: 50px;
      background-color: #3ecccc;
      color: #fff;
      width: 100%;
      border: none;
      border-radius: 5px;
      &.disabled
      {
        background-color: rgba(62, 204, 204, .5);
        color: #f6f6f6
      }
    }
  }
</style>
