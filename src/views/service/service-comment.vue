<template>
  <div class="weui-panel">
    <div class="weui-cell-title"><i class="icon icon-service"></i>服务评价</div>
    <div class="weui-cell">
      <rater v-model="rate" active-color="#3ecccc"></rater>
      <div><textarea name="" placeholder="说两句吧..." v-model="comments"></textarea></div>
    </div>
    <div class="weui-cell">
      <button class="weui-btn weui-btn_primary">提交评价</button>
    </div>
  </div>
</template>

<script>
import { Rater } from 'vux'
export default {
  components: {
    Rater
  },
  data () {
    return {
      rate: 5,
      comments: ''
    }
  },
  watch: {
    rate (val) {
      this.$emit('changeRate', val)
    },
    comments (val) {
      this.$emit('changeComments', val)
    }
  }
}
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
    textarea {
      width: 100%;
      resize: none;
      min-height: 100px;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 4px;
      border: none;
      font-size: 14px;
      color: #666;
      background: #f1f1f1;
    }
  }
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
