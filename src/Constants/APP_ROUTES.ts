import { NavigateOptions, To } from 'react-router-dom'

type AppRouteItem = {
  pathname: To
  options?: NavigateOptions
}

type AppRoute = {
  [key: string]: AppRouteItem
}

const APP_ROUTES: AppRoute = {
  HOME: {
    pathname: ''
  },

  ANY: {
    pathname: '*'
  }
}

export default APP_ROUTES
