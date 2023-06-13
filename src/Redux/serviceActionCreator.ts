import { WebHttpError } from '@am92/web-http'
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  ThunkDispatch
} from '@reduxjs/toolkit'

export type TraceActions = {
  loading: ActionCreatorWithoutPayload<string>
  success: ActionCreatorWithPayload<any, string>
  error: ActionCreatorWithPayload<WebHttpError, string>
}

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

      const response = await service(data).catch(error => {
        if (traceActions.error && typeof traceActions.error === 'function') {
          dispatch(traceActions.error(error))
        }
        return error
      })

      if (traceActions.success && typeof traceActions.success === 'function') {
        dispatch(traceActions.success(response))
      }
      return response
    }
  }
}
