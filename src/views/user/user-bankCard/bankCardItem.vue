<template>
  <div class="bank_card_container">
    <i class="bank_card_logo">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="BankAbbreviation | xxGetBankCardLogoFilter"></use>
      </svg>
    </i>
    <h2 class="bank_Name">{{bankName}}</h2>
    <p class="bank_card_type">储蓄卡</p>
    <p class="bank_card_num">{{cardNo}}</p>
  </div>
</template>
<script>
export default {
  props: {
    BankAbbreviation: '',
    bankName: '',
    cardNo: ''
  }
}
</script>

<style lang="less" scoped>
  .bank_card_container
  {
    position: relative;
    width: 100%;
    height: 150px;
    border-radius: 8px;
    background: linear-gradient(to bottom right, #5BA1D5 , #3F69BD);
    padding: 15px 15px 15px 80px;
    box-sizing: border-box;
    .bank_card_logo
    {
      position: absolute;
      top: 15px;
      left: 7px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      font-size: 36px;
      text-align: center;
      line-height: 50px;
      background-color: #fff;
    }
    .bank_Name
    {
      color: #fff;
      font-size: 20px;
      font-weight: 400;
      height: 25px;
      line-height: 25px;
    }
    .bank_card_type
    {
      color: #fff;
      font-size: 15px;
      line-height: 20px;
      height: 20px;
    }
    .bank_card_num
    {
      color: #fff;
      line-height: 35px;
      height: 35px;
      font-size: 24px;
      margin-top: 10px;
    }
  }
</style>
