<template>
  <div>
    <div class="userinfo-panel">
      <div class="userinfo-block">
        <!-- 已绑定手机 -->
        <div v-if="userInfo.Mobile">
          <div class="row-1">
            <div class="avatar">
              <img :src="userAccount.Avatar | transformImgUrl" alt="">
            </div>
            <div class="info">
              <div><span class="name">{{userAccount.NickName}}</span></div>
              <!-- <div class="days">已被守护：<span>1002天</span></div> -->
              <div>
                <span class="tag" v-if="userInfo.IDCard">实名认证</span>
                <span class="tag" v-if="userInfo.Mobile">手机认证</span>
              </div>
            </div>
            <div class="qrcode">
              <img src="" alt="">
            </div>
          </div>
          <div class="row-2">
            <div class="item" @click="go('/systemMail')">
              <i class="iconfont icon-xiaoxi1"></i>
              <div class="text">消息</div>
            </div>
            <div class="item" @click="go('/')">
              <i class="iconfont icon-ren1"></i>
              <div class="text">服务者</div>
            </div>
            <div class="item" @click="go('/service')">
              <i class="iconfont icon-neirong"></i>
              <div class="text">服务内容</div>
            </div>
            <div class="item" @click="go('/user')">
              <i class="iconfont icon-shijian"></i>
              <div class="text">日程</div>
            </div>
          </div>
        </div>
        <!-- 未绑定手机 -->
        <div v-else class="empty-wrap">
          <router-link class="btn" to="/user/phone">绑定手机号</router-link>
        </div>
      </div>
    </div>
    <!-- 机构介绍 -->
    <div class="organ-info">
      <div class="item" @click="showDialog">
        <img src="@/assets/images/organ-4.png" alt="">
        <div class="text">机构介绍</div>
      </div>
      <template v-for="(item, index) in aliasList">
        <div class="item" @click="toList(item.UseType)" :key="index">
          <img :src="item.UseType | aliasImgByUsetype" alt="">
          <div class="text">{{item.Name}}</div>
        </div>
      </template>
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
    <!-- 机构介绍 -->
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" hide-on-blur :dialog-style="{height: '75%', 'background-color': '#fff'}">
        <div class="tips-content">
          <div class="title">{{Agreement.Title}}</div>
          <div v-html="Agreement.Content"></div>
        </div>
        <div class="close" @click="showHideOnBlur = false" style="padding: 0 0 10px">
          <i class="iconfont icon-shanchuguanbicha2" style="font-size:20px;color:#999;"></i>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      itemList: [],
      Agreement: {},
      aliasList: [],
      showHideOnBlur: false
    }
  },
  filters: {
    aliasImgByUsetype (type) {
      switch (type) {
        case 1:
          return require('@/assets/images/organ-1.png')
        case 2:
          return require('@/assets/images/organ-2.png')
        case 3:
          return require('@/assets/images/organ-3.png')
        default:
          return require('@/assets/images/organ-1.png')
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userAccount'
    ])
  },
  created () {
    // this.getItemTemplate()
    this.getAlias()
  },
  methods: {
    showDialog () {
      this.showHideOnBlur = true
    },
    toList (useType) {
      this.$router.push(`/organ/servantList?useType=${useType}`)
    },
    // 服务流程列表
    async getAlias () {
      const res = await this.$http.get(`/UseType/GetAlias/List`)
      if (res.data.Code === 100000 && res.data.Data) {
        this.aliasList = res.data.Data
      }
    },
    // 机构介绍
    async getShopAgreement () {
      const res = await this.$http.get(`/ShopAgreement?protocalType=20&itemID=0`)
      if (res.data.Code === 100000 && res.data.Data) {
        this.Agreement = res.data.Data
      }
    }
  }
}
</script>

<style scoped lang="less">
@import url(../../servant/components/index.less);
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
.userinfo-panel {
  background: #A7E2F5;
  height: 170px;
  margin-bottom: 32px
}
.userinfo-block {
  height: 176px;
  margin: 0 12px;
  position: relative;
  top: 12px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 10px 15px rgba(218, 218, 218, .6);
  .row-1 {
    position: relative;
    display: flex;
    align-items: center;
    padding: 15px 10px;
    &::after {
      position: absolute;
      content: '';
      display: block;
      bottom: 0;
      left: 10px;
      right: 10px;
      height: 1px;
      transform: scaleY(.5);
      background-color: #D8F4FD;
    }
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      overflow: hidden;
    }
    .info {
      flex: 1;
      .name {
        margin-right: 14px;
        font-size: 15px;
        color: #333;
      }
      .account {
        font-size: 12px;
        color: #999;
      }
      .days {
        font-size: 13px;
        color: #999;
      }
      .tag {
        font-size: 12px;
        padding: 2px 7px;
        border-radius: 10px;
        background: #fff;
        color: #3ecccc;
        border: 1px solid;
      }
    }
    .qrcode {
      width: 75px;
      height: 75px;
    }
  }
  .row-2 {
    display: flex;
    .item {
      padding: 10px 0;
      flex: 1;
      text-align: center;
      .text {
        font-size: 12px;
        color: #666;
      }
      .iconfont {
        font-size: 20px;
        color: #3ecccc;
      }
    }
  }
}
.organ-info {
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 12px 12px 0 12px;
  .item {
    padding: 10px 0;
    margin-bottom: 10px;
    line-height: 1;
    border-radius: 4px;
    width: 48%;
    background: #fff;
    .text {
      font-size: 13px;
      color: #666;
    }
    img {
      width: 40px;
      height: 40px;
      margin-bottom: 5px;
    }
  }
}
.servant-panel {
  margin-top: 10px;
  background: #fff;
  padding: 15px;
}
.servant-panel_title {
  position: relative;
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
  .more {
    position: absolute;
    right: 0;
    bottom: 12px;
    font-size: 12px;
    color: #999;
  }
}
.empty-wrap {
  position: relative;
  height: 100%;
  background: url('/src/assets/images/bind-phone.png') no-repeat center;
  background-size: 118px 95px;
  background-position-y: 15px;
  text-align: center;
  .btn {
    display: inline-block;
    margin-top: 135px;
    width: 100px;
    height: 25px;
    height: 25px;
    border: 1px solid RGBA(0, 180, 171, .2);
    box-sizing: border-box;
    border-radius: 15px;
    font-size: 15px;
    color: #3ecccc;
    font-weight: bold;
    text-align: center;
    background: #fff;
  }
}
</style>