import WebHttp, { WebHttpError, WebHttpResponse } from '@am92/web-http'
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  ThunkDispatch
} from '@reduxjs/toolkit'

type Actions = {
  loading: ActionCreatorWithoutPayload<string>
  success: ActionCreatorWithPayload<WebHttpResponse, string>
  error: ActionCreatorWithPayload<WebHttpError, string>
}

export default function serviceActionCreator(
  actions: Actions,
  service: (data: any) => Promise<any>
) {
  return (data: any) => {
    return async (
      dispatch: ThunkDispatch<any, any, any>,
      getState: () => unknown
    ) => {
      if (actions.loading && typeof actions.loading === 'function') {
        dispatch(actions.loading())
      }

      const response = await service(data).catch(error => {
        if (actions.error && typeof actions.error === 'function') {
          dispatch(actions.error(error))
        }
        return error
      })

      if (actions.success && typeof actions.success === 'function') {
        dispatch(actions.success(response))
      }
      return response
    }
  }
}
