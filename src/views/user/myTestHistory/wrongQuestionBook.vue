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
        <div class="answerSheets_count_box">
          共 {{questionList.length}} 题，正确
          <span class="right_nums">{{countNums.rightNums}}</span>
          题，错误
          <span class="wrong_nums">{{countNums.wrongNums}}</span>
          题，未答 {{questionList.length - countNums.rightNums - countNums.wrongNums}} 题。
        </div>
      </sticky>
      <div class="answerSheets_container">
        <div class="answerSheets_items"
          v-for="(question, index) in questionList"
          :key="index"
          :class="[question.id === currentQuestion.id ? 'active_question_item':'']"
        >
          <span @click="goToQuestionByIndex(index)">
            {{index + 1}}、
            {{question.title | xxTextTruncateFilter(15)}}
          </span>
          <template v-if="question.IsRight != null && question.showResult">
            <i v-if="question.IsRight" class="right_answer_icon question_answer_result_icon iconfont icon-wsmp-gouxuan"></i>
            <i v-else class="wrong_answer_icon question_answer_result_icon iconfont icon-cha1"></i>
          </template>
          <span class="remove_btn" @click="deleteQuestionConfirm(question.id, index)">移除</span>
        </div>
      </div>
    </Popup>
    <div class="bottom_oper_bar" >
      <div class="center_btn" @click="AnswerSheetsPopup.visible = true">
        <div>
          <i class="iconfont icon-dui">{{countNums.rightNums}}</i>
          <i class="iconfont icon-cuo">{{countNums.wrongNums}}</i>
        </div>
        <i class="iconfont icon-caidan"></i>
        <span class="pageNumber_box">
          {{currentQuestionIndex + 1}}/{{questionList.length}}
        </span>
      </div>
      <div class="pre_next_btn" @click="goPreIndex" :class="[currentQuestionIndex <= 0 ? 'disable' : '']">
        <i class="iconfont icon-sanjiao-left"></i>
        <span>上一题</span>
      </div>
      <div class="pre_next_btn" @click="goNextIndex" :class="[currentQuestionIndex >= (questionList.length - 1) ? 'disable' : '']">
        <span>下一题</span>
        <i class="iconfont icon-sanjiao-right"></i>
      </div>
    </div>
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
      currentQuestionIndex: 0,
      AnswerSheetsPopup: {
        visible: false
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
    },
    countNums () {
      let wrongNums = 0
      let rightNums = 0
      for (let i = 0; i < this.questionList.length; i++) {
        if (this.questionList[i].IsRight != null) {
          if (this.questionList[i].IsRight) {
            rightNums += 1
          } else {
            wrongNums += 1
          }
        }
      }
      return {
        wrongNums: wrongNums,
        rightNums: rightNums
      }
    }
  },
  methods: {
    deleteQuestionConfirm (questionID, index) {
      const that = this
      that.$vux.confirm.show({
        content: '确定要删除吗？',
        onConfirm () {
          that.deleteQuestion(questionID, index)
        }
      })
    },
    async deleteQuestion (questionID, index) {
      const result = await this.$http.put(`/DelWrongCollection?testPaperID=${this.testPaperID}&questionID=${questionID}`)
      if (result.data.Code === 100000) {
        this.questionList.splice(index, 1)
        this.$vux.toast.text('移除成功')
      } else {
      }
    },
    goPreIndex () {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex -= 1
      }
    },
    goNextIndex () {
      if (this.currentQuestionIndex < (this.questionList.length - 1)) {
        this.currentQuestionIndex += 1
      }
    },
    async getList () {
      const result = await this.$http.get(`/WrongCollectionList`, {
        page: this.pageNumber,
        pageSize: this.pageSize,
        testPaperID: this.testPaperID
      })
      if (result.data.Code === 100000) {
        this.questionList = this.resolveQuestionList(result.data.Data.wrongCollectionDetailsResponseList)
      } else {
      }
    },
    resolveQuestionList (questions) {
      return questions.map(item => {
        return {
          id: item.QuestionID,
          title: item.QuestionTitle,
          answerStr: item.QuestionContent,
          rightIntAnswer: item.RightIntAnswer,
          rightStrAnswer: item.RightStrAnswer,
          type: item.QuestionType,
          answerRemark: item.AnswerRemark,
          myIntAnswer: null,
          myStrAnswer: null,
          showResult: false,
          IsRight: null
        }
      })
    },
    goToQuestionByIndex (index) {
      this.currentQuestionIndex = index
      this.AnswerSheetsPopup.visible = false
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
.bottom_oper_bar
{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  display: flex;
  flex-flow: nowrap;
  background-color: #fff;
  .pre_next_btn
  {
    flex: 0 0 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    .iconfont
    {
      font-size: 14px;
      vertical-align: middle;
    }
    span
    {
      vertical-align: middle;
      font-size: 12px;
    }
    &.disable
    {
      color: #ddd;
    }
  }
  .center_btn
  {
    display: flex;
    align-items: center;
    justify-content: left;
    flex: 1;
    padding: 0 10px;
    .icon-dui
    {
      color: #67c23a;
      margin-right: 10px;
    }
    .icon-cuo
    {
      color: #f56c6c;
      margin-right: 10px;
    }
    .icon-caidan
    {
      color: #999;
      font-size: 20px;
    }
    .pageNumber_box
    {
      margin-left: 10px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
