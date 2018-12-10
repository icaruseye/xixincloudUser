<template>
  <div>
    <div v-if="showResult">
      <div v-for="(answer, index) in answerList" :key="index" class="topic-checker-item">
        <i class="iconfont" :class=[showResultIconClass(index)]></i>
        <span>{{index | numberToAlp}}.{{answer}}</span>
      </div>
    </div>
    <checker
      v-else
      v-model="modelValue"
      type="radio"
      default-item-class="topic-checker-item"
      selected-item-class="topic-checker-item-selected"
      :radio-required="true">
      <template v-for="(answer, index) in answerList">
        <checker-item :value="index" :key="index">
          <i v-if="index === modelValue" class="iconfont icon-gouSolid-copy"></i>
          <i v-else class="iconfont icon-yuan"></i>
          <span>{{index | numberToAlp}}.{{answer}}</span>
        </checker-item>
      </template>
    </checker>
  </div>
</template>
<script>
import { Checker, CheckerItem } from 'vux'
import util from '@/plugins/util'
const decollator = '><'
export default {
  name: 'SingleChoice',
  components: {
    Checker,
    CheckerItem
  },
  filters: {
    numberToAlp (val) {
      return util.NumToLetter(val)
    }
  },
  props: {
    value: {
      type: Number,
      default: null
    },
    answerStr: {
      type: String,
      default: ''
    },
    RightAnswerIndex: {
      type: Number,
      default: null
    },
    showResult: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modelValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    answerList () {
      return this.answerStr.split(decollator)
    }
  },
  methods: {
    theAnswerIsRight () {
      return this.modelValue === this.RightAnswerIndex
    },
    showResultIconClass (index) {
      if (index === this.RightAnswerIndex) {
        return 'choose_right icon-gouSolid-copy'
      } else if (index === this.modelValue && this.modelValue !== this.RightAnswerIndex) {
        return 'choose_error icon-shanchuguanbicha2'
      } else {
        return 'icon-yuan'
      }
    }
  }
}
</script>
<style lang="less" scoped>
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
  &.choose_right
  {
    color: #67c23a;
  }
}
.icon-shanchuguanbicha2
{
  color: #f56c6c;
}
.icon-cha {
  color: #FF5F5F;
}
</style>
