<template>
  <div>
    <sticky
      :check-sticky-support="true">
      <xx-step-bar :step="detail.State | stepFilter">
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
    <div class="reserve-wrap" style="padding-bottom:60px" v-if="isMission === 0">
      <xx-cell-items label="服务项" class="noraml_cell noraml_cell-right" style="padding: 20px 0 15px 0;">
        <div style="text-align: right;font-size:13px;color: #999">图文咨询</div>
      </xx-cell-items>
      <xx-cell-items label="病情症状或备注" direction="vertical" class="noraml_cell" style="padding: 20px 0 15px 0;">
        <div class="service_remark_textarea_container">
          <textarea v-model="reqParams.ReserveRemark" class="service_remark_textarea" placeholder="请输入备注" @keyup="limitCount(200)"></textarea>
          <span class="service_remark_textarea_nums_count" :class="{warn: exceedText}">{{reqParams.ReserveRemark.length}} / 200</span>
        </div>
      </xx-cell-items>
      <xx-cell-items label="相关医嘱病历图片上传" direction="vertical" class="noraml_cell" style="padding: 20px 0 15px 0;">
        <xx-uploader
          class="upload"
          :maxSize="1024 * 1024 * 5"
          :imgList="imgList"
          :limit="9"
          @onUpdate="onUpdate"
        ></xx-uploader>
      </xx-cell-items>
    </div>
    <!-- 图文咨询 -->
    <div class="content_container" style="padding: 15px 10px 60px" :style="'padding-bottom:'+ boxPaddingBottom+'px'" v-if="isMission === 1">
      <system-msg-item>
        温馨提示：服务者的回复仅供参考，不能作为诊断及医疗依据
      </system-msg-item>
      <a v-if="messageId !== -1" href="javascript:" class="moreMessage_text" @click="moreMessage">
        <i class="icon-clock iconfont"></i>
        查看更多消息
      </a>
      <template v-if="messageList.length > 0">
        <div v-for="(item, index) in messageList" :key="index">
          <system-msg-item v-if="item.SendTime" msgType="time" class="mt25px">
            {{item.SendTime | timeFormat}}
          </system-msg-item>
          <text-chat-item
            v-if="item.MsgType === 1 || item.MsgType === 2"
            :IsServantReceive="item.IsServantReceive"
            class="mgt10"
            :avatar="(item.IsServantReceive === 0)?FromAvatar:userAccount.Avatar"
            :Content="item.Content"
            :MsgType="item.MsgType"
          >
          </text-chat-item>
          <graphic-message 
            v-if="item.MsgType === 5 || item.MsgType === 6"
            class="mgt10"
            :avatar="(item.IsServantReceive === 0)?FromAvatar:userAccount.Avatar"
            :IsServantReceive="item.IsServantReceive"
            :Content="detail"
            @showComment="showCommentPanel"
            :MsgType="item.MsgType"
            :State="detail.State"
          >
          </graphic-message>
        </div>
      </template>
    </div>
    <!-- 提交按钮 -->
    <div v-if="isMission === 0">
      <button type="button" class="weui-btn weui-btn_primary" style="position:fixed;bottom:0" @click="submit" :disabled="submitDisable">提交</button>
    </div>
    <!-- 聊天按钮 -->
    <send-msg-bar v-if="detail.State === 0 || detail.State === 3" @changeHeight="changePaddingBottom" @sendMsg="sendMsg"></send-msg-bar>
    <!-- 投诉按钮 -->
    <div class="btn-bar" v-if="detail.State === 4 || detail.State === 5">
      <button type="button" v-if="detail.State === 4" class="weui-btn weui-btn_primary" style="background: #F8A519;flex:1;" @click="complaint">投诉</button>
      <button type="button" class="weui-btn weui-btn_primary" @click="showCommentPanel"><i class="iconfont icon-xiaoxi"></i>评价</button>
    </div>
    <!-- 评价弹层 -->
    <comments v-model="isShowCommentPanel" :State="detail.State" :Detail="commentsDetail" @confirmCancel="cancelComments" @onSubmit="submitComments"></comments>
  </div>
</template>

<script>
import { Sticky } from 'vux'
import { mapGetters } from 'vuex'
import SystemMsgItem from './components/systemMsgItem'
import TextChatItem from './components/textChatItem'
import SendMsgBar from './components/sendMsgBar'
import GraphicMessage from './components/GraphicMessage'
import comments from './components/comments'
export default {
  components: {
    Sticky,
    comments,
    SystemMsgItem,
    TextChatItem,
    SendMsgBar,
    GraphicMessage
  },
  filters: {
    stepFilter (val = 0) {
      switch (val) {
        case 0: {
          return '1'
        }
        case 3: {
          return '2'
        }
        case 4: {
          return '3'
        }
        case 5: {
          return '3'
        }
      }
    }
  },
  data () {
    return {
      isMission: 0,
      messageId: 0,
      boxPaddingBottom: 82,
      submitDisable: false,
      exceedText: false,
      isShowCommentPanel: false,
      imgList: [],
      reqParams: {
        ReserveRemark: '',
        ReserveImg: ''
      },
      messageList: [],
      detail: {},
      FromAvatar: '',
      commentsDetail: {}
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo'
    ]),
    ID () {
      return this.$route.params.id || ''
    }
  },
  mounted () {
    this.isMission = +this.$route.query.isMission
    if (+this.$route.query.isMission !== 0) {
      this.init().then(() => {
        const rotation = setInterval(() => {
          this.rotationMessageList()
        }, 5000)
        this.$once('hook:beforeDestroy', () => {
          clearInterval(rotation)
        })
      })
    }
  },
  methods: {
    // 创建咨询
    async submit () {
      const that = this
      if (this.exceedText) {
        this.$vux.toast.text('备注字数超出限制')
        return false
      }
      this.submitDisable = true
      const res = await this.$http.post(`/Consult?id=${this.ID}`, this.reqParams)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: '提交成功',
          time: 500,
          onHide () {
            that.isMission = 1
            that.$router.replace(`/service/consult/${res.data.Data.ID}?isMission=1`)
            that.init()
          }
        })
        this.submitDisable = false
      } else {
        this.$vux.toast.text(res.data.Msg)
        this.submitDisable = false
      }
    },
    // 初始化
    async init () {
      this.getMissionDetail().then(result => {
        if (result.Code === 100000) {
          this.detail = result.Data
        }
      })
      this.getMessageList().then(result => {
        if (result.Code === 100000) {
          this.messageList = result.Data.ContentList
          this.FromAvatar = result.Data.Avatar
          this.messageId = result.Data.MessageID
          this.scrollToBottom()
        }
      })
    },
    // 获取任务详情
    async getMissionDetail () {
      const res = await this.$http.get(`/QueryConsult?missionId=${this.ID}`)
      return res.data
    },
    // 获取消息列表
    async getMessageList () {
      const res = await this.$http.get(`/QueryConsultDialog?missionId=${this.ID}&messageId=${this.messageId}`)
      return res.data
    },
    // 轮训消息
    async rotationMessageList () {
      const res = await this.$http.get(`/GraphicConsultationChat?missionID=${this.ID}`)
      if (res.data.Code === 100000) {
        if (res.data.Data && res.data.Data.length > 0) {
          this.messageList = [
            ...this.messageList,
            ...res.data.Data
          ]
          if ((document.documentElement.clientHeight + document.body.scrollTop) >= document.querySelector('body').scrollHeight - 100) {
            this.scrollToBottom()
          } else {
            this.$vux.toast.show({
              text: '滚到底部查看新消息',
              position: 'bottom',
              type: 'text',
              width: '12em'
            })
          }
        }
      }
    },
    // 更多的消息
    moreMessage () {
      this.getMessageList().then(result => {
        this.messageId = result.Data.MessageID
        this.messageList = [
          ...result.Data.ContentList,
          ...this.messageList
        ]
      })
    },
    // 提交评价
    async submitComments (params) {
      const that = this
      params.MissionID = this.ID
      const res = await this.$http.post('/ServantReview', params)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: '评价成功',
          onHide () {
            that.init()
            that.isShowCommentPanel = false
          }
        })
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 提交用户发送内容
    async sendMsg (msg) {
      msg.MissionID = this.ID
      const res = await this.$http.post(`/Chat`, msg)
      if (res.data.Code === 100000) {
        console.log(res.data.Data)
        this.messageList.push(msg)
        this.scrollToBottom()
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 创建任务上传图片
    onUpdate (id) {
      console.log(id.join(','))
      this.reqParams.ReserveImg = id.join(',')
    },
    // 文本域字数限制
    limitCount (max) {
      this.exceedText = this.reqParams.ReserveRemark.length > max
    },
    // 打开评价面板
    async showCommentPanel () {
      if (this.detail.State === 4) {
        this.isShowCommentPanel = true
      }
      if (this.detail.State === 5) {
        this.getComments().then(result => {
          if (result.Code === 100000) {
            this.commentsDetail = result.Data
            this.isShowCommentPanel = true
          }
        })
      }
    },
    // 获取已评价内容
    async getComments () {
      const res = await this.$http.get(`/ServantReview?missionID=${this.ID}`)
      return res.data
    },
    // 取消评价
    cancelComments () {
      console.log('cancelComments')
    },
    // 滚到底部
    scrollToBottom () {
      this.$nextTick(() => {
        document.body.scrollTop = document.documentElement.scrollTop = document.querySelector('body').scrollHeight
      })
    },
    changePaddingBottom (height) {
      this.boxPaddingBottom = (height + 30)
      this.scrollToBottom()
    },
    complaint () {
      this.$router.push(`/service/complaint/${this.ID}`)
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
.moreMessage_text
{
  font-size: 14px;
  text-align: center;
  display: block;
  padding: 20px 0;
  color: #3ac7f5
}
</style>