<template>
  <div class="wrapper">
    <div class="poster">
      <img src="https://wx4.sinaimg.cn/mw690/771d5a55ly1fwc980axlyj21jk0r8dko.jpg" alt="">
    </div>
    <div class="title_info">
      <div class="title">糖尿病病人能吃土豆吗？</div>
      <div>
        <span class="price">￥1123</span>
        <span class="count">123报名</span>
      </div>
    </div>
    <div class="servant_info">
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
    </div>
    <div class="course_info">
      <div class="servant-panel_title"><i class="icon icon-2"></i>课程详情</div>
      <div class="content">听力教研组组长，10年教学经验，先后在多家企业任职。是真刀 实练出的真功夫，有非常丰富的教学经验。听力教研组组长， 10年教学经验，先后在多家企业任职。是真刀实练出的真功夫， 有非常丰富的教学经验。</div>
    </div>
    <xx-tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="25px" style="border-bottom: 1px solid #E9E9E9;margin-top:10px;">
      <xx-tab-item :selected="tabIndex === 0" @on-item-click="tabItemClick" @click.native="to('course/list')">课程目录</xx-tab-item>
      <xx-tab-item :selected="tabIndex === 1" @on-item-click="tabItemClick" @click.native="to('course/question')">习题练习</xx-tab-item>
    </xx-tab>
    <div v-if="tabIndex === 0">
      <step></step>
    </div>
  </div>
</template>

<script>
import step from './step.vue'
export default {
  components: {
    step
  },
  data () {
    return {
      tabIndex: 0,
      activeNames: ['1']
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
