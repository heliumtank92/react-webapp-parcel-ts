import { WEB_HTTP_CONTEXT, WebHttpRequestOptions } from '@am92/web-http'

import { loginServiceName, loginTraceActions } from '../Actions'

import serviceActionCreator from '~/src/Redux/serviceActionCreator'

import { asHttp } from '~/src/Configurations/WebHttp'

export type LoginRequestData = {
  username: string
  password: string
}

async function login(reqData: LoginRequestData) {
  const options: WebHttpRequestOptions = {
    url: '/auth/login',
    method: 'POST',
    data: reqData
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

const loginService = serviceActionCreator<LoginRequestData>(
  loginTraceActions,
  login
)

export default loginService
export { loginServiceName }
