import { configureStore } from '@reduxjs/toolkit'
import localforage from 'localforage'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'

import reducers, { persistedReducers } from '~/src/Redux/Reducers'

const persistConfig = {
  key: process.env.APP_TITLE || 'APP_TITLE',
  version: 1,
  storage: localforage,
  whitelist: persistedReducers
}

const AppStore = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

const PersistedAppStore = persistStore(AppStore)

export default AppStore
export { PersistedAppStore }
