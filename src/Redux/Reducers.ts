import { combineReducers, ReducersMapObject } from 'redux'

import AuthReducer from './Auth/Reducer'
import { SLICE_NAME as AuthSliceName } from './Auth/Selectors'

import ServiceTrackerReducer from './ServiceTracker/Reducer'
import { SLICE_NAME as ServiceTrackerSliceName } from './ServiceTracker/Selectors'

const reducers: ReducersMapObject = {
  [AuthSliceName]: AuthReducer,
  [ServiceTrackerSliceName]: ServiceTrackerReducer
}

const persistedReducers: any[] = []

export default combineReducers(reducers)
export { persistedReducers }
