import { createSelector } from '@reduxjs/toolkit'

import { TAppStore } from '~/src/Configurations/AppStore'

export const SLICE_NAME = 'theme'

const select = (state: TAppStore) => state[SLICE_NAME]

export const getThemeReducer = createSelector(select, reducer => reducer)
