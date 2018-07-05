const SET_ROUTER_LOADING = 'SET_ROUTER_LOADING'

const state = {
  serviceTabIndex: 0, // 服务页Tab索引
  serviceTabIndex2: 0,
  routerLoading: false
}

const mutations = {
  setServiceTabIndex (state, id) {
    state.serviceTabIndex = id
  },
  setServiceTabIndex2 (state, id) {
    state.serviceTabIndex2 = id
  },
  [SET_ROUTER_LOADING] (state, flag) {
    state.routerLoading = flag
  }
}

const actions = {}

const getters = {
  serviceTabIndex: state => state.serviceTabIndex,
  serviceTabIndex2: state => state.serviceTabIndex2,
  routerLoading: state => state.routerLoading
}

export default {
  state,
  mutations,
  actions,
  getters
}
