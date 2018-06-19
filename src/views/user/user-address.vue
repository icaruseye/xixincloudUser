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
    </div>
      <button type="button" class="weui-btn weui-btn_primary" @click="toEdit(-1, 0)">新建地址</button>
    <div v-transfer-dom>
      <popup v-model="showAddress" height="100%">
        <userAddressEdit :defaultOnly="isEmptyList" @cancel="cancelAddress" @success="successAddress"></userAddressEdit>
      </popup>
    </div>
  </div>
</template>

<script>
import http from '@/api/index'
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
      showAddress: false,
      addressList: [],
      isEmptyList: false,
      index: '',
      addressID: null
    }
  },
  created () {
    const that = this
    this.getAddressList()
    window.addEventListener('popstate', function (e) {
      if (e.state) {
        that.showAddress = false
        history.pushState(null, null, document.URL)
      }
    }, false)
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
      const res = await http.get('/UserAddress')
      this.addressList = res.data.Data
    },
    toEdit (id, index) {
      if (this.addressList.length === 1) {
        if (id === -1) {
          this.isEmptyList = false
        } else {
          this.isEmptyList = true
        }
      }
      if (this.isEmptyList.length === 0) {
        this.isEmptyList = true
      }
      this.showAddress = true
      this.addressID = id
      // this.$router.push(`/user/address/edit/${id}?first=${this.isEmptyList}&index=${index}`)
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
