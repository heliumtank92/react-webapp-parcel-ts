import { createSelector } from '@reduxjs/toolkit'

import { TAppSore } from '~/src/Configurations/AppStore'

export const SLICE_NAME = 'theme'

const select = (state: TAppSore) => state[SLICE_NAME]

export const getThemeReducer = createSelector(select, reducer => reducer)
