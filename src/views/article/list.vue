<template>
  <div class="has-tabbar">
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="true">
      <xx-tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="0">
        <xx-tab-item :selected="tabIndex === 0" @on-item-click="onItemClick">精选</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 1" @on-item-click="onItemClick">热点</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 2" @on-item-click="onItemClick">推荐</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 3" @on-item-click="onItemClick">问答咨询</xx-tab-item>
      </xx-tab>
    </sticky>
    <div class="container">
      <div class="item">
        <div class="poster">
          <img src="https://image.g-cores.com/1b54222d-0c39-4f77-a990-019232c2fdf7.jpg?x-oss-process=style/original_hl" alt="" @click="toDetail(0)">
        </div>
        <div class="right">
          <div class="title" @click="toDetail(0)">分析与猜想：《赛博朋克2077》演示里隐含的信息</div>
          <div class="info">
            <div class="text">游戏</div>
            <div class="text">预告</div>
            <div class="text">阅读180</div>
            <div class="text">赞12</div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="poster">
          <img src="https://image.g-cores.com/e78dc74e-1d6c-45e5-a6ae-d3f20f3d4834.jpg?x-oss-process=style/original_hs" alt="" @click="toDetail(1)">
        </div>
        <div class="right">
          <div class="title" @click="toDetail(1)">5 亿台纪念限定版 PS4 Pro 开箱视频</div>
          <div class="info">
            <div class="text">索尼</div>
            <div class="text">主机</div>
            <div class="text">求购180</div>
            <div class="text">赞999</div>
          </div>
        </div>
      </div>
    </div>
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
      tabIndex: 0
    }
  },
  methods: {
    onItemClick () {
    },
    toDetail (id) {
      this.$router.push(`/article/detail/${id}`)
    }
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 10px 6px;
  .item {
    margin-bottom: 10px;
    display: flex;
    background: #fff;
    border-radius: 2px;
    padding: 10px 6px;
    .poster {
      font-size: 0;
      img {
        margin-right: 9px;
        width: 118px;
        height: 80px;
        border-radius: 2px;
        overflow: hidden;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .title {
        font-size: 15px;
        color: #666;
      }
      .info {
        padding-right: 10px;
        display: flex;
        align-items: flex-end;
        font-size: 9px;
        color: #999;
        .text {
          flex: 1;
          &:nth-child(3),
          &:nth-child(4) {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>