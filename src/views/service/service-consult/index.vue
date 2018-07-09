<template>
  <div>
    <sticky
      :check-sticky-support="true">
      <xx-step-bar step="1">
        <xx-step-items slot="items">
          预约
        </xx-step-items>
        <xx-step-items slot="items">
          服务中
        </xx-step-items>
        <xx-step-items slot="items">
          已完成
        </xx-step-items>
      </xx-step-bar>
    </sticky>
    <!-- 预约 -->
    <div class="reserve-wrap" style="padding-bottom:60px" v-if="state === 1">
      <xx-cell-items label="服务项" class="noraml_cell noraml_cell-right" style="padding: 20px 0 15px 0;">
        <div style="text-align: right;font-size:13px;color: #999">图文咨询</div>
      </xx-cell-items>
      <xx-cell-items label="病情症状或备注" direction="vertical" class="noraml_cell" style="padding: 20px 0 15px 0;">
        <div class="service_remark_textarea_container">
          <textarea v-model="reqParams.Discription" class="service_remark_textarea" placeholder="请输入备注" @keyup="limitCount(200)"></textarea>
          <span class="service_remark_textarea_nums_count" :class="{warn: exceedText}">{{reqParams.Discription.length}} / 200</span>
        </div>
      </xx-cell-items>
      <xx-cell-items label="相关医嘱病历图片上传" direction="vertical" class="noraml_cell" style="padding: 20px 0 15px 0;">
        <xx-uploader
          class="upload"
          :maxSize="1024 * 1024 * 5"
          :imgList="imgList"
          :limit="3"
          @onUpdate="onUpdate"
        ></xx-uploader>
      </xx-cell-items>
    </div>
    <!-- 图文咨询 -->
    <div class="content_container" style="padding: 15px 0 60px" :style="'padding-bottom:'+ boxPaddingBottom+'px'" v-if="state === 2">
      <system-msg-item>
        温馨提示：服务者的回复仅供参考，不能作为诊断及医疗依据
      </system-msg-item>
      <div v-for="(item, index) in messageList" :key="index">
        <system-msg-item v-if="item.time" msgType="time" class="mgt25">
          {{item.time}}
        </system-msg-item>
        <text-chat-item
          :originator="item.originator"
          class="mgt10"
          :avatar="userAccount.Avatar"
          :text="item.text"
          :imgs="item.Imgs"
          :title="item.title"
          :linkName="item.linkName"
          @onloaded = "scrollToBottom"
        >
        </text-chat-item>
      </div>
    </div>
    <!-- 按钮 -->
    <send-msg-bar @changeHeight="changePaddingBottom" @sendMsg="sendMsg"></send-msg-bar>
    <!-- <div>
      <button type="button" class="weui-btn weui-btn_primary" style="position:fixed;bottom:0" @click="submit" :disabled="submitDisable">提交</button>
    </div> -->
    <!-- <div class="btn-bar">
      <button type="button" class="weui-btn weui-btn_primary" style="background: #F8A519;flex:1;">投诉</button>
      <button type="button" class="weui-btn weui-btn_primary"><i class="iconfont icon-xiaoxi"></i>再次在线咨询</button>
    </div> -->
    <!-- 评价 -->
    <comments v-model="showCommentPanel" @confirmCancel="cancelComments"></comments>
  </div>
</template>

<script>
import { Sticky } from 'vux'
import { mapGetters } from 'vuex'
import SystemMsgItem from './components/systemMsgItem'
import TextChatItem from './components/textChatItem'
import SendMsgBar from './components/sendMsgBar'
import comments from './components/comments'
export default {
  components: {
    Sticky,
    comments,
    SystemMsgItem,
    TextChatItem,
    SendMsgBar
  },
  data () {
    return {
      state: 2,
      boxPaddingBottom: 82,
      submitDisable: false,
      exceedText: false,
      showCommentPanel: false,
      imgList: [],
      reqParams: {
        Discription: '',
        Imgs: ''
      },
      messageList: [
        {
          originator: 'to',
          time: '2018年07月4日12:21:05',
          text: '好的，请稍等一下。好的，请稍等一下。好的，请稍等一下。'
        },
        {
          originator: 'from',
          title: '图文咨询',
          time: '2018年07月4日12:21:05',
          text: '目前咨询结果建议，注意观察肿瘤变化情况，皮肤有无破损情况，建议最好去医院做全面检查。',
          Imgs: 'http://thirdwx.qlogo.cn/mmopen/vi_32/lDJ7C7uBGLbIwu6QHCoYs9BQ2be15GTILiaajhr1dbXuZMSptQLNm6uCBWgOiaDZv7GE4K7ItYUBAbYkUfL9Gmzg/132,http://thirdwx.qlogo.cn/mmopen/vi_32/lDJ7C7uBGLbIwu6QHCoYs9BQ2be15GTILiaajhr1dbXuZMSptQLNm6uCBWgOiaDZv7GE4K7ItYUBAbYkUfL9Gmzg/132'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo'
    ])
  },
  mounted () {
    this.init()
  },
  methods: {
    // 提交前弹窗确认
    submit () {
      this.showCommentPanel = true
      if (this.exceedText) {
        this.$vux.toast.text('备注字数超出限制')
        return false
      }
    },
    limitCount (max) {
      this.exceedText = this.reqParams.Discription.length > max
    },
    onUpdate (id) {
      console.log(id.join(','))
      this.reqParams.Imgs = id.join(',')
    },
    cancelComments () {
      console.log('cancelComments')
    },
    sendMsg (msg) {
      this.messageList.push(msg)
      this.scrollToBottom()
    },
    scrollToBottom () {
      this.$nextTick(() => {
        document.body.scrollTop = document.documentElement.scrollTop = document.querySelector('body').scrollHeight
      })
    },
    init () {
      this.scrollToBottom()
    },
    changePaddingBottom (height) {
      this.boxPaddingBottom = (height + 30)
      this.scrollToBottom()
    }
  }
}
</script>

<style scoped lang="less">
.reserve-wrap {
  margin-top: 10px;
  background: #fff;
}
.service_remark_textarea_container {
  margin-top: 12px;
  position: relative;
  height: 115px;
  background: #f2f2f2;
  border-radius: 3px;
}
.service_remark_textarea {
  box-sizing: border-box;
  outline: none;
  padding: 12px;
  width: 100%;
  height: 90px;
  resize: none;
  border: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.service_remark_textarea_nums_count {
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
.btn-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  .weui-btn:nth-child(2) {
    width: 240px;
  }
}
.icon-xiaoxi {
  font-size: 18px;
  margin-right: 5px;
}
.content_container
{
  padding: 15px 15px 80px
}
// 聊天气泡内的样式
.from_textChat_msg,
.to_textChat_msg
{
  .thumbs_container
  {
  padding: 0 !important;
  height: 65px;
  img:last-child
  {
    margin-right: 0
  }
  }
}
.to_imgChat_msg,
.from_imgChat_msg
{
  padding-top: 10px; 
  .thumbs_container{
    width: 120px;
    padding-top: 0 !important;
    img
    {
      width: 100% !important;
      height: auto !important;
      border-radius: 5px;
    }
  }
}
.to_imgChat_msg .thumbs_container
{
  float: right;
}
</style>