<template>
  <div>
    <div class="servant-panel_list">
      <div class="item">
        <div class="row-1">
          <div class="custom">
            <span class="name">匿名用户1304</span>
            <span class="date">1月16日 18:49</span>
          </div>
          <div class="rater"><rater v-model="rater" disabled :font-size="12" active-color="#F8A519"></rater></div>
        </div>
        <div class="row-2">
          感谢医生，服务特别好，已经康复了。
        </div>
      </div>
      <div class="item">
        <div class="row-1">
          <div class="custom">
            <span class="name">月月</span>
            <span class="date">1月16日 18:49</span>
          </div>
          <div class="rater"><rater v-model="rater" disabled :font-size="12" active-color="#F8A519"></rater></div>
        </div>
        <div class="row-2">
          相比《无声告白》无声的反抗，《小火》里的更勇敢，更有魄力，套用李安《喜宴》中的那句：你正见识到自我压抑的结果。
        </div>
      </div>
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
      rater: 4
    }
  }
}
</script>


<style lang="less" scoped>
.servant-panel_list {
  .item {
    padding: 7px 12px 10px 12px;
    position: relative;
    &:before {
      content: " ";
      position: absolute;
      bottom: 0;
      left: 10px;
      right: 10px;
      height: 1px;
      border-top: 1px solid #d9f7f5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
    .row-1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
      .custom {
        .name {
          margin-right: 12px;
          font-size: 12px;
          color: #3ECCCC;
        }
        .date {
          font-size: 10px;
          color: #999;
        }
      }
    }
    .row-2 {
      font-size: 13px;
      color: #999;
    }
  }
}
</style>
