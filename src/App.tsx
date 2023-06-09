import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import {
  getTheme,
  DsCssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider
} from '@am92/react-design-system'
// import { CONTEXT } from '@am92/web-http'

import Loader from '~/src/Components/Loader'

import { getThemeModeSelector } from '~/src/Redux/Theme/Selectors'
import {
  getAccessTokenSelector,
  getRefreshTokenSelector
} from './Redux/Auth/Selectors'

import getAppRouter from '~/src/Configurations/getAppRouter'
// import { asHttp } from '~/src/Configurations/WebHttp'

import performHandshake from '~/src/Services/performHandshake'

import { PALETTE, FONT_FAMILY } from '~/src/Constants/THEME'
import { ThunkDispatch } from '@reduxjs/toolkit'

type Props = {
  persisted: boolean
  themeMode?: 'light' | 'dark'
  accessToken?: string
  refreshToken?: string
}

type State = {
  hasError: boolean
}

const DefaultState: State = {
  hasError: false
}

class App extends Component<Props, State> {
  state = DefaultState

  componentDidMount() {
    this.initialize()
  }

  initialize = async () => {
    try {
      await performHandshake()
    } catch (error) {
      this.setState({ hasError: true })
    }
  }

  render() {
    const {
      persisted,
      themeMode = 'dark'
      // accessToken,
      // refreshToken
    } = this.props

    let children = <Loader />
    const AppTheme = getTheme(PALETTE, FONT_FAMILY)

    if (persisted) {
      const router = getAppRouter()
      children = <RouterProvider router={router} />
      window.localStorage.setItem('mui-mode', themeMode)

      // asHttp.context.set(CONTEXT.ACCESS_TOKEN, accessToken)
      // asHttp.context.set(CONTEXT.REFRESH_TOKEN, refreshToken)
    }

    return (
      <CssVarsProvider
        theme={AppTheme}
        defaultMode={themeMode}
        modeStorageKey="mui-mode"
      >
        <DsCssBaseline enableColorScheme>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </DsCssBaseline>
      </CssVarsProvider>
    )
  }
}

const mapStateToProps = (state: any) => {
  const themeMode = getThemeModeSelector(state)
  const accessToken = getAccessTokenSelector(state)
  const refreshToken = getRefreshTokenSelector(state)

  return {
    themeMode,
    accessToken,
    refreshToken
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  actions: {}
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
