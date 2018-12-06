<template>
  <div>
    <div class="wrong_question_enter_btn">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-cuotilianxi"></use>
      </svg>
      <span class="text">错题练习</span>
      <i class="iconfont icon-jiantouyou"></i>
    </div>
    <h3 class="title">全部已完成试卷</h3>
    <div class="list_container">
      <div class="list_items" v-for="(testPaperRecord, index) in testPaperRecordList" :key="index">
        {{testPaperRecord.TestPaperName}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      testPaperRecordList: []
    }
  },
  methods: {
    async getList () {
      const res = await this.$http.get('/TestPaperRecordList', {
        page: 1,
        pageSize: 10
      })
      if (res.data.Code === 100000) {
        this.testPaperRecordList = res.data.Data.testPaperRecordList
      }
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
.wrong_question_enter_btn
{
  position: relative;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  background-color: #fff;
  .icon
  {
    font-size: 24px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .text
  {
    font-size: 16px;
    vertical-align: middle;
    color: #333;
  }
  .iconfont
  {
    position: absolute;
    right: 20px;
    top: 0;
    font-size: 18px;
    color: #999;
    &::before
    {
      vertical-align: middle
    }
  }
}
.title
{
  font-size: 14px;
  color: #666;
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
  margin-top: 20px;
  font-weight: normal;
}
.list_container
{
  background-color: #fff;
  margin: 5px;
  padding: 0 5px;
  .list_items
  {
    height: 60px;
    border-bottom: 1px solid #f6f6f6;
  }
}
</style>
