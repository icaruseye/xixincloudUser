import common from './routers/common'
import resultsPage from './routers/resultsPage'
import servant from './routers/servant'
import user from './routers/user'
import service from './routers/service'
import course from './routers/course'
import activity from './routers/activity'
import article from './routers/article'

const routerList = [
  ...common,
  ...resultsPage,
  ...servant,
  ...service,
  ...user,
  ...course,
  ...activity,
  ...article
]

export default routerList
