<template>
  <div class="has-tabbar">
    <!-- 服务套餐头部信息 -->
    <packageInfo></packageInfo>
    <!-- 服务列表 -->
    <div class="weui-list-panel mgt10">
      <div class="weui-pane_subtitle">服务列表</div>
      <div class="weui-list_container">
        <div class="weui-list_item">
          <div class="icon"><img src="@/assets/images/icon_picc.png" alt=""></div>
          <div class="mid">
            <div class="title">院内陪诊</div>
            <div class="describe">针对老人、儿童、孕妇、异地就医患者…</div>
          </div>
          <div class="count">5次</div>
        </div>
        <div class="weui-list_item">
          <div class="icon"><img src="@/assets/images/icon_picc.png" alt=""></div>
          <div class="mid">
            <div class="title">院内陪诊</div>
            <div class="describe">针对老人、儿童、孕妇、异地就医患者…</div>
          </div>
          <div class="count">5次</div>
        </div>
      </div>
    </div>
    
    <button data-v-018b696c="" type="button" class="weui-btn weui-btn-bottom weui-btn_primary">立即购买 ￥10.00</button>
  </div>
</template>

<script>
import packageInfo from '../components/package-info'
export default {
  components: {
    packageInfo
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.weui-list-panel {
  background: #fff;
  .weui-pane_subtitle {
    position: relative;
    padding: 16px 15px 4px 15px;
    font-size: 15px;
    color: #666;
    &::before {
      content: " ";
      position: absolute;
      bottom: 0;
      left: 15px;
      right: 15px;
      height: 1px;
      border-top: 1px solid #d9f7f5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
  }
}
</style>
