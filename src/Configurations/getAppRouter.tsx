import React from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

import MainLayout from '~/src/Layouts/Main.Layout'

import APP_ROUTES from '~/src/Constants/APP_ROUTES'

const HomePage = React.lazy(() => import('~/src/Pages/Home/Home.Page'))
const NotFoundPage = React.lazy(
  () => import('~/src/Pages/NotFound/NotFound.Page')
)

const routeObj: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: APP_ROUTES.HOME.pathname,
        element: <HomePage />
      }
    ]
  } as RouteObject,
  {
    path: APP_ROUTES.ANY.pathname,
    element: <NotFoundPage />
  } as RouteObject
]

const getAppRouter = () => createBrowserRouter(routeObj)

export default getAppRouter
