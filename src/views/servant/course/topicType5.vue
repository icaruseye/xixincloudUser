<template>
  <div class="wrapper">
    <!-- 简答题 -->
    <div class="topic_item topic_item_jianda" v-if="data.TestPaperSubtitleName">
      <div class="topic_title"><span class="tag">{{data.TestPaperSubtitleName}}</span>{{index + 1}}.{{data.QuestionTitle}}</div>
      <div v-if="correctInner === ''">
        <textarea class="textarea" v-model.trim="answerInner"></textarea>
        <button class="submit" v-if="paperType" @click="submitAnswer">提交</button>
      </div>
      <div v-else>
        <textarea class="textarea" v-model="answerInner" disabled></textarea>
        <i v-if="answerInner === correctInner" class="iconfont icon-gouSolid-copy"></i>
        <i v-if="answerInner !== correctInner" class="iconfont icon-cha"></i>
      </div>
    </div>
    <!-- 答案解析 -->
    <div class="answer_wrap" v-if="correctInner !== ''">
      <div style="color:#3AC7F5">[正确答案] {{correctInner}}</div>
      <div>试题解析：</div>
      <div>{{data.AnswerRemark}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    paperType: {
      type: Boolean,
      default: false
    },
    index: Number
  },
  data () {
    return {
      answerList: JSON.parse(sessionStorage.getItem('userAnswerList')),
      answerInner: '',
      correctInner: ''
    }
  },
  watch: {
    index () {
      this.initData()
    },
    answerInner (val) {
      if (!this.paperType) {
        this.answerList[this.index].Answer = val
        sessionStorage.setItem('userAnswerList', JSON.stringify(this.answerList))
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    submitAnswer () {
      if (this.answerInner.length === 0) {
        this.$vux.toast.text('请完成题目后提交')
        return false
      }
      this.correctInner = this.data.StrRightKey
      this.answerList[this.index].Answer = this.answerInner
      sessionStorage.setItem('userAnswerList', JSON.stringify(this.answerList))

      if (this.answerInner !== this.data.IntRightKey) {
        this.$emit('setCourseWrongNums', this.data.QuestionID)
      } else {
        this.$emit('setCourseRightNums', this.data.QuestionID)
      }
    },
    initData () {
      this.answerInner = this.answerList[this.index].Answer !== '' ? this.answerList[this.index].Answer : ''
      this.correctInner = this.paperType && this.answerList[this.index].Answer !== '' ? this.data.StrRightKey : ''
    }
  }
}
</script>

<style lang="less" scoped>
.topic_item_jianda {
  .iconfont {
    position: absolute;
    bottom: 20px;
    right: 10px;
  }
}
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

.topic_item {
  position: relative;
  .textarea {
    margin-bottom: 15px;
    background: #fff;
    width: 100%;
    resize: none;
    border: 0;
    border-radius: 4px;
    height: 120px;
    padding: 10px 10px 25px 10px;
    color: #999;
    font-size: 13px;
  }
  .submit {
    position: absolute;
    right: 0;
    width: 70px;
    height: 25px;
    line-height: 25px;
    border-radius: 20px;
    font-size: 13px;
    text-align: center;
    color: #fff;
    background: #32C0F3;
    border: 0;
  }
}
.icon-gouSolid-copy {
  color: #32C0F3;
}
.icon-cha {
  color: #FF5F5F;
}
.answer_wrap {
  padding-left: 5px;
  color: #999;
  font-size: 14px;
}
</style>
