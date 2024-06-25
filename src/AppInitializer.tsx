import React, { Component, Suspense } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { WEB_HTTP_CONTEXT } from '@am92/web-http'

import Loader from './Components/Loader'

import AppRouter from './AppRouter'

import {
  getAccessTokenSelector,
  getRefreshTokenSelector
} from './Redux/Auth/Selectors'
import performHandshake from './Services/performHandshake'

import { TAppStore } from './Configurations/AppStore'
import { asHttp } from './Configurations/WebHttp'

export interface IAppInitializerProps extends PropsFromRedux {}

export interface IAppInitializerState {}

const DEFAULT_STATE: IAppInitializerState = {}

class AppInitializer extends Component<
  IAppInitializerProps,
  IAppInitializerState
> {
  state = DEFAULT_STATE

  async componentDidMount() {
    this.setTokensIfExist()
    await this.initialize()
  }

  initialize = async () => {
    try {
      await performHandshake()
      // Handle All Your app Level Initialisations here
    } catch (error) {
      // Handle Error Appropriately or wrap in error boundary
      console.log('AppInitializer error', error)
    }
  }

  setTokensIfExist = () => {
    const { accessToken, refreshToken } = this.props

    if (accessToken) {
      asHttp.context.set(WEB_HTTP_CONTEXT.ACCESS_TOKEN, accessToken)
    }

    if (refreshToken) {
      asHttp.context.set(WEB_HTTP_CONTEXT.REFRESH_TOKEN, refreshToken)
    }
  }

  render() {
    return (
      <Suspense fallback={<Loader />}>
        <AppRouter />
      </Suspense>
    )
  }
}

const mapStateToProps = (state: TAppStore) => {
  const accessToken = getAccessTokenSelector(state)
  const refreshToken = getRefreshTokenSelector(state)
  return {
    accessToken,
    refreshToken
  }
}

// const mapDispatchToProps = (dispatch: TAppDispatch) => ({
//   actions: {}
// })

const connector = connect(mapStateToProps, null)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(AppInitializer)
