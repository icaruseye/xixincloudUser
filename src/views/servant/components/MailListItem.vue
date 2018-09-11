<template>
  <div class="main_item_container" @click="redirectToDetail(id)">
    <div class="left">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="msgType|xxSiteNoticeIconFilter"></use>
      </svg>
    </div>
    <div class="right">
      <h3 class="title text-overflow-1">
        {{title | xxTextTruncateFilter}}
      </h3>
      <p class="desc text-overflow-1"><slot></slot></p>
      <span class="time">{{createTime | timeFormat}}</span>
      <i class="mail_num_icon" v-if="count != null">{{count}}</i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: null,
    title: '',
    count: null,
    createTime: '',
    msgType: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
    }
  },
  methods: {
    redirectToDetail () {
      this.$router.push(`/mail/${this.id}/detail`)
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
.main_item_container::after
{
  position: absolute;
  content: '';
  display: block;
  height: 1px;
  bottom: 0;
  left: 12px;
  right: 12px;
  background-color: RGBA(0, 180, 171, .2);
  transform: scaleY(.5)
}
.main_item_container:last-child:after
{
  display: none;
}
</style>