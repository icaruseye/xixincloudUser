<template>
  <div>
    <div class="topic_input_item" v-for="(answer, index) in AnswerList" :key="index">
      <span>{{index + 1}}、</span><input type="text" v-model="answer.myAnswer" @keyup="inputKeyUp" :readonly="showResult">
      <template v-if="showResult">
        <i v-if="answerIsRight(answer.myAnswer, answer.rightAnswer)" class="iconfont icon-gouSolid-copy"></i>
        <i v-else class="iconfont icon-cha"></i>
      </template>
    </div>
  </div>
</template>
<script>
import { Checker, CheckerItem } from 'vux'
import util from '@/plugins/util'
const decollator = '><'
export default {
  name: 'CompletionAnswer',
  components: {
    Checker,
    CheckerItem
  },
  filters: {
    numberToAlp (val) {
      return util.NumToLetter(val)
    }
  },
  watch: {
  },
  data () {
    return {
      AnswerList: []
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    RightAnswerStr: {
      type: String,
      default: ''
    },
    showResult: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modelValue: {
      get () {
        if (this.value) {
          return this.value.split(decollator)
        } else {
          return []
        }
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    rightAnswerList () {
      if (this.RightAnswerStr) {
        return this.RightAnswerStr.split(decollator)
      } else {
        return []
      }
    }
  },
  methods: {
    inputKeyUp () {
      let str = ''
      const re = new RegExp(decollator, 'g')
      for (let i = 0; i < this.AnswerList.length; i++) {
        str += `${this.AnswerList[i].myAnswer.replace(re, '')}${decollator}`
      }
      this.modelValue = str.substring(0, str.lastIndexOf(decollator))
    },
    theAnswerIsRight () {
      for (let i = 0; i < this.AnswerList.length; i++) {
        if (this.answerIsRight(this.AnswerList[i].myAnswer, this.AnswerList[i].rightAnswer)) {
          return true
        }
      }
      return false
    },
    answerIsRight (myAnswer, rightAnswer) {
      let rightAnswerList = rightAnswer.split('#')
      return rightAnswerList.includes(myAnswer)
    }
  },
  mounted () {
    let answerlist = []
    this.rightAnswerList.map(item => {
      answerlist.push({
        myAnswer: '',
        rightAnswer: item
      })
    })
    this.AnswerList = answerlist
  }
}
</script>
<style lang="less" scoped>
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
.icon-gouSolid-copy {
  color: #67c23a;
}
.icon-cha {
  color: #FF5F5F;
}
</style>
