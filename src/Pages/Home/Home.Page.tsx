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

import { TAppDispatch, TAppSore } from '~/src/Configurations/AppStore'

const homeImage = [
  {
    src: new URL('~/public/assets/images/home.png?as=webp', import.meta.url)
      .href,
    alt: 'Home Image',
    as: 'image/webp'
  },
  {
    src: new URL('~/public/assets/images/home.png', import.meta.url).href,
    alt: 'Home Image',
    as: 'image/png'
  }
]
interface IHomePageProps extends PropsFromRedux, IWithRouterProps {}

class HomePage extends React.Component<IHomePageProps> {
  handleSchemeChange = (name: string, value: boolean) => {
    const { actions } = this.props
    const newScheme = value ? 'dark' : 'light'
    console.log('newScheme', newScheme)
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
        <DsImage srcSet={homeImage} style={{ width: '100%', height: 'auto' }} />
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

const mapStateToProps = (state: TAppSore) => {
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

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(withRouter(HomePage))
