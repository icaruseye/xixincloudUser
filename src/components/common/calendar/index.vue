<template>
  <div class="calendar">
    <div class="calendar__header">
      <a href="javascript:;" class="calendar__today" :style="{color: themeColor}" @click="backToday">今日</a>
      <i class="iconfont calendar__icon icon-sanjiao-left" @click="getPre"></i>
      <span class="calendar__title">{{selectedYear}}年{{parseInt(selectedMonth)+1}}月</span>
      <i class="iconfont calendar__icon icon-sanjiao-right" @click="getNext"></i>
    </div>
    <div class="calendar__main" :class="`${isWeekType ? 'weektype' : ''}`">
      <div class="main__item-head" v-for="headItem in calendarHeader" :key="headItem"><div class="item">{{headItem}}</div></div>
      <div
        :class="`main__item ${`${item.year}-${item.month}-${item.day}` === today ? 'main__item-today' : ''} ${item.type === 'pre' ? 'main__item-pre' : ''} ${item.type === 'next' ? 'main__item-next' : ''} ${selectDay === `${item.year}-${item.month}-${item.day}` && item.type === 'current' ? 'main__item-active' : ''}`"
        v-for="(item, itemIndex) in calendarDays" :key="itemIndex"
        @click="clickItem(itemIndex)"
      >
        <div
          class="item"
          :style="{'background': selectDay === `${item.year}-${item.month}-${item.day}` && item.type === 'current' ? themeColor : '#fff', 'border-color': `${item.year}-${item.month}-${item.day}` === today ? themeColor : '#fff'}"
        >
        {{item.day}}
        </div>
      </div>
    </div>
    <div class="toggle-bar" @click="isWeekType = !isWeekType">
      <i class="iconfont" :class="`${isWeekType ? 'icon-jiantouxia' : 'icon-jiantoushang'}`"></i>
    </div>
  </div>
</template>

<script>
import util from './util'
import format from './format'
export default {
  filters: {
    detaFormat (date) {
      return format(new Date(date), 'YYYY-MM-DD')
    }
  },
  props: {
    themeColor: {
      type: String,
      default: '#3ecccc'
    },
    value: {
      type: [String, Array],
      default: () => {
        return format(new Date(), 'YYYY-MM-DD')
      }
    }
  },
  watch: {
    value () {
      this.selectDay = this.value
    },
    selectedMonth () {
      if (!this.isWeekType) {
        this.calendarDays = util.displayDaysMonth(this.selectedYear, this.selectedMonth)
      } else {
        this.calendarDays = util.displayDaysWeek(this.selectedYear, this.selectedMonth, this.week)
      }
    },
    isWeekType () {
      this.toggleWeekType()
    }
  },
  data () {
    return {
      calendarHeader: ['一', '二', '三', '四', '五', '六', '日'],
      selectedYear: new Date(this.value).getFullYear(),
      selectedMonth: new Date(this.value).getMonth(),
      selectedDate: new Date(this.value).getDate(),
      selectDay: this.value, // 当前选中日期
      calendarDays: [], // 当月日期集合
      today: format(new Date(), 'YYYY-MM-DD'),
      isWeekType: false,
      week: null,
      selectItem: {}
    }
  },
  mounted () {
    this.initDate()
  },
  methods: {
    initDate () {
      this.calendarDays = util.displayDaysMonth(this.selectedYear, this.selectedMonth)
    },
    clickItem (index) {
      this.selectItem = this.calendarDays[index]
      this.selectedMonth = parseInt(this.selectItem.month) - 1
      this.selectedYear = this.selectItem.year
      this.selectedDate = this.selectItem.day
      this.selectDay = `${this.selectItem.year}-${this.selectItem.month}-${this.selectItem.day}`
      if (this.isWeekType) {
        this.week = util.getWeek(this.selectedYear, this.selectedMonth, this.selectDay)
      }
      this.$emit('onClick', this.selectItem)
    },
    backToday () {
      if (this.isWeekType) {
        this.week = util.getWeek(new Date().getFullYear(), new Date().getMonth(), format(new Date(), 'YYYY-MM-DD'))
        if (this.selectedMonth === new Date().getMonth()) {
          this.calendarDays = util.displayDaysWeek(this.selectedYear, this.selectedMonth, this.week)
        }
      }
      this.selectedYear = new Date().getFullYear()
      this.selectedMonth = new Date().getMonth()
      this.selectedDate = new Date().getDate()
      this.selectDay = format(new Date(), 'YYYY-MM-DD')
    },
    getPre () {
      if (!this.isWeekType) {
        this.getPreMonth()
      } else {
        this.getPreWeek()
      }
    },
    getNext () {
      if (!this.isWeekType) {
        this.getNextMonth()
      } else {
        this.getNextWeek()
      }
    },
    getPreWeek () {
      if (this.week === 0) {
        this.week = 5
        this.getPreMonth()
      } else {
        this.week--
        this.calendarDays = util.displayDaysWeek(this.selectedYear, this.selectedMonth, this.week)
      }
    },
    getNextWeek () {
      if (this.week === 5) {
        this.week = 0
        this.getNextMonth()
      } else {
        this.week++
        this.calendarDays = util.displayDaysWeek(this.selectedYear, this.selectedMonth, this.week)
      }
    },
    getPreMonth () {
      if (this.selectedMonth === 0) {
        this.selectedMonth = 11
        this.selectedYear--
      } else {
        this.selectedMonth--
      }
    },
    getNextMonth () {
      if (this.selectedMonth === 11) {
        this.selectedMonth = 0
        this.selectedYear++
      } else {
        this.selectedMonth++
      }
    },
    toggleWeekType () {
      if (this.isWeekType) {
        this.selectItem.month = this.selectItem.month ? this.selectItem.month : new Date().getMonth() + 1
        this.selectedMonth = parseInt(this.selectItem.month) - 1
        this.week = util.getWeek(this.selectedYear, this.selectedMonth, this.selectDay)
        this.calendarDays = util.displayDaysWeek(this.selectedYear, this.selectedMonth, this.week)
      } else {
        this.calendarDays = util.displayDaysMonth(this.selectedYear, this.selectedMonth)
      }
    }
  }
}
</script>

<style lang="less">
.calendar {
  width: 100%;
  background: #fff;
}

.calendar__header {
  height: 40px;
  line-height: 40px;
  padding: 0 60px;
  position: relative;
  display: flex;
  justify-content: space-around;
  .calendar__icon {
    width: 50px;
    text-align: center;
    color: #D8D8D8;
    font-size: 12px;
  }
  .calendar__title {
    flex: 1;
    text-align: center;
    color: #333;
    font-size: 15px;
  }
  .calendar__today {
    position: absolute;
    left: 10px;
    font-size: 15px;
  }
}

.calendar__main {
  display: flex;
  padding: 0 20px;
  flex-wrap: wrap;
  transition: height .25s;
  height: 336px;
  &.weektype {
    height: 96px;
  }
  .main__item-head {
    display: flex;
    justify-content: center;
    width: 14.2857142%;
    margin: 9px 0;
    text-align: center;
    color: #686868;
    height: 30px;
    font-size: 15px;
    .item {
      color: #686868;
    }
  }
  .main__item {
    display: flex;
    justify-content: center;
    width: 14.2857142%;
    margin: 9px 0;
    text-align: center;
    color: #686868;
    height: 30px;
    font-size: 15px;
    &.main__item-today {
      .item {
        position: relative;
        border: 1px solid;
        border-radius: 50%;
        box-sizing: border-box;
        &::after {
          content: "";
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #3ecccc;
          top: 2px;
          right: 50%;
          margin-right: -2px;
        }
      }
    }
    &.main__item-today.main__item-active {
      .item {
        &::after {
          content: "";
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #fff;
          top: 2px;
          right: 50%;
          margin-right: -2px;
        }
      }
    }
    &.main__item-active {
      .item {
        border-radius: 50%;
        color: #fff;
      }
    }
    &.main__item-next,
    &.main__item-pre {
      .item {
        color: #ccc;
      }
    }
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 30px;
      width: 30px;
      color: #666;
      text-align: center;
    }
  }
}

.toggle-bar {
  text-align: center;
  height: 30px;
  line-height: 30px;
  color: #999;
}
</style>