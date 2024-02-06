import { WebHttpError } from '@am92/web-http'

import loginWithRefreshTokenService from './Auth/Services/loginWithRefreshToken.Service'

import { TraceActions } from './serviceActionCreator'

import { TAppDispatch } from '../Configurations/AppStore'

const loginWithRefreshTokenServiceDispatcher = loginWithRefreshTokenService()

export default function serviceActionCreator<
  RequestData = void,
  Response = unknown
>(
  traceActions: TraceActions<Response>,
  service: (data: RequestData) => Promise<Response>
) {
  return (data: RequestData) => {
    return async (
      dispatch: TAppDispatch,
      getState: () => unknown
    ): Promise<Response | WebHttpError> => {
      if (traceActions.loading && typeof traceActions.loading === 'function') {
        dispatch(traceActions.loading())
      }

      try {
        const response = await service(data)

        if (
          traceActions.success &&
          typeof traceActions.success === 'function'
        ) {
          dispatch(traceActions.success(response))
        }

        return response
      } catch (error: unknown) {
        const err = error as WebHttpError
        if (err.errorCode === 'User::TOKEN_EXPIRED') {
          return await retryWithTokenRotation<RequestData, Response>(
            traceActions,
            service,
            dispatch,
            getState,
            data
          )
        } else {
          if (traceActions.error && typeof traceActions.error === 'function') {
            dispatch(traceActions.error({ ...err }))
          }
          return err
        }
      }
    }
  }
}

async function retryWithTokenRotation<RequestData = void, Response = unknown>(
  traceActions: TraceActions<Response>,
  service: (data: RequestData) => Promise<Response>,
  dispatch: TAppDispatch,
  getState: () => unknown,
  data: RequestData
): Promise<Response | WebHttpError> {
  const tokenRotationResponse =
    await loginWithRefreshTokenServiceDispatcher(dispatch)

  if (tokenRotationResponse instanceof WebHttpError) {
    return tokenRotationResponse
  }

  try {
    const response = await service(data)
    if (traceActions.success && typeof traceActions.success === 'function') {
      dispatch(traceActions.success(response))
    }

    return response
  } catch (error: unknown) {
    if (traceActions.error && typeof traceActions.error === 'function') {
      dispatch(traceActions.error({ ...(error as WebHttpError) }))
    }
    return error as WebHttpError
  }
}
