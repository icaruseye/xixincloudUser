<template>
  <div>
    <div class="has-tabbar">
      <div class="banner">
      </div>
      <sticky
        ref="sticky"
        :offset="0"
        :check-sticky-support="false">
        <tab :line-width="2">
          <tab-item selected @on-item-click="onItemClick">我的管家</tab-item>
          <tab-item @on-item-click="onItemClick" :badge-label="UnreadSiteNotice">消息列表</tab-item>
        </tab>
      </sticky>
      <!-- 我的管家 -->
      <div class="tabbox" v-show="tabIndex === 0">
        <div class="tabbox-list vux-1px-b" :class="{emptyList: flag1}">
          <template v-for="(item, index) in servantList">
            <div class="item vux-1px-b" @click="goServant(item.FriendViewID, item.FriendID)" :key="index">
              <div><img class="avatar" :src="item.FriendAvatar | transformImgUrl" alt=""></div>
              <div class="mid">
                <div class="">{{item.FriendName}}<span class="tag">健康管家</span></div>
              </div>
            </div>
          </template>
          <xxOccupiedBox v-if="flag1">
            <p>还未添加管家</p>
          </xxOccupiedBox>
        </div>
      </div>
      <!-- 消息列表 -->
      <div class="tabbox" v-show="tabIndex === 1">
        <div class="tabbox-list vux-1px-b vux-1px-t" :class="{emptyList: flag2}">
          <template v-for="(item, index) in msgList">
            <mail-list-item :count="1" :key="index" @click="goChat(item.FriendViewID, index)">{{item.Message}}</mail-list-item>
          </template>
          <xxOccupiedBox v-if="flag2">
            <p>没有消息</p>
          </xxOccupiedBox>
        </div>
      </div>
    </div>
    <xx-tabbar></xx-tabbar>
  </div>
</template>

<script>
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
      msgList: [],
      UnreadSiteNotice: ''
    }
  },
  created () {
    this.getData()
    this.getSiteNoticeList()
    this.getUnreadSiteNotice()
  },
  methods: {
    onItemClick (index) {
      console.log(index)
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
      }
    },
    async getSiteNoticeList () {
      const res = await this.$http.get('/SiteNoticeList')
      if (res.data.Code === 100000) {
        this.msgList = res.data.Data
        this.flag2 = this.msgList.length === 0
      }
    },
    async getUnreadSiteNotice () {
      const res = await this.$http.get('/SiteNotice/Count/Unread')
      if (res.data.Code === 100000) {
        this.UnreadSiteNotice = res.data.Data === 0 ? '' : res.data.Data
      }
    }
  }
}
</script>

<style lang="less">
.vux-1px-b:after {
  border-bottom: 1px solid #e5e5e5;
}

.vux-1px-t::before {
  border-top: 1px solid #e5e5e5;
}

.banner {
  font-size: 0;
  width: 100%;
  height: 155px;
  background: url(../../assets/images/banner-2.png) no-repeat center;
  background-size: cover;
}

.tabbox {
  .tabbox-list {
    position: relative;
    padding: 15px;
    background: #fff;
    border-color: #E5E5E5;
    margin-bottom: 15px;
    &.emptyList {
      min-height: 200px;
    }
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
          color: @theme-color;
        }
        .text {
          width: 200px;
          font-size: 14px;
          color: #999;
        }
        .tag {
          margin-left: 5px;
          font-size: 12px;
          color: @theme-color;
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
}


</style>
