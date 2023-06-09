import React from 'react'
import { RouteObject, createBrowserRouter } from 'react-router-dom'

import APP_ROUTES from '~/src/Constants/APP_ROUTES'

import MainLayout from '~/src/Layouts/Main.Layout'

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
