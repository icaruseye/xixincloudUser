<template>
  <div class="wrapper">
    <div class="has-tabbar">
      <sticky
        ref="sticky"
        :offset="0"
        :check-sticky-support="true">
        <xx-tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="25px">
          <xx-tab-item :selected="tabIndex === 0" @on-item-click="onItemClick">我的课程</xx-tab-item>
          <xx-tab-item :selected="tabIndex === 1" @on-item-click="onItemClick">错题本</xx-tab-item>
        </xx-tab>
      </sticky>
      <courseList v-show="tabIndex === 0"></courseList>
      <myTestHistory v-show="tabIndex === 1"></myTestHistory>
    </div>
    <xx-tabbar></xx-tabbar>
  </div>
</template>

<script>
import { Sticky } from 'vux'
import courseList from './courseList'
import myTestHistory from '../user/myTestHistory'
export default {
  components: {
    Sticky,
    courseList,
    myTestHistory
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    onItemClick (index) {
    }
  }
}
</script>

<style lang="less" scoped>
.setting-panel {
  background: #fff;
  &.vux-1px-t:before {
    border-color: #e5e5e5;
  }

  &.vux-1px-b:after {
    border-color: #e5e5e5;
  }
  .setting-panel_item {
    width: 90%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 15px 0;
    display: flex;
    align-items: center;
    color: #666;
    font-size: 15px;
    &.vux-1px-b:after {
      border-color: #daf6f5;
    }
    img {
      width: 15px;
      height: auto;
      padding-right: 10px;
    }
    .title {
      flex: 1;
    }
    .iconfont {
      color: #ccc;
      font-size: 15px;
    }
  }
}
</style>
