import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  DsBox,
  DsImage,
  DsRemixIcon,
  DsToggle,
  DsTypography,
  SupportedColorScheme
} from '@am92/react-design-system'

import withRouter, { IWithRouterProps } from '~/src/Hocs/withRouter'

import { setThemeSchemeAction } from '~/src/Redux/Theme/Actions'
import { getThemeReducer } from '~/src/Redux/Theme/Selectors'

import { TAppDispatch, TAppStore } from '~/src/Configurations/AppStore'

import HOME_IMAGE from '~/src/Assets/HOME_IMAGE'

interface IHomePageProps extends TPropsFromRedux, IWithRouterProps {}

class HomePage extends React.Component<IHomePageProps> {
  handleSchemeChange = (name: string, value: boolean) => {
    const { actions } = this.props
    const newScheme = value ? 'dark' : 'light'
    actions.setThemeScheme(newScheme)
  }

  public render() {
    const { theme } = this.props
    const { scheme } = theme
    return (
      <DsBox
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
          px: 'var(--ds-spacing-warm)'
        }}
      >
        <DsImage
          srcSet={HOME_IMAGE}
          style={{ width: '100%', height: 'auto' }}
        />
        <DsTypography variant='displayBoldLarge'>Home Page</DsTypography>
        <DsBox
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 'var(--ds-spacing-glacial)'
          }}
        >
          <DsToggle
            name='Dark Mode'
            value={scheme === 'dark'}
            onChange={this.handleSchemeChange}
          />
          <DsRemixIcon className='ri-contrast-2-line' />
        </DsBox>
      </DsBox>
    )
  }
}

const mapStateToProps = (state: TAppStore) => {
  const theme = getThemeReducer(state)

  return {
    theme
  }
}

const mapDispatchToProps = (dispatch: TAppDispatch) => ({
  actions: {
    setThemeScheme: (scheme: SupportedColorScheme) =>
      dispatch(setThemeSchemeAction(scheme))
  }
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type TPropsFromRedux = ConnectedProps<typeof connector>

export default connector(withRouter(HomePage))
