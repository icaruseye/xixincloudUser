<template>
  <div>
    <div class="has-tabbar">
      <sticky>
        <router-link class="system_message_entrance_container" to="/systemMail">
          <div class="avatar_container"><img :src="userAccount.Avatar | transformImgUrl" alt=""></div>
          <div class="content">
            {{userInfo.RealName}}
          </div>
          <div class="icon_box">
            <div class="sysetem_message_img_icon">
              <img src="@/assets/images/ic_message.png" alt="">
              <i v-if="UnreadSiteNotice > 0" class="new_sysetem_message_icon"></i>
            </div>
          </div>
        </router-link>
      </sticky>
      <div v-if="servantList.length > 0" class="tabbox-list vux-1px-b vux-1px-t mt10px">
        <template v-for="(item, index) in servantList">
          <div class="item vux-1px-b" @click="goServant(item.FriendViewID, item.FriendID)" :key="index">
            <div><img class="avatar" :src="item.FriendAvatar | transformImgUrl" alt=""></div>
            <div class="mid">
              <div class="">{{item.FriendName}}</div>
            </div>
          </div>
        </template>
      </div>
      <xx-occupied-box v-if="flag1">
        <p>还没有添加管家</p>
      </xx-occupied-box>
      <!-- 消息列表 -->
      <!-- <div class="tabbox" v-show="tabIndex === 1">
        <div class="tabbox-list vux-1px-b vux-1px-t" :class="{emptyList: flag2}">
          <template v-for="(item, index) in msgList">
            <mail-list-item :count="1" :key="index" @click="goChat(item.FriendViewID, index)">{{item.Message}}</mail-list-item>
          </template>
          <xxOccupiedBox v-if="flag2">
            <p>没有消息</p>
          </xxOccupiedBox>
        </div>
      </div> -->
    </div>
    <xx-tabbar></xx-tabbar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { Tab, TabItem, Sticky } from 'vux'
import MailListItem from './components/MailListItem'
export default {
  components: {
    Sticky,
    Tab,
    TabItem,
    MailListItem
  },
  data () {
    return {
      flag1: false,
      flag2: false,
      tabIndex: 0,
      servantList: [],
      UnreadSiteNotice: '',
      occupiedText: ''
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo'
    ])
  },
  created () {
    this.getData()
    this.getUnreadSiteNotice()
  },
  methods: {
    onItemClick (index) {
      this.tabIndex = index
    },
    goChat (id) {
      this.$router.push(`/servant/chat/${id}`)
    },
    goServant (viewID, ID) {
      this.$router.push(`/servant/service/${viewID}`)
    },
    async getData () {
      const res = await this.$http.get('/ContactFriends', { Page: 1, Size: 10 })
      if (res.data.Code === 100000) {
        this.servantList = res.data.Data
        this.flag1 = this.servantList.length === 0
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    async getUnreadSiteNotice () {
      const res = await this.$http.get('/SiteNotice/Count/Unread')
      if (res.data.Code === 100000) {
        this.UnreadSiteNotice = res.data.Data === 0 ? '' : res.data.Data
      } else {
        this.$vux.toast.text('出错了')
      }
    }
  }
}
</script>

<style lang="less">
.system_message_entrance_container
{
  display: flex;
  height: 50px;
  width: 100%;
  flex-flow: nowrap;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(153, 153, 153, 0.5);
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
  margin: 3px 0 15px 0;
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
</style>
