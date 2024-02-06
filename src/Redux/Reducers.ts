import { combineReducers, ReducersMapObject } from 'redux'

import AuthReducer from './Auth/Reducer'
import { SLICE_NAME as AuthSliceName } from './Auth/Selectors'
import { T_AUTH_REDUCER } from './Auth/TYPES'

import ServiceTrackerReducer from './ServiceTracker/Reducer'
import { SLICE_NAME as ServiceTrackerSliceName } from './ServiceTracker/Selectors'
import { T_SERVICE_TRACKER_REDUCER } from './ServiceTracker/TYPES'

export type TReducers = {
  [AuthSliceName]: T_AUTH_REDUCER
  [ServiceTrackerSliceName]: T_SERVICE_TRACKER_REDUCER
}

const reducers: ReducersMapObject<TReducers> = {
  [AuthSliceName]: AuthReducer,
  [ServiceTrackerSliceName]: ServiceTrackerReducer
}

export default combineReducers<TReducers>(reducers)

export const persistedReducers: (keyof TReducers)[] = []
