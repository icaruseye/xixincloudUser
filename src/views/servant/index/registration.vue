<template>
  <div class="wrapper">
    <!-- 排版表 -->
    <xx-calendar
      :tags="calendarTags"
      :loading="calendarLoading"
      @onClick="calendarItemClick"
      @changeMonth="changeMonth">
    </xx-calendar>
    <div class="schedule-list" v-if="list.length > 0">
      <!-- <div class="title">当前可选时段</div> -->
      <!-- <checker v-model="params.ScheduleID" default-item-class="schedule-item" selected-item-class="schedule-item-selected">
        <template v-for="(item, index) in list">
          <checker-item :value="item.ID" :key="index">
            <div class="item">
              <span>{{item.StartTime | timeFormat('HH:mm')}} - {{item.EndTime | timeFormat('HH:mm')}}</span>
              <i class="iconfont icon-succeed"></i>
            </div>
          </checker-item>
        </template>
      </checker> -->
      <template v-for="(item, index) in list">
        <div class="item" :key="index">
          <div class="text"></div>
          <div class="time">({{item.StartTime | timeFormat('HH:mm')}} - {{item.EndTime | timeFormat('HH:mm')}})</div>
          <div class="price">{{(item.RegistrationFee / 100).toFixed(2)}}元</div>
          <router-link v-if="item.ReserveNum - item.AlreadyReserveNum > 0" :to="`/organ/registration/order/${item.ScheduleID}`" class="btn">挂号</router-link>
          <button v-else disabled="disabled" class="btn disabled">已满</button>
        </div>
      </template>
    </div>
    <div v-else class="empty-box">当前日期没有可预约挂号</div>
  </div>
</template>

<script>
import { TransferDom, dateFormat, Checker, CheckerItem } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Checker,
    CheckerItem
  },
  props: {
    ViewID: String
  },
  filters: {
    timeFormat (value, m) {
      return dateFormat(new Date(value), m)
    }
  },
  data () {
    return {
      servantInfos: {},
      calendarTags: [],
      calendarLoading: false,
      currentDate: dateFormat(new Date(), 'YYYY-MM-DD'),
      list: [],
      params: {
        ScheduleID: null
      }
    }
  },
  mounted () {
    const _date = this.getAfterOneMonth(dateFormat(new Date(), 'YYYY-MM-DD'))
    this.getServantSchedule(dateFormat(new Date(), 'YYYY-MM-DD'))
    this.getScheduleList(_date.startTime, _date.endTime)
  },
  methods: {
    // 获取某一天排班详情
    async getServantSchedule (dateTime) {
      this.calendarLoading = true
      const res = await this.$http.get(`/Schedule/bespoke-registration?viewId=${this.ViewID}&dateTime=${dateTime}`)
      this.calendarLoading = false
      if (res.data.Code === 100000 && res.data.Data.RegistrationSchedules) {
        this.servantInfos = res.data.Data
        this.list = res.data.Data.RegistrationSchedules
      }
    },
    // 获取当月排班列表
    async getScheduleList (startTime, endTime) {
      const res = await this.$http.get(`/Schedule/IsNoSchedule-Register`, {
        startTime: startTime,
        endTime: endTime,
        viewId: this.ViewID
      })
      if (res.data.Code === 100000) {
        this.newCalendar = res.data.Data.length > 0
        let arr = []
        res.data.Data.map(i => {
          arr.push(dateFormat(i, 'YYYY-MM-DD'))
        })
        this.calendarTags = arr
      }
    },
    // 切换月份
    async changeMonth (item) {
      const dateTime = `${item.year}/${item.month}/1 00:00:00`
      console.log(dateTime)
      const _date = this.getAfterOneMonth(dateTime)
      this.getScheduleList(_date.startTime, _date.endTime)
    },
    // 选择某一天
    async calendarItemClick (dateTime) {
      this.currentDate = dateTime
      await this.getServantSchedule(dateTime)
    },
    getAfterOneMonth (dateTime) {
      let date = new Date(dateTime)
      console.log(new Date(dateTime))
      let newdate = new Date(dateTime)
      newdate.setDate(date.getDate() + 30)
      return {
        startTime: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`,
        endTime: `${newdate.getFullYear()}-${newdate.getMonth() + 1}-${newdate.getDate()} 00:00:00`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  background: #fff;
  margin-bottom: 60px;
}
.servant-panel_info {
  padding: 12px 8px 12px 12px;
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .left {
    padding: 0 10px;
    flex: 1;
    .name {
      font-size: 18px;
      color: #333;
    }
    .datas {
      font-size: 12px;
      color: #999;
      span {
        margin-right: 5px;
      }
    }
  }
}
.schedule-list {
  padding: 15px;
  border-top: 1px solid #f1f1f1;
  .title {
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
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
// .schedule-item {
//   padding: 0 20px;
//   margin-bottom: 10px;
//   width: 100%;
//   height: 40px;
//   line-height: 40px;
//   box-sizing: border-box;
//   font-size: 14px;
//   color: #999;
//   background: #f1f1f1;
//   border-radius: 4px;
//   .item {
//     display: flex;
//     justify-content: space-between;
//     .iconfont {
//       color: #ccc;
//     }
//   }
//   &.schedule-item-selected {
//     background: #3ecccc;
//     color: #fff;
//     .item {
//       .iconfont {
//         display: block;
//         color: #fff;
//       }
//     }
//   }
// }
</style>
