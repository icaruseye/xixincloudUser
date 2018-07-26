<template>
  <div>
    <div class="userinfo-panel">
      <div class="userinfo-block">
        <div class="row-1">
          <div class="avatar">
            <img src="https://user-gold-cdn.xitu.io/2017/8/23/2d6a4f0f4b056f53e41ca657117615d7?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="">
          </div>
          <div class="info">
            <div><span class="name">Name</span><span class="account">帐号：133****1212</span></div>
            <div>已被守护：<span>1002天</span></div>
            <div>
              <span class="tag">实名认证</span>
              <span class="tag">手机认证</span>
            </div>
          </div>
          <div class="qrcode">
            <img src="" alt="">
          </div>
        </div>
        <div class="row-2">
          <div class="item">
            <i class="iconfont"></i>
            <span>消息</span>
          </div>
          <div class="item">
            <i class="iconfont"></i>
            <span>服务者</span>
          </div>
          <div class="item">
            <i class="iconfont"></i>
            <span>服务内容</span>
          </div>
          <div class="item">
            <i class="iconfont"></i>
            <span>日程</span>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="organ-info">
      <div class="item">
        <i class="iconfont"></i>
        <span>机构介绍</span>
      </div>
      <div class="item">
        <i class="iconfont"></i>
        <span>客服服务</span>
      </div>
    </div>
    <!--  -->
    <div class="servant-panel servant-panel_service" v-if="itemList.length > 0">
      <div class="servant-panel_title"><i class="icon icon-2"></i>服务介绍</div>
      <div class="servant-pane_subtitle">单项服务</div>
      <template v-for="(item, index) in list">
        <div class="weui-list_item" :key="index" @click="toItem(item.ID, item.Count)" v-if="index <= max - 1">
          <div class="icon">
            <img src="@/assets/images/icon_picc.png" alt="">
          </div>
          <div class="mid">
            <div class="title">{{item.Name}}</div>
            <div class="describe text-overflow-1">{{item.Description}}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        itemList: []
      }
    }
  }
</script>

<style scoped lang="less">
@import url(../servant/components/index.less);
.userinfo-panel {
  background: #A7E2F5;
  height: 150px;
}
.userinfo-block {
  margin: 0 12px;
  position: relative;
  top: 12px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 1px #ccc;
  .row-1 {
    display: flex;
    align-items: center;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
</style>