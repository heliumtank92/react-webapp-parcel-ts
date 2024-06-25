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

import reducers, { persistedReducers, TReducers } from '~/src/Redux/Reducers'

const persistConfig = {
  key: process.env.APP_TITLE || 'APP_TITLE',
  version: 1,
  storage: localforage,
  whitelist: persistedReducers
}

const AppStore = configureStore({
  reducer: persistReducer<TReducers>(persistConfig, reducers),
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

type TAppStore = ReturnType<typeof AppStore.getState>

type TAppDispatch = typeof AppStore.dispatch

export { TAppStore, TAppDispatch, PersistedAppStore }
