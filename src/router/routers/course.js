import _import from '../_import'

export default [
  {
    path: '/course',
    component: _import('/course'),
    meta: {
      title: '课程'
    }
  },
  {
    path: '/course/courseList',
    component: _import('/course/courseList'),
    meta: {
      title: '我的课程'
    }
  },
  {
    path: '/course/studyRecordList/:id',
    component: _import('/course/studyRecordList'),
    meta: {
      title: '学习记录'
    }
  }
]
