<template>
  <div>
    <div style="position:fixed;top:0;width:100%;z-index:99">
      <xx-nav-bar
        left-text="返回"
        :right-text="userAccount.NickName"
        :avatar="userAccount.Avatar | transformImgUrl"
        @click-left="onNavbarClickLeft">
      </xx-nav-bar>
      <div class="user-info-panel">
        <router-link :to="'/servant/service/'+ ServAccount.ViewID">
          <img class="avatar" :src="ServAccount.Avatar | transformImgUrl" alt="">
        </router-link>
        <div style="flex:1">
          <div class="name">{{ServAccount.NickName}}</div>
        </div>
        <router-link :to="'/servant/service/'+ ServAccount.ViewID" class="btn">购买服务</router-link>
      </div>
    </div>
    <div class="chat-list" id="chatList" :style="{paddingBottom : faceHeight + 'px'}">
      <div class="tips-panel">
        <div class="left">服务说明：此聊天窗口只解答服务包售前疑惑，不解答图文咨询的内容</div>
        <div class="right" @click="isShowTips = true">更多 <i class="iconfont icon-jiantouyou"></i></div>
      </div>
      <template v-for="(item, index) in chatList">
        <div class="chat-item" :key="index">
          <div class="chat-item-time" v-if="item.SendTime"><span>{{item.SendTime | timeFormat}}</span></div>
          <div :class="[item.IsServantReceive ? 'chat-item-right' : 'chat-item-left']">
            <div class="chat-item-avatar" v-if="!item.IsServantReceive">
              <img v-if="item.MsgType !== 8" :src="ServAccount.Avatar | transformImgUrl">
              <img v-if="item.MsgType === 8" src="@/assets/images/kefu.png">
            </div>
            <div class="chat-item-avatar" v-if="item.IsServantReceive">
              <img :src="mineAccount.Avatar | transformImgUrl">
            </div>
            <div class="chat-item-content">
              {{item.Content}}<span v-if="item.MsgType === 8">（助理回复）</span>
            </div>
            <inline-loading v-show="item.loading"></inline-loading>
          </div>
      </div>
      </template>
    </div>
    <div class="mask" v-show="isFaceShow" @click="hideFace"></div>
    <!-- :style="{ transform: 'translateY('+ translateFace +'px)' }" -->
    <div class="chat-send-bar">
      <div class="top">
        <input class="input" type="text" id="chatInput"
        v-model="chatMsg"
        @click="isFaceShow = false"
        @focus="inputFocus"
        @keyup.enter="sendMsg">
        <!-- <i class="iconfont icon-biaoqing1" @click="showFace"></i> -->
        <button type="button" class="send-msg" @click="sendMsg">发送</button>
      </div>
      <!-- <div class="chat-face-box" id="chatFaceBox">
        <div class="" style="font-size:22px;text-align:justify">
          <a href="javascript:;" style="margin:0 3px;" v-for="(item, index) in faceList" :key="index" @click="chooseFace(item)">{{item}}</a>
        </div>
      </div> -->
    </div>
    <div v-transfer-dom>
      <popup
        style="background:#fff"
        v-model="isShowTips">
        <div class="tips-popup">
          <div class="title">服务说明</div>
          <div class="content">
            <ul>
              <li>• 此聊天窗口只解答服务包售前疑惑。</li>
              <li>• 不解答图文咨询的内容。</li>
              <li>• 若需要咨询请购买服务者图文咨询服务包。</li>
              <li>• 对此给您带来的不便，敬请谅解。</li>
            </ul>
          </div>
          <div class="btn" @click="isShowTips = false">知道了</div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { InlineLoading, Sticky, Popup, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    InlineLoading,
    Sticky,
    Popup
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ])
  },
  data () {
    return {
      isShowTips: false,
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
  // 初次拉取消息
  async created () {
    const that = this
    const res = await this.$http.get('/ChatRecord', { toServantViewID: this.$route.params.id, pageIndex: 1 })
    this.ServAccount = res.data.Data.ServAccount
    this.chatList = res.data.Data.ChatHisList
    setTimeout(function () {
      that.goDown()
    }, 0)
    const userTimer = setInterval(() => {
      this.chatRecordTimePoll()
    }, 5000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(userTimer)
    })
  },
  mounted () {
    this.goDown()
    // this.faceboxHeight = document.getElementById('chatFaceBox').offsetHeight // 获取表情高度
    // this.translateFace = this.faceboxHeight + 5 // 表情上弹高度
  },
  methods: {
    // 页面逻辑函数
    chooseFace (face) {
      this.chatMsg = this.chatMsg + face
    },
    showFace () {
      this.isFaceShow = true
      this.translateFace = 0
      this.faceHeight = this.faceboxHeight + 100 // padding-bottom高度加上表情高度
      this.goDown()
    },
    hideFace () {
      this.isFaceShow = false
      this.translateFace = this.faceboxHeight + 5
      this.faceHeight = 100 // 还原padding-bottom初始高度
    },
    inputFocus () {
      this.hideFace()
      this.goDown()
    },
    goDown () {
      this.$nextTick(() => {
        document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight
      })
    },
    // 功能逻辑函数
    // 轮询聊天消息
    async chatRecordTimePoll () {
      const res = await this.$http.get('/ChatRecord', { toServantViewID: this.$route.params.id })
      const that = this
      if (res.data.Code === 100000) {
        if (res.data.Data.ChatHisList.length > 0) {
          res.data.Data.ChatHisList.map((item) => {
            this.chatList.push(item)
            setTimeout(function () {
              that.goDown()
            }, 500)
          })
        }
      } else {
        this.$vux.toast.text('出错了')
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
      if (res.data.Code !== 100000) {
        this.$vux.toast.text('出错了')
        return false
      }
      let _msg = Object.assign({}, msg)
      this.chatList.push(_msg)
      this.chatMsg = ''
      setTimeout(function () {
        that.goDown()
      }, 0)
    },
    onNavbarClickLeft () {
      this.$router.push('/systemMail')
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  z-index: 10;
  .avatar {
    border-radius: 0;
  }
}

.chat-list {
  padding: 154px 0 100px;
}

.chat-item {
  padding: 10px;
}

.chat-item-time {
  padding: 5px 0 10px;
  text-align: center;
  span {
    font-size: 10px;
    color: #999;
  }
}

.chat-item-left {
  display: flex;
  flex-direction: row;
  .chat-item-content {
    word-break: break-all;
    margin-left: 15px;
    background: #FFEDD1;
    border: 1px solid #FFD797;
    &::before {
      content: '';
      position: absolute;
      border-color: transparent transparent #FFD797 #FFD797;
      background-color: #FFEDD1;
      top: 10px;
      width: 10px;
      height: 10px;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      border-style: solid;
      border-width: 1px;
      left: -6px;
    }
  }
}

.chat-item-right {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  .chat-item-content {
    margin: 0 15px 0 10px;
    background: #fff;
    border: 1px solid #fff;
    word-break: break-all;
    &::after {
      content: "";
      position: absolute;
      right: -10px;
      top: 10px;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-left: 10px solid #fff;
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
  word-break: break-all;
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
  .top {
    display: flex;
    align-items: center;
    height: 35px;
    .input {
      flex: 1;
      background: #fff;
      border: #eee 1px solid;
      border-radius: 5px;
      padding: 5px;
      height: 100%;
      line-height: 35px;
      box-sizing: border-box;
      font-size: 16px;
      overflow: auto;
      word-break: break-all;
      color: #333;
      margin-right: 5px;
    }
    .send-msg {
      border: 0;
      color: #fff;
      font-size: 14px;
      background: #3ECCCC;
      height: 35px;
      line-height: 35px;
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

.user-info-panel {
  display: flex;
  padding: 22px 12px;
  background: #fff;
  align-items: center;
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
  .name {
    font-size: 15px;
    color: #666;
  }
  .btn {
    display: block;
    width: 70px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background: #F8A519;
    color: #fff;
    font-size: 15px;
    border: 0;
    border-radius: 2px;
  }
}

.tips-panel {
  padding: 5px 0 5px 5px;
  display: flex;
  align-items: center;
  margin: 15px;
  background: #FFFBF2;
  border: 1px solid #FFDCA1;
  border-radius: 8px;
  font-size: 10px;
  color: #666;
  line-height: 25px;
  .left {
    flex: 1;
  }
  .right {
    margin-left: 10px;
    width: 45px;
    .iconfont {
      font-size: 12px;
    }
  }
}

.tips-popup {
  .title {
    text-align: center;
    padding: 30px 35px 20px 35px;
    font-size: 15px;
    color: #666;
  }
  .content {
    color: #A6A6A6;
    font-size: 14px;
    padding: 0 35px 39px;
    li {
      line-height: 2.5;
    }
  }
  .btn {
    height: 52px;
    line-height: 52px;
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #666;
    border-top: 1px solid #E7E7E7;
  }
}
</style>
