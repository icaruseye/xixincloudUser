<template>
  <div class="">
    <div class="imgs_box" :style="{backgroundImage: `url(${imgList[currentIndex]})`}">
      <div class="imgs_box_bg_blur" :style="{backgroundImage: `url(${imgList[currentIndex]})`}"></div>
      <div class="imgs_box_bg_color"></div>
      <swiper :options="swiperOption" @slideChange="change" ref="swiperRef">
        <swiperSlide v-for="(demo, index) in imgList" :key="index">
          <div class="imgCard" :style="{backgroundImage: `url(${demo})`}" @click="showDialog = true"></div>
        </swiperSlide>
      </swiper>
    </div>
    <div v-if="showDialog" class="dialog_contianer" @click="showDialog = false">
      <swiper :options="dialogSwiperOption" @slideChange="change" ref="dialogSwiperRef">
        <swiperSlide v-for="(demo, index) in imgList" :key="index">
          <div class="dialog_swiper_items">
            <img :src="demo" alt="">
          </div>
        </swiperSlide>
      </swiper>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {},
  data () {
    return {
      showDialog: false,
      imgList: [
        'http://192.168.2.100/pngs/slide1.png',
        'http://192.168.2.100/pngs/slide2.png',
        'http://192.168.2.100/pngs/slide3.png',
        'http://192.168.2.100/pngs/slide4.png',
        'http://192.168.2.100/pngs/slide5.png',
        'http://192.168.2.100/pngs/slide6.png',
        'http://192.168.2.100/pngs/slide7.png',
        'http://192.168.2.100/pngs/slide8.png'
      ],
      currentIndex: 0,
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
        lazyLoading: true
      },
      dialogSwiperOption: {}
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
    change () {
      let index = this.$refs['swiperRef'].swiper.activeIndex
      this.currentIndex = index
    },
    async getCoursewareDetail () {
      const result = await this.$http.get(`/CourseEnclosure/CouldWatchEnclosure`, {
        courseEnclosureID: this.id,
        proxyCourseID: this.courseID
      })
      if (result.data.Code === 100000) {
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
.imgs_box{
  position: relative;
  padding: 20px 0;
  background-position: top;
  background-size: 100% 100%;
  overflow: hidden;
  .imgs_box_bg_color,
  .imgs_box_bg_blur
  {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
  .imgs_box_bg_blur
  {
    filter: blur(20px);
    opacity: .9;
    background-position: top;
    background-size: 100% 100%;
  }
  &::after
  {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    display: block;
    border-width: 0 10px 10px 10px;
    border-style: solid;
    border-color: transparent transparent #f6f6f6 transparent
  }
  .imgCard
  {
    height: 130px;
    width: 80px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
.dialog_contianer
{
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: rgba(0,0,0,.5);
  .dialog_swiper_items
  {
    position: relative;
    height: 100%;
    width: 100%;
    text-align: center;
    padding-top: 20px;
    img
    {
      width: 90%;
      border-radius: 10px;
    }
  }
}
</style>
