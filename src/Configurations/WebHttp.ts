import WebHttp, {
  WEB_HTTP_CONTEXT,
  WebHttpAxiosConfig,
  WebHttpConfig
} from '@am92/web-http'

import {
  AS_API_DOMAIN,
  AS_API_KEY,
  AS_API_TIMEOUT,
  AS_ENABLE_CRPTOGRAPHY
} from './env'

const AS_AXIOS_HTTP_CONFIG: WebHttpAxiosConfig = {
  baseURL: AS_API_DOMAIN,
  timeout: AS_API_TIMEOUT
}
const AS_WEB_HTTP_CONFIG: WebHttpConfig = {
  disableCrypto: !AS_ENABLE_CRPTOGRAPHY,
  disableHeaderInjection: false
}
export const asHttp = new WebHttp(AS_AXIOS_HTTP_CONFIG, AS_WEB_HTTP_CONFIG)
asHttp.context.set(WEB_HTTP_CONTEXT.API_KEY, AS_API_KEY)

// const AXIOS_HTTP_CONFIG: WebHttpAxiosConfig = { timeout: 30000 }
// const WEB_HTTP_CONFIG: WebHttpConfig = {
//   disableCrypto: true,
//   disableHeaderInjection: true
// }
// export const webHttp = new WebHttp(AXIOS_HTTP_CONFIG, WEB_HTTP_CONFIG)

export const HANDSHAKE_ENABLED_HTTP: WebHttp[] = []
