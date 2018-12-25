<template>
  <div class="wrapper">
    <div class="topbar">
      <div class="poster">
        <video
          class="poster_video"
          v-if="courseInfo.PreViewType == 1"
          :src="courseInfo.PreViewContent"
          controls="controls"
          playsinline
          webkit-playsinline
          x5-playsinline>
        </video>
        <img class="poster_img" v-if="courseInfo.PreViewType == 2 && courseInfo.Img" :src="courseInfo.Img" alt="">
        <img class="poster_img" v-if="courseInfo.PreViewType == 2 && !courseInfo.Img" src="../../../assets/images/course-default.png" alt="">
      </div>
      <div class="title_info">
        <div class="title">{{courseInfo.ShopProxyCourseName}}</div>
        <div>
          <span class="price">￥{{courseInfo.Price | price}}</span>
        </div>
      </div>
    </div>
    <div class="course_info">
      <div class="servant-panel_title"><i class="icon icon-2"></i>课程详情</div>
      <div class="content">{{courseInfo.Desctiption}}</div>
      <div class="imgs" v-if="courseInfo.Img">
        <img v-for="(item, index) in courseInfo.Img.split(',')" :key="index" :src="item | transformImgUrl" alt="">
      </div>
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
    <button type="button" class="weui-btn weui-btn-bottom weui-btn_primary" @click="getUserPreOrder" v-if="!IsPurchased">购买课程</button>
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
      courseInfo: {},
      IsPurchased: true,
      player: null
    }
  },
  filters: {
    setDefaultImg (val) {
      if (!val) {
        return require('@/assets/images/course-default.png')
      }
    },
    price (val = 0) {
      return (val / 100).toFixed(2)
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
    this.getLicenceCheck()
  },
  methods: {
    // 获取课程详情
    async getShopProxyCourseDetails () {
      this.$vux.loading.show({text: '加载中'})
      const res = await this.$http.get(`/ShopProxyCourseDetails?proxyCourseID=${this.proxyCourseID}`)
      this.$vux.loading.hide()
      if (res.data.Code === 100000) {
        this.courseInfo = res.data.Data
        // if (this.courseInfo.PreViewType === 1) {
        //   this.initPlayer(this.courseInfo.PreViewContent)
        // }
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 是否已购买过该课程
    async getLicenceCheck () {
      const res = await this.$http.get(`/Course/Licence/Check?shopProxyCourseID=${this.proxyCourseID}`)
      if (res.data.Code === 100000) {
        this.IsPurchased = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 校验是否可以播放视频
    async getCouldWatchingVideo (lessonID) {
      const res = await this.$http.get(`/CouldWatchingVideo?lessonID=${lessonID}&proxyCourseID=${this.proxyCourseID}`)
      if (res.data.Code === 100000) {
        this.courseInfo.PreViewContent = res.data.Data
        this.courseInfo.PreViewType = 1
        // if (this.courseInfo.PreViewType !== 1) {
        //   this.courseInfo.PreViewType = 1
        //   this.initPlayer(res.data.Data)
        // }
        // this.player.loadByUrl(res.data.Data)
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async getUserPreOrder () {
      // 生成预支付订单
      const res = await this.$http.post(`/UserOrder/PreOrder?packageID=${this.proxyCourseID}&orderType=6&servantViewID=${this.servantViewID}&refereeType=${this.refereeType}&refereeViewID=${this.refereeViewID}`)
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
      this.player = new Aliplayer({
        'id': 'aliyunPlayer',
        'height': '200px',
        'source': source,
        'autoplay': false,
        'isLive': false,
        'rePlay': false,
        'playsinline': true,
        'preload': true,
        'controlBarVisibility': 'hover',
        'useH5Prism': true
      })
    },
    // 播放课程视频
    playLesson (lessonID) {
      this.getCouldWatchingVideo(lessonID)
    },
    // 切换tab页
    tabItemClick (val) {
      this.tabIndex = val
      this.$store.commit('SET_COURSE_TAB', val)
    },
    to (url) {
      this.$router.replace(url)
    }
  }
}
</script>

<style lang="less" scoped>
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
  padding-bottom: 55px;
  padding-top: 270px;
  .topbar {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .poster_img {
    width: 100%;
    height: 200px;
  }
  .poster_video {
    width: 100%;
    height: 200px;
    background: #000;
  }
  .poster {
    font-size: 0;
    overflow: hidden;
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
    .imgs {
      padding: 12px;
      text-align: center;
      img {
        margin-bottom: 10px;
        width: 90%;
      }
    }
  }
}
</style>
