<template>
  <div>
    <div class="servant-panel servant-panel_service">
      <div class="servant-panel_title"><i class="icon icon-2"></i>医生课程</div>
      <div class="servant-panel_subtitle">单项课程</div>
      <div class="servant-panel_list">
        <template v-for="(item, index) in CourseList">
          <div class="item" :key="index" @click="to(`/servant/course/${item.ShopProxyCourseID}`)">
            <div class="poster">
              <img v-if="item.Img" :src="item.Img | transformImgUrl" alt="">
              <img v-else src="../../../assets/images/course-default.png" alt="">
              <span class="status">{{item.StudyType | CourseType}}</span>
            </div>
            <div class="right">
              <div class="name text-overflow-1">{{item.ShopProxyCourseName}}</div>
              <!-- <div class="tags">
                <span>内分泌科 | 明天 20：00</span>
              </div>
              <div>
                <rater v-model="rater" active-color="#32C0F3" :font-size="14" disabled></rater>
                <span class="teacher">主讲：123</span>
              </div> -->
              <div>
                <span class="price">￥{{item.Price}}</span>
                <!-- <span class="count">123人报名</span> -->
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- <div class="servant-panel" style="margin-top:10px;">
      <div class="servant-panel_subtitle">套餐课程</div>
      <div class="servant-panel_list">
      </div>
    </div> -->
  </div>
</template>

<script>
import { Rater } from 'vux'
export default {
  components: {
    Rater
  },
  filters: {
    CourseType (val) {
      switch (val) {
        case 1:
          return '网授课'
        case 2:
          return '面授课'
        case 3:
          return '直播课'
        default:
          return '网授课'
      }
    }
  },
  data () {
    return {
      pageIndex: 1,
      CourseList: []
    }
  },
  computed: {
    servantViewID () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getServantCourseList()
  },
  methods: {
    async getServantCourseList () {
      const res = await this.$http.get(`/ServantCourseList?servantViewID=b9f71c5e482246ab98fe7803235eb670&page=${this.pageIndex}`)
      if (res.data.Code === 100000) {
        console.log(res.data.Data)
        this.CourseList = res.data.Data.CourseInfoResponseList
      }
    },
    to (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../components/index.less);

.servant-panel {
  background: #fff;
  padding: 10px;
}
.servant-panel_list {
  .item {
    padding: 11px 0;
    display: flex;
    .poster {
      position: relative;
      margin-right: 10px;
      width: 140px;
      height: 90px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      .status {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 5px;
        background: rgba(0, 0, 0, .3);
        font-size: 10px;
        color: #fff;
      }
      .status.active {
        background: #FF6D06;
      }
    }
    .right {
      flex: 1;
      .name {
        font-size: 14px;
        color: #333;
      }
      .tags {
        font-size: 10px;
        color: #A3A4A4;
      }
      .rater {
        font-size: 12px;
      }
      .teacher {
        font-size: 10px;
        color: #32C0F3;
      }
      .price {
        color: #FF4E4E;
        font-size: 12px;
      }
      .count {
        font-size: 10px;
        color: #9B9B9B;
      }
    }
  }
}
</style>
