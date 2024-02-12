import { APP_TITLE } from '~/src/Configurations/env'

export const THEME_MODE_STORAGE_KEY: string = `${APP_TITLE.replaceAll(
  ' ',
  '-'
)}-mode`
