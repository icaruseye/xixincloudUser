<template>
  <div class="wrapper">
    <div v-if="info.ActivityName" class="container">
      <div class="activityDetail_info">
        <div class="title">{{info.ActivityName}}</div>
        <!-- <div class="count">99人已购买</div> -->
      </div>
      <div class="activityDetail_intro">
        <div class="title">活动介绍</div>
        <div class="section">
          {{info.ActivityDescribe}}
        </div>
        <div>
          <img class="section_img" v-for="item in info.ActivityIntroductionImg.split(',')" :key="item" :src="item | transformImgUrl">
        </div>
      </div>
      <div class="activityDetail_goods">
        <div class="item">
          <img class="icon" :src="info.PackageType | ItemImageByUseType">
          <div class="content">
            <div class="name">{{info.CommodityName}}</div>
            <div class="price">￥{{info.PresentPrice}}元</div>
          </div>
        </div>
      </div>
      <div class="tips">
        <p>报名成功后，活动详情页提示:</p>
        <p>1.恭喜您，已成功报名该活动</p>
        <p v-if="info.CommodityType === 1">2.课程活动：请从导航栏的“课程”栏目，查看已成功购买的课程进行学习</p>
        <p v-if="info.CommodityType === 2">2.服务活动：请从导航栏的“服务”栏目，查看已成功购买的服务进行预约</p>
      </div>
      <div class="activityDetail_apply" v-if="verification === 'true'">
        <button class="btn" @click="toPay">{{info.CommodityType === 1 ? '报名' : '购买'}}}</button>
      </div>
    </div>
    <!-- 验证手机号 -->
    <verifyPhone v-model="dialogVisivble"></verifyPhone>
  </div>
</template>

<script>
import verifyPhone from './components/verifyPhone'
export default {
  components: {
    verifyPhone
  },
  data () {
    return {
      dialogVisivble: false,
      info: {}
    }
  },
  computed: {
    activityId () {
      return this.$route.params.id
    },
    verification () {
      return this.$route.query.verification
    }
  },
  mounted () {
    if (this.verification === 'true') {
      this.dialogVisivble = true
    }
    this.getActivityDetail()
  },
  methods: {
    async getActivityDetail () {
      const res = await this.$http.get(`/Activity-Detail?activityId=${this.activityId}`)
      if (res.data.Code === 100000) {
        this.info = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async toPay () {
      // 生成预支付订单
      const res = await this.$http.post(`/UserOrder/PreOrder?packageID=${this.activityId}&orderType=4&servantViewID=&refereeType=${this.refereeType}&refereeViewID=${this.refereeViewID}`)
      if (res.data.Code === 100000) {
        if (res.data.Data.RedirectState === 0) {
          this.$router.push(`/servant/pay/${this.activityId}?OrderID=${res.data.Data.OrderID}`)
        } else {
          window.location.href = res.data.Data.RedirectUrl
        }
      } else {
        this.$vux.toast.show({
          type: 'cancel',
          text: res.data.Msg,
          time: 800
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  padding-bottom: 70px;
  background: #fff;
  min-height: 100vh;
}

.activityDetail_info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 12px 12px 12px;
  border-bottom: 1px solid #E9E9E9;
}


.activityDetail_info .title {
  font-size: 15px;
  color: #4A4A4A;
}

.activityDetail_info .count {
  font-size: 12px;
  color: #9B9B9B;
}

.activityDetail_intro {
  padding: 0 12px;
}

.activityDetail_intro .title {
  font-size: 15px;
  color: #4A4A4A;
  font-weight: bold;
  margin-top: 8px;
}

.activityDetail_intro .section {
  font-size: 14px;
  color: #999;
  line-height: 24px;
  margin-top: 8px;
}

.activityDetail_intro .section_image {
  margin-top: 12px;
  width: 100%;
  border-radius: 4px;
}

.activityDetail_goods {
  margin-top: 20px;
  padding: 0 12px;
}

.activityDetail_goods .item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 0;
}

.activityDetail_goods .item:last-child {
  margin-bottom: 0;
}

.activityDetail_goods .item .icon {
  margin-right: 10px;
  width: 29px;
  height: 29px;
  border-radius: 4rpx;
}

.activityDetail_goods .item .content {
  flex: 1;
}

.activityDetail_goods .item .content .name {
  font-size: 15px;
  color: #666;
  font-weight: bold;
}


.activityDetail_goods .item .content .price {
  font-size: 15px;
  color: #FF5F5F;
}

.activityDetail_apply {
  position: fixed;
  bottom: 0;
  left: 12px;
  right: 12px;
  padding: 12px 0;
  background: #fff;
}

.activityDetail_apply .btn {
  display: block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border-radius: 4px;
  background: #3ECCCC;
  border: 0;
}


.activityDetail_apply .btn.finish {
  background: RGBA(153, 153, 153, .5);
}

.activityDetail_apply .btn.notStarted {
  background: RGBA(62, 204, 204, .5);
}

.item_popup_title {
  padding: 12px;
  font-size: 13px;
  color: #333;
  font-weight: bold;
}

.item_popup_content {
  padding: 0 12px 40px;
  font-size: 12px;
  color: #666;
}

.tips {
  padding: 12px;
  p {
    font-size: 12px;
    color: #999;
    line-height: 2;
  }
}
</style>
