<template>
  <div>
    <div class="sreach-bar">
      <input type="text" placeholder="输入医生名字搜索">
    </div>
    <div class="container">
      <!-- 标签 -->
      <div class="tags-panel">
        <div class="title">服务者标签</div>
        <checker v-model="tag" :radio-required="true" default-item-class="tags-item" selected-item-class="tags-item-selected">
          <checker-item value="1">家</checker-item>
          <checker-item value="2">公司</checker-item>
          <checker-item value="3">其他</checker-item>
          <checker-item value="4">安德森</checker-item>
          <checker-item value="5">阿迪</checker-item>
          <checker-item value="6">老哥</checker-item>
          <checker-item value="7">蛤蛤</checker-item>
          <checker-item value="8">嘻嘻</checker-item>
          <checker-item value="9">其他</checker-item>
        </checker>
      </div>
      <!-- 推荐医师 -->
      <div class="servant-panel servant-panel_service">
        <div class="servant-panel_title">推荐医师</div>
        <div class="weui-list_item">
          <div class="avatar">
            <img src="https://alioss.g-cores.com/uploads/user/d95bb3d6-38e4-4f24-9100-9b05f6a74c89_normal.jpg" alt="">
          </div>
          <div class="mid">
            <div class="title">陈医生</div>
            <div class="describe text-overflow-1">专业老中医</div>
            <div style="margin-bottom: 8px;display: flex;align-items: center;">
              <i class="iconfont icon-star1"></i><span class="range">5.0</span><span class="times">91次服务</span>
            </div>
            <div class="tags"><span>123</span><span>很不错哦</span></div>
          </div>
        </div>
        <div class="weui-list_item">
          <div class="avatar">
            <img src="https://alioss.g-cores.com/uploads/user/d95bb3d6-38e4-4f24-9100-9b05f6a74c89_normal.jpg" alt="">
          </div>
          <div class="mid">
            <div class="title">陈医生</div>
            <div class="describe text-overflow-1">专业老中医</div>
            <div style="margin-bottom: 8px;display: flex;align-items: center;">
              <i class="iconfont icon-star1"></i><span class="range">5.0</span><span class="times">91次服务</span>
            </div>
            <div class="tags"><span>123</span><span>很不错哦</span></div>
          </div>
        </div>
        <!-- <template v-for="(item, index) in itemList">
          <div class="weui-list_item" :key="index" @click="toItem(item.ID)">
            <div class="icon">
              <img :src="item.UseType | ItemImageByUseType" alt="">
            </div>
            <div class="mid">
              <div class="title">{{item.Name}}</div>
              <div class="describe text-overflow-1">{{item.Content}}</div>
            </div>
          </div>
        </template> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Checker, CheckerItem } from 'vux'
export default {
  components: {
    Checker,
    CheckerItem
  },
  data () {
    return {
      tag: ''
    }
  }
}
</script>

<style scoped lang="less">
@import url(../../servant/components/index.less);
.container {
  overflow: hidden;
}
.vux-checker-box {
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
}
.tags-panel {
  margin-top: 10px;
  padding: 15px;
  background: #fff;
  .title {
    margin-bottom: 10px;
    font-size: 15px;
    color: #3ecccc;
  }
  .tags-item {
    margin: 0 20px 15px 0;
    height: 25px;
    line-height: 25px;
    font-size: 13px;
    color: #bbb;
    text-align: center;
    background: #eee;
    padding: 0 10px;
    border-radius: 2px;
    &.tags-item-selected {
      background: #3ecccc;
      color: #fff;
    }
  }
}
.servant-panel {
  margin-top: 10px;
  background: #fff;
  padding: 15px;
}
.servant-panel_title {
  font-size: 17px;
  font-weight: normal;
  position: relative;
  padding: 0 0 10px;
  &::after {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid RGBA(58, 199, 245, .2);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
}
.weui-list_item {
  .avatar {
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .mid {
    line-height: 1;
    margin-left: 18px;
    .title {
      margin-bottom: 8px;
      font-weight: normal;
      color: #333;
      font-size: 18px;
    }
    .describe {
      margin-bottom: 8px;
      color: #999;
      font-size: 12px;
    }
    .tags {
      display: flex;
      span {
        margin-right: 5px;
        padding: 0 5px;
        height: 13px;
        line-height: 15px;
        display: block;
        border-radius: 10px;
        font-size: 10px;
        border: 1px solid #3ecccc;
        color: #3ecccc;
      }
    }
    .iconfont {
      margin-right: 3px;
      font-size: 10px;
      color: #F8A519;
    }
    .times {
      margin-right: 5px;
      font-size: 12px;
      color: #999;
    }
    .range {
      margin-right: 5px;
      color: #F8A519;
      font-size: 12px;
    }
  }
}
.sreach-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 10px 12px;
  input {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: url(../../../assets/images/search.png) no-repeat #eee left center;
    background-size: 17px;
    background-position-x: 10px;
    font-size: 14px;
    color: #666;
    padding-left: 35px;
    border-radius: 15px;
    &::-webkit-input-placeholder {
      text-align: center;
      position: relative;
      left: -15px;
      color: #999;
    }
  }
}

.container {
  margin-top: 50px;
}
</style>