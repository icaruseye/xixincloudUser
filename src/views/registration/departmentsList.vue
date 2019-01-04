<template>
  <div class="wrapper">
    <div class="title">请选择科室</div>
    <checker class="departments_list" v-model="OrganizationID" :radio-required="true" @on-change="changeChecker" default-item-class="departments_item" selected-item-class="departments_item_selected">
      <checker-item v-for="(item, index) in OrganizationList" :key="index" :value="item.ID">{{item.Name}}</checker-item>
    </checker>
    <button type="button" class="weui-btn weui-btn-bottom weui-btn_primary" @click="nextStep">下一步</button>
  </div>
</template>

<script>

import { Checker, CheckerItem } from 'vux'
export default {
  components: {
    Checker,
    CheckerItem
  },
  data () {
    return {
      OrganizationID: null,
      OrganizationList: []
    }
  },
  created () {
    this.getOrganizationList()
  },
  methods: {
    async getOrganizationList () {
      const res = await this.$http.get(`/OrganizationList?page=1&pageSize=999`)
      if (res.data.Code === 100000 && res.data.Data) {
        this.OrganizationList = res.data.Data.organizationalStructureList
      }
    },
    changeChecker (val) {
      this.OrganizationID = val
    },
    nextStep () {
      if (!this.OrganizationID) {
        this.$vux.toast.text('至少选择一个科室')
        return
      }
      this.$router.push(`/organ/registration/${this.OrganizationID}`)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  padding-bottom: 60px;
  .title {
    position: fixed;
    top: 0;
    height: 50px;
    line-height: 50px;
    width: 100%;
    text-align: center;
    background: #fff;
    color: #3ecccc;
  }
}
.departments_list {
  margin-top: 50px;
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  .departments_item {
    width: 45%;
    margin: 5px 0 5px 3.3%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #eee;
    font-size: 14px;
    color: #bbb;
    border-radius: 2px;
    &.departments_item_selected {
      background: #3ecccc;
      color: #fff;
    }
  }
}
</style>
