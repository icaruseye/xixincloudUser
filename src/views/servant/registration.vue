<template>
  <div class="wrapper">
    <!-- 基本信息 -->
    <div class="servant-panel_info">
      <img class="avatar" :src="servantInfos.Avatar | transformImgUrl">
      <div class="left">
        <div class="name">{{servantInfos.ViewName}}</div>
        <div class="datas"><span>普通门诊 <span style="color:#F8A519">￥12</span></span><span>剩余 <span style="color:#3ECCCC">12</span></span></div>
      </div>
    </div>
    <div style="background:#f6f6f6;height:5px;width:100%;"></div>
    <!-- 排版表 -->
    <xx-calendar
      :tags="calendarTags"
      :loading="calendarLoading"
      @onClick="calendarItemClick"
      @changeMonth="changeMonth">
    </xx-calendar>
    <div style="background:#f6f6f6;height:5px;width:100%;"></div>
    <div class="schedule-list" v-if="scheduleDetailList.length > 0">
      <div class="title">当前可选时段</div>
      <checker v-model="params.ScheduleID" default-item-class="schedule-item" selected-item-class="schedule-item-selected">
        <template v-for="(item, index) in scheduleDetailList">
          <checker-item :value="item.ID" :key="index">
            <div class="item">
              <span>{{item.StartTime | timeFormat('HH:mm')}} - {{item.EndTime | timeFormat('HH:mm')}}</span>
              <i class="iconfont icon-succeed"></i>
            </div>
          </checker-item>
        </template>
      </checker>
    </div>
    <div v-else class="empty-box">当前日期没有排班</div>
    <button type="button" class="weui-btn weui-btn-bottom weui-btn_primary">预约挂号</button>
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
      scheduleDetailList: [],
      params: {
        ScheduleID: null
      }
    }
  },
  computed: {
    ViewID () {
      return this.$route.params.id
    }
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const _deta = this.getAfterOneMonth(new Date())
      this.getScheduleList(_deta.startTime, _deta.endTime)
      this.getScheduleDetail(_deta.startTime)
      this.getServantInfo()
    },
    // 获取服务人员信息
    async getServantInfo () {
      const res = await this.$http.get(`/ServantFriendInfo?servantID=${this.ViewID}`)
      if (res.data.Code === 100000) {
        this.servantInfos = Object.assign(res.data.Data.ServantAccount, {ViewName: res.data.Data.ViewName})
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    // 获取当月排班列表
    async getScheduleList (startTime, endTime) {
      const res = await this.$http.get(`/Schedule/IsNoSchedule`, {
        startTime: startTime,
        endTime: endTime,
        items: this.itemID,
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
    // 获取某一天排班详情
    async getScheduleDetail (dateTime) {
      const res = await this.$http.get(`/Schedule/List?dateTime=${dateTime}&viewId=${this.ViewID}&itemId=${this.itemID}`)
      if (res.data.Code === 100000) {
        this.scheduleDetailList = res.data.Data.ScheduleResponses
      }
    },
    // 选择某一天
    async calendarItemClick (dateTime) {
      this.params.ScheduleID = null
      this.calendarLoading = true
      await this.getScheduleDetail(dateTime + ' 00:00:00')
      this.calendarLoading = false
    },
    // 切换月份
    async changeMonth (item) {
      const dateTime = `${item.year}-${item.month}-01`
      const _deta = this.getAfterOneMonth(dateTime)
      this.getScheduleList(_deta.startTime, _deta.endTime)
    },
    getAfterOneMonth (dateTime) {
      let date = new Date(dateTime)
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
  .title {
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
}
.schedule-item {
  padding: 0 20px;
  margin-bottom: 10px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  font-size: 14px;
  color: #999;
  background: #f1f1f1;
  border-radius: 4px;
  .item {
    display: flex;
    justify-content: space-between;
    .iconfont {
      color: #ccc;
    }
  }
  &.schedule-item-selected {
    background: #3ecccc;
    color: #fff;
    .item {
      .iconfont {
        display: block;
        color: #fff;
      }
    }
  }
}
</style>
