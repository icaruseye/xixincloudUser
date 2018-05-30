<template>
  <div>
    <div class="user-info">
      <img class="avatar" src="https://img3.doubanio.com/icon/u144889470-14.jpg" alt="">
      <span class="name">青卿</span>
    </div>
    <div class="chat-list" id="chatList" :style="{paddingBottom : faceHeight + 'px'}">
      <template v-for="(item, index) in chatList">
        <div class="chat-item" :key="index">
          <div class="chat-item-time" v-if="item.time"><span>{{item.time}}</span></div>
          <div :class="[item.isMe ? 'chat-item-right' : 'chat-item-left']">
            <div class="chat-item-avatar">
              <img :src="item.userAvatar" alt="">
            </div>
            <div class="chat-item-content">
              {{item.content}}
            </div>
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
export default {
  data () {
    return {
      isFaceShow: false,
      faceHeight: 100,
      translateFace: 0,
      faceboxHeight: 0,
      faceList: ['😀', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '😇', '😐', '😑', '😶', '😏', '😣', '😥', '😮', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '😒', '😒', '😓', '😔', '😕', '😲', '😷', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😬', '😰', '😱', '😳', '😵', '😡', '😠', '💪', '👈', '👉', '✌', '👆', '👇', '✋', '👌', '👍', '👏', '👐', '🙏'],
      chatMsg: '',
      chatList: [{
        userid: 99,
        userAvatar: 'https://img3.doubanio.com/icon/u144889470-14.jpg',
        userName: '青卿',
        isMe: false,
        content: '一切有为法，如梦幻泡影；如露亦如电，应作如是观。',
        time: '14:23'
      }, {
        userid: 66,
        userAvatar: 'https://img3.doubanio.com/icon/u53078059-35.jpg',
        userName: 'lisa',
        isMe: true,
        content: '俺也一样',
        time: ''
      }, {
        userid: 66,
        userAvatar: 'https://img3.doubanio.com/icon/u53078059-35.jpg',
        userName: 'lisa',
        isMe: true,
        content: '俺也一样',
        time: ''
      }, {
        userid: 66,
        userAvatar: 'https://img3.doubanio.com/icon/u53078059-35.jpg',
        userName: 'lisa',
        isMe: true,
        content: '俺也一样',
        time: ''
      }, {
        userid: 66,
        userAvatar: 'https://img3.doubanio.com/icon/u53078059-35.jpg',
        userName: 'lisa',
        isMe: true,
        content: '俺也一样',
        time: ''
      }, {
        userid: 66,
        userAvatar: 'https://img3.doubanio.com/icon/u53078059-35.jpg',
        userName: 'lisa',
        isMe: true,
        content: '俺也一样',
        time: ''
      }, {
        userid: 66,
        userAvatar: 'https://img3.doubanio.com/icon/u53078059-35.jpg',
        userName: 'lisa',
        isMe: true,
        content: '俺也一样',
        time: ''
      }, {
        userid: 66,
        userAvatar: 'https://img3.doubanio.com/icon/u53078059-35.jpg',
        userName: 'lisa',
        isMe: true,
        content: '俺也一样',
        time: ''
      }, {
        userid: 66,
        userAvatar: 'https://img3.doubanio.com/icon/u53078059-35.jpg',
        userName: 'lisa',
        isMe: true,
        content: '俺也1一样',
        time: ''
      }]
    }
  },
  mounted () {
    this.goDown()
    this.faceboxHeight = document.getElementById('chatFaceBox').offsetHeight // 获取表情高度
    this.translateFace = this.faceboxHeight + 5 // 表情上弹高度
  },
  methods: {
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
      }, 100)
    },
    hideFace () {
      this.isFaceShow = false
      this.translateFace = this.faceboxHeight + 7
      this.faceHeight = 100 // 还原padding-bottom初始高度
    },
    inputFocus () {
      const that = this
      this.hideFace()
      console.log('inputFocus')
      setTimeout(function () {
        that.goDown()
      }, 100)
    },
    goDown () {
      document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight
    },
    sendMsg () {
      const that = this
      if (!this.isFaceShow) {
        document.getElementById('chatInput').focus()
      } else {
        this.showFace()
      }
      if (!this.chatMsg) return false
      let msg = {
        userid: 99,
        userAvatar: 'https://img3.doubanio.com/icon/u53078059-35.jpg',
        userName: '123',
        isMe: true,
        content: this.chatMsg,
        time: '14:23'
      }
      let _msg = Object.assign({}, msg)
      this.chatList.push(_msg)
      this.chatMsg = ''
      setTimeout(function () {
        that.goDown()
      }, 100)
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
  padding: 5px 0;
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
  flex-direction: row-reverse;
  .chat-item-content {
    margin-right: 15px;
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
  font-size: 16px;
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
  background: #fff;
  line-height: 1.6;
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
