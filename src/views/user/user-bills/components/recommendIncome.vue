<template>
  <div>
    <xx-cell class="mt10px">
      <billsDetailItems label="实际收入">
        {{Income | currencyFilter}} 元
      </billsDetailItems>
      <billsDetailItems label="被推荐人名称">
        {{RecommendName}}
      </billsDetailItems>
      <billsDetailItems label="服务项价格">
        {{ItemPrice | currencyFilter}} 元
      </billsDetailItems>
      <billsDetailItems label="分成比例">
        {{Scale}}%
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
    RecommendName: { // 被推荐人名称
      type: String,
      default: ''
    },
    ItemPrice: { // 服务项价格
      type: Number,
      default: 0
    },
    Scale: { // 分成比例
      type: Number,
      default: 0
    }
  }
}
</script>
