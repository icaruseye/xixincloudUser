import xxCell from './cells/container'
import xxCellItems from './cells/items'
import xxStepBar from './steps/bar'
import xxStepItems from './steps/items'
import xxTimeLine from './timeLine/box'
import xxTimeLineItems from './timeLine/items'
import xxTab from './tabs/tab'
import xxTabItem from './tabs/tab-item'
import xxChecker from './checker'
import xxUploader from './uploader'
import xxTabbar from './tabbar'
import xxOccupiedBox from './occupiedBox'
import xxResultView from './resultView'
import xxTimeCountDown from './timeCountDown'
import xxNavBar from './navbar'
import xxLoadmore from './loadmore'
import xxCalendar from './calendar'

const components = {
  install: function (Vue) {
    Vue.component('xxCell', xxCell)
    Vue.component('xxCellItems', xxCellItems)
    Vue.component('xxStepBar', xxStepBar)
    Vue.component('xxStepItems', xxStepItems)
    Vue.component('xxTimeLine', xxTimeLine)
    Vue.component('xxTimeLineItems', xxTimeLineItems)
    Vue.component('xxTab', xxTab)
    Vue.component('xxTabItem', xxTabItem)
    Vue.component('xxChecker', xxChecker)
    Vue.component('xxUploader', xxUploader)
    Vue.component('xxTabbar', xxTabbar)
    Vue.component('xxOccupiedBox', xxOccupiedBox)
    Vue.component('xxResultView', xxResultView)
    Vue.component('xxTimeCountDown', xxTimeCountDown)
    Vue.component('xxNavBar', xxNavBar)
    Vue.component('xxLoadmore', xxLoadmore)
    Vue.component('xxCalendar', xxCalendar)
  }
}

export default components
