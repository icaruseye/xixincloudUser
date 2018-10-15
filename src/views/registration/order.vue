<template>
  <div class="wrapper order_wrap">
    <div class="title">预诊信息</div>
    <div class="content">
      <div class="row">
        <span class="label">就诊科室：</span>
        <span>123</span>
      </div>
      <div class="row">
        <span class="label">医生姓名：</span>
        <span>123</span>
      </div>
      <div class="row">
        <span class="label">就诊时间：</span>
        <span>123</span>
      </div>
      <div class="row">
        <span class="label">就诊时段：</span>
        <span>123</span>
      </div>
      <div class="row">
        <span class="label">就诊地点：</span>
        <span>就诊地点</span>
      </div>
      <div class="row">
        <span class="label">挂号费：</span>
        <span class="price">99.00元</span>
      </div>
    </div>
    <div class="tips">注意事项：请在30分钟之内支付，逾期作废，一个自然月 内只能退三次号</div>
    <div class="btns">
      <button>取消预约</button>
      <button class="order">立即支付</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.order_wrap {
  .title {
    font-size: 16px;
    color: #3ecccc;
    text-align: center;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid RGBA(0, 180, 171, .2);
    background: #fff;
  }
  .content {
    background: #fff;
    padding: 20px 12px;
    .row {
      &:last-child {
        padding: 0;
      }
      padding-bottom: 13px;
      font-size: 15px;
      color: #333;
      .label {
        color: #666
      }
      .price {
        color: #FF5F5F;
      }
    }
  }
  .tips {
    width: 80%;
    font-size: 11px;
    color: #FF5F5F;
    padding: 5px 12px;
  }
  .btns {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 12px 0;
    button {
      margin: 0 12px;
      flex: 1;
      height: 52px;
      line-height: 52px;
      text-align: center;
      font-size: 18px;
      border-radius: 4px;
      border: 0;
      color: #999;
      background: transparent;
      border: 1px solid #979797;
      &.order {
        color: #fff;
        background: #3ECCCC;
        border:  1px solid #3ecccc;
      }
    }
  }
}
</style>
