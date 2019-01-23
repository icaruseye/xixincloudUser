<template>
  <div class="wrapper">
    <!-- 单选题 -->
    <div class="topic_item" v-if="data.TestPaperSubtitleName">
      <div class="topic_title"><span class="tag">{{data.TestPaperSubtitleName}}</span>{{index + 1}}.{{data.QuestionTitle}}</div>
      <checker
        v-if="correctInner === -1"
        v-model="answerInner"
        type="radio"
        default-item-class="topic-checker-item"
        selected-item-class="topic-checker-item-selected"
        :radio-required="true">
        <template v-for="(val, index) in data.Content.split('><')">
          <checker-item :value="index" :key="index">
            <i v-if="index === answerInner" class="iconfont icon-gouSolid-copy"></i>
            <i v-else class="iconfont icon-yuan"></i>
            <span>{{index | numberToAlp}}.{{val}}</span>
          </checker-item>
        </template>
      </checker>
      <div v-else>
        <template v-for="(val, index) in data.Content.split('><')">
          <div class="topic-checker-item" :key="index">
            <i v-if="(index === answerInner && correctInner === '') || index === correctInner" class="iconfont icon-gouSolid-copy"></i>
            <i v-else-if="answerInner !== correctInner && answerInner === index" class="iconfont icon-cha"></i>
            <i v-else class="iconfont icon-yuan"></i>
            <span>{{index | numberToAlp}}.{{val}}</span>
          </div>
        </template>
      </div>
    </div>
    <!-- 答案解析 -->
    <div class="answer_wrap" v-if="correctInner !== -1">
      <div style="color:#3AC7F5">[正确答案] {{correctInner | numberToAlp}}</div>
      <div>试题解析：</div>
      <div>{{data.AnswerRemark}}</div>
    </div>
    <button class="submit_button" v-if="paperType && correctInner === -1" @click="submitAnswer">提交</button>
  </div>
</template>

<script>
import { Checker, CheckerItem } from 'vux'
import util from '@/plugins/util'
export default {
  filters: {
    numberToAlp (val) {
      return util.NumToLetter(val)
    }
  },
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
  components: {
    Checker,
    CheckerItem
  },
  data () {
    return {
      answerList: JSON.parse(sessionStorage.getItem('userAnswerList')),
      answerInner: -1,
      correctInner: -1
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
      if (this.answerInner === -1) {
        this.$vux.toast.text('答案不能为空')
        return false
      }
      if (this.answerInner !== this.data.IntRightKey) {
        this.$emit('setCourseWrongNums', this.data.QuestionID)
      } else {
        this.$emit('setCourseRightNums', this.data.QuestionID)
      }

      this.correctInner = this.data.IntRightKey
      this.answerList[this.index].Answer = this.answerInner
      sessionStorage.setItem('userAnswerList', JSON.stringify(this.answerList))
    },
    initData () {
      this.answerInner = this.answerList[this.index].Answer !== -1 ? this.answerList[this.index].Answer : -1
      this.correctInner = this.answerList[this.index].Answer !== -1 ? this.data.IntRightKey : -1
    }
  }
}
</script>

<style lang="less" scoped>
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
.topic-checker-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 15px;
  color: #999;
  height: 30px;
  .iconfont {
    margin-right: 5px;
  }
}
.icon-yuan {
  color: #999
}
.icon-gouSolid-copy {
  color: #32C0F3;
}
.icon-cha {
  color: #FF5F5F;
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
.answer_wrap {
  padding-left: 20px;
  color: #999;
  font-size: 14px;
}
</style>
