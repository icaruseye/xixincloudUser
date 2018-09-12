
export default {
  displayDaysMonth (year, month) {
    // 每月天数
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    // 闰年2月天数
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysInMonth[1] = 29
    }
    // 当前日期当月第一天为星期几
    let currentFirst = new Date(year, month, 1).getDay()
    currentFirst = currentFirst === 0 ? 7 : currentFirst
    let currentDaysList = []
    let preMonth = month === 0 ? 11 : month - 1

    // 计算当月日期列表
    for (let index = 1; index <= daysInMonth[month]; index++) {
      let obj = {
        type: 'current',
        day: index,
        month: zreo(month),
        year: year
      }
      currentDaysList.push(obj)
    }

    // 计算上月日期
    for (let index = 0; index < currentFirst - 1; index++) {
      let obj = {
        type: 'pre',
        day: daysInMonth[preMonth] - index,
        month: zreo(preMonth),
        year: month === 0 ? year - 1 : year
      }
      currentDaysList.unshift(obj)
    }

    // 计算下月日期
    const len = currentDaysList.length
    for (let index = 1; index <= 42 - len; index++) {
      let obj = {
        type: 'next',
        day: index,
        month: zreo(month === 11 ? 0 : month + 1),
        year: month === 11 ? year + 1 : year
      }
      currentDaysList.push(obj)
    }
    function zreo (month) {
      month++
      return month < 10 ? `0${month}` : month
    }
    return currentDaysList
  },
  displayDaysWeek (year, month, week) {
    let daysList = this.displayDaysMonth(year, month)
    return daysList.splice(week * 7, 7)
  },
  // 先计算出该日期为第几周
  getWeek (year, month, fullDate) {
    // 转为Date类型
    fullDate = Date.parse(fullDate)
    fullDate = new Date(fullDate)

    // 当月第一天是周几
    let whatday = new Date(year, month, 1).getDay()

    // 周末标记为7
    whatday = whatday === 0 ? 6 : whatday - 1

    let week = Math.ceil((fullDate.getDate() + whatday) / 7) - 1
    return week
  }
}
