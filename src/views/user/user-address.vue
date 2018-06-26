<template>
  <div>
    <div class="form-panel" style="margin:0">
      <template v-for="(item, index) in addressList">
        <div class="weui-form-cell" @click="toEdit(item.ID, index)" :key="index">
          <div class="tag">{{item.Remark}}<span v-if="index === 0">(默认)</span></div>
          <div class="detail">{{item.Province | transformAddress}}{{item.City | transformAddress}}{{item.Area | transformAddress}}{{item.SpecificAddress}}</div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </template>
      <!-- 空状态 -->
      <xxOccupiedBox v-if="flag">
        <p>你还没有添加过地址哦</p>
      </xxOccupiedBox>
    </div>
      <button type="button" class="weui-btn weui-btn_primary" @click="toEdit(-1, 0)">新建地址</button>
    <div v-transfer-dom>
      <popup v-model="showAddress" height="100%">
        <userAddressEdit :UserAddress="UserAddress" :defaultOnly="isEmptyList" @cancel="cancelAddress" @success="successAddress"></userAddressEdit>
      </popup>
    </div>
  </div>
</template>

<script>
import userAddressEdit from './user-address-edit'
import { ChinaAddressV4Data, Popup, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    userAddressEdit,
    Popup
  },
  data () {
    return {
      flag: false,
      showAddress: false,
      addressList: [],
      isEmptyList: false,
      index: '',
      addressID: null,
      UserAddress: {}
    }
  },
  created () {
    this.getAddressList()
  },
  filters: {
    transformAddress (val) {
      let name = ''
      ChinaAddressV4Data.map((item) => {
        if (item.value === val) {
          name = item.name
        }
      })
      return name
    }
  },
  methods: {
    cancelAddress () {
      this.showAddress = false
    },
    successAddress () {
      this.showAddress = false
      this.getAddressList()
    },
    async getAddressList () {
      const res = await this.$http.get('/UserAddress')
      if (res.data.Code === 100000) {
        this.addressList = res.data.Data
        this.flag = this.addressList.length === 0
      }
    },
    toEdit (id, index) {
      // 只有一项地址
      if (this.addressList.length === 1) {
        if (id === -1) {
          this.isEmptyList = false
        } else {
          this.isEmptyList = true
        }
      }
      // 尚未添加地址
      if (this.addressList.length === 0) {
        this.isEmptyList = true
      }
      // id：-1 新增地址
      if (id !== -1) {
        this.UserAddress = this.addressList[index]
        this.UserAddress.citys = [this.addressList[index].Province, this.addressList[index].City, this.addressList[index].Area]
      } else {
        this.UserAddress = {
          IsDefault: 1,
          citys: [],
          SpecificAddress: '',
          Remark: '家'
        }
      }
      this.showAddress = true
      this.addressID = id
    }
  }
}
</script>

<style lang="less" scoped>
.weui-btn {
  position: fixed;
  bottom: 0;
}

.icon-jiantouyou {
  color: #f8a519
}

.weui-form-cell {
  display: flex;
  align-items: center;
  font-size: 14px;
  .tag {
    width: 100px;
    color: #f8a519;
  }
  .detail {
    flex: 1;
    color: #666;
    padding-right: 10px;
  }
}
</style>
