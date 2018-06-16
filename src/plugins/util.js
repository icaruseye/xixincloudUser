import Vue from 'vue'
import { ToastPlugin, ChinaAddressV4Data } from 'vux'
Vue.use(ToastPlugin)

export default {
  CheckIDCardNum: function (value) {
    // 验证身份证号方法 http://www.cnblogs.com/jiqing9006/p/3597549.html
    var area = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: 'xinjiang', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
    var Y, JYM
    var idcard = value
    var S, M
    var idcardArray = []
    var ereg, res
    if (value === '' || value === undefined) {
      return false
    }
    idcardArray = idcard.split('')
    if (area[parseInt(idcard.substr(0, 2))] == null) return false
    switch (idcard.length) {
      case 15:
        if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 === 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0)) {
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/ // 测试出生日期的合法性
        } else {
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/ // 测试出生日期的合法性
        }
        if (ereg.test(idcard)) res = true
        else res = false
        return res
      case 18:
        if (parseInt(idcard.substr(6, 4)) % 4 === 0 || (parseInt(idcard.substr(6, 4)) % 100 === 0 && parseInt(idcard.substr(6, 4)) % 4 === 0)) {
          ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/ // 闰年出生日期的合法性正则表达式
        } else {
          ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/ // 平年出生日期的合法性正则表达式
        }
        if (ereg.test(idcard)) {
          S = (parseInt(idcardArray[0]) + parseInt(idcardArray[10])) * 7 + (parseInt(idcardArray[1]) + parseInt(idcardArray[11])) * 9 + (parseInt(idcardArray[2]) + parseInt(idcardArray[12])) * 10 + (parseInt(idcardArray[3]) + parseInt(idcardArray[13])) * 5 + (parseInt(idcardArray[4]) + parseInt(idcardArray[14])) * 8 + (parseInt(idcardArray[5]) + parseInt(idcardArray[15])) * 4 + (parseInt(idcardArray[6]) + parseInt(idcardArray[16])) * 2 + parseInt(idcardArray[7]) * 1 + parseInt(idcardArray[8]) * 6 + parseInt(idcardArray[9]) * 3
          Y = S % 11
          M = 'F'
          JYM = '10X98765432'
          M = JYM.substr(Y, 1)
          if (M === idcardArray[17]) res = true
          else res = false
        } else res = false
        return res
      default:
        res = false
        return res
    }
  },
  formatDate: function (date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  },
  /**
   * (description) 表单验证方法
   * data: 需要验证的数据
   * authText： 自定义验证规则和自定义报错文本
   * authText：{
   *  text： '',
   *  required: true
   * }
   */
  validateForm: function (data, authText) {
    const keysArr = Object.keys(authText)
    let flag = true
    for (let i = 0; i < keysArr.length; i++) {
      if (!this.isFalse(data[keysArr[i]]) && authText[keysArr[i]].required) {
        flag = false
        Vue.$vux.toast.text(`${authText[keysArr[i]].text}不能为空`)
        break
      }
      flag = true
    }
    return flag
  },
  isFalse (val) {
    const type = toString.call(val)
    if (type === '[object String]') {
      return val
    }
    if (type === '[object Array]') {
      return val.length
    }
    if (type === '[object Object]') {
      return Object.keys(val).length
    }
    if (type === '[object Null]') {
      return false
    }
  },
  // 从地址库通过id换取名字
  transformAddress (val) {
    if (!/^\d+$/.test(val)) return val
    let name = ''
    ChinaAddressV4Data.map((item) => {
      if (item.value === val) {
        name = item.name
      }
    })
    return name
  }
}
