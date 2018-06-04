import api from '@/api/index'
const GET_USER_ACC = 'GET_USER_ACC'

const state = {
  userAccount: JSON.parse(sessionStorage.getItem('userAccount')) || {},
  userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {}
}

const mutations = {
  [GET_USER_ACC] (state, res) {
    state.userInfo = res.userInfo
    state.userAccount = res.userAccount
    sessionStorage.setItem('userInfo', JSON.stringify(res.userInfo))
    sessionStorage.setItem('userAccount', JSON.stringify(res.userAccount))
  }
}

const actions = {
  // 获取用户基本信息及个人资料
  getAccount: async ({commit}) => {
    const userAccount = await api.get('/UserAccount')
    const userInfo = await api.get('/UserInfo')
    const res = {
      userInfo: userInfo.data.Data,
      userAccount: userAccount.data.Data
    }
    commit(GET_USER_ACC, res)
  }
}

const getters = {
  userAccount: state => state.userAccount,
  userInfo: state => state.userInfo
}

export default {
  state,
  mutations,
  actions,
  getters
}
