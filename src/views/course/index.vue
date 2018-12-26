<template>
  <div class="wrapper">
    <div class="setting-panel vux-1px-t vux-1px-b">
      <router-link to="/course/courseList" class="setting-panel_item vux-1px-b">
        <img src="@/assets/images/icon-my-comp.png" alt="">
        <span class="title">我的课程</span>
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
      <router-link to="/user/myTestHistory" class="setting-panel_item vux-1px-b">
        <img src="@/assets/images/icon-my-info.png" alt="">
        <span class="title">错题本</span>
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
    </div>
    <xx-tabbar></xx-tabbar>
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
