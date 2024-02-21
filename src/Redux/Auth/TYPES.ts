export type T_AUTH_REDUCER = {
  isLoggedIn: boolean
  accessToken: string
  refreshToken: string
}

export const INITIAL_STATE: T_AUTH_REDUCER = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: ''
}
