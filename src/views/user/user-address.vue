<template>
  <div>
    <div class="form-panel" style="margin:0">
      <div class="weui-form-cell" @click="toEdit(1)">
        <div class="tag">安全屋(默认)</div>
        <div class="detail">成都市武侯区益州大道1999号五栋四单元1111</div>
        <i class="iconfont icon-jiantouyou"></i>
      </div>
    </div>
    <button type="button" class="weui-btn weui-btn_primary" @click="toEdit('add')">新建地址</button>
  </div>
</template>

<script>
import http from '@/api/index'
export default {
  data () {
    return {
      addressList: []
    }
  },
  created () {
    this.getAddressList()
  },
  methods: {
    async getAddressList () {
      const res = await http.get('/UserAddressGetAll')
      console.log(res)
    },
    toEdit (id) {
      this.$router.push(`/user/address/edit/${id}`)
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
