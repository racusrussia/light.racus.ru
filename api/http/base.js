const apiHost = process.env.HOST_HTTP || 'https://api.edurussia.ru'

import fetch from 'node-fetch'

if ( !globalThis.fetch ) {
  globalThis.fetch = fetch
}
let getToken

if ( process.browser ) {getToken = localStorage.getItem( 'token' ) || ''}

export const Base = class {

  constructor ( token = null ) {
    this.token   = token
    this.token   = token || getToken
    this.apiHost = apiHost
  }

  async http ( method, url, params = null, baseUrl = this.apiHost, file = false ) {

    const requestOptions = {
      method
      //mode: 'no-cors',
      //headers: { 'Content-Type': 'application/json' }
    }

    if ( this.token ) {requestOptions.headers.Authorization = `Bearer ${ this.token }`}

    if ( method === 'GET' ) {
      requestOptions.headers = { 'Content-Type': 'application/json' }
    }
    if ( method === 'POST' ) {

      if ( file ) {
        const formData = new FormData()
        formData.append( 'files', params )
        requestOptions.body = formData
      }
      else {
        requestOptions.body    = JSON.stringify( params )
        requestOptions.headers = { 'Content-Type': 'application/json' }
      }
    }

    try {
      const response = await fetch( baseUrl + url, requestOptions )
      let result     = await response.json()
      return ( response.status === 200 )
        ? ( result.data ) ? result.data : result
        : result
    }
    catch ( error ) {
      console.error( 'error', error )
      return error
      //error.forEach(i => {
      //  console.error(i.message)
      //})
    }
  }
}
