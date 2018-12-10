<template>
  <div>
    <div class="list_container">
      <template v-if="testPaperList.length > 0">
        <div class="list_items" v-for="(testPaper, index) in testPaperList" :key="index">
          <i class="iconfont icon-wancheng"></i>
          <h4 class="list_items_title">{{testPaper.Name | xxTextTruncateFilter(18)}}</h4>
          <p class="list_items_desc">
            {{testPaper.Description || '没有描述'}}
          </p>
          <router-link class="btn" :to="`/user/myTestHistory/wrongQuestionTestPaper/${testPaper.ID}/book`">再次练习</router-link>
        </div>
      </template>
      <xxOccupiedBox v-else>
        暂无已完成的试卷
      </xxOccupiedBox>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pageNumber: 1,
      pageSize: 10,
      testPaperList: []
    }
  },
  methods: {
    init () {
      this.getList()
    },
    async getList () {
      const result = await this.$http.get(`/HaveWrongTestPaperList`, {
        page: this.pageNumber,
        pageSize: this.pageSize
      })
      if (result.data.Code === 100000) {
        this.testPaperList = result.data.Data.testPaperResponseList
      } else {
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="less" scoped>

.list_container
{
  background-color: #fff;
  margin: 5px;
  padding: 0 5px;
  .list_items
  {
    position: relative;
    height: 60px;
    padding-left: 40px;
    border-bottom: 1px solid #f6f6f6;
    .iconfont
    {
      position: absolute;
      left: 10px;
      height: 60px;
      line-height: 60px;
    }
    .list_items_title
    {
      padding-top: 10px;
      height: 25px;
      line-height: 25px;
      font-size: 14px;
      color: #333;
      font-weight: normal;
    }
    .list_items_desc
    {
      font-size: 12px;
      color: #999;
    }
    .btn
    {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
      color: #3ECCCC;
    }
  }
}
</style>

