<template>
  <div>
    <xx-cell class="mt10px">
      <billsDetailItems label="实际收入">
        {{Income | currencyFilter}}
      </billsDetailItems>
      <billsDetailItems label="平台支持费用">
        {{TecSupportFee | currencyFilter}}
      </billsDetailItems>
      <billsDetailItems label="机构抽成费用">
        {{ShopFee | currencyFilter}}
      </billsDetailItems>
      <billsDetailItems label="服务推荐费">
        {{RecommendFee | currencyFilter}}
      </billsDetailItems>
      <billsDetailItems label="个人所得税">
        {{Tax | currencyFilter}}
      </billsDetailItems>
      <billsDetailItems label="冻结费用" className="bottomLine">
        {{FreezeAmount | currencyFilter}}
      </billsDetailItems>
      <billsDetailItems label="服务单总额">
        {{ServiceTotal | currencyFilter}}
      </billsDetailItems>
    </xx-cell>
    
  </div>
</template>
<script>
import { numberComma } from 'vux'
import billsDetailItems from './billsDetailItems'
export default {
  components: {
    billsDetailItems
  },
  filters: {
    currencyFilter (val = 0) {
      if (val === 0) {
        return '0.00'
      } else {
        return numberComma((val / 100).toFixed(2))
      }
    }
  },
  props: {
    Income: { // 实际收入
      type: Number,
      default: 0
    },
    TecSupportFee: { // 平台支持费用
      type: Number,
      default: 0
    },
    ShopFee: { // 机构抽成费用
      type: Number,
      default: 0
    },
    RecommendFee: { // 服务推荐费
      type: Number,
      default: 0
    },
    Tax: { // 个人所得税
      type: Number,
      default: 0
    },
    FreezeAmount: { // 冻结费用
      type: Number,
      default: 0
    },
    ServiceTotal: { // 服务单总额
      type: Number,
      default: 0
    }
  }
}
</script>
