import { DsPalette, SupportedColorScheme } from '@am92/react-design-system'
import { APP_TITLE } from '../Configurations/env'

export const PALETTE: DsPalette = {}

export const FONT_FAMILY: string = 'Lato'

export const DEFAULT_THEME_MODE: SupportedColorScheme = 'light'

export const THEME_MODE_STORAGE_KEY: string = `${APP_TITLE.replaceAll(
  ' ',
  '-'
)}-mode`
