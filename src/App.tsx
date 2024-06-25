import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  DsCssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
  getTheme
} from '@am92/react-design-system'

import AppInitializer from './AppInitializer'
import ThemeManager from './ThemeManager'

import { getThemeReducer } from './Redux/Theme/Selectors'

import { THEME_MODE_STORAGE_KEY } from '~/src/Constants/THEME'
import { TAppStore } from './Configurations/AppStore'

interface IAppProps extends PropsFromRedux {
  persisted: boolean
}

class App extends Component<IAppProps> {
  render() {
    const { persisted, theme } = this.props
    const { fontFamily, palette, defaultMode } = theme

    const AppTheme = getTheme(palette, fontFamily)

    return (
      <CssVarsProvider
        theme={AppTheme}
        defaultMode={defaultMode}
        modeStorageKey={THEME_MODE_STORAGE_KEY}
      >
        <DsCssBaseline enableColorScheme>
          <ThemeManager />
          {persisted && <AppInitializer />}
        </DsCssBaseline>
      </CssVarsProvider>
    )
  }
}

const mapStateToProps = (state: TAppStore) => {
  const theme = getThemeReducer(state)

  return {
    theme
  }
}

const connector = connect(mapStateToProps, null)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App)
