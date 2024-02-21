import React, { PureComponent, Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import Loader from './Components/Loader'

import getAppRouter from './Configurations/getAppRouter'

export interface IAppRouterProps {}

let router: ReturnType<typeof getAppRouter> | undefined

export default class AppRouter extends PureComponent<IAppRouterProps> {
  render() {
    if (!router) {
      router = getAppRouter()
    }

    return (
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    )
  }
}
