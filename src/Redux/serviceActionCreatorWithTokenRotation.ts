import { ThunkDispatch } from '@reduxjs/toolkit'
import { TraceActions } from './serviceActionCreator'

import loginWithRefreshTokenService from './Auth/Services/loginWithRefreshToken.Service'
import { WebHttpError } from '@am92/web-http'

const loginWithRefreshTokenServiceDispatcher = loginWithRefreshTokenService()

export default function serviceActionCreator<RequestBody = undefined>(
  traceActions: TraceActions,
  service: (data?: RequestBody) => Promise<any>
) {
  return (data?: RequestBody) => {
    return async (
      dispatch: ThunkDispatch<any, any, any>,
      getState: () => unknown
    ) => {
      if (traceActions.loading && typeof traceActions.loading === 'function') {
        dispatch(traceActions.loading())
      }

      const response = await service(data).catch(
        async (error: WebHttpError) => {
          if (error.errorCode === 'User::TOKEN_EXPIRED') {
            await retryWithTokenRotation(
              traceActions,
              service,
              dispatch,
              getState,
              data
            )
          } else {
            if (
              traceActions.error &&
              typeof traceActions.error === 'function'
            ) {
              dispatch(traceActions.error({ ...error }))
            }
            return error
          }
        }
      )

      if (traceActions.success && typeof traceActions.success === 'function') {
        dispatch(traceActions.success(response))
      }

      return response
    }
  }
}

async function retryWithTokenRotation<RequestBody = any>(
  traceActions: TraceActions,
  service: (data: RequestBody) => Promise<any>,
  dispatch: ThunkDispatch<any, any, any>,
  getState: () => unknown,
  data: RequestBody
) {
  const tokenRotationResponse = await loginWithRefreshTokenServiceDispatcher(
    dispatch,
    getState
  )

  if (tokenRotationResponse._isCustomError) {
    return tokenRotationResponse
  }

  const response = await service(data).catch((error: WebHttpError) => {
    if (traceActions.error && typeof traceActions.error === 'function') {
      dispatch(traceActions.error({ ...error }))
    }
    return error
  })

  if (traceActions.success && typeof traceActions.success === 'function') {
    dispatch(traceActions.success(response))
  }

  return response
}
