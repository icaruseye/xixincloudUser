<template>
  <div>
    <!-- 服务包头部信息 -->
    <div class="package-header-info">
      <div class="icon"><img src="@/assets/images/icon_picc.png" alt=""></div>
      <div class="mid">
        <div class="name">{{data.Name}}</div>
        <div class="sales">
          <div class="price">{{data.ViewPrice ? (data.ViewPrice/100).toFixed(2) : '0.00'}}<span>元</span></div>
          <div class="volume" v-if="data.SoldAmount">已售：{{data.SoldAmount}}份</div>
        </div>
      </div>
      <div class="qrcode">
        <img src="@/assets/images/code.png" alt="" @click="showQrcode">
      </div>
    </div>
    <!-- 服务人员信息 -->
    <div class="package-servant-info mgt10">
      <div class="avatar"><img :src="data.Avatar | transformImgUrl" alt=""></div>
      <div class="name">{{data.NickName}}</div>
      <!-- <div class="title">儿科 主治医师</div> -->
    </div>
    <!-- 服务包介绍 -->
    <div class="package-info mgt10">
      <div class="title">
        <span class="left">服务套餐介绍</span>
        <span class="right" v-if="data.EffectiveDay">该套餐有效期：{{data.EffectiveDay}}天</span>
        <span class="right" v-if="data.EffectiveMonth">该套餐有效期：{{data.EffectiveMonth}}月</span>
        <span class="right" v-if="data.EffectiveYear">该套餐有效期：{{data.EffectiveYear}}年</span>
      </div>
      <div class="content">
        {{data.Description}}
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="isShow" :hide-on-blur="true">
        <ShowQrCode :info="data"></ShowQrCode>
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
  components: {
    ShowQrCode,
    XDialog
  },
  props: {
    data: Object
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    showQrcode () {
      this.isShow = true
    }
  }
}
</script>

<style lang="less">
.mgt10 {
  margin-top: 10px;
}
.package-header-info {
  background: #fff;
  padding: 20px 12px 12px;
  display: flex;
  align-items: center;
  .icon {
    width: 29px;
    height: 29px;
  }
  .mid {
    margin: 0 22px;
    flex: 1;
    .name {
      font-weight: bold;
      font-size: 18px;
      color: #666;
      font-weight: bold;
    }
    .describe {
      font-size: 13px;
      color: #999;
    }
    .sales {
      display: flex;
      align-items: baseline;
      .price {
        font-size: 24px;
        color: #FF5F5F;
        span {
          font-size: 11px;
        }
      }
      .volume {
        padding-left: 30px;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .qrcode {
    width: 50px;
    height: 50px;
    border: 1px solid RGBA(62, 204, 204, .3);
    box-sizing: border-box;
  }
}

.package-servant-info {
  padding: 15px 13px;
  background: #fff;
  display: flex;
  align-items: center;
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
  }
  .name {
    margin: 0 15px;
    font-size: 18px;
    color: #333;
  }
  .title {
    font-size: 12px;
    color: #999;
  }
}

.package-info {
  padding: 16px 12px;
  background: #fff;
  .title {
    margin-bottom: 9px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .left {
      font-size: 16px;
      color: #333;
    }
    .right {
      font-size: 11px;
      color: #999;
    }
  }
  .content {
    font-size: 13px;
    color: #666;
  }
}
</style>
