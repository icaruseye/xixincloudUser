<template>
  <div>
    <div class="user-info">
      <img class="avatar" :src="ServAccount.Avatar | transformImgUrl" alt="">
      <span class="name">{{ServAccount.NickName}}</span>
    </div>
    <div class="chat-list" id="chatList" :style="{paddingBottom : faceHeight + 'px'}">
      <template v-for="(item, index) in chatList">
        <div class="chat-item" :key="index">
          <div class="chat-item-time" v-if="item.SendTime"><span>{{item.SendTime | timeFormat}}</span></div>
          <div :class="[item.IsServantReceive ? 'chat-item-right' : 'chat-item-left']">
            <div class="chat-item-avatar" v-if="!item.IsServantReceive">
              <img :src="ServAccount.Avatar | transformImgUrl">
            </div>
            <div class="chat-item-avatar" v-if="item.IsServantReceive">
              <img :src="mineAccount.Avatar | transformImgUrl">
            </div>
            <div class="chat-item-content">
              {{item.Content}}
            </div>
            <inline-loading v-show="item.loading"></inline-loading>
          </div>
      </div>
      </template>
    </div>
    <div class="mask" v-show="isFaceShow" @click="hideFace"></div>
    <div class="chat-send-bar" :style="{ transform: 'translateY('+ translateFace +'px)' }">
      <div class="top">
        <input class="input" type="text" id="chatInput"
        v-model="chatMsg"
        @click="isFaceShow = false"
        @focus="inputFocus"
        @keyup.enter="sendMsg">
        <i class="iconfont icon-biaoqing1" @click="showFace"></i>
        <button type="button" class="send-msg" @click="sendMsg">发送</button>
      </div>
      <div class="chat-face-box" id="chatFaceBox">
        <div class="" style="font-size:22px;text-align:justify">
          <a href="javascript:;" style="margin:0 3px;" v-for="(item, index) in faceList" :key="index" @click="chooseFace(item)">{{item}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { InlineLoading } from 'vux'
export default {
  metaInfo: {
    title: '聊天'
  },
  components: {
    InlineLoading
  },
  data () {
    return {
      isFaceShow: false,
      faceHeight: 100,
      translateFace: 0,
      faceboxHeight: 0,
      faceList: ['😀', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '😇', '😐', '😑', '😶', '😏', '😣', '😥', '😮', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '😒', '😒', '😓', '😔', '😕', '😲', '😷', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😬', '😰', '😱', '😳', '😵', '😡', '😠', '💪', '👈', '👉', '✌', '👆', '👇', '✋', '👌', '👍', '👏', '👐', '🙏'],
      chatMsg: '',
      chatList: [],
      mineAccount: JSON.parse(sessionStorage.getItem('userAccount')),
      ServAccount: ''
    }
  },
  filters: {
    timeFormat (val) {
      const time = val.split('T')
      return `${time[0]} ${time[1]}`
    }
  },
  // 初次拉取消息
  async created () {
    const that = this
    const res = await this.$http.get('/ChatRecord', { toServantViewID: this.$route.params.id, pageIndex: 1 })
    this.ServAccount = res.data.Data.ServAccount
    this.chatList = res.data.Data.ChatHisList
    setTimeout(function () {
      that.goDown()
    }, 0)
    window.userTimer = setInterval(function () {
      that.chatRecordTimePoll()
    }, 5000)
  },
  mounted () {
    this.goDown()
    this.faceboxHeight = document.getElementById('chatFaceBox').offsetHeight // 获取表情高度
    this.translateFace = this.faceboxHeight + 5 // 表情上弹高度
  },
  destroyed () {
    clearInterval(window.userTimer)
  },
  methods: {
    // 页面逻辑函数
    chooseFace (face) {
      this.chatMsg = this.chatMsg + face
    },
    showFace () {
      const that = this
      this.isFaceShow = true
      this.translateFace = 0
      this.faceHeight = this.faceboxHeight + 100 // padding-bottom高度加上表情高度
      setTimeout(function () {
        that.goDown()
      }, 500)
    },
    hideFace () {
      this.isFaceShow = false
      this.translateFace = this.faceboxHeight + 5
      this.faceHeight = 100 // 还原padding-bottom初始高度
    },
    inputFocus () {
      const that = this
      this.hideFace()
      setTimeout(function () {
        that.goDown()
      }, 500)
    },
    goDown () {
      document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight
    },
    // 功能逻辑函数
    // 轮询聊天消息
    async chatRecordTimePoll () {
      const res = await this.$http.get('/ChatRecord', { toServantViewID: this.$route.params.id })
      const that = this
      if (res.data.Data.ChatHisList.length > 0) {
        res.data.Data.ChatHisList.map((item) => {
          this.chatList.push(item)
          setTimeout(function () {
            that.goDown()
          }, 500)
        })
      }
    },
    // 发送消息
    async sendMsg () {
      const that = this
      if (!this.isFaceShow) {
        document.getElementById('chatInput').focus()
      } else {
        this.showFace()
      }
      if (!this.chatMsg) return false
      let msg = {
        userAvatar: this.mineAccount.Avatar,
        userName: this.mineAccount.NickName,
        IsServantReceive: 1,
        Content: this.chatMsg,
        time: new Date()
      }
      const res = await this.$http.post('/ChatRecord', {
        ServantViewID: this.ServAccount.ViewID,
        MsgType: 1,
        Content: this.chatMsg
      })
      console.log(res)
      let _msg = Object.assign({}, msg)
      this.chatList.push(_msg)
      this.chatMsg = ''
      setTimeout(function () {
        that.goDown()
      }, 0)
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  z-index: 10;
  position: fixed;
  top: 0;
  .avatar {
    border-radius: 0;
  }
}

.chat-list {
  padding: 110px 0 100px;
}

.chat-item {
  padding: 10px;
}

.chat-item-time {
  padding: 5px 0 10px;
  text-align: center;
  span {
    padding: 2px 4px;
    font-size: 13px;
    border-radius: 3px;
    color: #fff;
    background: #d8d8d8;
  }
}

.chat-item-left {
  display: flex;
  flex-direction: row;
  .chat-item-content {
    margin-left: 15px;
    background: #fff;
    border: 1px solid #f3f1f1;
    &::before {
      content: "";
      position: absolute;
      left: -10px;
      top: 10px;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-right: 10px solid #fff;
      border-bottom: 8px solid transparent;
    }
  }
}

.chat-item-right {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  .chat-item-content {
    margin: 0 15px 0 10px;
    background: #90d936;
    border: 1px solid #87d02d;
    &::after {
      content: "";
      position: absolute;
      right: -10px;
      top: 10px;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-left: 10px solid #90d936;
      border-bottom: 8px solid transparent;
    }
  }
}

.chat-item-content {
  position: relative;
  text-align: justify;
  padding: 10px;
  max-width: 60%;
  color: #333;
  font-size: 15px;
  line-height: 20px;
  border-radius: 4px;
  box-sizing: border-box;
}

.chat-item-avatar {
  img {
    display: block;
    width: 40px;
    height: 40px;
  }
}

.chat-send-bar {
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  line-height: 1.6;
  background: #fff;
  .top {
    display: flex;
    align-items: center;
    .input {
      flex: 1;
      background: #fff;
      border: #eee 1px solid;
      border-radius: 5px;
      padding: 5px;
      line-height: 20px;
      box-sizing: border-box;
      font-size: 16px;
      overflow: auto;
      word-break: break-all;
      color: #333;
    }
    .send-msg {
      border: 0;
      color: #fff;
      font-size: 14px;
      background: #5CB700;
      height: 34px;
      line-height: 34px;
      padding: 0px 20px;
      border-radius: 5px;
      display: inline-block;
    }
    .iconfont {
      margin: 0 5px;
      font-size: 36px;
      color: #999;
    }
  }
  .chat-face-box {
    width: 100%;
    opacity: 1;
  }
}

.mask {
  position: fixed;
  z-index: 98;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: transparent;
}
</style>
