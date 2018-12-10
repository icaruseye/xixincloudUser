<template>
  <div class="question_contianer">
    <div class="topic_title">
      <span class="tag" v-if="questionType">{{questionType}}</span>
      {{questionTitle}}
    </div>
    <div>
      <!-- 单选 或 判断题 -->
      <SingleChoice
        ref="questionItemRef"
        v-if="question.type === 1 || question.type === 3"
        v-model="question.myIntAnswer"
        :answerStr="question.answerStr"
        :RightAnswerIndex="question.rightIntAnswer"
        :showResult="question.showResult"
      ></SingleChoice>
      <!-- 填空题 -->
      <CompletionAnswer
        ref="questionItemRef"
        v-if="question.type === 2"
        v-model="question.myStrAnswer"
        :RightAnswerStr="question.rightStrAnswer"
        :showResult="question.showResult"
      ></CompletionAnswer>
      <!-- 多选题 -->
      <MultipleChoice
        ref="questionItemRef"
        v-if="question.type === 4"
        v-model="question.myStrAnswer"
        :answerStr="question.answerStr"
        :RightAnswerIndexStr="question.rightStrAnswer"
        :showResult="question.showResult"
      ></MultipleChoice>
      <!-- 简答题 -->
      <CorrectAnswer
        ref="questionItemRef"
        v-if="question.type === 5"
        v-model="question.myStrAnswer"
        :RightAnswerStr="question.rightStrAnswer"
        :showResult="question.showResult"
      ></CorrectAnswer>
      <button class="submit_button" v-if="!question.showResult && (question.myIntAnswer != null || question.myStrAnswer != null)" @click="clickShowResult(question)">确定</button>
      <!-- 答案解析 -->
      <div class="answer_wrap" v-if="question.showResult && (question.myIntAnswer != null || question.myStrAnswer != null)">
        <div>
          <div style="color:#3AC7F5">
            正确答案：
          </div>
          <template v-if="question.type === 1 || question.type === 3">
            {{question.rightIntAnswer | numberToAlp}}
          </template>
          <template v-if="question.type === 2">
            {{question.rightStrAnswer | CompletionAnswerFromat}}
          </template>
          <template v-if="question.type === 4">
            {{question.rightStrAnswer | strAnswerNumberToAlp}}
          </template>
          <template v-if="question.type === 5">
            {{question.rightStrAnswer}}
          </template>
        </div>
        <div style="color:#3AC7F5;margin-top:10px">试题解析：</div>
        <div>{{question.answerRemark || '暂无答案解析'}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import SingleChoice from './SingleChoice'
import MultipleChoice from './MultipleChoice'
import CompletionAnswer from './CompletionAnswer'
import CorrectAnswer from './CorrectAnswer'
import util from '@/plugins/util'
const decollator = '><'
export default {
  components: {
    SingleChoice,
    MultipleChoice,
    CompletionAnswer,
    CorrectAnswer
  },
  props: {
    question: {
      type: Object,
      default: () => {}
    }
  },
  filters: {
    numberToAlp (val) {
      return util.NumToLetter(val)
    },
    strAnswerNumberToAlp (val) {
      let list = val.split(',').map(Number)
      if (list.length > 0) {
        list = list.map(item => {
          return util.NumToLetter(item)
        })
      }
      return list.join('，')
    },
    CompletionAnswerFromat (val) {
      let list = val.split(decollator)
      let str = ''
      for (let i = 0; i < list.length; i++) {
        str += `${i + 1}：${list[i].split('#').join('、')}；`
      }
      return str
    }
  },
  data () {
    return {
    }
  },
  computed: {
    questionTitle () {
      if (this.question.type === 2) {
        return this.FormatQuestionTitle(this.question.title)
      } else {
        return this.question.title
      }
    },
    questionType () {
      switch (this.question.type) {
        case 1:
          return '单选题'
        case 2:
          return '填空题'
        case 3:
          return '判断题'
        case 4:
          return '多选题'
        case 5:
          return '简答题'
        default:
          return null
      }
    }
  },
  methods: {
    clickShowResult (question) {
      question.showResult = true
      question.IsRight = this.$refs['questionItemRef'].theAnswerIsRight()
    },
    FormatQuestionTitle (title) {
      let list = this.completionAnswerSplitList(title)
      let str = ''
      for (let i = 0; i < list.length; i++) {
        if (i > 0) {
          str += `（${i}）`
        }
        str += list[i]
      }
      return str
    },
    completionAnswerSplitList (title) {
      let list = title.split(/\(\)|（）/g)
      return list
    }
  }
}
</script>
<style lang="less" scoped>
.question_contianer
{
  padding: 10px;
  .topic_title {
    font-size: 15px;
    color: #666;
    margin-bottom: 20px;
    .tag {
      margin-right: 5px;
      background: #32C0F3;
      border-radius: 10px 0 10px 0;
      color: #fff;
      font-size: 12px;
      padding: 2px 5px;
    }
  }
}
.answer_wrap {
  padding-left: 20px;
  color: #999;
  font-size: 14px;
}
.submit_button {
  margin-top: 10px;
  background: #3AC7F5;
  color: #fff;
  font-size: 14px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  border: 0;
  width: 100%;
}
</style>
