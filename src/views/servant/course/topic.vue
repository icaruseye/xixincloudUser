<template>
  <div class="wrapper">
    <xx-tab v-model="tabIndex" active-color="#32C0F3" custom-bar-width="25px">
      <xx-tab-item :selected="tabIndex === 0" @on-item-click="tabItemClick">课程目录</xx-tab-item>
      <xx-tab-item :selected="tabIndex === 1" @on-item-click="tabItemClick">习题练习</xx-tab-item>
    </xx-tab>
    <div class="topic_wrap">
      <!-- 单选题 -->
      <div class="topic_item">
        <div class="topic_title"><span>单选题</span> 31患者，男，25岁。患肺炎入院治疗。患者进入病区后，护士的初步护理工作不包括</div>
        <checker v-model="answer" type="radio" default-item-class="topic-checker-item" selected-item-class="topic-checker-item-selected" :radio-required="true">
          <template v-for="val in [1,2,3]">
            <checker-item :value="val" :key="val">
              <i v-if="(val === answer && correct === '') || val === correct" class="iconfont icon-gouSolid-copy"></i>
              <i v-else-if="answer !== correct && answer === val" class="iconfont icon-cha"></i>
              <i v-else class="iconfont icon-yuan"></i>
              <span>A. 迎接新病人{{val}}</span>
            </checker-item>
          </template>
        </checker>
      </div>
      <!-- 多选题 -->
      <!-- 填空题 -->
      <!-- 简单题 -->
      <div class="topic_item topic_item_jianda">
        <div class="topic_title"><span>简答题</span> 31患者，男，25岁。患肺炎入院治疗。患者进入病区后，护士的初步护理工作不包括</div>
        <textarea class="textarea" name="" id="" cols="30" rows="10"></textarea>
        <i v-if="answer === correct" class="iconfont icon-gouSolid-copy"></i>
        <i v-if="answer !== correct" class="iconfont icon-cha"></i>
        <button class="submit">提交</button>
      </div>
      <!-- 答案解析 -->
      <div class="answer_wrap"></div>
    </div>
    <!-- 底部统计栏 -->
    <div class="topic_tools" @click="showCard = true">
      <div class="item">
        <i class="iconfont icon-dui"></i>
        <div style="color:#32C0F3">50</div>
      </div>
      <div class="item">
        <i class="iconfont icon-cuo"></i>
        <span style="color:#FF4E4E">50</span>
      </div>
      <div class="item">
        <i class="iconfont icon-caidan"></i>
      </div>
      <div class="item" style="flex:1;justify-content: flex-end;">
        <span style="color:#32C0F3">50</span>
        <span>/144</span>
      </div>
    </div>
    <!-- 答题卡 -->
    <div v-transfer-dom>
      <popup
        v-model="showCard"
        :should-rerender-on-show="true">
        <div>
          <card></card>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { Checker, CheckerItem, TransferDomDirective as TransferDom, Popup } from 'vux'
import card from './card'
export default {
  directives: {
    TransferDom
  },
  components: {
    Checker,
    CheckerItem,
    Popup,
    card
  },
  data () {
    return {
      tabIndex: 1,
      showCard: false,
      answer: 2,
      correct: ''
    }
  },
  mounted () {
  },
  methods: {
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
