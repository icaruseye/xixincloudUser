<template>
  <div>
    <div class="has-tabbar">
      <div class="user-info">
        <img class="avatar" src="https://img3.doubanio.com/icon/u144889470-14.jpg">
        <span class="name">哈哈哈 <span class="tag">健康管家</span></span>
        <img class="qrcode" src="@/assets/images/code.png">
      </div>
      <div class="weui-panel">
        <div class="weui-cell" style="font-size:15px;padding:10px 0">医生服务</div>
        <div class="item-list vux-1px-t">
          <div class="weui-cell" @click="toDetail(1)">
            <div><img class="poster" src="@/assets/images/default_img_service.jpg" alt=""></div>
            <div class="mid">
              <div class="title">测试服务包</div>
              <ul>
                <li>已售：1份</li>
                <li>价格：￥10.00</li>
              </ul>
            </div>
            <div class="right">
              <a href="JavaScript:;">￥10.00元<i class="iconfont icon-jiantouyou"></i></a>
            </div>
          </div>
        </div>
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
  methods: {
    toDetail (id) {
      this.$router.push(`/servant/packageDetail/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.vux-1px-t::before {
  border-top: 1px solid #d9f7f5;
}

.user-panel {
  padding: 15px 0;
  display: flex;
  background: #fff;
  border-bottom: #9fe6e6 1px solid;
  font-size: 12px;
  .user-panel_item {
    flex: 1;
    align-items: center;
    text-align: center;
    justify-content: center;
    border-right: #d9f7f5  1px solid;
    color: #666;
    &:last-child {
      border: 0;
    }
    .color-ye {
      font-size: 18px;
    }
    img {
      width: 31px;
      margin-right: 10px;
    }
  }
}

.weui-cell {
  display: block;
  color: #666;
  .title {
    font-size: 15px;
    margin-bottom: 10px;
  }
  .content {
    font-size: 12px;
  }
}

.item-list {
  .weui-cell {
    display: flex;
    align-items: center;
    &.first::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
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
    .poster {
      margin-right: 15px;
      display: block;
      width: 40px;
      height: 40px;
    }
    .mid {
      flex: 1;
      color: #999;
      font-size: 12px;
      .title {
        margin: 0;
        color: #666;
        font-size: 14px;
      }
    }
    .right {
      font-size: 14px;
      a {
        color: @theme-color;
        .iconfont {
          color: @yellow
        }
      }
    }
  }
}
</style>
