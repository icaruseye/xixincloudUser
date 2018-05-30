import vue from 'vue'

import popupComponent from './popup-top.vue'

const PopupConstructor = vue.extend(popupComponent)

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showPopup (text, duration = 2500) {
  // 实例化一个 popup.vue
  const popupDom = new PopupConstructor({
    el: document.createElement('div'),
    data () {
      return {
        text: text,
        showWrap: true,
        showContent: true
      }
    }
  })

  // 把 实例化的 popup.vue 添加到 body 里
  document.body.appendChild(popupDom.$el)

  // 提前 300ms 执行淡出动画(因为我们再css里面设置的隐藏动画持续是300ms)
  setTimeout(() => { popupDom.showContent = false }, duration - 250)
  // 过了 duration 时间后隐藏整个组件
  setTimeout(() => { popupDom.showWrap = false }, duration)
}

// 注册为全局组件的函数
function registryPopup () {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$popupTop()
  vue.prototype.$popupTop = showPopup
}

export default registryPopup
