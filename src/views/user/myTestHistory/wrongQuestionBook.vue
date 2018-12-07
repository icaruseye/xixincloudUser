<template>
  <div>
    <div v-if="currentQuestion">
      <QuestionContainer
        :question="currentQuestion"
      ></QuestionContainer>
    </div>
    <Popup title="答题卡" v-model="AnswerSheetsPopup.visible" position="bottom" max-height="70%">
      <sticky
        ref="sticky"
        :offset="0"
        :check-sticky-support="true">
        <!-- <PopupHeader>
        </PopupHeader> -->
        <div class="answerSheets_count_box">
          共 {{questionList.length}} 题，正确
          <span class="right_nums">{{rightNums}}</span>
          题，错误
          <span class="wrong_nums">{{wrongNums}}</span>
          题，未答 {{questionList.length - rightNums -wrongNums}} 题。
        </div>
      </sticky>
      <div class="answerSheets_container">
        <div class="answerSheets_items"
          v-for="(question, index) in questionList"
          :key="index"
          :class="[question.QuestionID === currentQuestion.QuestionID ? 'active_question_item':'']"
        >
          <span @click="goToQuestionByIndex(index)">
            {{index + 1}}、
            {{question.QuestionTitle | xxTextTruncateFilter(15)}}
          </span>
          <i class="right_answer_icon question_answer_result_icon iconfont icon-wsmp-gouxuan"></i>
          <i class="wrong_answer_icon question_answer_result_icon iconfont icon-cha1"></i>
          <span class="remove_btn">移除</span>
        </div>
      </div>
    </Popup>
  </div>
</template>
<script>
import { Popup, PopupHeader, Sticky } from 'vux'
import {
  QuestionContainer
} from './components'
export default {
  components: {
    Sticky,
    Popup,
    PopupHeader,
    QuestionContainer
  },
  data () {
    return {
      pageNumber: 1,
      pageSize: 1000,
      IsNeedAnswer: false,
      questionList: [],
      wrongNums: 0,
      rightNums: 0,
      currentQuestionIndex: 0,
      AnswerSheetsPopup: {
        visible: true
      }
    }
  },
  computed: {
    testPaperID () {
      return this.$route.params.testPaperID || ''
    },
    currentQuestion: {
      get () {
        return this.questionList[this.currentQuestionIndex] || null
      },
      set (val) {
        this.questionList[this.currentQuestionIndex] = val
      }
    }
  },
  methods: {
    async getList () {
      const result = await this.$http.get(`/WrongCollectionList`, {
        page: this.pageNumber,
        pageSize: this.pageSize,
        testPaperID: this.testPaperID
      })
      if (result.data.Code === 100000) {
        this.questionList = result.data.Data.wrongCollectionDetailsResponseList
        this.setAnswerList()
      } else {
        this.$message.error(result.Msg)
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
    goToQuestionByIndex (index) {
      this.currentQuestionIndex = index
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
.answerSheets_count_box
{
  padding: 10px 5px;
  background-color: #fff;
  border-bottom: 1px solid #f6f6f6;
  font-size: 12px;
  color: #999;
  .right_nums
  {
    color: #67c23a;
  }
  .wrong_nums
  {
    color: #f56c6c;
  }
}
.answerSheets_container
{
  padding: 20px 10px;
  background-color: #fff;
  .answerSheets_items
  {
    position: relative;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
    .remove_btn
    {
      position: absolute;
      right: 0;
      top: 50%;
      color: #f56c6c;
      transform: translateY(-50%)
    }
    .question_answer_result_icon
    {
      margin-left: 5px;
      color: #999;
      vertical-align: middle;
      &.right_answer_icon
      {
        color: #67c23a;
      }
      &.wrong_answer_icon
      {
        color: #f56c6c;
      }
    }
    &.active_question_item
    {
      color: #3ECCCC;
    }
  }
}
</style>
