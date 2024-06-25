import { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import withColorScheme, {
  IWithColorSchemeProps
} from '~/src/Hocs/withColorScheme'

import { getThemeReducer } from '~/src/Redux/Theme/Selectors'

import { TAppStore } from './Configurations/AppStore'

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

const mapStateToProps = (state: TAppStore) => {
  const theme = getThemeReducer(state)
  return {
    theme
  }
}

const connector = connect(mapStateToProps, null)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(withColorScheme(ThemeManager))
