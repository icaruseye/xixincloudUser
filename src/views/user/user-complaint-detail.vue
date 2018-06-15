<template>
  <div class="has-tabbar">
    <xx-step-bar step="2">
      <xx-step-items slot="items">
        用户资料
      </xx-step-items>
      <xx-step-items slot="items">
        服务者资料
      </xx-step-items>
      <xx-step-items slot="items">
        客服介入
      </xx-step-items>
      <xx-step-items slot="items">
        结果
      </xx-step-items>
    </xx-step-bar>
    <h2 class="cells_title">订单编号   201806031203</h2>
    <div class="cells">
      <div class="icon"><img src="@/assets/images/icon_picc.png" alt=""></div>
      <div class="mid">
        <div style="display:flex;justify-content: space-between;">
          <div class="title">院内陪诊</div>
          <div class="orderid">服务单号：201806031203</div>
        </div>
        <div class="describe">工作于急诊，擅长消化道危急重症…</div>
      </div>
    </div>
    <h2 class="cells_title">客服仲裁结果</h2>
    <div class="cells cells_result">
      <div class="title">服务者还未提交相关资料</div>
      <div><span>3天1个小时59分23秒</span>内还未提交， 该投诉服务单系统将自动判定投诉成功。</div>
    </div>
    <h2 class="cells_title">用户投诉内容 <span>用户提交时间 2018/06/03 15:30</span></h2>
    <div class="complaint_content">
      <div class="cell">
        <div class="label">投诉原因</div>
        <div class="right">医生专业操作不熟练</div>
      </div>
      <div class="cell">
        <div class="label">其他备注</div>
        <div class="right">医生专业操作不熟练，服务态度及其差，没有 在确认时间内到达地点就点击了确定到达。</div>
      </div>
      <div class="cell">
        <div class="label">相关图片</div>
        <div class="right">
          <img class="preview_img" v-for="(item, index) in relatedPicturesList" :src="item.src" :key="index" @click="relatedPicturesPreviewImage(index)" alt="">
        </div>
        <div v-transfer-dom>
          <previewer ref="relatedPicturesListPreviewer" :list="relatedPicturesList" :options="options"></previewer>
        </div>
      </div>
      <div class="cell">
        <div class="label"></div>
        <div class="right">
          <button class="cancel">取消投诉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer
  },
  data () {
    return {
      relatedPicturesList: [
        {
          src: 'https://img3.doubanio.com/icon/u53078059-35.jpg'
        },
        {
          src: 'https://img3.doubanio.com/icon/u53078059-35.jpg'
        },
        {
          src: 'https://img3.doubanio.com/icon/u53078059-35.jpg'
        }
      ]
    }
  },
  methods: {
    relatedPicturesPreviewImage (index) {
      this.$refs.relatedPicturesListPreviewer.show(index)
    }
  }
}
</script>

<style scoped lang="less">
.cells_title {
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  font-size: 15px;
  color: #999;
  font-weight: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 10px;
  }
}

.cells {
  padding: 15px 12px 20px 12px;
  background: #fff;
  display: flex;
  align-items: center;
  .icon {
    width: 29px;
    height: 29px;
  }
  .mid {
    flex: 1;
    margin-left: 16px;
    .title {
      font-size: #666;
      font-weight: bold;
    }
    .orderid {
      font-size: 12px;
      color: #999;
    }
    .describe {
      font-size: 12px;
      color: #999;
    }
  }
}

.cells_result {
  display: block;
  padding: 50px 42px;
  text-align: center;
  font-size: 12px;
  color: #999;
  span {
    color: #F8A519;
  }
  .title {
    font-size: 13px;
    color: #666;
    font-weight: bold;
  }
}

.complaint_content {
  overflow: hidden;
  background: #fff;
  padding: 50px 12px 0 12px;
  .cell {
    margin-bottom: 36px;
    display: flex;
    .label {
      min-width: 70px;
      text-align: left;
      font-size: 13px;
      color: #333
    }
    .right {
      flex: 1;
      font-size: 13px;
      color: #999;
      display: flex;
      .preview_img {
        margin-right: 10px;
        width: 65px;
        height: 65px;
      }
    }
  }
}

.cancel {
  width: 80px;
  height: 28px;
  line-height: 28px;
  color: #fff;
  background: #F8A519;
  text-align: center;
  font-size: 14px;
  border: 0;
  border-radius: 14px;
}
</style>