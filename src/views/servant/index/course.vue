<template>
  <div>
    <div class="servant-panel servant-panel_service">
      <div class="servant-panel_title"><i class="icon icon-2"></i>课程</div>
      <div class="servant-panel_subtitle">单项课程</div>
      <div class="servant-panel_list" v-if="CourseList.length > 0">
        <template v-for="(item, index) in CourseList">
          <div class="item" :key="index" @click="to(`/servant/course/${item.ServantShopProxyCourseID}?servantViewID=${$route.params.id}`)">
            <div class="poster">
              <img v-if="item.Img" :src="item.Img | transformImgUrl" alt="" @error="loadDefaultImage(index)">
              <img v-else src="../../../assets/images/course-default.png" alt="">
              <span class="status">{{item.StudyType | CourseType}}</span>
            </div>
            <div class="right">
              <div class="name text-overflow-1">{{item.ShopProxyCourseName}}</div>
              <div>
                <span class="price">￥{{item.Price | price}}</span>
              </div>
            </div>
          </div>
        </template>
        <xx-loadmore
          v-if="totalPage > 1"
          :pageindex="pageIndex"
          :pageTotal="totalPage"
          :loadText="loadText"
          @onClick="loadmore">
        </xx-loadmore>
      </div>
      <div v-else class="empty-box">暂无课程</div>
    </div>
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
    },
    price (val = 0) {
      return (val / 100).toFixed(2)
    }
  },
  props: {
    ViewID: String
  },
  data () {
    return {
      pageSize: 8,
      totalPage: 1,
      pageIndex: 1,
      loadText: '加载更多',
      CourseList: []
    }
  },
  mounted () {
    this.getServantCourseList()
  },
  methods: {
    async getServantCourseList () {
      const res = await this.$http.get(`/ServantCourseList?servantViewID=${this.ViewID}&page=${this.pageIndex}`)
      this.loadText = '加载更多'
      if (res.data.Code === 100000) {
        this.CourseList.push(...res.data.Data.CourseInfoResponseList)
        this.totalPage = Math.ceil(res.data.Data.CourseInfoResponseList / this.pageSize)
      }
    },
    to (url) {
      this.$store.commit('SET_COURSE_TAB', 0)
      this.$router.push(url)
    },
    loadDefaultImage (index) {
      this.CourseList[index].Img = ''
    },
    loadmore () {
      this.pageIndex++
      this.loadText = '加载中...'
      this.getServantCourseList()
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
