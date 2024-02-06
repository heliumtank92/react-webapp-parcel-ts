import React, { Component, Suspense } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import {
  DsCssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
  getTheme
} from '@am92/react-design-system'

import Loader from '~/src/Components/Loader'

import {
  getAccessTokenSelector,
  getRefreshTokenSelector
} from './Redux/Auth/Selectors'
import performHandshake from '~/src/Services/performHandshake'

import {
  DEFAULT_THEME_MODE,
  FONT_FAMILY,
  PALETTE,
  THEME_MODE_STORAGE_KEY
} from '~/src/Constants/THEME'
import { TAppSore } from './Configurations/AppStore'
import getAppRouter from '~/src/Configurations/getAppRouter'

interface Props extends PropsFromRedux {
  persisted: boolean
}

interface State {
  hasError: boolean
}

const DefaultState: State = {
  hasError: false
}

class App extends Component<Props, State> {
  state = DefaultState

  constructor(props: Props) {
    super(props)

    // If you dont want to respect user selected theme
    // and set default theme to one set in THEME constants then uncomment the line
    // this.resetUserThemeToDefault()
  }

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

  resetUserThemeToDefault = () => {
    window.localStorage.removeItem(THEME_MODE_STORAGE_KEY)
  }

  render() {
    const {
      persisted
      // accessToken,
      // refreshToken
    } = this.props

    let children = <Loader />
    const AppTheme = getTheme(PALETTE, FONT_FAMILY)

    if (persisted) {
      const router = getAppRouter()
      children = <RouterProvider router={router} />

      // asHttp.context.set(CONTEXT.ACCESS_TOKEN, accessToken)
      // asHttp.context.set(CONTEXT.REFRESH_TOKEN, refreshToken)
    }

    return (
      <CssVarsProvider
        theme={AppTheme}
        defaultMode={DEFAULT_THEME_MODE}
        modeStorageKey={THEME_MODE_STORAGE_KEY}
      >
        <DsCssBaseline enableColorScheme>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </DsCssBaseline>
      </CssVarsProvider>
    )
  }
}

const mapStateToProps = (state: TAppSore) => {
  const accessToken = getAccessTokenSelector(state)
  const refreshToken = getRefreshTokenSelector(state)

  return {
    accessToken,
    refreshToken
  }
}

const connector = connect(mapStateToProps, null)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App)
