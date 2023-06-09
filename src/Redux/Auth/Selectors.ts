import { createSelector } from '@reduxjs/toolkit'

export const SLICE_NAME = 'auth'

const select = (state: any) => state[SLICE_NAME]
const isLoggedInSelect = (state: any) => state[SLICE_NAME].isLoggedIn
const accessTokenSelect = (state: any) => state[SLICE_NAME].accessToken
const refreshTokenSelect = (state: any) => state[SLICE_NAME].refreshToken

export const getIsLoggedInSelector = createSelector(
  isLoggedInSelect,
  isLoggedIn => isLoggedIn
)

export const getAccessTokenSelector = createSelector(
  accessTokenSelect,
  accessToken => accessToken
)

export const getRefreshTokenSelector = createSelector(
  refreshTokenSelect,
  refreshToken => refreshToken
)
