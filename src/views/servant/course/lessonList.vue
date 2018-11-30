<template>
  <div>
    <div class="step_wrapper">
      <div class="step_items">
        <template v-for="(item, index) in courseList">
          <div class="step_item" :key="index" v-if="item.lessonResponse.length > 0">
            <div class="step_item_title">{{item.ChapterName}}</div>
            <i class="step__circle"></i>
            <div class="step__line"></div>
            <div class="step_item_content">
              <template v-for="(subItem, subIndex) in item.lessonResponse">
                <div class="sub_item" :class="index === selectIndex[0] && subIndex === selectIndex[1] ? 'active':''" :key="subIndex" @click="playLesson(subItem.LessonID, subIndex, index)" v-if="subItem.LessonID">
                  <div class="sub_item_title">
                    <span class="name">{{subItem.LessonName}}</span>
                    <span class="tag">录播</span>
                    <i class="iconfont icon-xiaji1"></i>
                  </div>
                  <div class="sub_item_time">{{subItem.VideoMinute}}分钟</div>
                  <i class="step__subcircle"></i>
                  <div class="step__subline"></div>
                </div>
              </template>
              <div class="sub_item" v-if="item.lessonResponse.length === 0">
                <div class="sub_item_title">暂无小节内容</div>
                <i class="step__subcircle"></i>
                <div class="step__subline"></div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-if="courseList.length === 0" class="empty-box">暂无章节列表</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectIndex: [null, null],
      pageIndex: 0,
      courseList: []
    }
  },
  computed: {
    proxyCourseID () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getShopProxyCourseLessonList()
  },
  methods: {
    // 获取章节列表
    async getShopProxyCourseLessonList () {
      const res = await this.$http.get(`/ShopProxyCourseLessonList?page=${this.pageIndex}&proxyCourseID=${this.proxyCourseID}`)
      if (res.data.Code === 100000) {
        this.courseList = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    playLesson (LessonID, subIndex, index) {
      this.selectIndex = [index, subIndex]
      this.$emit('on-lesson-click', LessonID)
    }
  }
}
</script>

<style lang="less" scoped>
.empty-box {
  background: #fff;
}
.step_wrapper {
  background: #fff;
  padding: 20px 15px 20px 50px;
  .step_item {
    position: relative;
    font-size: 15px;
    color: #666;
    padding-bottom: 20px;
    &:last-child {
      padding-bottom: 0;
    }
    .step_item_title {
      padding: 5px 0;
      color: #333
    }
    .step_item_content {
      transition: height .3s ease-in-out;
      .sub_item {
        position: relative;
        padding-top: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid RGBA(233, 233, 233, .3);
        &:first-child {
          padding-top: 0
        }
        &.active {
          color: #32C0F3;
        }
        .sub_item_title {
          display: flex;
          align-items: center;
          position: relative;
          .tag {
            display: block;
            height: 11px;
            line-height: 11px;
            margin-left: 5px;
            padding: 1px 2px;
            font-size: 10px;
            color: #F8A519;
            border: 1px solid #F8A519;
            border-radius: 2px;
          }
          .iconfont {
            position: absolute;
            right: 0;
            top: -1px;
            font-size: 18px;
            color: #32C0F3;
          }
        }
        .step__subline {
          position: absolute;
          top: 0;
          left: -30px;
          width: 1px;
          height: 100%;
          background-color: RGBA(237, 237, 238, .5);
        }
        .step__subcircle {
          position: absolute;
          top: 30px;
          left: -32px;
          z-index: 2;
          display: block;
          width: 5px;
          height: 5px;
          background-color: RGBA(216, 216, 216, .3);
          border-radius: 50%;
        }
        &:first-child {
          .step__subcircle {
            top: 10px;
          }
        }
      }
      .sub_item_time {
        font-size: 12px;
        color: #999;
      }
    }
    .iconfont {
      margin-left: 10px;
      font-size: 12px;
      color: #ccc;
    }
    .step__line {
      position: absolute;
      top: 0;
      left: -30px;
      width: 1px;
      height: 100%;
      background-color: RGBA(237, 237, 238, .5);
    }
    &:last-child {
      .step__line {
        background: #fff;
      }
      &::before {
        content: '';
        position: absolute;
        width: 1px;
        height: 15px;
        background-color: #EDEDEE;
        top: 0;
        left: -30px;
        z-index: 1;
      }
      .sub_item {
        &:last-child {
          .step__subline {
            background: #fff;
          }
        }
        &:last-child::before {
          content: '';
          position: absolute;
          width: 1px;
          height: 30px;
          background-color: RGBA(237, 237, 238, .5);
          top: 0px;
          left: -30px;
          z-index: 1;
        }
        &:first-child::before {
          content: '';
          position: absolute;
          width: 1px;
          height: 10px;
          background-color: RGBA(237, 237, 238, .5);
          top: -10px;
          left: -30px;
          z-index: 1;
        }
      }
    }
    &:first-child::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 15px;
      background-color: #fff;
      top: 0;
      left: -30px;
      z-index: 1;
    }
    .step__circle {
      position: absolute;
      top: 15px;
      left: -34px;
      z-index: 2;
      display: block;
      width: 3px;
      height: 3px;
      background-color: #D8D8D8;
      border: 3px solid #F1F1F1;
      border-radius: 50%;
    }
  }
}
</style>
