<template>
  <div class="wrapper">
    <div class="topbar">
      <div class="poster">
        <!-- 视频 -->
        <video
          class="poster_video"
          v-if="courseInfo.PreViewType == 1"
          :src="courseInfo.PreViewContent"
          controls="controls"
          playsinline
          webkit-playsinline
          controlslist="nodownload"
          autoplay
          x5-playsinline>
        </video>
        <!-- 封面图 -->
        <div class="preview_img_wrap" v-if="courseInfo.PreViewType == 2">
          <img v-if="courseInfo.PreViewContent" class="poster_img" :src="courseInfo.PreViewContent | transformImgUrl" alt="" @error="loadDefaultImage">
          <img v-if="!courseInfo.PreViewContent" class="poster_img" src="@/assets/images/course-default.png" alt="">
          <img class='coverimg' src='@/assets/images/play-video.png' @click="playFirstLesson">
        </div>
        <!-- 音频 -->
        <div class="preview_img_wrap" v-if="courseInfo.PreViewType == 3">
          <audio class="poster_audio" :src="audioUrl" controls autoplay="autoplay"></audio>
          <img v-if="courseInfo.PreViewContent" class="poster_img" :src="courseInfo.PreViewContent | transformImgUrl" alt="" @error="loadDefaultImage">
          <img v-if="!courseInfo.PreViewContent" class="poster_img" src="@/assets/images/course-default.png" alt="">
        </div>
      </div>
      <div class="title_info">
        <div class="title">{{courseInfo.ShopProxyCourseName}}</div>
        <div>
          <span class="price">￥{{courseInfo.Price | price}}</span>
        </div>
      </div>
      <div style="height:10px;background:#f6f6f6;"></div>
      <xx-tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="30px" style="border-bottom: 1px solid #E9E9E9;">
        <xx-tab-item :selected="tabIndex === 0" @on-item-click="tabItemClick">详情</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 1" @on-item-click="tabItemClick">课程目录</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 2" @on-item-click="tabItemClick">习题练习</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 3" @on-item-click="tabItemClick">课件</xx-tab-item>
      </xx-tab>
    </div>
    <!--课程详情 -->
    <div v-if="tabIndex === 0">
      <courseIntro :courseInfo="courseInfo"></courseIntro>
    </div>
    <!-- 课程列表 -->
    <div v-if="tabIndex === 1">
      <lesson-list @on-lesson-click="playLesson" :currentIndex="currentIndex"></lesson-list>
    </div>
    <!-- 习题列表 -->
    <div v-if="tabIndex === 2">
      <topic-list></topic-list>
    </div>
    <!-- 课件列表 -->
    <div v-if="tabIndex === 3">
      <coursewareList></coursewareList>
    </div>
    <button type="button" class="weui-btn weui-btn-bottom weui-btn_primary" @click="getUserPreOrder" v-if="!IsPurchased">购买课程</button>
  </div>
</template>

<script>
import lessonList from './lessonList.vue'
import topicList from './topicList.vue'
import coursewareList from './coursewareList.vue'
import courseIntro from './courseIntro.vue'
import util from '@/plugins/util'
export default {
  components: {
    lessonList,
    topicList,
    coursewareList,
    courseIntro
  },
  data () {
    return {
      tabIndex: this.$store.getters.courseTabIndex,
      pageIndex: 1,
      courseInfo: {},
      lessonList: [],
      IsPurchased: true,
      player: null,
      audioUrl: null,
      currentIndex: null
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
    },
    lessonID () {
      return this.$route.query.lessonID
    },
    ContentType () {
      return this.$route.query.ContentType
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    transformImgUrl: util.transformImgUrl,
    init () {
      this.getShopProxyCourseDetails()
      this.getLicenceCheck()
      this.getShopProxyCourseLessonList()
      if (this.lessonID) {
        this.playLesson({
          LessonID: this.lessonID,
          ContentType: this.ContentType
        })
      }
    },
    // 获取章节列表
    async getShopProxyCourseLessonList () {
      const res = await this.$http.get(`/ShopProxyCourseLessonList?page=0&proxyCourseID=${this.proxyCourseID}&Type=1`)
      if (res.data.Code === 100000) {
        this.lessonList = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 获取课程详情
    async getShopProxyCourseDetails () {
      this.$vux.loading.show({text: '加载中'})
      const res = await this.$http.get(`/ShopProxyCourseDetails?proxyCourseID=${this.proxyCourseID}&Type=1`)
      this.$vux.loading.hide()
      if (res.data.Code === 100000) {
        this.courseInfo = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 是否已购买过该课程
    async getLicenceCheck () {
      const res = await this.$http.get(`/Course/Licence/Check?shopProxyCourseID=${this.proxyCourseID}&Type=1`)
      if (res.data.Code === 100000) {
        this.IsPurchased = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 校验是否可以播放视频
    async getCouldWatchingVideo (lessonID) {
      this.courseInfo.PreViewContent = ''
      const res = await this.$http.get(`/CouldWatchingVideo?lessonID=${lessonID}&proxyCourseID=${this.proxyCourseID}&Type=1`)
      if (res.data.Code === 100000) {
        this.courseInfo.PreViewContent = res.data.Data
        this.courseInfo.PreViewType = 1
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 校验是否可以播放音频
    async getCouldWatchingAudio (lessonID) {
      const res = await this.$http.get(`/CouldWatchingVideo?lessonID=${lessonID}&proxyCourseID=${this.proxyCourseID}&Type=1`)
      if (res.data.Code === 100000) {
        this.audioUrl = res.data.Data
        this.courseInfo.PreViewType = 3
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async getUserPreOrder () {
      // 生成预支付订单
      const res = await this.$http.post(`/UserOrder/PreOrder?packageID=${this.proxyCourseID}&orderType=6&servantViewID=${this.servantViewID}&refereeType=${this.refereeType}&refereeViewID=${this.refereeViewID}`)
      if (res.data.Code === 100000) {
        if (res.data.Data.RedirectState === 0) {
          this.$router.push(`/servant/pay/${this.proxyCourseID}?OrderID=${res.data.Data.OrderID}&orderType=6`)
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
    // 播放第一个章节
    playFirstLesson () {
      if (this.lessonList.length > 0) {
        if (this.lessonList[0].lessonResponse.length >0) {
          const detail = this.lessonList[0].lessonResponse[0]
          if (detail.ContentType === 1) {
            this.playLesson({
              LessonID: detail.LessonID,
              ContentType: 1,
            })
          }
          if (detail.ContentType === 2) {
            this.$router.push(`/servant/course/courseware/${this.proxyCourseID}/${detail.Content}?type=2`)
          }
          if (detail.ContentType === 3) {
            this.playLesson({
              LessonID: detail.LessonID,
              ContentType: 3,
            })
          }
          if (detail.ContentType === 4) {
            this.$router.push(`/servant/course/topic/${detail.Content}?recordID=${detail.Content}`)
          }
          this.tabItemClick(1)
          this.currentIndex = detail.LessonID
        }
      } else {
        this.$vux.toast.text('章节暂无内容')
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
    // 选择当前章节内容
    playLesson (data) {
      let { LessonID, ContentType } = data
      // 视频
      if (+ContentType === 1) {
        this.getCouldWatchingVideo(LessonID)
      }
      // 课件
      if (+ContentType === 2) {
        this.$router.push(`/servant/course/courseware/${this.proxyCourseID}/${LessonID}?type=2`)
      }
      // 音频
      if (+ContentType === 3) {
        this.getCouldWatchingAudio(LessonID)
      }
      //习题
      if (+ContentType === 4) {
        this.$router.push(`/servant/course/topic/${LessonID}?recordID=${LessonID}`)
      }
    },
    // 切换tab页
    tabItemClick (val) {
      this.tabIndex = val
      this.$store.commit('SET_COURSE_TAB', val)
    },
    to (url) {
      this.$router.replace(url)
    },
    loadDefaultImage () {
      this.courseInfo.Img = ''
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
  padding-top: 340px;
  .topbar {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #f6f6f6;
  }
  .preview_img_wrap {
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 200px;
    .coverimg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 75px;
      height: 75px;
    }
    .poster_audio {
      z-index: 99;
      position: absolute;
      bottom: 10px;
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .poster_img {
    width: 100%;
    height: 200px;
    background: #fff;
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
    margin-top: 10px;
    padding: 10px 17px;
    background: #fff;
    border-bottom: 1px solid #F2F4F5;
    border-top: 1px solid #F2F4F5;
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
}
</style>
