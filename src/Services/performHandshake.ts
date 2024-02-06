import WebHttp, {
  WEB_HTTP_CONTEXT,
  WebHttpRequestOptions
} from '@am92/web-http'

import { HANDSHAKE_ENABLED_HTTP } from '~/src/Configurations/WebHttp'

const performHandshake = async () => {
  const promises = HANDSHAKE_ENABLED_HTTP.map(handshake)
  const responses = await Promise.allSettled(promises)
  responses.forEach(response => {
    if (response.status === 'rejected') {
      throw response.reason
    }
  })
}

const handshake = async (webHttp: WebHttp) => {
  if (!webHttp) {
    return
  }

  const options: WebHttpRequestOptions = { url: '/handshake', method: 'GET' }

  try {
    const storedPublicKey = webHttp.context.get(WEB_HTTP_CONTEXT.PUBLIC_KEY)
    if (storedPublicKey) {
      return
    }

    const response = await webHttp.request(options)
    const { data: body } = response
    const { data = {} } = body
    const { publicKey = '' } = data
    webHttp.context.set(WEB_HTTP_CONTEXT.PUBLIC_KEY, publicKey)
  } catch (err) {
    console.log(err)
    throw err
  }
}

export default performHandshake
