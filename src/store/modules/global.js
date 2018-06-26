const SET_ROUTER_LOADING = 'SET_ROUTER_LOADING'

const state = {
  serviceTabIndex: 0, // 服务页Tab索引
  routerLoading: false
}

const mutations = {
  setServiceTabIndex (state, id) {
    state.serviceTabIndex = id
  },
  [SET_ROUTER_LOADING] (state, flag) {
    state.routerLoading = flag
  }
}

const actions = {}

const getters = {
  serviceTabIndex: state => state.serviceTabIndex,
  routerLoading: state => state.routerLoading
}

export default {
  state,
  mutations,
  actions,
  getters
}
