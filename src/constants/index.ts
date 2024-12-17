import routePages from './route-page'
import themes from './themes'

interface IConstants {
  routePages: typeof routePages,
  themes: typeof themes,
}

const constants: IConstants = {
  routePages,
  themes,
}

export default constants
