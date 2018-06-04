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
    <button type="button" class="weui-btn weui-btn_primary" @click="toEdit('add')">新建地址</button>
  </div>
</template>

<script>
import http from '@/api/index'
import { ChinaAddressV4Data } from 'vux'
export default {
  data () {
    return {
      addressList: [],
      isEmptyList: 0
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
    async getAddressList () {
      const res = await http.get('/UserAddress')
      this.addressList = res.data.Data
      if (this.addressList.length <= 1) {
        this.isEmptyList = 1
      }
    },
    toEdit (id) {
      this.$router.push(`/user/address/edit/${id}?first=${this.isEmptyList}`)
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
