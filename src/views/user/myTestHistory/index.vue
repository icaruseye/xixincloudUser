<template>
  <div>
    <xx-nav-bar
      left-text="返回"
      @click-left="$router.back()">
    </xx-nav-bar>
    <div class="wrong_question_enter_btn" @click="$PushUrl('/user/myTestHistory/wrongQuestionTestPaper')">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-cuotilianxi"></use>
      </svg>
      <span class="text">错题练习</span>
      <i class="iconfont icon-jiantouyou"></i>
    </div>
    <h3 class="title" v-if="testPaperRecordList.length > 0">全部已完成试卷</h3>
    <div class="list_container">
      <template v-if="testPaperRecordList.length > 0">
        <div class="list_items" v-for="(testPaperRecord, index) in testPaperRecordList" :key="index">
          <i class="iconfont icon-wancheng"></i>
          <h4 class="list_items_title">{{testPaperRecord.TestPaperName}}</h4>
          <p class="list_items_desc">
            {{testPaperRecord.EndTime | timeFormat}}</p>
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
  margin-top: 10px;
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
  }
}
</style>
