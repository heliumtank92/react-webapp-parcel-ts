import { WEB_HTTP_CONTEXT, WebHttpRequestOptions } from '@am92/web-http'
import { asHttp } from '~/src/Configurations/WebHttp'
import serviceActionCreator from '~/src/Redux/serviceActionCreator'
import {
  loginWithRefreshTokenTraceActions,
  loginWithRefreshTokenServiceName
} from '../Actions'

async function loginWithRefreshToken() {
  const currentRefreshToken = asHttp.context.get(WEB_HTTP_CONTEXT.REFRESH_TOKEN)
  const reqBody = { refreshToken: currentRefreshToken }

  const options: WebHttpRequestOptions = {
    url: '/auth/login-with-refresh-token',
    method: 'POST',
    data: reqBody
  }

  const response = await asHttp.request(options)
  const { data: body } = response
  const { data } = body

  const { tokens = {} } = data
  const { accessToken = '', refreshToken = '' } = tokens
  asHttp.context.set(WEB_HTTP_CONTEXT.ACCESS_TOKEN, accessToken)
  asHttp.context.set(WEB_HTTP_CONTEXT.REFRESH_TOKEN, refreshToken)

  return data
}

const loginWithRefreshTokenService = serviceActionCreator(
  loginWithRefreshTokenTraceActions,
  loginWithRefreshToken
)

export default loginWithRefreshTokenService
export { loginWithRefreshTokenServiceName }
