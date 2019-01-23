<template>
  <div class="courseware_detail_contianer">
    <xxLoading v-if="loading" text="正在获取课件资源"></xxLoading>
    <template v-else>
      <div class="show_menu_btn" @click="menusDialog.visible = true">
        <i class="iconfont icon-mulu"></i>
        <div class="img_pagination">
          {{currentIndex +1}}/{{imgList.length}}
        </div>
      </div>
      <x-dialog
        v-model="menusDialog.visible"
        hide-on-blur
      >
        <div class="menu_main_container">
          <div v-for="(img, index) in imgList" :key="index" class="menu_index_btn_box">
            <span class="menu_index_btn" @click="clickImgIndex(index)">
              {{index + 1}}
            </span>
          </div>
        </div>
      </x-dialog>
      <swiper :options="swiperOption" @slideChange="swiperRefChange" ref="swiperRef">
        <swiperSlide v-for="(demo, index) in imgList" :key="index">
          <div class="swiper_items_container">
            <img class="swiper-lazy course_img" :data-src="transformImgUrl(demo.RemotePath)" alt="">
            <div class="swiper-lazy-preloader"></div>
          </div>
        </swiperSlide>
      </swiper>
    </template>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import util from '@/plugins/util'
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {},
  data () {
    return {
      loading: false,
      menusDialog: {
        visible: false
      },
      imgList: [],
      currentIndex: 0,
      swiperOption: {
        centeredSlides: true,
        lazy: {
          loadPrevNext: true
        }
      }
    }
  },
  watch: {},
  computed: {
    courseID () {
      return this.$route.params.courseID
    },
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    transformImgUrl: util.transformImgUrl,
    clickImgIndex (index) {
      this.$refs['swiperRef'].swiper.slideTo(index)
      this.menusDialog.visible = false
    },
    swiperRefChange () {
      let index = this.$refs['swiperRef'].swiper.activeIndex
      this.currentIndex = index
    },
    async getCoursewareDetail () {
      this.loading = true
      const result = await this.$http.get(`/CourseEnclosure/CouldWatchEnclosure`, {
        courseEnclosureID: this.id,
        proxyCourseID: this.courseID
      })
      this.loading = false
      if (result.data.Code === 100000) {
        this.imgList = JSON.parse(result.data.Data)
      } else {
        this.$vux.toast.text(result.data.Msg)
      }
    }
  },
  created () {
    this.getCoursewareDetail()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.courseware_detail_contianer
{
  position: relative;
  .show_menu_btn
  {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 2;
    .icon-mulu
    {
      display: block;
      font-size: 36px;
      color: rgba(62, 204, 204, .7);
    }
    .img_pagination
    {
      position: absolute;
      top: 100%;
      font-size: 12px;
      text-align: center;
      width: 100%;
      color: #999;
    }
  }
}
.swiper_items_container
{
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  .course_img
  {
    width: 100%;
  }
}
.menu_main_container
{
  display: flex;
  flex-flow: wrap;
  padding: 20px;
  .menu_index_btn_box
  {
    padding: 10px;
    .menu_index_btn
    {
      display: block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid #999;
      color: #999;
      border-radius: 50%;
      &.active
      {
        border-color: rgb(62, 204, 204);
        color: rgb(62, 204, 204);
      }
    }
  }
}
</style>
