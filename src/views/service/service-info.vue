<template>
  <div>
    <div class="weui-panel">
      <div class="weui-cell-title"><i class="icon icon-times"></i>服务信息</div>
      <div class="weui-cell">
        <div class="color-theme">预计开始时间：2018-04-24 04:20</div>
        <div class="color-theme">预计结束时间：2018-04-24 04:50</div>
        <div class="text">服务地点：四川省成都市锦江区哈哈哈哈啊哈</div>
        <div class="text">症状描述或备注：哈哈哈哈</div>
      </div>
    </div>
    <div class="weui-panel">
      <div class="weui-cell-title"><i class="icon icon-service"></i>服务详情</div>
      <div class="weui-cell">
        <div class="text">能够提供上门输液服务</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.weui-panel {
  padding: 15px 15px 0 15px;
  background: #fff;
  .weui-cell-title {
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    font-size: 14px;
    color: #666;
    .icon {
      margin-right: 5px;
    }
  }
  .weui-cell {
    font-size: 12px;
    &>div {
      margin-bottom: 10px;
    }
    &>div:last-child {
      margin-bottom: 0;
    }
    .text {
      color: #666;
    }
  }
}

.icon-times {
  display: inline-block;
  background: url(../../assets/images/icon-times.png) no-repeat;
  width: 22px;
  height: 22px;
  background-size: 100% 100%;
  vertical-align: middle;
}

.icon-service {
  display: inline-block;
  background: url(../../assets/images/icon-service.png) no-repeat;
  width: 22px;
  height: 22px;
  background-size: 100% 100%;
  vertical-align: middle;
}
</style>
