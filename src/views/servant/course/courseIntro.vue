<template>
  <div class="course_info">
    <!-- <div class="servant-panel_title"><i class="icon icon-2"></i>课程详情</div> -->
    <div class="content">{{courseInfo.Desctiption}}</div>
    <div class="imgs" v-if="courseInfo.DescriptionImg">
      <img v-for="(item, index) in courseInfo.DescriptionImg.split(',')" :key="index" :src="item | transformImgUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    courseInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
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
</style>
