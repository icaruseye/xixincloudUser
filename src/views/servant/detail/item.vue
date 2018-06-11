<template>
  <div class="has-tabbar">
    <!-- 服务套餐头部信息 -->
    <packageInfo>
    </packageInfo>
    <div class="item-info-time"><span class="left">服务时长</span> <span class="right"><span class="number">90</span>分钟/次</span></div>
    <div class="item-info flex mgt10">
      <div class="left">操作动作</div>
      <div class="right">
        <ul>
          <li>1：伤口评估</li>
          <li>2：清洗伤口</li>
          <li>3：测量伤口长度</li>
          <li>4：拍照记录</li>
          <li>5：消毒</li>
          <li>6：做好处理记录</li>
        </ul>
      </div>
    </div>
    <div class="item-info mgt10">
      <div class="item-info-title">注意事项</div>
      <div class="content mgt10">用户必须具备正规医疗机构开具的处方、药品及病历证明；护士只提供上门输液服务，不提供相关药品；年龄不满10岁者不提供上门服务；普通输液服务为扎针技术服务，包含看护时间至少20分钟。</div>
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

.item-info {
  padding: 15px 14px;
  background: #fff;
  &.flex {
    display: flex;
    .left {
      margin-right: 18px;
      width: 72px;
      font-size: 16px;
      color: #333;
    }
    .right {
      font-size: 14px;
      color: #999;
    }
  }
  .title {
    width: 72px;
    font-size: 16px;
    color: #333;
  }
  .content {
    font-size: 14px;
    color: #999;
  }
}

.item-info-time {
  position: relative;
  background: #fff;
  padding: 15px 12px;
  display: flex;
  justify-content: space-between;
  &::before {
    content: " ";
    position: absolute;
    top: 0;
    left: 12px;
    right: 12px;
    height: 1px;
    border-top: 1px solid #d9f7f5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  .right {
    font-size: 12px;
    color: #999;
    .number {
      font-size: 18px;
    }
  }
}
</style>
