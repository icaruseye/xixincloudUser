<template>
  <div class="wrapper">
    <!-- 单选题 -->
    <div class="topic_item" v-if="data.TestPaperSubtitleName">
      <div class="topic_title"><span class="tag">{{data.TestPaperSubtitleName}}</span>{{index + 1}}.{{data.QuestionTitle}}</div>
      <checker
        v-if="correctInner === ''"
        v-model="answerInner"
        type="checkbox"
        default-item-class="topic-checker-item"
        selected-item-class="topic-checker-item-selected">
        <template v-for="(val, index) in data.Content.split('><')">
          <checker-item :value="index" :key="index">
            <i v-if="answerInner.includes(index)" class="iconfont icon-gouSolid-copy"></i>
            <i v-else class="iconfont icon-yuan"></i>
            <span>{{index | numberToAlp}}.{{val}}</span>
          </checker-item>
        </template>
      </checker>
      <div v-else>
        <template v-for="(val, index) in data.Content.split('><')">
          <div class="topic-checker-item" :key="index">
            <i v-if="answerInner.includes(index)" class="iconfont icon-gouSolid-copy"></i>
            <i v-else class="iconfont icon-yuan"></i>
            <span style="margin-right:5px">{{index | numberToAlp}}.{{val}}</span>
            <i v-if="correctInner.includes(index)" style="color:#09bb07" class="iconfont icon-gouSolid-copy"></i>
            <i v-if="answerInner.includes(index) && !correctInner.includes(index)" class="iconfont icon-cha"></i>
          </div>
        </template>
      </div>
    </div>
    <!-- 答案解析 -->
    <div class="answer_wrap" v-if="correctInner !== ''">
      <div style="color:#3AC7F5">[正确答案] {{correctInner | arrNumberToAlp}}</div>
      <div>试题解析：</div>
      <div>{{data.AnswerRemark}}</div>
    </div>
    <button class="submit_button" v-if="paperType && correctInner === ''" @click="submitAnswer">提交</button>
  </div>
</template>

<script>
import { Checker, CheckerItem } from 'vux'
import util from '@/plugins/util'
export default {
  filters: {
    numberToAlp (val) {
      return util.NumToLetter(val)
    },
    arrNumberToAlp (val) {
      let _val = val.map(item => {
        return util.NumToLetter(item)
      })
      return _val.join()
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
      answerInner: [],
      correctInner: ''
    }
  },
  watch: {
    index () {
      this.initData()
    },
    answerInner (val) {
      if (!this.paperType) {
        this.answerList[this.index].Answer = val.join()
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
      this.correctInner = this.data.StrRightKey.split(',').map(Number)
      this.answerList[this.index].Answer = this.answerInner.join()
      sessionStorage.setItem('userAnswerList', JSON.stringify(this.answerList))

      this.$nextTick(() => {
        if (document.querySelectorAll('.icon-cha').length > 0) {
          this.$emit('setCourseWrongNums', this.data.QuestionID)
        } else {
          this.$emit('setCourseRightNums', this.data.QuestionID)
        }
      })
    },
    initData () {
      this.answerInner = this.answerList[this.index].Answer !== '' ? this.answerList[this.index].Answer.split(',').map(Number) : []
      this.correctInner = this.paperType && this.answerList[this.index].Answer !== '' ? this.data.StrRightKey.split(',').map(Number) : ''
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
