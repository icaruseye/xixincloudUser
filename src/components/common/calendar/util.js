
export default {
  displayDaysPerMonth (year, month) {
    // 每月天数
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    // 闰年2月天数
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysInMonth[1] = 29
    }

    // 当前日期当月第一天为星期几
    let currentFirst = new Date(year, month, 1).getDay()
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
    console.log(currentDaysList)
    function zreo (month) {
      month++
      return month < 10 ? `0${month}` : month
    }
    return currentDaysList
  }
}
