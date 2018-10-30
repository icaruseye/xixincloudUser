<template>
  <div class="wrapper">
    <xx-tab v-model="tabIndex" active-color="#32C0F3" custom-bar-width="25px">
      <xx-tab-item :selected="tabIndex === 1" @on-item-click="tabItemClick">习题练习</xx-tab-item>
    </xx-tab>
    <div class="topic_wrap" v-if="questionList.length > 0">
      <!-- 简答题 -->
      <topic-type1
        v-if="questionList[answerIndex].QuestionType === 1"
        :index="answerIndex"
        :paperType="IsNeedAnswer"
        :data="questionList[answerIndex]"
        @setCourseWrongNums="wrongNums++"
        @setCourseRightNums="rightNums++">
      </topic-type1>
      <!-- 填空题 -->
      <topic-type2
        v-if="questionList[answerIndex].QuestionType === 2"
        :index="answerIndex"
        :paperType="IsNeedAnswer"
        :data="questionList[answerIndex]"
        @setCourseWrongNums="wrongNums++"
        @setCourseRightNums="rightNums++">
      </topic-type2>
      <!-- 判断题 -->
      <!-- 多选题 -->
      <!-- 简单题 -->
    </div>
    <!-- 底部统计栏 -->
    <div class="topic_tools">
      <div class="item" v-if="IsNeedAnswer">
        <i class="iconfont icon-dui"></i>
        <div style="color:#32C0F3">{{rightNums}}</div>
      </div>
      <div class="item" v-if="IsNeedAnswer">
        <i class="iconfont icon-cuo"></i>
        <span style="color:#FF4E4E">{{wrongNums}}</span>
      </div>
      <div class="item" @click="showCard = true">
        <i class="iconfont icon-caidan"></i>
      </div>
      <div class="item" style="flex:1;justify-content: flex-end;">
        <span class="btn" @click="prevQuestion" v-if="answerIndex !== 0">上一题</span>
        <span class="btn" @click="nextQuestion" v-if="answerIndex !== questionList.length -1">下一题</span>
      </div>
    </div>
    <!-- 答题卡 -->
    <div v-transfer-dom>
      <popup
        v-model="showCard"
        :should-rerender-on-show="true">
        <div>
          <card @onClick="cardClick" :paperType="IsNeedAnswer"></card>
        </div>
      </popup>
    </div>
    <!-- 完成答题 -->
    <div v-transfer-dom>
      <popup
        v-model="isOver"
        :should-rerender-on-show="true">
        <div>
          已完成所有题目
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { Checker, CheckerItem, TransferDomDirective as TransferDom, Popup } from 'vux'
import card from './card'
import topicType1 from './topicType1'
import topicType2 from './topicType2'
export default {
  directives: {
    TransferDom
  },
  components: {
    Checker,
    CheckerItem,
    Popup,
    card,
    topicType1,
    topicType2
  },
  data () {
    return {
      tabIndex: 1,
      isOver: false, // 完成所有题目
      showCard: false, // 显示答题卡
      answerIndex: 0, // 当前显示题目索引,
      IsNeedAnswer: false,
      wrongNums: this.$store.getters.courseWrongNums,
      rightNums: this.$store.getters.courseRightNums,
      questionList: []
    }
  },
  watch: {
    wrongNums () {
      this.$store.commit('setCourseWrongNums', true)
    },
    rightNums () {
      this.$store.commit('setCourseRightNums', true)
    },
    courseWrongNums (val) {
      console.log(111111111)
      this.wrongNums = val
    },
    courseRightNums (val) {
      this.rightNums = val
    }
  },
  mounted () {
    this.getCouldExam()
  },
  methods: {
    async getCouldExam () {
      const res = await this.$http.get(`/TestPaperQuestionList?testPaperID=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.questionList = res.data.Data.TestPaperQuestionDetailsList
        this.IsNeedAnswer = res.data.Data.IsNeedAnswer
        this.setAnswerList()
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    setAnswerList () {
      let arr = []
      for (let index = 0; index < this.questionList.length; index++) {
        arr.push(Object.assign({
          answer: [2, 4, 5].indexOf(this.questionList[index].QuestionType) === -1 ? -1 : '',
          id: this.questionList[index].TestPaperSubtitleQuestionID,
          index: index,
          correct: [2, 4, 5].indexOf(this.questionList[index].QuestionType) === -1 ? this.questionList[index].IntRightKey : this.questionList[index].StrRightKey
        }))
      }
      console.log(arr)
      sessionStorage.setItem('userAnswerList', JSON.stringify(arr))
    },
    cardClick (index) {
      console.log(index)
      this.answerIndex = index
      this.showCard = false
    },
    nextQuestion () {
      this.answerIndex++
      console.log(this.answerIndex)
    },
    prevQuestion () {
      this.answerIndex--
    },
    tabItemClick (val) {
      this.tabIndex = val
    },
    to (url) {
      this.$router.replace(url)
    }
  }
}
</script>

<style lang="less" scoped>
.topic_wrap {
  padding: 25px 14px 70px 14px;
  .topic_title {
    font-size: 15px;
    color: #666;
    margin-bottom: 20px;
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
.topic_item_jianda {
  .iconfont {
    position: absolute;
    bottom: 20px;
    right: 10px;
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
.topic_tools {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  font-size: 12px;
  padding: 16px 20px 16px 0;
  background: #fff;
  color: #666;
  .item {
    margin: 0 0 0 20px;
    display: flex;
    align-items: center;
    .btn {
      font-size: 12px;
      color: #999;
      margin-left: 12px;
      padding: 0 4px;
      border-radius: 2px;
      border: 1px solid RGBA(151, 151, 151, .4);
    }
  }
  .iconfont {
    position: relative;
    top: 1px;
    margin-right: 5px;
    color: #ccc;
    font-size: 20px;
  }
}
</style>
