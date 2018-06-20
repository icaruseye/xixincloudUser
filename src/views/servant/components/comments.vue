<template>
  <div>
    <div class="servant-panel_list">
      <template v-for="(item, index) in list">
        <div class="item" :key="index">
          <div class="row-1">
            <div class="custom">
              <span class="name"></span>
              <span class="date">{{item.reViewSingle.ReviewTime | timeFormat}}</span>
            </div>
            <div class="rater"><rater v-model="item.reViewTotal.TotalScore" disabled :font-size="12" active-color="#F8A519"></rater></div>
          </div>
          <div class="row-2">
            {{item.reViewSingle.Remark}}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Rater, dateFormat } from 'vux'
export default {
  components: {
    Rater
  },
  filters: {
    timeFormat (value) {
      return dateFormat(new Date(value), 'YYYY-MM-DD HH:mm:ss')
    }
  },
  props: {
    list: Array
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
