<template>
  <div class="wrapper">
    <div class="topic_item topic_item_jianda" v-if="questionList[answerIndex].QuestionType === 4">
      <div class="topic_title"><span>简答题</span> 31患者，男，25岁。患肺炎入院治疗。患者进入病区后，护士的初步护理工作不包括</div>
      <textarea class="textarea" name="" id="" cols="30" rows="10"></textarea>
      <i v-if="answer === correct" class="iconfont icon-gouSolid-copy"></i>
      <i v-if="answer !== correct" class="iconfont icon-cha"></i>
      <button class="submit">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
