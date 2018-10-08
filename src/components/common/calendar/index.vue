<template>
  <div class="calendar">
    <div class="loading" v-if="loadingVal">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="calendar__header">
      <a href="javascript:;" class="calendar__today" :style="{color: themeColor}" @click="backToday">今日</a>
      <i class="iconfont calendar__icon icon-sanjiao-left" @click="getPre"></i>
      <span class="calendar__title">{{selectedYear}}年{{parseInt(selectedMonth)+1}}月</span>
      <i class="iconfont calendar__icon icon-sanjiao-right" @click="getNext"></i>
    </div>
    <div class="calendar__main" :class="`${isWeekType ? 'weektype' : ''}`">
      <div class="main__item-head" v-for="headItem in calendarHeader" :key="headItem"><div class="item">{{headItem}}</div></div>
      <div
        :class="`main__item ${`${item.year}-${item.month}-${item.day}` === today ? 'main__item-today' : ''}${item.type === 'pre' || item.isbeforeNow ? 'main__item-pre' : ''}${item.type === 'next' ? 'main__item-next' : ''}${selectDay === `${item.year}-${item.month}-${item.day}` && item.type === 'current' ? ' main__item-active' : ''}${item.tag && item.type === 'current' ? ' tag' : ''}${item.tagStart ? ' tagStart' : ''}${item.tagEnd ? ' tagEnd' : ''}`"
        v-for="(item, itemIndex) in calendarDays" :key="itemIndex"
        @click="clickItem(itemIndex, item.isbeforeNow)"
      >
        <div
          class="item"
          :style="{'background': selectDay === `${item.year}-${item.month}-${item.day}` && item.type === 'current' ? themeColor : '', 'border-color': `${item.year}-${item.month}-${item.day}` === today ? themeColor : ''}"
        >
        {{item.day | zreoDay}}
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
    },
    zreoDay (val) {
      return parseInt(val)
    }
  },
  props: {
    themeColor: {
      type: String,
      default: '#3ecccc'
    },
    tags: Array,
    loading: {
      type: Boolean,
      default: false
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
      isWeekType: true,
      week: null,
      selectItem: {},
      loadingVal: this.loading,
      tagsArr: this.tags
    }
  },
  watch: {
    tags () {
      this.tagsArr = this.tags
      this.getRange(this.tags)
    },
    selectedMonth () {
      if (!this.isWeekType) {
        this.displayDaysMonth()
      } else {
        this.displayDaysWeek()
      }
    },
    isWeekType () {
      this.toggleWeekType()
    },
    loading () {
      this.loadingVal = this.loading
    }
  },
  computed: {
    // 今天是本月第几周
    todayWeek () {
      return util.getWeek(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    }
  },
  created () {
    if (this.isWeekType) {
      this.week = util.getWeek(this.selectedYear, this.selectedMonth, this.selectDay)
      this.displayDaysWeek()
    } else {
      this.displayDaysMonth()
    }
  },
  methods: {
    displayDaysMonth () {
      this.calendarDays = util.displayDaysMonth(this.selectedYear, this.selectedMonth)
      this.getRange(this.tagsArr)
      this.$emit('changeMonth', {
        year: this.selectedYear,
        month: this.selectedMonth + 1,
        monthdays: util.conutDaysInMonth(this.selectedYear, this.selectedMonth)
      })
    },
    displayDaysWeek () {
      this.calendarDays = util.displayDaysWeek(this.selectedYear, this.selectedMonth, this.week)
      this.getRange(this.tagsArr)

      this.$emit('changeMonth', {
        year: this.selectedYear,
        month: this.selectedMonth + 1,
        monthdays: util.conutDaysInMonth(this.selectedYear, this.selectedMonth)
      })
    },
    // 设置需要标记的日期
    getRange (tags) {
      if (!tags) return false
      let today = this.selectedMonth === new Date().getMonth() ? new Date().getDate() : 0
      // 设置标记属性到日历数组
      this.calendarDays.forEach((date, dateIndex) => {
        tags.forEach((tag, tagIndex) => {
          if (parseInt(date.day) === parseInt(tag.split('-')[2]) && parseInt(tag.split('-')[2]) >= today && parseInt(tag.split('-')[1]) === this.selectedMonth + 1) {
            date.tag = true
          }
        })
      })

      // 当前需要标记号数的数组
      let res = []
      tags.forEach((tag, tagIndex) => {
        if (parseInt(tag.split('-')[2]) >= today) {
          res.push(parseInt(tag.split('-')[2]))
        }
      })

      let groupArr = util.arrange(res.sort(function (pre, next) {
        return pre - next
      }))

      // 找出标记日期中连续的号数 设置连续号数中的头尾
      for (let item of groupArr) {
        for (let date of this.calendarDays) {
          if (parseInt(date.day) === item[0]) {
            date.tagStart = true
          }
          if (parseInt(date.day) === item[item.length - 1]) {
            date.tagEnd = true
          }
        }
      }
    },
    clickItem (index, type) {
      if (type) return false
      this.selectItem = this.calendarDays[index]
      this.selectedMonth = parseInt(this.selectItem.month) - 1
      this.selectedYear = this.selectItem.year
      this.selectedDate = this.selectItem.day
      this.selectDay = `${this.selectItem.year}-${this.selectItem.month}-${this.selectItem.day}`

      if (this.isWeekType) {
        this.week = util.getWeek(this.selectedYear, this.selectedMonth, this.selectDay)
      }
      this.$emit('onClick', `${this.selectItem.year}-${this.selectItem.month}-${this.selectItem.day}`)
    },
    backToday () {
      if (this.isWeekType) {
        this.week = util.getWeek(new Date().getFullYear(), new Date().getMonth(), format(new Date(), 'YYYY-MM-DD'))
        if (this.selectedMonth === new Date().getMonth()) {
          this.displayDaysWeek()
        }
      }
      this.selectedYear = new Date().getFullYear()
      this.selectedMonth = new Date().getMonth()
      this.selectedDate = new Date().getDate()
      this.selectDay = format(new Date(), 'YYYY-MM-DD')
      this.$emit('onClick', this.selectDay)
    },
    getPre () {
      if (!this.isWeekType && this.beForeMonth()) {
        this.getPreMonth()
        return false
      }
      if (this.isWeekType && this.beForeToday()) {
        this.getPreWeek()
        return false
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
      // 第一周
      if (this.week === 0) {
        this.week = 5
        this.getPreMonth()
      } else {
        this.week--
        this.displayDaysWeek()
      }
    },
    getNextWeek () {
      // 最后一周
      if (this.week === 5) {
        this.week = 0
        this.getNextMonth()
      } else {
        this.week++
        this.displayDaysWeek()
      }
    },
    getPreMonth () {
      if (this.selectedMonth === new Date().getMonth()) return false
      // 一月
      if (this.selectedMonth === 0) {
        this.selectedMonth = 11
        this.selectedYear--
      } else {
        this.selectedMonth--
      }
    },
    getNextMonth () {
      // 十二月
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
        this.selectedYear = new Date().getFullYear()
        this.week = util.getWeek(this.selectedYear, this.selectedMonth, this.selectDay)
        this.displayDaysWeek()
      } else {
        this.displayDaysMonth()
      }
    },
    beForeMonth () {
      if (this.selectedYear > new Date().getFullYear()) {
        return true
      } else if (this.selectedYear === new Date().getFullYear() && this.selectedMonth > new Date().getMonth()) {
        return true
      } else {
        return false
      }
      // console.log(this.selectedMonth < new Date().getMonth() && this.selectedYear <= new Date().getFullYear())
      // return this.selectedMonth > new Date().getMonth() || this.selectedYear === new Date().getFullYear()
    },
    beForeToday () {
      if (this.selectedMonth < new Date().getMonth() && this.selectedYear <= new Date().getFullYear()) {
        return true
      }
      if (this.selectedMonth === new Date().getMonth() && this.selectedYear === new Date().getFullYear()) {
        let todayWeek = util.getWeek(new Date().getFullYear(), new Date().getMonth(), this.today)
        return !(this.week === todayWeek && this.selectedMonth === new Date().getMonth())
      }
      if (this.selectedMonth >= new Date().getMonth() && this.selectedYear >= new Date().getFullYear()) {
        return true
      }
      if (this.selectedYear > new Date().getFullYear()) {
        return true
      }
    }
  }
}
</script>

<style lang="less">
.calendar {
  position: relative;
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
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 30px;
      width: 30px;
      color: #666;
      text-align: center;
    }
    &.tag {
      background: #f2f2f2;
      &:nth-child(7n) {
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
      }
      &:nth-child(7n+1) {
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
      }
      &.tagStart {
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
      }
      &.tagEnd {
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
      }
    }
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
  }
}

.toggle-bar {
  text-align: center;
  height: 30px;
  line-height: 30px;
  color: #999;
}

.loading {
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, .8)
}

.lds-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 38px;
  height: 38px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 30px;
  height: 30px;
  margin: 4px;
  border: 4px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #3ecccc transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>