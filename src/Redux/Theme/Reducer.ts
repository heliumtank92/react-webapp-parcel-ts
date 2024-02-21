import {
  ActionReducerMapBuilder,
  createSlice,
  CreateSliceOptions
} from '@reduxjs/toolkit'

import {
  setThemeAction,
  setThemefontFamilyAction,
  setThemePaletteAction,
  setThemeSchemeAction
} from './Actions'
import { SLICE_NAME } from './Selectors'
import { DEFAULT_THEME, INITIAL_STATE, T_THEME_REDUCER } from './TYPES'

const sliceOptions: CreateSliceOptions<T_THEME_REDUCER> = {
  name: SLICE_NAME,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<T_THEME_REDUCER>): void => {
    builder.addCase(setThemeSchemeAction, (state, { payload }) => {
      state.scheme = payload
    })

    builder.addCase(setThemePaletteAction, (state, { payload }) => {
      state.palette = payload
    })

    builder.addCase(setThemefontFamilyAction, (state, { payload }) => {
      state.fontFamily = payload
    })

    builder.addCase(setThemeAction, () => {
      return { ...DEFAULT_THEME }
    })
  }
}

const slice = createSlice(sliceOptions)

export default slice.reducer
