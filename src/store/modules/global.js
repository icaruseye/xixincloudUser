const state = {
  serviceTabIndex: 0 // 服务页Tab索引
}

const mutations = {
  setServiceTabIndex (state, id) {
    state.serviceTabIndex = id
  }
}

const actions = {}

const getters = {
  serviceTabIndex: state => state.serviceTabIndex
}

export default {
  state,
  mutations,
  actions,
  getters
}
