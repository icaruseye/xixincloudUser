import api from '@/api/index'

const GET_USER_INFO = 'GET_USER_INFO'

const state = {
  userInfo: {}
}

const mutations = {
  [GET_USER_INFO] (state, res) {
    state.userInfo = res
    sessionStorage.setItem('GET_USER_INFO', JSON.stringify(res))
  }
}

const actions = {
  // 获取用户信息
  getUserInfo: async ({commit}) => {
    const res = await api.get('/UserDetail')
    commit(GET_USER_INFO, res.data.Data)
  }
}

const getters = {
  userInfo: state => state.userInfo
}

export default {
  state,
  mutations,
  actions,
  getters
}
