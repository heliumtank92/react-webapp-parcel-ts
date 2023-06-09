import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'

import AppStore, { PersistedAppStore } from '~/src/Configurations/AppStore'
import App from './App'

import '~/public/serviceWorkerRegistration'

const container = document.getElementById('app')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={AppStore}>
      <PersistGate persistor={PersistedAppStore} onBeforeLift={() => undefined}>
        {persisted => <App persisted={persisted} />}
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
