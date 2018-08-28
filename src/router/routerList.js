import common from './routers/common'
import resultsPage from './routers/resultsPage'
import servant from './routers/servant'
import user from './routers/user'
import service from './routers/service'
import health from './routers/health'
import activity from './routers/activity'

const routerList = [
  ...common,
  ...resultsPage,
  ...servant,
  ...service,
  ...user,
  ...health,
  ...activity
]

export default routerList
