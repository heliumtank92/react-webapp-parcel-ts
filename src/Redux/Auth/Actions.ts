import traceActionsCreator from '../traceActionsCreator'

export const loginWithRefreshTokenServiceName = 'auth/loginWithRefreshToken'
export const loginWithRefreshTokenTraceActions = traceActionsCreator(
  loginWithRefreshTokenServiceName
)

export const loginServiceName = 'auth/login'
export const loginTraceActions = traceActionsCreator(
  loginWithRefreshTokenServiceName
)

export const logoutServiceName = 'auth/logout'
export const logoutTraceActions = traceActionsCreator(logoutServiceName)
