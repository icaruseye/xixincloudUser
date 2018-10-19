<template>
  <div class="wrapper">
    <div class="servant_info">
      <img class="avatar" :src="servantInfos.Avatar | transformImgUrl" alt="">
      <div class="content">
        <div class="name">{{servantInfos.Name}}</div>
      </div>
    </div>
    <xx-calendar
      :currentDate="currentDate"
      :loading="calendarLoading"
      @onClick="calendarItemClick">
    </xx-calendar>
    <div class="servant_list" v-if="list.length > 0">
      <template v-for="(item, index) in list">
        <div class="item" :key="index">
          <div class="text"></div>
          <div class="time">({{item.StartTime | dateFormat('HH:mm')}} - {{item.EndTime | dateFormat('HH:mm')}})</div>
          <div class="price">{{(item.RegistrationFee / 100).toFixed(2)}}元</div>
          <router-link v-if="item.ReserveNum > 0" :to="`/organ/registration/order/${item.ScheduleID}`" class="btn">挂号</router-link>
          <button v-else disabled="disabled" class="btn disabled">已满</button>
        </div>
      </template>
    </div>
    <div v-else class="empty-box" style="background:#fff;margin-top:10px">
      暂无挂号
    </div>
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
      servantInfos: {},
      list: []
    }
  },
  created () {
  },
  computed: {
    viewId () {
      return this.$route.params.id
    },
    currentDate () {
      return new Date(this.$route.query.date)
    }
  },
  mounted () {
    this.getServantSchedule(dateFormat(this.currentDate, 'YYYY-MM-DD'))
  },
  methods: {
    async getServantSchedule (dateTime) {
      this.$vux.loading.show()
      const res = await this.$http.get(`/Schedule/bespoke-registration?viewId=${this.viewId}&dateTime=${dateTime}`)
      this.$vux.loading.hide()
      if (res.data.Code === 100000) {
        this.servantInfos = res.data.Data
        this.list = res.data.Data.RegistrationSchedules
      }
    },
    // 选择某一天
    async calendarItemClick (dateTime) {
      this.currentDate = dateTime
      this.calendarLoading = true
      await this.getServantSchedule(dateTime)
      this.calendarLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.servant_info {
  padding: 15px 20px;
  background: #fff;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
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
}
.servant_list {
  border-top: 1px solid RGBA(0, 180, 171, .1);
  background: #fff;
  .item {
    display: flex;
    background: #fff;
    align-items: center;
    padding: 20px 10px;
    border-bottom: 1px solid RGBA(0, 180, 171, .1);
    &:last-child {
      border: 0;
    }
    .text {
      font-size: 15px;
      color: #666;
    }
    .time {
      margin: 0 5px;
      flex: 1;
      font-size: 12px;
      color: #999
    }
    .price {
      font-size: 15px;
      color: #FF5F66;
    }
    .btn {
      margin-left: 15px;
      background: #F8A519;
      color: #fff;
      padding: 0 10px;
      border-radius: 2px;
      border: 0;
      &:disabled {
        background: #ccc;
      }
    }
  }
}
</style>
