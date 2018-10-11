<template>
  <div class="wrapper">
    <div class="poster"></div>
    <div class="title_info">
      <div class="title"></div>
      <div>
        <span class="price">123</span>
        <span class="count">123报名</span>
      </div>
    </div>
    <div class="course_info">
      <div class="title">课程详情</div>
      <div class="content">听力教研组组长，10年教学经验，先后在多家企业任职。是真刀 实练出的真功夫，有非常丰富的教学经验。听力教研组组长， 10年教学经验，先后在多家企业任职。是真刀实练出的真功夫， 有非常丰富的教学经验。</div>
    </div>
    <xx-tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="25px" style="border-bottom: 1px solid #E9E9E9">
      <xx-tab-item :selected="tabIndex === 0" @on-item-click="tabItemClick" @click.native="to('course/list')">课程目录</xx-tab-item>
      <xx-tab-item :selected="tabIndex === 1" @on-item-click="tabItemClick" @click.native="to('course/question')">习题练习</xx-tab-item>
    </xx-tab>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabIndex: 0
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    tabItemClick (val) {
      this.tabIndex = val
    },
    to (url) {
      this.$router.replace(url)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
