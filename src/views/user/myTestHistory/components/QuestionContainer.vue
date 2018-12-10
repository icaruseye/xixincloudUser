<template>
  <div class="question_contianer">
    <div class="topic_title">
      <span class="tag" v-if="questionType">{{questionType}}</span>
      {{question.QuestionTitle | formatTitle}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    question: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    questionTitle () {
      if (this.question.QuestionType === 2) {
         return this.FormatQuestionTitle(this.question.QuestionTitle)
      } else {
        return this.question.QuestionTitle
      }
    },
    questionType () {
      switch (this.question.QuestionType) {
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
    FormatQuestionTitle (title) {
      let list = title.split(/\(\)|（）/g)
      let str = ''
      for (let i = 0; i < list.length; i++) {
        if (i > 0) {
          str += `（${i}）`
        }
        str += list[i]
      }
      return str
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
</style>
