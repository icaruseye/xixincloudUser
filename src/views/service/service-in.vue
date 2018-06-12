<template>
  <div class="wrap has-tabbar">
    <xx-step-bar step="2">
      <xx-step-items slot="items">
        预约
      </xx-step-items>
      <xx-step-items slot="items">
        服务中
      </xx-step-items>
      <xx-step-items slot="items">
        已完成
      </xx-step-items>
    </xx-step-bar>
    <xx-timeLine step="0" class="mgt10">
      <xx-timeLine-items
        slot="items"
        title="待确认">
        <div class="content">
          服务者还未确认服务时间
        </div>
      </xx-timeLine-items>
      <xx-timeLine-items
        slot="items"
        title="服务中"
        subhead="确认时间：2018/06/08 15:30">
        <div class="content">
          服务项：PICC换药
        </div>
      </xx-timeLine-items>
      <xx-timeLine-items
        slot="items"
        title="待评价">
        <div class="content nobor">
          <!-- 未完成 -->
          <!-- <div>服务还未完成，不能进行评价</div> -->
          <!-- 待评价 -->
          <div>
            <div class="comments">
              <div class="label">服务评价</div>
              <div class="right">
                <rater v-model="rate" active-color="#F8A519" :font-size="14"></rater>
              </div>
            </div>
            <div>
              <textarea class="comments-textarea" name="" id="" cols="30" rows="10"></textarea>
              <span style="font-size:11px">超过72小时自动默认好评</span>
            </div>
          </div>
          <!-- 已评价 -->
          <div class="comments-done">
            <div class="title">服务评价</div>
            <div class="comment">感谢医生，服务特别好，感觉很专业！</div>
            <div class="rates" style="text-align: right;">
              <rater v-model="rate" disabled="disabled" active-color="#F8A519" :font-size="14"></rater>
            </div>
          </div>
        </div>
      </xx-timeLine-items>
    </xx-timeLine>
    <div class="btn-bar">
      <!-- <button type="button" class="weui-btn weui-btn_primary">发消息</button> -->
      <a href="/service/complaint/1" class="weui-btn weui-btn_primary">投诉</a>
      <button type="button" class="weui-btn weui-btn_primary">取消预约</button>
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
  }
}
</script>

<style scoped lang="less">
.content {
  position: relative;
  font-size: 13px;
  color: #999;
  padding-bottom: 12px;
  &::after {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d9f7f5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  &.nobor:after {
    border: 0;
  }
}
.btn-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  .weui-btn:nth-child(1) {
    width: 300px;
    background: #ffc349
  }
}

.comments {
  margin-bottom: 9px;
  display:flex;
  align-items: center;
  justify-content: space-between;
  .label {
    font-size: 13px;
    color: #999;
  }
}

.comments-textarea {
  resize: none;
  background: transparent;
  border: 1px solid RGBA(151, 151, 151, .3);
  font-size: 13px;
  color: #666;
  width: 100%;
  border-radius: 2px;
}

.comments-done {
  position: relative;
  margin-top: 10px;
  padding: 12px 12px 9px 12px;
  background: #F2F2F2;
  border-radius: 4px;
  &::after {
    content: "";
    position: absolute;
    top: -20px;
    left: 20px;;
    width:0;
    height:0;
    border:10px solid #f00283;
    border-color: transparent transparent #F2F2F2 transparent;
  }
}
</style>