import { createSelector } from '@reduxjs/toolkit'

export const SLICE_NAME = 'theme'

const select = (state: any) => state[SLICE_NAME]
const modeSelect = (state: any) => state[SLICE_NAME].mode

export const getThemeModeSelector = createSelector(
  modeSelect,
  (mode: 'light' | 'dark') => mode
)
