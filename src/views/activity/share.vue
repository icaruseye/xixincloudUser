<template>
  <div class="wrap">
    <div class="html-wrap" id="html-wrap">
      <div class="html-panel">
        <!-- <div class="poster">
          <img src="https://wx4.sinaimg.cn/mw690/0060fv5Fgy1fuollcy3t4j30ph0h715r.jpg" alt="">
        </div> -->
        <div class="title">
          <img class="icon" :src="Package.PackageType | ItemImageByUseType" alt="">
          <span>{{Package.Name}}</span>
        </div>
        <div class="describe">
          <div class="subtitle">
            <div class="left">服务介绍</div>
            <div class="right">已售：{{Package.SoldAmount}}份</div>
          </div>
          <div class="content">{{Package.Description}}</div>
        </div>
        <div>
          <img src="@/assets/images/share-dot.png" alt="">
        </div>
        <div class="servant-panel">
          <div class="avatar">
            <img :src="servantInfo.Avatar | transformImgUrl" alt="">
          </div>
          <div class="info">
            <div class="name">{{servantInfo.NickName}}</div>
            <!-- <div class="tag">实习医师</div> -->
          </div>
          <div class="qrcode">
            <img :src="`${API_PATH}/QrCodeWithPackageToUser?userID=${userID}&packageID=${packageID}`" alt="">
          </div>
        </div>
        <div class="tips-panel">
          <div class="row1"><span>长按识别二维码了解详情</span></div>
          <!-- <div class="row2">此二维码有效时间为8月1日~8月31日（有效期为30天）</div> -->
        </div>
      </div>
    </div>
    <div class="img-wrap">
      <img class="screenshot" :src="screenshot" alt="">
    </div>
  </div>
</template>

<script>
// import domtoimage from 'dom-to-image'
import html2canvas from 'html2canvas'
export default {
  data () {
    return {
      ItemTemplate: {},
      Package: {},
      servantInfo: {},
      screenshot: null
    }
  },
  computed: {
    API_PATH () {
      return process.env.API_PATH
    },
    userID () {
      return this.$route.query.userID
    },
    packageID () {
      return this.$route.query.packageID
    },
    servantID () {
      return this.$route.query.servantID
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    async initPage () {
      await this.getPackageInfo().then((res) => {
        this.ItemTemplate = res.ItemTemplate
        this.Package = res.Package
      })
      await this.getServantInfo().then((res) => {
        this.servantInfo = res.ServantAccount
      })
      this.$nextTick(() => {
        this.htmlToCanvas()
      })
    },
    // 获取服务套餐详情
    async getPackageInfo () {
      const res = await this.$http.get(`/PackageItem?packageID=${this.packageID}`)
      if (res.data.Code === 100000) {
        return res.data.Data
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    // 获取服务人员信息
    async getServantInfo () {
      const res = await this.$http.get(`/ServantFriendInfo?servantID=${this.servantID}`)
      if (res.data.Code === 100000) {
        return res.data.Data
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    // HTML页面转为图片
    htmlToCanvas () {
      const node = document.getElementById('html-wrap')
      const scale = 2
      const canvas = document.createElement('canvas')
      canvas.width = node.offsetWidth * scale
      canvas.height = node.offsetHeight * scale
      canvas.getContext("2d").scale(scale, scale)
      var opts = {
          scale: scale, // 添加的scale 参数
          canvas: canvas, //自定义 canvas
          // logging: true, //日志开关，便于查看html2canvas的内部执行流程
          width: node.offsetWidth, //dom 原始宽度
          height: node.offsetHeight,
          useCORS: true // 【重要】开启跨域配置
      };
      html2canvas(node, opts).then((canvas) => {
        var context = canvas.getContext('2d')
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false
        context.webkitImageSmoothingEnabled = false
        context.msImageSmoothingEnabled = false
        context.imageSmoothingEnabled = false
        this.screenshot = canvas.toDataURL('image/png')
      })
    }
  }
}
</script>

<style scoped lang="less">
.html-wrap {
  padding: 9px 12px;
}
.html-panel {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  // box-shadow: 0 6px 8px RGBA(204, 204, 204, 0.5);
  .poster {
    font-size: 0;
  }
  .title {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 23px 10px 7px 10px;
    &::after {
      content: " ";
      position: absolute;
      left: 10px;
      bottom: 0;
      right: 10px;
      height: 1px;
      border-bottom: 1px solid RGBA(216, 216, 216, .5);
      color: #D8D8D8;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    .icon {
      width: 29px;
      height: 29px;
    }
    span {
      font-size: 18px;
      color: #333;
    }
  }
  .describe {
    padding: 10px;
    .subtitle {
      padding: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        font-size: 18px;
        color: #666;
      }
      .right {
        font-size: 10px;
        color: #999;
      }
    }
    .content {
      font-size: 12px;
      color: #999;
    }
  }
  .servant-panel {
    display: flex;
    align-items: center;
    padding: 25px 15px;
    .avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .info {
      margin-left: 15px;
      flex: 1;
      .name {
        font-size: 18px;
        font-weight: bold;
        color: #666;
        margin-bottom: 10px;
      }
      .tag {
        font-size: 12px;
        color: #999;
      }
    }
    .qrcode {
      img {
        padding: 5px;
        width: 90px;
        height: 90px;
        border-radius: 4px;
        border: 1px solid #666;
      }
    }
  }
  .tips-panel {
    padding-bottom: 15px;
    text-align: center;
    color: #999;
    .row1 span {
      position: relative;
      font-size: 12px;
      &::after {
        content: "";
        position: absolute;
        left: -42px;
        top: 8px;
        height: 1px;
        width: 30px;
        background: #D8D8D8;
      }
      &::before {
        content: "";
        position: absolute;
        right: -42px;
        top: 8px;
        height: 1px;
        width: 30px;
        background: #D8D8D8;
      }
    }
    .row2 {
      font-size: 9px;
    }
  }
}
.img-wrap {
  padding: 9px 12px;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: 0;
}
</style>