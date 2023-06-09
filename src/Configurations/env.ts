export const APP_TITLE = process.env.APP_TITLE || ''
export const APP_DESCRIPTION = process.env.APP_DESCRIPTION || ''
export const APP_PRECONNECT_DOMAINS = process.env.APP_PRECONNECT_DOMAINS || ''
export const AS_API_DOMAIN = process.env.AS_API_DOMAIN || ''
export const AS_API_KEY = process.env.AS_API_KEY || ''
export const AS_ENABLE_CRPTOGRAPHY =
  process.env.AS_ENABLE_CRPTOGRAPHY === 'true'
export const AS_API_TIMEOUT = parseInt(process.env.AS_API_TIMEOUT || '', 10)
