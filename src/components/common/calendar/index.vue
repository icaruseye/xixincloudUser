<template>
  <div class="calendar">
    <div class="calendar__header">
      <a href="javascript:;" class="calendar__today" :style="{color: themeColor}" @click="backToday">今日</a>
      <i class="iconfont calendar__icon icon-sanjiao-left" @click="getPreMonth"></i>
      <span class="calendar__title">{{selectedYear}}年{{parseInt(selectedMonth)+1}}月排班表</span>
      <i class="iconfont calendar__icon icon-sanjiao-right" @click="getNextMonth"></i>
    </div>
    <div class="calendar__main">
      <div class="main__item-head" v-for="headItem in calendarHeader" :key="headItem"><div class="item">{{headItem}}</div></div>
      <div
        :class="`main__item ${`${item.year}-${item.month}-${item.day}` === today ? 'main__item-today' : ''} ${item.type === 'pre' ? 'main__item-pre' : ''} ${item.type === 'next' ? 'main__item-next' : ''} ${selectDay === `${item.year}-${item.month}-${item.day}` ? 'main__item-active' : ''}`"
        v-for="(item, itemIndex) in calendarDays" :key="itemIndex"
        @click="clickItem(itemIndex)"
      >
        <div
          class="item"
          :style="{'background': selectDay === `${item.year}-${item.month}-${item.day}` ? themeColor : '#fff', 'border-color': `${item.year}-${item.month}-${item.day}` === today ? themeColor : '#fff'}"
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
      this.calendarDays = util.displayDaysPerMonth(this.selectedYear, this.selectedMonth)
    },
    isWeekType () {
      this.toggleWeekType()
    }
  },
  data () {
    return {
      calendarHeader: ['一', '二', '三', '四', '五', '六', '日'],
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      selectedDate: new Date().getDate(),
      selectDay: format(new Date(), 'YYYY-MM-DD'), // 当前选中日期
      calendarDays: [], // 当月日期集合
      today: format(new Date(), 'YYYY-MM-DD'),
      isWeekType: false
    }
  },
  mounted () {
    this.initDate()
  },
  methods: {
    initDate () {
      console.log(this.value)
      this.calendarDays = util.displayDaysPerMonth(this.selectedYear, this.selectedMonth)
    },
    clickItem (index) {
      const item = this.calendarDays[index]
      this.selectedMonth = parseInt(item.month) - 1
      this.selectedYear = item.year
      this.selectedDate = item.day
      this.selectDay = `${item.year}-${item.month}-${item.day}`
      this.$emit('onClick', item)
    },
    backToday () {
      this.selectedYear = new Date().getFullYear()
      this.selectedMonth = new Date().getMonth()
    },
    getPreMonth () {
      if (this.selectedMonth === 0) {
        this.selectedMonth = 11
        this.selectedYear--
      } else {
        this.selectedMonth--
      }
      console.log(this.selectedMonth)
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
        let row = null
        this.calendarDays.map((item, index) => {
          if (this.selectedDate === item.day) {
            row = Math.floor(index / 7)
          }
        })
        this.calendarDays = this.calendarDays.splice(row * 7, 7)
      } else {
        this.calendarDays = util.displayDaysPerMonth(this.selectedYear, this.selectedMonth)
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