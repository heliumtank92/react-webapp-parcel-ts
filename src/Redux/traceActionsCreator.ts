import { createAction } from '@reduxjs/toolkit'
import { WebHttpError } from '@am92/web-http'

import { TraceActions } from './serviceActionCreator'

export default function traceActionsCreator(serviceName: string) {
  const loading = createAction(`${serviceName}/LOADING`)
  const success = createAction<any, string>(`${serviceName}/SUCCESS`)
  const error = createAction<WebHttpError, string>(`${serviceName}/ERROR`)

  const traceActions: TraceActions = { loading, success, error }
  return traceActions
}
