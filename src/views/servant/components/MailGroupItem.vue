<template>
  <div class="main_item_container" @click="redirectToList">
    <div class="left">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="msgType|xxSiteNoticeIconFilter"></use>
      </svg>
    </div>
    <div class="right">
      <h3 class="title text-overflow-1">
        {{msgType|xxSiteNoticeTypeTitleFilter}}
      </h3>
      <p class="desc text-overflow-1">
        <template v-if="UnreadCount > 0">
          {{Title}}
        </template>
        <template v-else>
          没有未读的{{msgType|xxSiteNoticeTypeTitleFilter}}
        </template>
      </p>
      <span class="time">
        <template v-if="UnreadCount > 0">
          {{CreateTime | timeFormat}}
        </template>
      </span>
      <i class="mail_num_icon" v-if="UnreadCount > 0">{{UnreadCount}}</i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    msgType: {
      type: Number,
      default: 1
    }
  },
  filters: {
  },
  data () {
    return {
      UnreadCount: 0,
      Title: '',
      CreateTime: ''
    }
  },
  created () {
    this.getLatestNews()
  },
  methods: {
    redirectToList () {
      this.$router.push(`/systemMail/${this.msgType}/list`)
    },
    getLatestNews () {
      this.$http.get(`/SiteNotice/Count?type=${this.msgType}`).then(result => {
        this.Title = result.data.Data.Title
        this.UnreadCount = result.data.Data.UnreadCount
        this.CreateTime = result.data.Data.CreateTime
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main_item_container
{
  position: relative;
  display: flex;
  flex-flow: nowrap;
  height: 70px;
  background-color: #fff;
  &::after
  {
    position: absolute;
    content: '';
    display: block;
    height: 1px;
    bottom: 0;
    left: 58px;
    right: 0;
    background-color: RGBA(0, 180, 171, .2);
    transform: scaleY(.5)
  }
  &:last-child:after
  {
    display: none;
  }
  .left
  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 58px;
    .icon
    {
      height: 30px;
      width: 30px;
      border-radius: 15px;
    }
  }
  .right
  {
    position: relative;
    display: flex;
    flex: 1;
    flex-flow: column;
    justify-content: center;
    padding-right: 110px;
    .title
    {
      color: #333;
      font-size: 16px;
      width: 100%;
      font-weight: normal;
      height: 24px;
      line-height: 24px;
    }
    .desc
    {
      font-size: 12px;
      color: #999;
      height: 20px;
      line-height: 20px;
    }
    .time
    {
      position: absolute;
      right: 10px;
      top: 15px;
      font-size: 12px;
      color: #999;
      line-height: 24px;
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
  }
}
</style>

