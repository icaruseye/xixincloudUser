import Vue from 'vue'
import ChinaAddressV4Data from './datas/ChinaAddressV4Data.json'
import { ToastPlugin, dateFormat } from 'vux'
Vue.use(ToastPlugin)
const supportBankList = {
  'BOC': {
    name: '中国银行',
    icon: '#icon-zhongguoyinhang'
  },
  'CCB': {
    name: '中国建设银行',
    icon: '#icon-jiansheyinhang'
  },
  'ICBC': {
    name: '中国工商银行',
    icon: '#icon-gongshangyinhang'
  },
  'ABC': {
    name: '中国农业银行',
    icon: '#icon-nongyeyinhang'
  },
  'CMBC': {
    name: '中国民生银行',
    icon: '#icon-mingshengyinhang'
  }
}
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
  // 支持的银行卡
  getSupportBankList: () => supportBankList,
  // 是否支持此银行
  bankIsSupport: (BankAbbreviation) => {
    return (supportBankList[BankAbbreviation] !== undefined)
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
  },
  // 转换图片地址
  transformImgUrl (val) {
    if (!val) return
    if (val.indexOf('http') === -1 && val.indexOf('Upload') === -1 && val.indexOf('base64') === -1) {
      return `${process.env.IMG_PATH}/File/GetImage/${val}`
    } else {
      // 值为完整url
      return val
    }
  },
  timeFormat (value = '') {
    return dateFormat(new Date(value), 'YYYY-MM-DD HH:mm:ss')
  },
  // 构造旋转后图片
  drawPhoto (file, orient, image) {
    return new Promise(function (resolve) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (canvas.getContext) {
        const scale = image.width / 750 > 1 ? image.width / 750 : 1
        canvas.width = Number(image.width / scale)
        canvas.height = Number(image.height / scale)
        if (orient !== undefined && orient !== 1 && orient !== '') {
          switch (orient) {
            case 3:
              // 逆时针90度
              ctx.rotate(Math.PI)
              ctx.drawImage(image, -canvas.width, -canvas.height, canvas.width, canvas.height)
              break
            case 6:
              // 顺时针90度
              canvas.width = Number(image.height / scale)
              canvas.height = Number(image.width / scale)
              ctx.rotate(Math.PI / 2)
              ctx.drawImage(image, 0, -canvas.width, canvas.height, canvas.width)
              break
            case 8:
              // 旋转180度
              canvas.width = Number(image.height / scale)
              canvas.height = Number(image.width / scale)
              ctx.rotate(3 * Math.PI / 2)
              ctx.drawImage(image, -canvas.height, 0, canvas.height, canvas.width)
              break
            default:
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
              break
          }
        } else {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        }
        // HTMLCanvasElement.toBlob() Polyfill
        if (!HTMLCanvasElement.prototype.toBlob) {
          Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function (callback, type, quality) {
              var binStr = atob(this.toDataURL(type, quality).split(',')[1])
              var len = binStr.length
              var arr = new Uint8Array(len)
              for (var i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i)
              }
              callback(new Blob([arr], {type: type || 'image/png'}))
            }
          })
        }
        canvas.toBlob(function (blob) {
          let _file = new window.File([blob], file.name, {type: file.type})
          resolve([_file, canvas.toDataURL(file.type, 0.7)])
        })
      }
    })
  },
  NumToLetter (index = 0) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (typeof index === 'number') {
      index = Math.abs(index)
      if (index >= 0 && index < 26) {
        return letters[index]
      } else {
        return `${letters[index % 26]}${Math.floor((index / 26))}`
      }
    } else {
      console.error('Parameter is not a number！')
    }
  }
}
