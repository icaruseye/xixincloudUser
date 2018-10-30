
const state = {
  courseRightNums: 0,
  courseWrongNums: 0
}

const mutations = {
  setCourseRightNums (state, val) {
    if (val) {
      state.courseRightNums++
    }
  },
  setCourseWrongNums (state, val) {
    if (val) {
      state.courseWrongNums++
    }
  },
  initCourseNums (state) {
    state.courseWrongNums = 0
    state.courseRightNums = 0
  }
}

const getters = {
  courseRightNums: state => state.courseRightNums,
  courseWrongNums: state => state.courseWrongNums
}

export default {
  state,
  mutations,
  getters
}
