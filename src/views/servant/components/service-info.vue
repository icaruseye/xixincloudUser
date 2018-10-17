<template>
  <div class="wrap">
    <div v-show="info.Avatar">
      <!-- 基本信息 -->
      <div class="servant-panel_info">
        <img class="avatar" :src="info.Avatar | transformImgUrl">
        <span class="name">{{info.ViewName}}</span>
        <img class="qrcode" src="@/assets/images/code.png" @click="showQrcode">
      </div>
      <!-- 服务评分 -->
      <div class="servant-panel_data panel-border">
        <!-- <div class="item">
          <div><span class="color-ye">24</span>年</div>
          <div>从业年限</div>
        </div> -->
        <div class="item">
          <div><span class="color-ye">{{info.ServiceTimes}}</span>次 服务次数</div>
        </div>
        <div class="item">
          <div><span class="color-ye">{{info.AverageScore}}</span>分 服务评分</div>
        </div>
      </div>
      <!-- 个人简介 -->
      <div class="servant-panel_intro">
        <div class="servant-panel_title"><i class="icon icon-1"></i>个人简介</div>
        <div style="padding: 0 12px;">
          <div class="content">
            {{info.Description ? info.Description : '暂无简介'}}
          </div>
          <!-- <router-link :to="`/servant/registration/${info.ViewID}`" class="registration_btn"><i class="iconfont icon-hao"></i> 挂号</router-link> -->
        </div>
      </div>
    </div>
    <!-- <div class="servant-unfold_bar">
      <div><i class="iconfont icon-jiantoushang"></i></div>
      <div>展开</div>
    </div> -->
    <div v-transfer-dom>
      <x-dialog v-model="isShow" :hide-on-blur="true">
        <ShowQrCode :info="info"></ShowQrCode>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import ShowQrCode from '@/components/ShowQrCode'
import { XDialog, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  components: {
    ShowQrCode,
    XDialog
  },
  data () {
    return {
      info: {},
      isShow: false
    }
  },
  watch: {
    data (val) {
      this.info = val
    }
  },
  methods: {
    showQrcode () {
      this.isShow = true
    }
  }
}
</script>


<style lang="less" scoped>
.wrap {
  min-height: 210px;
  background: #fff;
}
.servant-panel_title {
  padding: 0 10px;
  font-weight: bold;
  font-size: 16px;
}
.servant-unfold_bar {
  padding: 5px 0;
  font-size: 12px;
  color: #999;
  text-align: center;
}
.servant-panel_info {
  padding: 12px 8px 12px 12px;
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .name {
    padding: 0 10px;
    font-size: 18px;
    color: #333;
    flex: 1;
  }
  .qrcode {
    width: 60px;
    height: 60px;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, .3);
    padding: 5px;
  }
}
.servant-panel_data {
  position: relative;
  padding: 15px 0;
  display: flex;
  background: #fff;
  font-size: 12px;
  .item {
    margin: 0 10px;
    padding: 1px 8px;
    display: block;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: #999;
    background: #E9E9E9;
    border-radius: 15px;
  }
}
.servant-panel_intro {
  position: relative;
  padding-top: 12px;
  overflow: hidden;
  .content {
    font-size: 12px;
    color: #666;
    padding: 10px 0;
    // border-top: 1px solid RGBA(62, 204, 204, .2);
  }
  .registration_btn {
    display: block;
    margin: 10px 0;
    height: 35px;
    line-height: 35px;
    background: #3ECCCC;
    text-align: center;
    border-radius: 2px;
    font-size: 15px;
    color: #fff;
  }
}
.icon-jiantoushang {
  font-size: 12px;
}
</style>
