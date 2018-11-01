<template>
  <div class="wrapper">
    <div class="poster">
      <div id='aliyunPlayer'></div>
      <img v-if="courseInfo.PreViewType !== 1 && courseInfo.Img" :src="courseInfo.Img" alt="">
      <img v-if="courseInfo.PreViewType !== 1 && !courseInfo.Img" src="../../../assets/images/course-default.png" alt="">
    </div>
    <div class="title_info">
      <div class="title">{{courseInfo.ShopProxyCourseName}}</div>
      <div>
        <span class="price">￥{{courseInfo.Price}}</span>
        <!-- <span class="count">123报名</span> -->
      </div>
    </div>
    <!-- <div class="servant_info">
      <div class="servant-panel_title"><i class="icon icon-2"></i>老师介绍</div>
      <div class="info">
        <img class="avatar" src="https://tva1.sinaimg.cn/crop.0.0.179.179.180/771d5a55gw1emwpljaw12j2050050t8o.jpg" alt="">
        <div class="range">
          <div class="name">层张仲景 - </div>
          <div class="text">好评度：98%</div>
          <div class="text">已上课：30节</div>
        </div>
      </div>
      <div class="desc">
         听力教研组组长，10年教学经验，先后在多家企业任职。是 真刀实练出的真功夫，有非常丰富的教学经验。听力教研组组长， 10年教学经验，先后在多家企业任职。是真刀实练出的真功夫， 有非常丰富的教学经验。
      </div>
    </div> -->
    <div class="course_info">
      <div class="servant-panel_title"><i class="icon icon-2"></i>课程详情</div>
      <div class="content">{{courseInfo.Desctiption}}</div>
    </div>
    <xx-tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="30px" style="border-bottom: 1px solid #E9E9E9;margin-top:10px;">
      <xx-tab-item :selected="tabIndex === 0" @on-item-click="tabItemClick">课程目录</xx-tab-item>
      <xx-tab-item :selected="tabIndex === 1" @on-item-click="tabItemClick">习题练习</xx-tab-item>
    </xx-tab>
    <!-- 课程列表 -->
    <div v-if="tabIndex === 0">
      <lesson-list @on-lesson-click="playLesson"></lesson-list>
    </div>
    <!-- 习题列表 -->
    <div v-if="tabIndex === 1">
      <topic-list></topic-list>
    </div>
    <button type="button" class="weui-btn weui-btn-bottom weui-btn_primary" @click="getUserPreOrder">购买课程</button>
  </div>
</template>

<script>
import lessonList from './lessonList.vue'
import topicList from './topicList.vue'
export default {
  components: {
    lessonList,
    topicList
  },
  data () {
    return {
      tabIndex: this.$store.getters.courseTabIndex,
      pageIndex: 1,
      courseInfo: {}
    }
  },
  filters: {
    setDefaultImg (val) {
      if (!val) {
        return require('@/assets/images/course-default.png')
      }
    }
  },
  watch: {
    courseTabIndex (val) {
      this.tabIndex = val
    }
  },
  computed: {
    proxyCourseID () {
      return this.$route.params.id
    },
    servantViewID () {
      return this.$route.query.servantViewID
    }
  },
  mounted () {
    this.getShopProxyCourseDetails()
  },
  methods: {
    // 获取课程详情
    async getShopProxyCourseDetails () {
      const res = await this.$http.get(`/ShopProxyCourseDetails?proxyCourseID=${this.proxyCourseID}`)
      if (res.data.Code === 100000) {
        console.log(res.data.Data)
        this.courseInfo = res.data.Data
        if (this.courseInfo.PreViewType === 1) {
          this.initPlayer(this.courseInfo.PreViewContent)
        }
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 校验是否可以播放视频
    async getCouldWatchingVideo (lessonID) {
      const res = await this.$http.get(`/CouldWatchingVideo?lessonID=${lessonID}`)
      if (res.data.Code === 100000) {
        this.initPlayer(res.data.Data)
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async getUserPreOrder () {
      // 生成预支付订单
      const res = await this.$http.post(`/UserOrder/PreOrder?packageID=${this.proxyCourseID}&orderType=2&servantViewID=${this.servantViewID}&refereeType=${this.refereeType}&refereeViewID=${this.refereeViewID}`)
      if (res.data.Code === 100000) {
        if (res.data.Data.RedirectState === 0) {
          this.$router.push(`/servant/pay/${this.proxyCourseID}?OrderID=${res.data.Data.OrderID}`)
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
    },
    // 初始化视频插件
    initPlayer (source) {
      new Aliplayer({
        id: 'aliyunPlayer',
        source: source,
        autoplay: false,
        playsinline: true,
        useH5Prism: true,
        x5_type: 'h5'
      }, function (player) {
        console.log('播放器创建好了。')
      })
    },
    // 播放课程视频
    playLesson (lessonID) {
      this.getCouldWatchingVideo(lessonID)
    },
    // 切换tab页
    tabItemClick (val) {
      this.tabIndex = val
      this.$store.commit('courseTabIndex', val)
    },
    to (url) {
      this.$router.replace(url)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  padding-bottom: 55px;
}
.servant-panel_title {
  padding: 0 6px;
  font-size: 16px;
  color: #333;
  font-weight: bold;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.servant-panel_title .icon {
  margin-right: 5px;
  display: block;
  width: 15px;
  height: 15px;
  background-size: cover;
}
.wrapper {
  .poster {
    font-size: 0;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title_info {
    padding: 10px 17px;
    background: #fff;
    border-bottom: 1px solid #F2F4F5;
    .title {
      font-size: 15px;
      color: #4A4A4A;
    }
    .price {
      color: #FF4E4E;
      font-size: 15px;
    }
    .count {
      color: #9B9B9B;
      font-size: 12px;
    }
  }
  .servant_info {
    background: #fff;
    padding: 10px 20px;
    .info {
      display: flex;
      padding: 15px 0;
      .avatar {
        margin-right: 15px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .range {
        flex: 1;
        .name {
          font-size: 15px;
          color: #4A4A4A;
        }
        .text {
          font-size: 12px;
          color: #666;
        }
      }
    }
    .desc {
      font-size: 12px;
      color: #4A4A4A;
    }
  }
  .course_info {
    padding: 10px 0;
    margin-top: 10px;
    background: #fff;
    .servant-panel_title {
      padding-bottom: 10px;
      border-bottom: 1px solid #F2F4F5;
    }
    .content {
      padding: 15px;
      font-size: 12px;
      color: #4A4A4A;
    }
  }
}
</style>
