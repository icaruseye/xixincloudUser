<template>
  <div>
    <div class="has-tabbar">
      <div class="user-info">
        <img class="avatar" src="https://img3.doubanio.com/icon/u144889470-14.jpg">
        <span class="name">哈哈哈 <span class="tag">健康管家</span></span>
        <img class="qrcode" src="@/assets/images/code.png">
      </div>
      <div class="user-panel">
        <!-- <router-link to="/" class="user-panel_item">
            <div><span class="color-ye">24</span>年</div>
            <div>从业年限</div>
        </router-link> -->
        <router-link to="/" class="user-panel_item">
            <div><span class="color-ye">1</span>次</div>
            <div>服务次数</div>
        </router-link>
        <router-link to="/" class="user-panel_item">
            <div><span class="color-ye">5.0</span>分</div>
            <div>服务评分</div>
        </router-link>
      </div>
      <div class="weui-panel">
        <div class="weui-cell">
          <div class="title">擅长服务</div>
          <div class="content">打针、输液</div>
        </div>
        <div class="weui-cell">
          <div class="title">个人简介</div>
          <div class="content">专家</div>
        </div>
      </div>
      <div class="weui-panel">
        <div class="weui-cell" style="font-size:15px;">医生服务</div>
        <div class="item-list vux-1px-t">
          <div class="weui-cell first">
            <div><img class="poster" src="@/assets/images/default_img_service.jpg" alt=""></div>
            <div class="mid">
              <div class="title">测试服务包</div>
              <ul>
                <li>已售：1份</li>
                <li>价格：￥10.00</li>
              </ul>
            </div>
            <div class="right">
              <a href="JavaScript:;">购买<i class="iconfont icon-jiantouyou"></i></a>
            </div>
          </div>
        </div>
        <router-link to="/servant/packageList/1">
          <div class="more-bar vux-1px-t">
            更多医生服务信息<i class="iconfont icon-jiantouyou"></i>
          </div>
        </router-link>
      </div>
      <div class="weui-panel">
        <div class="weui-cell">
          <div class="title">患者评价</div>
          <div class="content">暂无评价</div>
        </div>
      </div>
      <button type="button" class="weui-btn weui-btn-bottom weui-btn_primary">发消息</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
    display: block;
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

.more-bar {
  text-align: center;
  font-size: 13px;
  padding: 12px 0;
  color: #666;
  .iconfont {
    color: @yellow;
    font-size: 14px;
  }
}
</style>
