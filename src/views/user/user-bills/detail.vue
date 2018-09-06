<template>
  <div v-if="detail" style="padding-bottom: 50px">
    <xx-nav-bar
      left-text="返回"
      :right-text="userAccount.NickName"
      :avatar="userAccount.Avatar | transformImgUrl"
      @click-left="onNavbarClickLeft">
    </xx-nav-bar>
    <div class="bill_status_container">
      <p class="bill_type_title">
        <i class="bill_type_icon">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="billsTypeIcon"></use>
          </svg>
        </i>
        {{billsTypeTitle}}
      </p>
      <p class="bill_amount_box">
        <template
          v-if="detail.LogType === 1 || detail.LogType === 2 || detail.LogType === 5 || detail.LogType === 6">
          +{{detail.Income | currencyFilter}}
        </template>
        <template
          v-if="detail.LogType === 4">
          -{{detail.Expenditure | currencyFilter}}
        </template>
      </p>
      <p v-if="detail.LogType === 4" class="bill_status_desc_text">
        <span v-if="detail.WithdrawState === -1" style="color:#ff0000">
          提现被驳回
        </span>
        <template v-if="detail.WithdrawState === 0">
          提现审核中
        </template>
        <template v-if="detail.WithdrawState === 1">
          审核通过，转账中
        </template>
        <template v-if="detail.WithdrawState === 2">
          提现完成
        </template>
      </p>
    </div>
    <!-- 服务收入模块 -->
    <serviveIncome
      v-if="detail.LogType === 1"
      :Income="detail.Income"
      :TecSupportFee="detail.TecSupportFee"
      :ShopFee="detail.ShopFee"
      :RecommendFee="detail.RecommendFee"
      :Tax="detail.Tax"
      :FreezeAmount="detail.FreezeAmount"
      :ServiceTotal="detail.ServiceTotal"
    ></serviveIncome>
    <!-- 推荐收入模块 -->
    <recommendIncome
      v-if="detail.LogType === 2"
      :Income="detail.Income"
      :RecommendName="detail.RecommendName"
      :ItemPrice="detail.ItemPrice"
      :Scale="detail.Scale"
    ></recommendIncome>
    <!-- 提现模块 -->
    <withdrawComponent
      v-if="detail.LogType === 4"
      :Expenditure="detail.Expenditure"
      :FactIncome="detail.FactIncome"
      :HandlingFee="detail.HandlingFee"
      :BankName="detail.BankName"
      :CardID="detail.CardID"
      :WithdrawState="detail.WithdrawState"
      :WithdrawCreateTime="detail.WithdrawCreateTime"
      :WithdrawReviewTime="detail.WithdrawReviewTime"
    ></withdrawComponent>
    <!-- 提现驳回模块 -->
    <xx-cell v-if="detail.LogType === 6" class="mt10px">
      <billsDetailItems label="发起提现时间">
        {{detail.WithdrawCreateTime | timeFormat}}
      </billsDetailItems>
      <billsDetailItems label="驳回提现时间">
        {{detail.WithdrawReviewTime | timeFormat}}
      </billsDetailItems>
      <billsDetailItems label="驳回原因">
        {{detail.FailReason}}
      </billsDetailItems>
      <billsDetailItems label="退款金额">
        {{detail.Income | currencyFilter}}元
      </billsDetailItems>
    </xx-cell>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { numberComma } from 'vux'
import util from '@/plugins/util'
import withdrawComponent from './components/withdraw'
import serviveIncome from './components/serviceIncome'
import recommendIncome from './components/recommendIncome'
import billsDetailItems from './components/billsDetailItems'
export default {
  components: {
    withdrawComponent,
    serviveIncome,
    recommendIncome,
    billsDetailItems
  },
  filters: {
    billTypeSymbolFilter (val = 1) {
      if (val === 1 || val === 2 || val === 5) {
        return '+'
      } else {
        return '-'
      }
    },
    currencyFilter (val = 0) {
      if (val === 0) {
        return '0.00'
      } else {
        return numberComma((val / 100).toFixed(2))
      }
    }
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ]),
    billsTypeIcon () { // 账单标题icon
      const type = this.detail.LogType
      if (type === 1) {
        return '#icon-shouru'
      } else if (type === 2) {
        return '#icon-shouru'
      } else if (type === 3) {
        return '#icon-zhichu'
      } else if (type === 4) {
        const bankList = util.getSupportBankList()
        return bankList[this.detail.BankAbbreviation].icon
      } else if (type === 5) {
        return '#icon-yijiedong'
      } else if (type === 6) {
        return '#icon-tuikuan'
      }
    },
    billsTypeTitle () { // 账单标题
      const type = this.detail.LogType
      if (type === 1) {
        return '服务收入'
      } else if (type === 2) {
        return '推荐收入'
      } else if (type === 3) {
        return '支出'
      } else if (type === 4) {
        return this.detail.BankName || '提现'
      } else if (type === 5) {
        return '金额解冻'
      } else if (type === 6) {
        return '退款-提现被驳回'
      }
    },
    ID () {
      return this.$route.params.id
    }
  },
  data () {
    return {
      detail: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.get(`/WalletLog?id=${this.ID}`).then(result => {
        if (result.data.Code === 100000) {
          this.detail = result.data.Data
        }
      })
    },
    onNavbarClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
  .bill_status_container
  {
    background-color: #fff;
    padding: 10px 0;
    .bill_type_title
    {
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-size: 16px;
      .bill_type_icon
      {
        display: inline-block;
        height: 35px;
        left: 35px;
        font-size: 22px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
    .bill_amount_box
    {
      font-size: 26px;
      text-align: center;
    }
    .bill_status_desc_text
    {
      text-align: center;
      color: #3ac7f5;
      font-size: 14px;
    }
  } 
</style>
