import { createSelector } from '@reduxjs/toolkit'

import { TAppStore } from '~/src/Configurations/AppStore'

export const SLICE_NAME = 'auth'

// const select = (state: TAppStore) => state[SLICE_NAME]
const isLoggedInSelect = (state: TAppStore) => state[SLICE_NAME].isLoggedIn
const accessTokenSelect = (state: TAppStore) => state[SLICE_NAME].accessToken
const refreshTokenSelect = (state: TAppStore) => state[SLICE_NAME].refreshToken

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
