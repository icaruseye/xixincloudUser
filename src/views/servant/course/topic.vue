<template>
  <div class="wrapper">
    <xx-tab v-model="tabIndex" active-color="#32C0F3" custom-bar-width="25px">
      <xx-tab-item :selected="tabIndex === 1" @on-item-click="tabItemClick">习题练习</xx-tab-item>
    </xx-tab>
    <div class="topic_wrap" v-if="questionList.length > 0">
      <!-- 单选题 -->
      <topic-type1
        v-if="questionList[answerIndex].QuestionType === 1"
        :index="answerIndex"
        :paperType="IsNeedAnswer"
        :data="questionList[answerIndex]"
        @setCourseWrongNums="setCourseWrongNums"
        @setCourseRightNums="rightNums++">
      </topic-type1>
      <!-- 填空题 -->
      <topic-type2
        v-if="questionList[answerIndex].QuestionType === 2"
        :index="answerIndex"
        :paperType="IsNeedAnswer"
        :data="questionList[answerIndex]"
        @setCourseWrongNums="setCourseWrongNums"
        @setCourseRightNums="rightNums++">
      </topic-type2>
      <!-- 判断题 -->
      <topic-type1
        v-if="questionList[answerIndex].QuestionType === 3"
        :index="answerIndex"
        :paperType="IsNeedAnswer"
        :data="questionList[answerIndex]"
        @setCourseWrongNums="setCourseWrongNums"
        @setCourseRightNums="rightNums++">
      </topic-type1>
      <!-- 多选题 -->
      <topic-type4
        v-if="questionList[answerIndex].QuestionType === 4"
        :index="answerIndex"
        :paperType="IsNeedAnswer"
        :data="questionList[answerIndex]"
        @setCourseWrongNums="setCourseWrongNums"
        @setCourseRightNums="rightNums++">
      </topic-type4>
      <!-- 简答题 -->
      <topic-type5
        v-if="questionList[answerIndex].QuestionType === 5"
        :index="answerIndex"
        :paperType="IsNeedAnswer"
        :data="questionList[answerIndex]"
        @setCourseWrongNums="setCourseWrongNums"
        @setCourseRightNums="rightNums++">
      </topic-type5>
    </div>
    <!-- 底部统计栏 -->
    <div class="topic_tools">
      <div class="item" v-if="IsNeedAnswer">
        <i class="iconfont icon-dui"></i>
        <div style="color:#32C0F3">{{rightNums}}</div>
      </div>
      <div class="item" v-if="IsNeedAnswer">
        <i class="iconfont icon-cuo"></i>
        <span style="color:#FF4E4E">{{wrongNums}}</span>
      </div>
      <div class="item" @click="showCard = true">
        <i class="iconfont icon-caidan"></i>
      </div>
      <div class="item" @click="checkPaper">
        <span style="color:#32C0F3">提交试卷</span>
      </div>
      <div class="item" style="flex:1;justify-content: flex-end;">
        <span class="btn" @click="prevQuestion">
          <i class="iconfont icon-sanjiao-left" :style="{ color: answerIndex === 0 ? '#ccc' : '#3AC7F5'}"></i>
        </span>
        <span class="btn" @click="nextQuestion" style="margin-left:10px">
          <i class="iconfont icon-sanjiao-right" :style="{ color: answerIndex === questionList.length -1 ? '#ccc' : '#3AC7F5'}"></i>
        </span>
      </div>
    </div>
    <!-- 答题卡 -->
    <div v-transfer-dom>
      <popup
        v-model="showCard"
        :should-rerender-on-show="true">
        <div>
          <card @onClick="cardClick" :paperType="IsNeedAnswer"></card>
        </div>
      </popup>
    </div>
    <!-- 完成答题 -->
    <div v-transfer-dom>
      <popup
        v-model="isOver"
        :should-rerender-on-show="true">
        <div class="res_wrap">
          <div class="icon_box">
            <i class="iconfont icon-finish"></i>
            <p v-if="IsNeedAnswer">已完成所有练习题目</p>
            <p v-else>已完成所有题目</p>
          </div>
          <button class="submit_paper" @click="submitPaper">{{IsNeedAnswer ? '返回试卷列表' : '提交试卷'}}</button>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { Checker, CheckerItem, TransferDomDirective as TransferDom, Popup } from 'vux'
import card from './card'
import topicType1 from './topicType1'
import topicType2 from './topicType2'
import topicType4 from './topicType4'
import topicType5 from './topicType5'
export default {
  directives: {
    TransferDom
  },
  components: {
    Checker,
    CheckerItem,
    Popup,
    card,
    topicType1,
    topicType2,
    topicType4,
    topicType5
  },
  data () {
    return {
      tabIndex: 1,
      isOver: false, // 完成所有题目
      showCard: false, // 显示答题卡
      answerIndex: 0, // 当前显示题目索引,
      IsNeedAnswer: false,
      wrongNums: this.$store.getters.courseWrongNums,
      rightNums: this.$store.getters.courseRightNums,
      questionList: []
    }
  },
  computed: {
    recordID () {
      return +this.$route.query.recordID
    }
  },
  watch: {
    wrongNums () {
      this.$store.commit('setCourseWrongNums', true)
    },
    rightNums () {
      this.$store.commit('setCourseRightNums', true)
    },
    courseWrongNums (val) {
      this.wrongNums = val
    },
    courseRightNums (val) {
      this.rightNums = val
    }
  },
  mounted () {
    this.getTestPaperQuestionList()
  },
  methods: {
    setCourseWrongNums (QuestionID) {
      this.wrongNums++
      this.AddWrongCollection(QuestionID)
    },
    async AddWrongCollection (QuestionID) {
      const result = await this.$http.post(`/AddWrongCollection`, {
        TestPaperID: this.$route.params.id,
        QuestionID: QuestionID
      })
      if (result.Code === 100000) {
      } else {
        this.$message.error(result.Msg)
      }
    },
    async getTestPaperQuestionList () {
      const res = await this.$http.get(`/TestPaperQuestionList?testPaperID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.questionList = res.data.Data.TestPaperQuestionDetailsList
        this.IsNeedAnswer = res.data.Data.IsNeedAnswer
        this.setAnswerList()
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async postPaper () {
      const that = this
      let answerList = JSON.parse(sessionStorage.getItem('userAnswerList'))
      for (let item of answerList) {
        item.Answer = item.Answer + ''
        item.TestPaperSubtitleQuestionID = item.UserTestPaperAnswerParam
      }
      const res = await this.$http.post(`/SubmitTestPaper?recordID=${this.recordID}`, answerList)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: '提交成功',
          onHide () {
            that.$router.back()
          }
        })
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    setAnswerList () {
      let arr = []
      for (let index = 0; index < this.questionList.length; index++) {
        arr.push(Object.assign({
          Answer: [2, 4, 5].indexOf(this.questionList[index].QuestionType) === -1 ? -1 : '',
          correct: [2, 4, 5].indexOf(this.questionList[index].QuestionType) === -1 ? this.questionList[index].IntRightKey : this.questionList[index].StrRightKey,
          UserTestPaperAnswerParam: this.questionList[index].TestPaperSubtitleQuestionID,
          index: index,
          type: this.questionList[index].QuestionType
        }))
      }
      sessionStorage.setItem('userAnswerList', JSON.stringify(arr))
    },
    isFinishedAllQuestions () {
      let answerList = JSON.parse(sessionStorage.getItem('userAnswerList'))
      let flag = true
      for (let item of answerList) {
        if (item.Answer === '' && [2, 4, 5].includes(item.type)) {
          flag = false
          return false
        }
        if (item.Answer === -1 && ![2, 4, 5].includes(item.type)) {
          flag = false
          return false
        }
      }
      return flag
    },
    checkPaper () {
      if (this.isFinishedAllQuestions()) {
        this.isOver = true
      } else {
        this.$vux.toast.text('还有未完成题目')
      }
    },
    submitPaper () {
      if (this.IsNeedAnswer) {
        this.$router.back()
      } else {
        this.postPaper()
      }
    },
    cardClick (index) {
      this.answerIndex = index
      this.showCard = false
    },
    nextQuestion () {
      if (this.answerIndex !== this.questionList.length - 1) {
        this.answerIndex++
      }
    },
    prevQuestion () {
      if (this.answerIndex !== 0) {
        this.answerIndex--
      }
    },
    tabItemClick (val) {
      this.tabIndex = val
    }
  }
}
</script>

<style lang="less" scoped>
.topic_wrap {
  padding: 25px 14px 70px 14px;
  .topic_title {
    font-size: 15px;
    color: #666;
    margin-bottom: 20px;
  }
}
.topic_tools {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  font-size: 12px;
  padding: 16px 20px 16px 0;
  background: #fff;
  color: #666;
  .item {
    margin: 0 0 0 20px;
    display: flex;
    align-items: center;
    .btn {
      font-size: 12px;
      .iconfont {
        color: #3AC7F5;
      }
      // margin-left: 12px;
      // padding: 0 4px;
      // border-radius: 2px;
      // border: 1px solid RGBA(151, 151, 151, .4);
    }
  }
  .iconfont {
    position: relative;
    top: 1px;
    margin-right: 5px;
    color: #ccc;
    font-size: 20px;
  }
}
.res_wrap {
  background: #f6f6f6;
  .icon_box {
    background: #fff;
    padding: 30px 0;
    text-align: center;
    .iconfont {
      font-size: 60px;
      color: #32C0F3;
    }
    p {
      font-size: 14px;
      color: #999;
    }
  }
  .submit_paper {
    margin-top: 10px;
    width: 100%;
    border: 0;
    background: #fff;
    color: #32C0F3;
    font-size: 16px;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
}
</style>
