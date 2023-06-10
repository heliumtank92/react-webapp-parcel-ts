import createTraceActions from '../createTraceActions'

export const loginWithRefreshTokenServiceName = 'auth/loginWithRefreshToken'
export const loginWithRefreshTokenTraceActions = createTraceActions(
  loginWithRefreshTokenServiceName
)

export const loginServiceName = 'auth/login'
export const loginTraceActions = createTraceActions(
  loginWithRefreshTokenServiceName
)

export const logoutServiceName = 'auth/logout'
export const logoutTraceActions = createTraceActions(logoutServiceName)
