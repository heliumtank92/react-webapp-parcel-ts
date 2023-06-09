import React, { PureComponent } from 'react'
import { Outlet } from 'react-router-dom'

export default class MainLayout extends PureComponent {
  render() {
    return <Outlet />
  }
}
