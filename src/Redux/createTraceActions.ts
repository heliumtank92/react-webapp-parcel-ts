import { WebHttpError } from '@am92/web-http'
import { createAction } from '@reduxjs/toolkit'
import { TraceActions } from './serviceActionCreator'

export default function createTraceActions(serviceName: string) {
  const loading = createAction(`${serviceName}/LOADING`)
  const success = createAction<any, string>(`${serviceName}/SUCCESS`)
  const error = createAction<WebHttpError, string>(`${serviceName}/ERROR`)

  const traceActions: TraceActions = { loading, success, error }
  return traceActions
}
