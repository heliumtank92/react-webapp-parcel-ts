import { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import withColorScheme, {
  IWithColorSchemeProps
} from '~/src/Hocs/withColorScheme'

import { getThemeReducer } from '~/src/Redux/Theme/Selectors'

import { TAppSore } from './Configurations/AppStore'

export interface IThemeManagerProps
  extends IWithColorSchemeProps,
    PropsFromRedux {}

class ThemeManager extends PureComponent<IThemeManagerProps> {
  setScheme = () => {
    const { colorScheme, setColorScheme, theme } = this.props
    const { scheme } = theme

    if (colorScheme !== scheme && setColorScheme) {
      setColorScheme(scheme)
    }
  }

  componentDidMount() {
    this.setScheme()
  }

  componentDidUpdate() {
    this.setScheme()
  }

  render() {
    return false
  }
}

const mapStateToProps = (state: TAppSore) => {
  const theme = getThemeReducer(state)
  return {
    theme
  }
}

const connector = connect(mapStateToProps, null)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(withColorScheme(ThemeManager))
