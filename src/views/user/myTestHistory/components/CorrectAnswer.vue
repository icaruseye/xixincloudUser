<template>
  <div>
    <textarea v-if="showResult" class="textarea" v-model.trim="modelValue" disabled></textarea>
    <textarea v-else class="textarea" v-model.trim="modelValue"></textarea>
  </div>
</template>
<script>
import { Checker, CheckerItem } from 'vux'
import util from '@/plugins/util'
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
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    theAnswerIsRight () {
      console.log(this.modelValue)
      return this.modelValue === this.RightAnswerStr
    }
  }
}
</script>
<style lang="less" scoped>
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
</style>
