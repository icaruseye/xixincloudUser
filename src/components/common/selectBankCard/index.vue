<template>
  <div v-transfer-dom>
      <popup v-model="modeValue" position="bottom" max-height="50%">
        <div class="withdrawTypeVisible_container">
          <sticky
            ref="sticky"
            :offset="0"
            :check-sticky-support="true">
                <popup-header
                  left-text="取消"
                  @on-click-left="modeValue = false"
                  title="选择提现方式"
                  :show-bottom-border="false"
                >
                </popup-header>
          </sticky>
          <ul v-if="status === 0" class="withdrawType_list">
            <template v-if="withdrawTypeList.length > 0">
              <li v-for="(item, index) in withdrawTypeList"
                :key="index"
                @click="selectBankCard(item)"
                :class="['withdrawType_item', (currentWithdrawType && currentWithdrawType.id === item.id)?'selected':'']"
              >
                <i class="icon_box">
                  <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.icon | xxGetBankCardLogoFilter"></use>
                  </svg>
                </i>
                {{item.name}}
                <span v-if="item.code" class="code_box">（*{{item.code}}）</span>
                <i v-if="currentWithdrawType &&currentWithdrawType.id === item.id" class="select_gougou_box iconfont icon-xuanzhong"></i>
              </li>
            </template>
            <router-link class="withdrawType_item" to="/user/bankCard/add">
              添加银行卡
            </router-link>
          </ul>
          <div v-else>
            <div style="padding: 50px 0;text-align: center;color:#999">
              <img src="@/assets/images/loading_img.gif" style="display:block; width: 100px;margin:0 auto">
              正在获取银行卡…
            </div>
          </div>
        </div>
      </popup>
    </div>
</template>
<script>
import { TransferDom, Sticky, Popup, PopupHeader } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Sticky,
    PopupHeader
  },
  props: {
    currentWithdrawType: {
      type: Object,
      default: null
    },
    value: false
  },
  computed: {
    modeValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  data () {
    return {
      status: 1,
      withdrawTypeList: []
    }
  },
  mounted () {
    this.getMyBankCardList()
  },
  methods: {
    selectBankCard (item) {
      this.modeValue = false
      this.$emit('change', item)
    },
    // 获取并组装我的银行卡
    async getMyBankCardList () {
      const res = await this.$http.get('/BankInfoList')
      this.status = 0
      if (res.data.Code === 100000) {
        this.withdrawTypeList = []
        res.data.Data.map((item, index) => {
          this.withdrawTypeList.push({
            id: item.ID,
            name: item.BankName,
            code: this.getBankCardEndNum(item.BankCard),
            icon: item.BankAbbreviation
          })
        })
        this.$emit('change', this.withdrawTypeList[0])
      }
    },
    /**
     * 获取银行卡尾号
     */
    getBankCardEndNum (bankCardNum) {
      return bankCardNum.substring(bankCardNum.lastIndexOf('*') + 1, bankCardNum.length)
    }
  }
}
</script>
<style lang="less" scoped>
  .withdrawTypeVisible_container
  {
    background-color: #fff;
    .head_box
    {
      position: relative;
      height: 52px;
      line-height: 52px;
      font-size: 18px;
      color: #333333;
      text-align: center;
      .icon-fanhui
      {
        position: absolute;
        left: 0;
        display: block;
        width: 40px;
        height: 52px;
        text-align: center;
        color: #CCCCCC;
        font-weight: 600;
      }
    }
    .withdrawType_item
    {
      position: relative;
      display: block;
      height: 50px;
      line-height: 50px;
      padding-left: 54px;
      color: #666;
      &::before
      {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        content: "";
        display: block;
        height: 1px;
        background-color: #E8F9FE
      }
      .code_box
      {
        font-size: 14px;
        color: #999;
      }
      .select_gougou_box
      {
        position: absolute;
        right: 15px;
        top: 0;
        display: block;
        color: #3ecccc;
      }
    }
      .icon_box
      {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: 50px;
        height: 50px;
        text-align: center;
        font-size: 26px;
      }
  }
</style>

