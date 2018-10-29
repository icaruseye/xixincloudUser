<template>
  <div class="wrapper">
    <div class="topic_list">
      <template v-for="(item, index) in topicList">
        <div class="item" :key="index">
          <div class="title">{{}}</div>
          <div class="btn">去做题</div>
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
  },
  methods: {
    async getShopProxyCourseTestPaperList () {
      const res = await this.$http.get(`/ShopProxyCourseTestPaperList?page=${this.pageIndex}&proxyCourseID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.topicList = res.data.Data.shopProxyCourseTestPaper
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
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
    }
    .btn {
      font-size: 13px;
      color: #3ecccc;
    }
  }
}
</style>
