import { combineReducers, ReducersMapObject } from 'redux'

import ThemeReducer from './Theme/Reducer'
import { SLICE_NAME as ThemeSliceName } from './Theme/Selectors'

import AuthReducer from './Auth/Reducer'
import { SLICE_NAME as AuthSliceName } from './Auth/Selectors'

import ServiceTrackerReducer from './ServiceTracker/Reducer'
import { SLICE_NAME as ServiceTrackerSliceName } from './ServiceTracker/Selectors'

const reducers: ReducersMapObject = {
  [ThemeSliceName]: ThemeReducer,
  [AuthSliceName]: AuthReducer,
  [ServiceTrackerSliceName]: ServiceTrackerReducer
}

const persistedReducers = [ThemeSliceName]

export default combineReducers(reducers)
export { persistedReducers }
