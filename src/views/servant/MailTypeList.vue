<template>
  <div>
    <div v-if="flag">
      <xx-nav-bar
        left-text="返回"
        @click-left="onNavbarClickLeft">
      </xx-nav-bar>
      <div style="margin-top:5px;">
        <mail-group-item :msgType="1"></mail-group-item>
        <mail-group-item :msgType="2"></mail-group-item>
        <mail-group-item :msgType="4"></mail-group-item>
      </div>
      <!-- 消息列表 -->
      <div class="tabbox">
        <div class="tabbox-list vux-1px-b vux-1px-t">
          <template v-for="(item, index) in chatList">
            <div class="item vux-1px-b" @click="goChat(item.ServantViewID)" :key="index">
              <div><img class="avatar" :src="item.ServantAvatar | transformImgUrl" alt=""></div>
              <div class="mid">
                <div style="color:#666">{{item.ServantName}}</div>
                <div style="font-size:13px;color:#999">{{item.NewestContent}}</div>
              </div>
              <div style="width:30px;display:flex;algin-items:center">
                <i class="mail_num_icon" v-show="item.UnreadCount > 0">{{item.UnreadCount}}</i>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <xx-occupied-box v-else>
      正在请求数据…
    </xx-occupied-box>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import MailListItem from './components/MailListItem'
import MailGroupItem from './components/MailGroupItem'
export default {
  components: {
    MailListItem,
    MailGroupItem
  },
  computed: {
    ...mapGetters([
      'unreadNum'
    ])
  },
  watch: {
    unreadNum (val) {
      if (val) {
        this.getChatList()
      }
    }
  },
  data () {
    return {
      flag: false,
      chatList: []
    }
  },
  created () {
    this.getChatList()
  },
  methods: {
    async getChatList () {
      const res = await this.$http.get('/ContactFriends', { Page: 1, Size: 10 })
      if (res.data.Code === 100000) {
        this.chatList = res.data.Data
        this.flag = true
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    goChat (id) {
      this.$router.push(`/servant/chat/${id}`)
    },
    onNavbarClickLeft () {
      this.$router.push('/servant')
    }
  }
}
</script>

<style lang="less" scoped>
.system_message_entrance_container
{
  display: flex;
  height: 50px;
  width: 100%;
  flex-flow: nowrap;
  background-color: #fff;
  padding-left: 5px; 
  box-sizing: border-box;
  .avatar_container
  {
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex: 0 0 70px;
    img {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .content
  {
    display: flex;
    flex: 1;
    align-items: center;
    color: #333333;
    font-size: 18px;
    .professional_title
    {
      padding: 0 15px;
      color: #999;
      font-size: 12px;
    }
  }
  .icon_box
  {
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex: 0 0 50px;
    .sysetem_message_img_icon {
      position: relative;
      display: block;
      width: 20px;
      .new_sysetem_message_icon
      {
        position: absolute;
        display: block;
        top: 0;
        right: 0;
        width: 6px;
        height: 6px;
        background-color: #FF3939;
        border-radius: 50%;
      }
    }
  }
}
.vux-1px-b:after {
  border-bottom: 1px solid #e5e5e5;
}

.vux-1px-t::before {
  border-top: 1px solid #e5e5e5;
}

.tabbox-list {
  padding: 15px;
  background: #fff;
  border-color: #E5E5E5;
  margin: 10px 0 15px 0;
  .item {
    display: flex;
    padding: 15px 10px;
    align-items: center;
    color: #666;
    &.vux-1px-b:after {
      border-bottom: 1px solid #d9f7f5;
    }
    &:last-child.vux-1px-b:after {
      border-bottom: 0;
    }
    .mid {
      flex: 1;
      .name {
        color: #3ac7f5;
      }
      .text {
        width: 200px;
        font-size: 14px;
        color: #999;
      }
    }
    .iconfont {
      color: #f8a519;
    }
  }
}
.avatar {
  display: block;
  margin-right: 10px;
  width: 40px;
  height: 40px;
}

.mail_num_icon
{
  position: absolute;
  padding: 0 5px;
  height: 16px;
  display: block;
  font-style: normal;
  background-color: #e7534a;
  border-radius: 8px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 16px;
  right: 10px;
  top: 40px;
}
</style>

