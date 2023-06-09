import { configureStore } from '@reduxjs/toolkit'
import reducers, { persistedReducers } from '~/src/Redux/Reducers'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import localforage from 'localforage'

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
