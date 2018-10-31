<template>
  <div class="wrapper">
    <div class="topic_list">
      <template v-for="(item, index) in topicList">
        <div class="item" :key="index">
          <div class="title">{{item.TestPaperName}}</div>
          <div class="btn" @click="toTopic(item.TestPaperID)">去做题</div>
        </div>
      </template>
    </div>
    <div v-if="topicList.length === 0" class="empty-box">暂无习题</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageIndex: 1,
      topicList: []
    }
  },
  mounted () {
    this.getShopProxyCourseTestPaperList()
    this.$store.commit('initCourseNums')
  },
  methods: {
    async getShopProxyCourseTestPaperList () {
      const res = await this.$http.get(`/ShopProxyCourseTestPaperList?page=${this.pageIndex}&proxyCourseID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.topicList = res.data.Data.shopProxyCourseTestPaper
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async getCouldExam () {
      const res = await this.$http.get(`/CouldExam?testPaperID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        return res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async toTopic (id) {
      const recordID = await this.getCouldExam()
      this.$router.push(`/servant/course/topic/${id}?recordID=${recordID}`)
    }
  }
}
</script>

<style lang="less" scoped>
.empty-box {
  background: #fff; 
}
.topic_list {
  background: #fff;
  padding: 0 12px;
  .item {
    display: flex;
    padding: 15px 0;
    align-items: center;
    border-bottom: 1px solid rgba(62, 204, 204, .1);
    .title {
      flex: 1;
      color: #666;
      font-size: 14px;
    }
    .btn {
      margin-left: 15px;
      font-size: 13px;
      color: #3ecccc;
    }
  }
}
</style>
