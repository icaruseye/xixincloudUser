<template>
  <div style="padding-bottom:50px">
    <div class="account_head_container">
      <router-link class="suspend_btn" style="top:13px;left:12px" to="/user/recommend">我的邀请</router-link>
      <router-link class="suspend_btn" style="top:13px;right:12px" to="/user/bills">我的账单</router-link>
      <p class="can_withdraw_amount_container">￥{{detail.Balance | amountCompute}}</p>
      <p class="can_withdraw_amount_title"> 可提现金额</p>
      <div class="to_withdraw_btn_container">
        <router-link class="to_withdraw_btn" to="/user/withdraw"> 立即提现</router-link>
      </div>
      <p class="all_earnings_text">累计提现总金额：￥{{detail.TotalWithdraw | amountCompute}}</p>
    </div>
    <!-- <div class="flex_row_container mt20px">
      <dl>
        <dt>
          可结算
          <i class="iconfont icon-wenhao"></i>
        </dt>
        <dd>￥169.50</dd>
      </dl>
      <dl>
        <dt>
          可结算
          <i class="iconfont icon-wenhao"></i>
        </dt>
        <dd>￥169.50</dd>
      </dl>
      <dl>
        <dt>
          可结算
          <i class="iconfont icon-wenhao"></i>
        </dt>
        <dd>￥169.50</dd>
      </dl>
    </div> -->

    <!-- <div class="card_head_container mt20px">
      <i class="first_icon iconfont icon-suo"></i>
      待审核收益
      <router-link class="right_arrow_btn" to="/">
        查看
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
    </div> -->
    <!-- <div class="flex_row_container">
      <dl>
        <dt>
          待结算单数
          <i class="iconfont icon-wenhao"></i>
        </dt>
        <dd>{{detail.NotSettlementMissionCount}}</dd>
      </dl>
      <dl>
        <dt>
          月结算<span style="font-size:12px">(冻结)</span>
          <i class="iconfont icon-wenhao"></i>
        </dt>
        <dd>￥{{detail.FreezeBalance | amountCompute}}</dd>
      </dl>
    </div> -->

    <div class="card_head_container mt20px">
      <i class="first_icon iconfont icon-yue"></i>
      月统计
      <router-link class="right_arrow_btn" to="/user/recommend">
        查看
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
    </div>
    <div class="flex_row_container">
      <!-- <dl>
        <dt>
          服务单数
          <i @click="showHint('这是服务单数')" class="iconfont icon-wenhao"></i>
        </dt>
        <dd>{{detail.MonthMissionCount}}</dd>
      </dl>
      <dl>
        <dt>
          服务收益
          <i class="iconfont icon-wenhao"></i>
        </dt>
        <dd>￥{{detail.MonthServiceIncome | amountCompute}}</dd>
      </dl> -->
      <dl>
        <dt>
          分享赚
          <i class="iconfont icon-wenhao" @click="showHint('分享赚是指当月邀请服务者、推荐用户所获得的奖励总金额。')"></i>
        </dt>
        <dd>￥{{detail.MonthRecommendIncome | amountCompute}}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      detail: {}
    }
  },
  filters: {
    amountCompute (amount = null) {
      return amount === null ? 0 : (amount / 100).toFixed(2)
    }
  },
  created () {
    this.init()
  },
  methods: {
    showHint (txt) {
      this.$vux.alert.show({
        title: '提示',
        content: txt
      })
    },
    init () {
      this.getData().then(result => {
        if (result.Code === 100000) {
          this.detail = result.Data
        } else {
          this.detail = null
        }
      })
    },
    async getData () {
      const res = await this.$http.get(`/Wallet`)
      return res.data
    }
  }
}
</script>

<style lang="less" scoped>
  .mt20px
  {
    margin-top: 20px;
  }
  .account_head_container
  {
    position: relative;
    box-sizing: border-box;
    padding: 25px 0;
    background: linear-gradient(bottom left,#FE6454,#F98A56, #FFB059);
    .suspend_btn
    {
      position: absolute;
      border: 1px solid #fff;
      display: block;
      height: 16px;
      font-size: 12px;
      color: #fff;
      border-radius: 10px;
      padding: 0 6px;
    }
    .can_withdraw_amount_container
    {
      font-size: 30px;
      color: #fff;
      height: 42px;
      text-align: center;
      line-height: 42px;
    }
    .can_withdraw_amount_title
    {
      font-size: 14px;
      color: #fff;
      text-align: center;
    }
    .to_withdraw_btn_container
    {
      text-align: center;
      margin-top: 15px;
      .to_withdraw_btn
      {
        display: inline-block;
        height: 25px;
        background-color: #fff;
        border-radius: 15px;
        color: #FB995A;
        padding: 0 24px
      }
    }
    .all_earnings_text
    {
      font-size: 14px;
      color: #fff;
      text-align: center;
      margin-top: 14px;
    }
  }
  .card_head_container
  {
    position: relative;
    height: 37px;
    background-color: #fff;
    padding: 0 12px 0 36px;
    color: #333;
    line-height: 37px;
    &::after
    {
      position: absolute;
      right: 12px;
      left: 12px;
      bottom: 0;
      display: block;
      content: '';
      height: 1px;
      background-color: #CCF0EE;
      transform: scaleY(.5)
    }
    .first_icon
    {
      position: absolute;
      left: 12px;
      line-height: 37px;
      color: #F9A71D
    }
    .right_arrow_btn
    {
      position: absolute;
      display: block;
      height: 37px;
      top: 0;
      right: 12px;
      font-size: 12px;
      color: #999;
      line-height: 37px;
      .iconfont 
      {
        font-size: 12px;
      }
    }
  }
  .flex_row_container
  {
    background-color: #fff;
    padding: 30px 0 25px;
    display: flex;
    flex-flow: nowrap;
    dl
    {
      position: relative;
      flex: 1;
      display: flex;
      flex-flow: column;
      align-items: center;
      &::after
      {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        display: block;
        content: '';
        width: 1px;
        background-color: #CCF0EE;
        transform: scaleX(.5)
      }
      &:last-child::after
      {
        display: none;
      }
      dt
      {
        position: relative;
        font-size: 14px;
        color: #999;
        .iconfont
        {
          position: absolute;
          left: 100%;
          top: 0px;
          margin-left: 6px;
          display: block;
          font-size: 12px;
          width: 12px;
          height: 12px;
          line-height: 12px;
          color: #3AC7F5
        }
      }
      dd
      {
        font-size: 18px;
        color: #666;
      }
    }
  }
</style>
