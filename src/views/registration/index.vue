<template>
  <div class="wrapper">
    <div class="calendar_wrap">
      <xx-calendar
        :onlyWeek="true"
        :loading="calendarLoading"
        @onClick="calendarItemClick">
      </xx-calendar>
    </div>
    <template v-for="(item, index) in list">
      <div class="registration_wrap" :key="index">
        <div class="title">
          <div class="text am" :class="`${index%2 === 0 ? 'am' : 'pm'}`">{{item.Name}}</div>
          <div class="time">{{item.StartTime | dateFormat('HH:mm')}} - {{item.EndTime | dateFormat('HH:mm')}}</div>
        </div>
        <div class="list" v-if="item.ScheduleMedicls.length > 0">
          <template v-for="(subItem, subIndex) in item.ScheduleMedicls">
            <div class="item" :key="subIndex">
              <img class="avatar" :src="subItem.Avatar | transformImgUrl" alt="">
              <div class="content">
                <div class="name">{{subItem.Name}}</div>
                <div class="tags"><span v-for="(tagItem, tagIndex) in subItem.Tags" :key="tagIndex">{{tagItem}}</span></div>
              </div>
              <router-link :to="`/organ/registration/servant/${subItem.ViewId}?date=${currentDate}`" class="btn">挂号</router-link>
            </div>
          </template>
        </div>
        <div v-else class="empty-box" style="background:#fff;">
          暂无挂号信息
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  filters: {
    dateFormat (val, format = 'YYYY-MM-DD HH:mm:ss') {
      return dateFormat(new Date(val), format)
    }
  },
  data () {
    return {
      calendarLoading: false,
      currentDate: null,
      list: []
    }
  },
  computed: {
    OrganizationID () {
      return this.$route.params.id
    }
  },
  created () {
  },
  mounted () {
    this.getScheduleDetail(dateFormat(new Date(), 'YYYY-MM-DD'))
  },
  methods: {
    // 选择某一天
    async calendarItemClick (dateTime) {
      this.calendarLoading = true
      await this.getScheduleDetail(dateTime)
      this.calendarLoading = false
    },
    async getScheduleDetail (dateTime) {
      this.currentDate = dateTime
      this.$vux.loading.show()
      const res = await this.$http.get(`/Registration/ServantOrganization`, {
        dateTime: dateTime,
        orgID: this.OrganizationID
      })
      if (res.data.Code === 100000) {
        this.list = res.data.Data
      }
      this.$vux.loading.hide()
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  background: rgba(255, 255, 255, .5);
  min-height: 100vh;
  overflow: hidden;
}
.calendar_wrap {
  background: #fff;
  margin: 15px;
  padding: 5px;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid rgba(241, 241, 241, .4);
}
.registration_wrap {
  padding-top: 11px;
  .title {
    display: flex;
    height: 25px;
    line-height: 25px;
    .text {
      display: block;
      width: 60px;
      text-align: center;
      color: #fff;
      border-radius: 0 25px 0 0;
      &.am {
       background: #6ED8E7;
      }
      &.pm {
        background: #3AC7F5;
      }
    }
    .time {
      padding-left: 10px;
      font-size: 12px;
      color: #999;
    }
  }
  .list {
    background: #fff;
    .item {
      padding: 30px 10px 20px 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid RGBA(0, 180, 171, .1);
      .avatar {
        margin-right: 10px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
      }
      .content {
        flex: 1;
      }
      .name {
        font-size: 18px;
        color: #333;
      }
      .tags {
        display: flex;
        flex-flow: wrap;
        span {
          margin-right: 5px;
          margin-top: 5px;
          padding: 0 5px;
          height: 20px;
          line-height: 20px;
          display: block;
          border-radius: 10px;
          font-size: 12px;
          border: 1px solid #3ecccc;
          color: #3ecccc;
        }
      }
      .btn {
        background: #F8A519;
        color: #fff;
        font-size: 15px;
        padding: 0 10px;
        border-radius: 2px;
      }
    }
  }
}
</style>
