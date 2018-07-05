<template>
  <div class="has-tabbar">
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="true">
      <xx-tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="25px">
        <xx-tab-item :selected="tabIndex === 0" @on-item-click="onItemClick">投诉中</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 1" @on-item-click="onItemClick">已完成</xx-tab-item>
      </xx-tab>
    </sticky>
    <div style="margin-top:10px;background: #fff;padding: 0 13px" v-if="list.length > 0">
      <div class="weui-list_container">
        <template v-for="(item, index) in list">
          <div class="weui-list_item" :key="index" @click="toDetail(item.ID)">
            <div class="avatar">
              <img src="@/assets/images/icon_picc.png" alt="">
            </div>
            <div class="mid">
              <div style="display: flex;justify-content: space-between;align-items: baseline;">
                <div class="title text-overflow-1" style="font-size:18px;">{{item.MissionName}}</div>
              </div>
              <div class="servant">医生：{{item.ServantName}}</div>
              <div style="color:#666;font-size:14px;width:160px" class="of-hide">投诉原因：{{item.UserComplaintTitle}}</div>
              <div class="describe">投诉时间：{{item.CreateTime | timeFormat}}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <xxOccupiedBox v-show="flag">
      <p>暂无投诉订单</p>
    </xxOccupiedBox>
  </div>
</template>

<script>
import { Sticky } from 'vux'
export default {
  components: {
    Sticky
  },
  data () {
    return {
      list: [],
      flag: false,
      tabIndex: 0,
      Complainting: [],
      Complate: []
    }
  },
  created () {
    this.getComplainting()
    this.getComplate()
  },
  methods: {
    async getComplainting () {
      const res = await this.$http.get('/ComplaintList/Complainting')
      if (res.data.Code === 100000) {
        this.Complainting = res.data.Data
        this.list = res.data.Data
        this.flag = res.data.Data.length === 0
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    async getComplate () {
      const res = await this.$http.get('/ComplaintList/Complate')
      if (res.data.Code === 100000) {
        this.Complate = res.data.Data
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    onItemClick (index) {
      this.tabIndex = index
      if (index === 0) {
        this.list = this.Complainting
        this.flag = this.Complainting.length === 0
      } else {
        this.list = this.Complate
        this.flag = this.Complate.length === 0
      }
    },
    toDetail (id) {
      this.$router.push(`/user/complaint/${id}`)
    }
  }
}
</script>

<style scoped lang="less">
.weui-list_item {
  position: relative;
  padding: 18px 0;
  display: flex;
  align-items: center;
  &::after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #d9f7f5;
    color: #d9f7f5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  &:last-child::after {
    border: 0;
  }
  .avatar {
    border-radius: 50%;
    width: 37px;
    height: 37px;
    overflow: hidden;
  }
  .mid {
    flex: 1;
    margin: 0 19px;
    .title {
      font-size: 15px;
      color: #333;
    }
    .servant {
      font-size: 13px;
      color: #3ecccc;
    }
    .describe {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>