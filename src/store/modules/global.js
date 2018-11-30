import api from '@/api'

const HAVE_NEW_MSG = 'HAVE_NEW_MSG' // 是否有新聊天消息
const SET_ROUTER_LOADING = 'SET_ROUTER_LOADING' // 路转路由loading
const SET_SERVICE_TAB = 'SET_SERVICE_TAB' // 服务页tab
const SET_SERVICE_IN_TAB = 'SET_SERVICE_IN_TAB' // 服务中状态栏Tab
const SET_SERVANT_TAB = 'SET_SERVANT_TAB' // 服务者详情页tab
const SET_COURSE_TAB = 'SET_COURSE_TAB' // 课程页tab
const SET_MODULESWITCH = 'SET_MODULESWITCH' // 功能开关：课程、挂号

const state = {
  isHaveNewMsg: false,
  routerLoading: false,
  serviceTabIndex: 0,
  serviceInTabIndex: 0,
  servantTabIndex: 'service',
  courseTabIndex: 0,
  unreadNum: 0,
  moduleSwitch: {}
}

const mutations = {
  [SET_SERVICE_TAB] (state, id) {
    state.serviceTabIndex = id
  },
  [SET_SERVICE_IN_TAB] (state, id) {
    state.serviceInTabIndex = id
  },
  [SET_SERVANT_TAB] (state, id) {
    state.servantTabIndex = id
  },
  [SET_COURSE_TAB] (state, id) {
    state.courseTabIndex = id
  },
  [SET_ROUTER_LOADING] (state, flag) {
    state.routerLoading = flag
  },
  [HAVE_NEW_MSG] (state, res) {
    state.unreadNum = res ? state.unreadNum + 1 : 0
    state.isHaveNewMsg = res
  },
  [SET_MODULESWITCH] (state, res) {
    state.moduleSwitch = res
  }
}

const actions = {
  getHaveNewMsg: async ({commit}) => {
    const res = await api.get('/ChatRecord/HasNew')
    commit(HAVE_NEW_MSG, res.data.Data)
    return res.data.Data
  }
}

const getters = {
  serviceTabIndex: state => state.serviceTabIndex,
  serviceInTabIndex: state => state.serviceInTabIndex,
  servantTabIndex: state => state.servantTabIndex,
  courseTabIndex: state => state.courseTabIndex,
  routerLoading: state => state.routerLoading,
  isHaveNewMsg: state => state.isHaveNewMsg,
  unreadNum: state => state.unreadNum,
  moduleSwitch: state => state.moduleSwitch
}

export default {
  state,
  mutations,
  actions,
  getters
}
