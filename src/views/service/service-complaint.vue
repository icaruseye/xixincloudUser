<template>
  <div class="has-tabbar">
    <xx-step-bar step="1">
      <xx-step-items slot="items">
        用户提交
      </xx-step-items>
      <xx-step-items slot="items">
        服务者提交
      </xx-step-items>
      <xx-step-items slot="items">
        客服介入
      </xx-step-items>
      <xx-step-items slot="items">
        结果
      </xx-step-items>
    </xx-step-bar>
    <div class="weui-panel">
      <div class="weui-panel_title">投诉原因</div>
      <div>
        <input v-model="reason" type="text" placeholder="请输入投诉原因">
      </div>
      <div class="weui-panel_title">其他备注</div>
      <div style="position:relative">
        <textarea v-model="content" name="" placeholder="请输入其他备注"></textarea>
        <span class="remark_textarea_nums_count">{{content.length}} / 200</span>
      </div>
      <div class="weui-panel_title">相关图片上传</div>
        <xx-uploader
          class="upload"
          :maxSize="1024 * 1024 * 2"
          :imgList="imgList1"
          @onUpdate="onUpdate1"
        ></xx-uploader>
    </div>
    <button style="position:fixed;bottom:0" class="weui-btn weui-btn-bottom weui-btn_primary">提交</button>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '投诉'
  },
  data () {
    return {
      reason: '',
      content: '',
      imgList1: []
    }
  },
  methods: {
    onUpdate1 (id) {
      console.log(id)
    }
  }
}
</script>

<style scoped lang="less">
.weui-panel {
  padding-top: 10px;
  padding-bottom: 25px;
  overflow: hidden;
}
.weui-panel_title {
  margin-bottom: 12px;
  font-size: #333;
  color: 15px;
}

input,
textarea {
  padding: 7px 12px;
  width: 100%;
  display: block;
  background: #F6F6F6;
  border: 0;
  border-radius: 4px;
  margin-bottom: 18px;
  box-sizing: border-box;
}

input {
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
}

textarea {
  resize: none;
  height: 115px;
  padding-bottom: 30px;
}

.remark_textarea_nums_count {
  position: absolute;
  right: 16px;
  bottom: 7px;
  height: 18px;
  line-height: 18px;
  color: #999999;
  font-size: 13px;
}
</style>