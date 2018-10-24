<template>
  <div class="wrapper">
    <div class="topic_tools">
      <div class="item">
        <i class="iconfont icon-dui"></i>
        <div style="color:#32C0F3">50</div>
      </div>
      <div class="item">
        <i class="iconfont icon-cuo"></i>
        <span style="color:#FF4E4E">50</span>
      </div>
      <div class="item">
        <i class="iconfont icon-caidan"></i>
      </div>
      <div class="item" style="flex:1;justify-content: flex-end;">
        <span style="color:#32C0F3">50</span>
        <span>/144</span>
      </div>
    </div>
    <div class="card_wrap">
      <div class="title">
        <div>1节 小儿生长发育</div>
        <div><i class="iconfont icon-lajitong"></i>清空</div>
      </div>
      <div class="item-list">
        <template v-for="val in 90">
          <div class="main_item" :key="val">
            <div class="item" :class="{ correct: val === 1, wrong: val === 3}">{{val}}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.topic_tools {
  display: flex;
  font-size: 12px;
  padding: 16px 20px 16px 0;
  background: #fff;
  color: #666;
  .item {
    margin: 0 0 0 20px;
    display: flex;
    align-items: center;
  }
  .iconfont {
    position: relative;
    top: 1px;
    margin-right: 5px;
    color: #ccc;
    font-size: 20px;
  }
}
.card_wrap {
  .title {
    display: flex;
    font-size: 13px;
    color: #666;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    height: 30px;
  }
  .item-list {
    max-height: 300px;
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 16px 12px;
    background: #fff;
    font-size: 13px;
    color: #999;
    .main_item {
      width: 16.666666%;
      .item {
        margin: 0 auto 12px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        &.correct {
          color: #32C0F3;
          border-color: #32C0F3;
          background: #D5F4FF;
        }
        &.wrong {
          color: #FF5F5F;
          border-color: #FF5F5F;
          background: #FFDFDF;
        }
      }
    }
  }
}
</style>
