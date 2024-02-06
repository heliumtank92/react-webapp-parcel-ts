import { WEB_HTTP_CONTEXT, WebHttpRequestOptions } from '@am92/web-http'

import { logoutServiceName, logoutTraceActions } from '../Actions'

import serviceActionCreatorWithTokenRotation from '~/src/Redux/serviceActionCreatorWithTokenRotation'

import { asHttp } from '~/src/Configurations/WebHttp'

async function logout() {
  const refreshToken = asHttp.context.get(WEB_HTTP_CONTEXT.REFRESH_TOKEN)
  const reqBody = { refreshToken }

  const options: WebHttpRequestOptions = {
    url: '/auth/logout',
    method: 'POST',
    data: reqBody
  }

  const response = await asHttp.request(options)
  const { data: body } = response
  const { data } = body
  return data
}

const logoutService = serviceActionCreatorWithTokenRotation(
  logoutTraceActions,
  logout
)

export default logoutService
export { logoutServiceName }
