<template>
  <!-- 简答题 -->
  <div class="wrapper">
    <div class="topic_item" v-if="data.TestPaperSubtitleName">
      <div class="topic_title"><span class="tag">{{data.TestPaperSubtitleName}}</span>{{index + 1}}.{{data.QuestionTitle | formatTitle}}</div>
      <div v-if="correctInner === ''">
        <div class="topic_input_item" v-for="(item, index) in data.SelectionAmount" :key="index">
          <span>{{index + 1}}</span><input type="text" v-model.trim="answerInner[index]" placeholder="">
        </div>
      </div>
      <div v-else>
        <div class="topic_input_item" v-for="(item, index) in data.SelectionAmount" :key="index">
          <span>{{index + 1}}</span><input type="text" :value="answerInner[index]" disabled>
          <i v-if="answerInner[index] === correctInner[index]" class="iconfont icon-gouSolid-copy"></i>
          <i v-else class="iconfont icon-cha"></i>
        </div>
      </div>
      <!-- 答案解析 -->
      <div class="answer_wrap" v-if="correctInner !== ''">
        <div style="color:#3AC7F5">[正确答案] {{correctInner.join()}}</div>
        <div>试题解析：</div>
        <div>{{data.AnswerRemark}}</div>
      </div>
      <button class="submit_button" v-if="correctInner === '' && paperType" @click="submitAnswer">提交</button>
    </div>
  </div>
</template>

<script>
import util from '@/plugins/util'
export default {
  filters: {
    numberToAlp (val) {
      return util.NumToLetter(val)
    },
    formatTitle (title) {
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
        this.answerList[this.index].Answer = val.join('><')
        sessionStorage.setItem('userAnswerList', JSON.stringify(this.answerList))
      }
    }
  },
  created () {
  },
  mounted () {
    this.initData()
  },
  methods: {
    submitAnswer () {
      if (this.answerInner.includes(undefined) || this.answerInner.includes('')) {
        this.$vux.toast.text('请完成题目后提交')
        return false
      }
      this.correctInner = this.data.StrRightKey.split('><')
      this.answerList[this.index].Answer = this.answerInner.join('><')
      sessionStorage.setItem('userAnswerList', JSON.stringify(this.answerList))

      this.$nextTick(() => {
        if (document.querySelectorAll('.icon-cha').length > 0) {
          this.$emit('setCourseWrongNums', true)
        } else {
          this.$emit('setCourseRightNums', true)
        }
      })
    },
    initData () {
      this.answerInner.length = this.data.SelectionAmount
      this.answerInner = this.answerList[this.index].Answer !== '' ? this.answerList[this.index].Answer.split('><') : []
      this.correctInner = this.paperType && this.answerList[this.index].Answer !== '' ? this.data.StrRightKey.split('><') : ''
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
.topic_input_item {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
  span {
    color: #999;
    margin-right: 5px;
  }
  input {
    height: 35px;
    line-height: 35px;
    background: #e1e1e1;
  }
}
</style>
