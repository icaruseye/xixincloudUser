<template>
  <div class="has-tabbar">
    <div class="poster">
      <div class="title">测试服务包</div>
      <div class="name">医师姓名</div>
    </div>
    <div class="weui-panel" style="margin:0">
      <div class="button-tab">
        <button-tab v-model="tabIndex">
          <button-tab-item @on-item-click="clickTab">详情</button-tab-item>
          <button-tab-item @on-item-click="clickTab" selected>评价</button-tab-item>
        </button-tab>
      </div>
      <div class="service-bao">
        <h6 class="service-bao-tit">测试服务包</h6>
        <p class="servie-bao-desc"><span class="money color-s4">￥0.00 </span><span class="old-money">￥0.00</span></p>
      </div>
    </div>
    <div class="weui-panel">
      <div class="weui-media-box weui-media-box_text">
        <h4 class="weui-media-box__title"><i class="icon-doctor"></i>医师介绍</h4>
        <!--item-->
        <div class="weui-cell dc-info">
          <div class="left">
            <img src="" alt="">
          </div>
          <div class="mid">
            医生呀<span class="tag">健康管家</span>
          </div>
          <div class="right">
            <i class="iconfont icon-jiantouyou"></i>
          </div>
        </div>
        <!--item end-->
      </div>
      <div class="weui-cell" style="font-size:12px;color:#666;">
        123123
      </div>
    </div>
    <div class="weui-panel">
      <div class="weui-media-box">
        <h4 class="weui-media-box__title"><i class="icon-doctor"></i>包含服务项</h4>
        <div class="content">123123</div>
      </div>
    </div>
    <div class="weui-panel">
      <div class="weui-media-box">
        <h4 class="weui-media-box__title"><i class="icon-service"></i>服务详情</h4>
        <div class="content">123123</div>
      </div>
    </div>
    <div class="weui-panel">
      <div class="weui-media-box">
        <h4 class="weui-media-box__title"><i class="icon-comment"></i>服务评论</h4>
        <div class="content">123123</div>
      </div>
      <div data-v-018b696c="" class="more-bar vux-1px-t">
        更多24条评价<i data-v-018b696c="" class="iconfont icon-jiantouyou"></i>
      </div>
    </div>
    <button data-v-018b696c="" type="button" class="weui-btn weui-btn-bottom weui-btn_primary">立即购买 ￥10.00</button>
  </div>
</template>

<script>
import { ButtonTab, ButtonTabItem } from 'vux'
export default {
  components: {
    ButtonTab,
    ButtonTabItem
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  methods: {
    clickTab (index) {
      console.log(index)
    }
  }
}
</script>

<style lang="less" scoped>
.vux-1px-t::before {
  border-top: 1px solid #d9f7f5;
}

.poster {
  background: url(../../assets/images/person_background.png);
  background-size: cover;
  height: 200px;
  color: #fff;
  .title {
    padding: 15px 30px 0;
    font-size: 30px;
    letter-spacing: 4px;
    margin-bottom: 40px;
  }
  .name {
    padding: 0 30px;
    font-size: 26px;
    margin-bottom: 12px;
  }
}

.button-tab {
  margin:0 auto;
  width:50%;
  padding:15px 15px 10px;
}

.service-bao {
  padding: 0px 5px 10px;
  font-size: 12px;
  .service-bao-tit {
    font-size: 16px;
    color: #333;
    font-weight: 100;
  }
  .money {
    font-size: 18px;
    color: @yellow;
  }
  .old-money {
    text-decoration: line-through;
    padding: 0px 10px;
    color: #d7d7d7;
  }
}

.weui-media-box {
  padding: 15px 0;
  position: relative;
  .weui-media-box__title {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    color: #666;
    font-size: 14px;
  }
  .content {
    color: #666;
    font-size: 12px;
  }
  .dc-info {
    display: flex;
    align-items: center;
    .left {
      img {
        margin-right: 15px;
        display: block;
        width: 40px;
        height: 40px;
      }
    }
    .mid {
      flex: 1;
      font-size: 14px;
      .tag {
        margin-left: 5px;
        font-size: 12px;
        color: @theme-color;
      }
    }
    .iconfont {
      color: @yellow;
    }
  }
}

.more-bar {
  text-align: center;
  font-size: 12px;
  padding: 12px 0;
  color: #666;
  .iconfont {
    color: @yellow;
    font-size: 14px;
  }
}
</style>
