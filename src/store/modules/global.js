import api from '@/api'

const SET_ROUTER_LOADING = 'SET_ROUTER_LOADING'
const HAVE_NEW_MSG = 'HAVE_NEW_MSG'
const SET_MODULESWITCH = 'SET_MODULESWITCH'

const state = {
  serviceTabIndex: 0, // 服务页Tab
  serviceTabIndex2: 0, // 服务中状态栏Tab
  servantTabIndex: 'service', // 服务者详情页Tab
  courseTabIndex: 0, // 课程详情页Tab
  routerLoading: false,
  isHaveNewMsg: false,
  unreadNum: 0,
  moduleSwitch: {}
}

const mutations = {
  setServiceTabIndex (state, id) {
    state.serviceTabIndex = id
  },
  setServiceTabIndex2 (state, id) {
    state.serviceTabIndex2 = id
  },
  servantTabIndex (state, id) {
    state.servantTabIndex = id
  },
  courseTabIndex (state, id) {
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
  serviceTabIndex2: state => state.serviceTabIndex2,
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
