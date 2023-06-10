import { WebHttpError } from '@am92/web-http'
import { createAction } from '@reduxjs/toolkit'
import { TraceActions } from './serviceActionCreator'

export default function createTraceActions(serviceName: string) {
  const loading = createAction(`${serviceName}/LOADING`)
  const success = createAction<any, string>(`${serviceName}/LOADING`)
  const error = createAction<WebHttpError, string>(`${serviceName}/LOADING`)

  const traceActions: TraceActions = { loading, success, error }
  return traceActions
}
