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
            <div class="item" @click="go('/servant')">
              <i class="iconfont icon-ren1"></i>
              <div class="text">服务者</div>
            </div>
            <div class="item" @click="go('/service')">
              <i class="iconfont icon-neirong"></i>
              <div class="text">服务内容</div>
            </div>
            <div class="item" @click="go('/user')">
              <i class="iconfont icon-shijian"></i>
              <div class="text">我的</div>
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
      <div class="item" @click="close">
        <img src="@/assets/images/organ-2.png" alt="">
        <div class="text">在线咨询</div>
      </div>
      <div class="item">
        <img src="@/assets/images/organ-2.png" alt="">
        <div class="text">医护上门</div>
      </div>
      <div class="item">
        <img src="@/assets/images/organ-2.png" alt="">
        <div class="text">院内服务</div>
      </div>
    </div>
    <!-- 服务介绍 -->
    <div class="servant-panel servant-panel_service">
      <div class="servant-panel_title">
        <i class="icon icon-2"></i><div style="flex:1">热门服务</div>
        <div class="localtion_tool">
          <template>
            <i class="iconfont icon-dingwei"></i>
            <x-address
              title=""
              v-model="citysCode"
              :list="addressData"
              class="address-picker-dispatch"
              :placeholder="addressText"
              value-text-align="center"
              :popup-style="{'z-index': 503}">
            </x-address>
          </template>
          <!-- <template v-else>
            当前定位：{{addressText}}
          </template> -->
        </div>
      </div>
      <template v-for="(item, index) in itemList">
        <div class="weui-list_item" :key="index" @click="toItem(item.DispatchService.ID)">
          <div class="icon">
            <img :src="item.UseType | ItemImageByUseType" alt="">
          </div>
          <div class="mid">
            <div class="title">{{item.Package.Name}}</div>
            <div class="describe text-overflow-1">{{item.Package.Description}}</div>
            <div class="price">{{item.DispatchService.Price ? (item.DispatchService.Price/100).toFixed(2) : '0.00'}}<span>元</span></div>
          </div>
        </div>
      </template>
      <xxOccupiedBox v-if="itemList.length === 0">
        {{addressCode ? '暂无服务' : '为获取到定位信息，请手动选择'}}
      </xxOccupiedBox>
      <xx-loadmore
        v-if="itemList.length > 0"
        :pageindex="pageIndex"
        :pageTotal="totalPage"
        :loadText="loadText"
        @onClick="loadmore(index)">
      </xx-loadmore>
    </div>
    <!-- 机构介绍 -->
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" hide-on-blur :dialog-style="{height: '75%', 'background-color': '#fff'}">
        <div class="tips-content">
          <div class="title">{{Agreement.Title}}</div>
          <div v-html="Agreement.Content"></div>
        </div>
          <div class="read-btn" @click="showHideOnBlur = false">我已阅读完毕</div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import ChinaAddressV4Data from '@/plugins/datas/ChinaAddressV4Data.json'
import { mapGetters } from 'vuex'
import { TransferDomDirective as TransferDom, XAddress } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XAddress
  },
  data () {
    return {
      totalPage: 1,
      pageIndex: 1,
      pageSize: 8,
      addressCode: '',
      addressText: '选择地区',
      addressData: ChinaAddressV4Data,
      citysCode: [],
      showHideOnBlur: false,
      itemList: [],
      Agreement: {},
      loadText: '查看更多'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userAccount'
    ])
  },
  watch: {
    citysCode (val) {
      this.addressCode = val[2]
      this.itemList = []
      this.getItemTemplate()
    }
  },
  created () {
    this.getShopAgreement()
  },
  mounted () {
    this.getGeolocation()
  },
  methods: {
    getGeolocation () {
      this.$vux.loading.show({
        text: '正在获取地址'
      })
      const that = this
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
          that.$vux.loading.hide()
          console.log(data)
          that.addressCode = data.addressComponent.adcode
          that.addressText = `${data.addressComponent.province} ${data.addressComponent.city} ${data.addressComponent.district}`
          that.getItemTemplate()
        }

        function onError (data) {
          that.$vux.loading.hide()
          console.log(data)
          that.$vux.toast.text('未获取到您的定位信息')
          // that.getItemTemplate()
        }
      })
    },
    transformAddress (val) {
      let name = ''
      ChinaAddressV4Data.map((item) => {
        if (item.value === val) {
          name = item.name
        }
      })
      return name
    },
    async getItemTemplate () {
      const res = await this.$http.get('/DispatchService/List', {
        index: this.pageIndex,
        size: this.pageSize,
        addressCode: this.addressCode
      })
      if (res.data.Code === 100000) {
        this.itemList.push(...res.data.Data.List)
        this.totalPage = Math.ceil(res.data.Data.Count / res.data.Data.PageSize)
        if (this.totalPage === this.pageIndex) {
          this.loadText = '没有更多'
        }
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async getShopAgreement () {
      const res = await this.$http.get(`/ShopAgreement?protocalType=20&itemID=0`)
      if (res.data.Code === 100000 && res.data.Data) {
        this.Agreement = res.data.Data
      }
    },
    loadmore (index) {
      this.pageIndex++
      this.loadText = '加载中...'
      this.getItemTemplate()
    },
    showDialog () {
      this.showHideOnBlur = true
    },
    toItem (id) {
      this.$router.push(`/organ/item/${id}`)
    },
    go (url) {
      if (url === 'comesoon') {
        this.$vux.toast.text('开发中')
        return false
      }
      this.$router.push(url)
    },
    close () {
      WeixinJSBridge.call('closeWindow')
    }
  }
}
</script>

<style scoped lang="less">
@import url(../../servant/components/index.less);
.weui-list_item .mid {
  .title {
    font-weight: normal;
    color: #333;
  }
  .price {
    font-size: 14px;
    color: #FF5F5F;
    span {
      font-size: 11px;
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
  margin: 12px 12px 0 12px;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    margin-bottom: 12px;
    padding: 10px 0;
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
  min-height: 300px;
  position: relative;
  background: #fff;
  padding: 15px;
}
.servant-panel_title {
  position: relative;
  padding: 0 0 10px;
  font-weight: normal;
  &::after {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #d9f7f5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
}
.empty-wrap {
  position: relative;
  height: 100%;
  background: url('../../../assets/images/bind-phone.png') no-repeat center;
  background-size: 118px 95px;
  background-position-y: 15px;
  text-align: center;
  .btn {
    display: inline-block;
    margin-top: 135px;
    width: 100px;
    height: 25px;
    height: 25px;
    border: 1px solid #3ecccc;
    box-sizing: border-box;
    border-radius: 15px;
    font-size: 15px;
    color: #3ecccc;
    font-weight: bold;
    text-align: center;
    background: #fff;
  }
}
.tips-content {
  padding: 10px;
  height: 100%;
  overflow: scroll;
}
.localtion_tool {
  display: flex;
  background: #fff;
  color: #999;
  font-size: 14px;
  .iconfont {
    margin-right: 5px;
    font-size: 14px;
    color: #3ecccc;
  }
}
</style>
<style lang="less">
.address-picker-dispatch {
  &.vux-cell-box:not(:first-child):before{
    border: 0;
  }
  .weui-cell_access {
    padding: 0;
  }
}
</style>
