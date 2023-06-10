import React, { PureComponent } from 'react'
import { DsBox, DsImage, DsTypography } from '@am92/react-design-system'
import loginService from '~/src/Redux/Auth/Services/login.Service'

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

export default class HomePage extends PureComponent {
  componentDidMount(): void {
    // loginService()
  }
  render() {
    return (
      <DsBox
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
          px: 'var(--ds-spacing-warm)',
          bgcolor: 'common.black'
        }}
      >
        <DsTypography variant="bodyBoldLarge">Home Page</DsTypography>
        <DsImage srcSet={homeImage} style={{ width: '100%', height: 'auto' }} />
      </DsBox>
    )
  }
}
