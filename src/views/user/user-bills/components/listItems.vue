<template>
  <div class="container">
    <div class="content_container">
      <p class="title">{{Type | typeNameFilter}}</p>
      <p class="create_time">{{CreateTime | timeFormat}}</p>
      <span class="amount" v-if="billTypeIsAdd" style="color:#FF5F5F">
        +{{Amount | amountCompute}}元
      </span>
      <span class="amount" style="color:#04be02" v-else>
        {{Amount | amountCompute}}元
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Amount: {
      type: Number,
      default: 0
    },
    Type: {
      type: Number,
      default: 0
    },
    CreateTime: {
      type: String,
      default: ''
    }
  },
  computed: {
    billTypeIsAdd () { // 账单类型是否为收入
      const type = this.Type
      if (type === 1 || type === 2 || type === 5 || type === 6) {
        return true
      } else {
        return false
      }
    }
  },
  filters: {
    typeNameFilter (val = 1) {
      switch (val) {
        case 1:
          return '服务收入'
        case 2:
          return '推荐收入'
        case 3:
          return '支出'
        case 4:
          return '提现'
        case 5:
          return '解冻'
        case 6:
          return '退款-提现被驳回'
        default:
          return ''
      }
    },
    amountCompute (amount = null) {
      return amount === null ? 0 : (amount / 100).toFixed(2)
    }
  }
}
</script>

<style lang="less" scoped>
  .container
  {
    position: relative;
    background-color: #fff;
    min-height: 80px;
    padding: 15px 15px 0 15px;
    box-sizing: border-box;
    .icon_box
    {
      position: absolute;
      top: 15px;
      left: 7px;
      width: 50px;
      height: 50px;
      font-size: 36px;
      text-align: center;
      line-height: 50px;
    }
    .content_container
    {
      position: relative;
      padding-bottom: 15px;
      border-bottom: 1px solid #f6f6f6;
      .title
      {
        font-size: 14px;
        color: #666;
      }
      .create_time
      {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
      }
      .amount
      {
        position: absolute;
        right: 0;
        top: 0;
        color: #333
      }
    }
    &:last-child {
      .content_container
      {
        border-bottom: none
      }
    }
  }
</style>

