<template>
  <div>
    <xx-go-back></xx-go-back>
    <div class="warp_container">
      <bank-card-item v-if="list.length > 0" v-for="(item, index) in list" class="mb10px"
        :key="index"
        :BankAbbreviation="item.BankAbbreviation"
        :bankName="item.BankName"
        :cardNo="item.BankCard"
      >
      </bank-card-item>
      <router-link class="add_bankCard_btn mb10px" to="/user/bankCard/add">添加银行卡</router-link>
    </div>
  </div>
</template>
<script>
import bankCardItem from './bankCardItem'
export default {
  components: {
    bankCardItem
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.$vux.loading.show('加载中')
      await this.getData().then(value => {
        this.list = value.Data
      })
      this.$vux.loading.hide()
    },
    async getData () {
      const res = await this.$http.get('/BankInfoList')
      return res.data
    }
  }
}
</script>
<style lang="less" scoped>
  .warp_container
  {
    background-color: #404950;
    min-height: 100vh;
    padding: 20px 15px;
  }
  .mb10px
  {
    margin-bottom: 10px;
  }
  .add_bankCard_btn
  {
    position: relative;
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #979797;
    color: #D8D8D8;
    line-height: 50px;
    font-size: 18px;
    padding-left: 44px;
    user-select: none;
  }
  .add_bankCard_btn::before,
  .add_bankCard_btn::after
  {
    position: absolute;
    content: '';
    display: block;
    background-color: #D8D8D8;
    border-radius: 2px;
    top: 50%;
    left: 20px;
    transform: translate(-50%, -50%)
  }
  .add_bankCard_btn::before
  {
    width: 20px;
    height: 4px;
  }
  .add_bankCard_btn::after
  {
    width: 4px;
    height: 20px;
  }
</style>

