<template>
  <div>
    <xx-timeLine :step="withDrawStep" class="mt10px">
      <xx-timeLine-items
        slot="items"
        title="发起提现"
      >
        <ul>
          <li class="desc_list_items">
            <p class="normal_desc_p">提现金额：￥{{Expenditure | currencyFilter}}</p>
            <p class="normal_desc_p">实际到账：￥{{FactIncome | currencyFilter}}</p>
            <p class="normal_desc_p">提现手续费：￥{{HandlingFee | currencyFilter}}</p>
            <p class="normal_desc_p">提现到：{{BankName}}（{{CardID}}）</p>
            <p class="normal_desc_p">发起时间：{{WithdrawCreateTime | timeFormat}}</p>
            <!-- <p class="normal_desc_p">流水号：{{WithdrawCreateTime | timeFormat('YYYYMMDDHHmmss')}}</p> -->
          </li>
        </ul>
      </xx-timeLine-items>
      <xx-timeLine-items
        slot="items"
        :title="WithdrawState === 0 ? '审核中' : '审核'"
      >
        <div v-if="WithdrawState === 0" style="font-size:12px;color:#999">
          提现申请审核中，请耐心等待工作人员处理。
        </div>
        <ul v-else>
          <li class="desc_list_items">
            <p class="normal_desc_p">审核意见：{{WithdrawState === -1 ? '拒绝' : '同意'}}</p>
            <p class="normal_desc_p">处理时间：{{WithdrawReviewTime | timeFormat}}</p>
          </li>
        </ul>
      </xx-timeLine-items>
      <xx-timeLine-items
        slot="items"
        title="退款"
        v-if="WithdrawState === -1"
      >
        <p class="working_box">
          提现金额已返还账户钱包，请注意查收！
        </p>
      </xx-timeLine-items>
      <xx-timeLine-items
        slot="items"
        title="转账"
        v-if="WithdrawState != -1"
      >
        <p class="working_box">
          <template v-if="WithdrawState === 2">
            转账成功，请注意查收
          </template>
          <template v-if="WithdrawState === 1">
            正在转账，请稍候…
          </template>
        </p>
      </xx-timeLine-items>
      <xx-timeLine-items
        slot="items"
        v-if="WithdrawState != -1"
        title="提现成功"
      >
      </xx-timeLine-items>
    </xx-timeLine>
  </div>
</template>
<script>
import { numberComma } from 'vux'
export default {
  filters: {
    currencyFilter (val = 0) {
      if (val === 0) {
        return '0.00'
      } else {
        return numberComma((val / 100).toFixed(2))
      }
    }
  },
  computed: {
    withDrawStep () {
      const WithdrawState = this.WithdrawState
      if (WithdrawState === 0) { // 待审核
        return '2'
      } else if (WithdrawState === 1 || WithdrawState === -1) {
        return '3'
      } else if (WithdrawState === 2) {
        return '4'
      }
    }
  },
  props: {
    Expenditure: { // 提现金额
      type: Number,
      default: 0
    },
    FactIncome: { // 实际到账
      type: Number,
      default: 0
    },
    HandlingFee: { // 提现手续费
      type: Number,
      default: 0
    },
    BankName: { // 银行名称
      type: String,
      default: ''
    },
    CardID: { // 银行卡号
      type: String,
      default: ''
    },
    WithdrawState: { // 提现进度
      type: Number,
      default: 1
    },
    WithdrawCreateTime: { // 提现发起时间
      type: String,
      default: 1
    },
    WithdrawReviewTime: { // 提现审核通过时间
      type: String,
      default: 1
    }
  }
}
</script>
<style lang="less" scoped>

  .normal_title_p
  {
    font-size: 14px;
    color: #666;
    text-align: left;
    line-height: 25px;
  }
  .normal_desc_p
  {
    font-size: 12px;
    color: #999999;
    text-align: justify;
    line-height: 25px;
    &.redColor
    {
      color: #FF3939
    }
  }
  .desc_list_items
  {
    position: relative;
    padding-bottom: 11px;
    margin-bottom: 11px;
  }
  .desc_list_items::after
  {
    position: absolute;
    content: '';
    display: block;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    transform: scaleY(.5);
    background-color: #D8F4FD;
  }
  .desc_list_items_title
  {
    font-size: 15px;
    color: #333333;
    font-weight: normal;
    height: 21px;
    line-height: 21px;
    margin-bottom: 7px;
  }
  .working_box
  {
    color: #f7931e;
    height: 30px;
    line-height: 30px;
  }
</style>
