import { DsPalette, SupportedColorScheme } from '@am92/react-design-system'

export type T_THEME_REDUCER = {
  scheme: SupportedColorScheme
  palette: DsPalette
  fontFamily: string
}

export const DEFAULT_THEME: T_THEME_REDUCER = {
  scheme: 'light',
  palette: {},
  fontFamily: 'Lato'
}

export const INITIAL_STATE: T_THEME_REDUCER = DEFAULT_THEME
