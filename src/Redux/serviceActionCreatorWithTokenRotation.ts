import { ThunkDispatch } from '@reduxjs/toolkit'
import { WebHttpError } from '@am92/web-http'

import loginWithRefreshTokenService from './Auth/Services/loginWithRefreshToken.Service'

import { TraceActions } from './serviceActionCreator'

const loginWithRefreshTokenServiceDispatcher = loginWithRefreshTokenService()

export default function serviceActionCreator<RequestData = void>(
  traceActions: TraceActions,
  service: (data: RequestData) => Promise<any>
) {
  return (data: RequestData) => {
    return async (
      dispatch: ThunkDispatch<any, any, any>,
      getState: () => unknown
    ): Promise<any | WebHttpError> => {
      if (traceActions.loading && typeof traceActions.loading === 'function') {
        dispatch(traceActions.loading())
      }

      const response = await service(data).catch(
        async (error: WebHttpError) => {
          if (error.errorCode === 'User::TOKEN_EXPIRED') {
            return await retryWithTokenRotation<RequestData>(
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

      if (
        !response._isCustomError &&
        traceActions.success &&
        typeof traceActions.success === 'function'
      ) {
        dispatch(traceActions.success(response))
      }

      return response
    }
  }
}

async function retryWithTokenRotation<RequestData = void>(
  traceActions: TraceActions,
  service: (data: RequestData) => Promise<any>,
  dispatch: ThunkDispatch<any, any, any>,
  getState: () => unknown,
  data: RequestData
): Promise<Response | WebHttpError> {
  const tokenRotationResponse =
    await loginWithRefreshTokenServiceDispatcher(dispatch)

  if (tokenRotationResponse instanceof WebHttpError) {
    return tokenRotationResponse
  }

  const response = await service(data).catch((error: WebHttpError) => {
    if (traceActions.error && typeof traceActions.error === 'function') {
      dispatch(traceActions.error({ ...error }))
    }
    return error
  })

  if (
    !response._isCustomError &&
    traceActions.success &&
    typeof traceActions.success === 'function'
  ) {
    dispatch(traceActions.success(response))
  }

  return response
}
