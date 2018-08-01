import api from '@/api'

const SET_ROUTER_LOADING = 'SET_ROUTER_LOADING'
const HAVE_NEW_MSG = 'HAVE_NEW_MSG'

const state = {
  serviceTabIndex: 0, // 服务页Tab
  serviceTabIndex2: 0,
  messageTabIndex: 0, // 消息-服务者Tab
  routerLoading: false,
  isHaveNewMsg: false,
  unreadNum: 0
}

const mutations = {
  setServiceTabIndex (state, id) {
    state.serviceTabIndex = id
  },
  setServiceTabIndex2 (state, id) {
    state.serviceTabIndex2 = id
  },
  setMessageTabIndex (state, id) {
    state.messageTabIndex = id
  },
  [SET_ROUTER_LOADING] (state, flag) {
    state.routerLoading = flag
  },
  [HAVE_NEW_MSG] (state, res) {
    if (res) {
      state.unreadNum ++
    }
    state.isHaveNewMsg = res
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
  messageTabIndex: state => state.messageTabIndex,
  routerLoading: state => state.routerLoading,
  isHaveNewMsg: state => state.isHaveNewMsg,
  unreadNum: state => state.unreadNum
}

export default {
  state,
  mutations,
  actions,
  getters
}
