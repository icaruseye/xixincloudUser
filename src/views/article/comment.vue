<template>
  <div>
    <div class="title">标题</div>
    <div class="article-title">很多人对于材质并不陌生，但是每次使用后最终结果总是差强人意。</div>
    <div class="title">评论</div>
    <div class="textarea">
      <textarea v-model="Remark" @keyup="limitCount(Remark, 200)" placeholder="留言将由筛选后显示，对所有人可见。"></textarea>
      <span class="remark_textarea_nums_count" :class="{warn: exceedText}">{{Remark.length}} / 200</span>
    </div>
    <button type="button" class="weui-btn weui-btn-bottom weui-btn_primary">确认</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      exceedText: false,
      Remark: ''
    }
  },
  methods: {
    limitCount (text, max) {
      this.exceedText = text.length > max
    }
  }
}
</script>

<style scoped lang="less">
.title {
  position: relative;
  padding: 12px 12px 12px 24px;
  background: #fff;
  &::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 17px;
    background: #3ecccc;
    left: 12px;
    top: 50%;
    margin-top: -8px;
    border-radius: 2px;
  }
}
.article-title {
  padding: 12px;
  font-size: 15px;
  color: #666;
}
.textarea{
  position: relative;
  padding: 0 12px 25px;
  background: #fff;
  textarea {
    padding: 10px 14px;
    background: #f6f6f6;
    resize: none;
    width: 100%;
    height: 100px;
    border: 0;
  }
}

.remark_textarea_nums_count {
  position: absolute;
  right: 16px;
  bottom: 7px;
  height: 18px;
  line-height: 18px;
  color: #999999;
  font-size: 13px;
  &.warn {
    color: #f44336
  }
}
</style>