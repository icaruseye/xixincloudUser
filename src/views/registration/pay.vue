<template>
  <div class="wrapper pay_wrap">
    <div class="info_wrap">
      <div class="title">订单信息</div>
      <div class="content">
        <div class="item">
          交易单号：2421523581225542355444
        </div>
        <div class="item">
          订单单号：410542152554212
        </div>
        <div class="item">
          订单时间：2018-10-12 17:30:24
        </div>
      </div>
    </div>
    <div class="info_wrap">
      <div class="title">商品信息</div>
      <div class="content">
        <div class="item">
          商户名称：四川大学华西医院
        </div>
        <div class="item">
          商品明细：
        </div>
        <div class="item">
          挂号费
          <div class="sub_item">
            <span>1次</span>
            <span>单价：<span class="price">￥2.00</span></span>
          </div>
        </div>
        <div class="item">
          预约费
          <div class="sub_item">
            <span>1次</span>
            <span>单价：<span class="price">￥2.00</span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap">
      <div class="title">支付方式</div>
      <div class="content par_way_bar">
        <i class="iconfont icon-icon-"></i>微信支付
      </div>
    </div>
    <div class="account_bar">
      <span>合计： <span style="color:#F8A519">￥22.00</span></span>
      <button>立即支付</button>
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
.info_wrap {
  .title {
    padding: 8px 11px 2px;
    font-size: 12px;
    color: #999;
  }
  .par_way_bar {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #666;
  }
  .content {
    padding: 10px 12px;
    background: #fff;
    .iconfont {
      margin-right: 5px;
      color: #8BDF4F;
      font-size: 24px;
    }
    .item {
      padding: 5px 0;
      font-size: 13px;
      color: #666;
      border-bottom: 1px dashed RGBA(167, 167, 167, .2);
      .sub_item {
        display: flex;
        justify-content: space-between;
        .price {
          color: #3ecccc;
        }
      }
    }
  }
}
.account_bar {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 10px 12px;
  background: #fff;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    border-radius: 4px;
    border: 1px solid #3ecccc;
    color: #3ecccc;
    font-size: 15px;
    text-align: center;
    height: 30px;
    line-height: 28px;
    padding: 0 10px;
    background: transparent;
  }
}
</style>
