import {
  ActionReducerMapBuilder,
  CreateSliceOptions,
  createSlice
} from '@reduxjs/toolkit'
import { SLICE_NAME } from './Selectors'

const INITIAL_STATE = { mode: 'light' }

const sliceOptions: CreateSliceOptions = {
  name: SLICE_NAME,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<any>): void => {}
}

const slice = createSlice(sliceOptions)

export default slice.reducer
