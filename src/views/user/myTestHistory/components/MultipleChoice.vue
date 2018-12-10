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
      v-model="selectedList"
      type="checkbox"
      default-item-class="topic-checker-item"
      selected-item-class="topic-checker-item-selected"
      :radio-required="true">
      <template v-for="(answer, index) in answerList">
        <checker-item :value="index" :key="index">
          <i v-if="selectedList.includes(index)" class="iconfont icon-gouSolid-copy"></i>
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
  name: 'MultipleChoice',
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
    selectedList (val) {
      this.modelValue = val.join(',')
    }
  },
  data () {
    return {
      selectedList: []
    }
  },
  props: {
    value: {
      type: String,
      default: null
    },
    answerStr: {
      type: String,
      default: ''
    },
    RightAnswerIndexStr: {
      type: String,
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
        if (this.value) {
          return this.value.split(',').map(Number)
        } else {
          return []
        }
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    rightAnswerIndex () {
      return this.RightAnswerIndexStr.split(',').map(Number)
    },
    answerList () {
      return this.answerStr.split(decollator)
    }
  },
  methods: {
    theAnswerIsRight () {
      for (let i = 0; i < this.modelValue.length; i++) {
        if (!this.rightAnswerIndex.includes(this.modelValue[i])) {
          return false
        }
      }
      return true
    },
    showResultIconClass (index) {
      if (!this.modelValue.includes(index) && this.rightAnswerIndex.includes(index)) { // 正确答案，未选
        return 'normal_right icon-gouSolid-copy'
      } else if (this.modelValue.includes(index) && this.rightAnswerIndex.includes(index)) { // 正确答案，已选
        return 'choose_right icon-gouSolid-copy'
      } else if (this.modelValue.includes(index) && !this.rightAnswerIndex.includes(index)) { // 错误答案，已选
        return 'choose_error icon-shanchuguanbicha2'
      } else { // 错误答案，未选
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
  &.normal_right
  {
    color: #999
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
