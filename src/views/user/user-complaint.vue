<template>
  <div class="has-tabbar">
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="false">
      <xx-tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="25px">
        <xx-tab-item :selected="tabIndex === 0" @on-item-click="onItemClick">投诉中</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 1" @on-item-click="onItemClick">已完成</xx-tab-item>
      </xx-tab>
    </sticky>
    <div class="weui-panel">
      <div class="weui-list_container">
        <div class="weui-list_item" @click="toDetail(1)">
          <div class="avatar">
            <img src="https://tva1.sinaimg.cn/crop.0.0.180.180.50/5e9d399fjw1e8qgp5bmzyj2050050aa8.jpg" alt="">
          </div>
          <div class="mid">
            <div style="display: flex;justify-content: space-between;align-items: baseline;">
              <div class="title" style="font-size:18px;">院内陪诊院内陪诊…</div>
              <div class="servant">医生：黄微微</div>
            </div>
            <div style="color:#666;font-size:14px;">投诉原因：阿莫西林3颗含服</div>
            <div class="describe">到期时间：2018/06/08</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sticky } from 'vux'
export default {
  metaInfo: {
    title: '我的投诉'
  },
  components: {
    Sticky
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  methods: {
    onItemClick (index) {
      this.tabIndex = index
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
  padding: 13px 5px;
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