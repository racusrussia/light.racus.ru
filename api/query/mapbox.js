// URL: https://api.mapbox.com/geocoding/v5/mapbox.places/wo.json?country=gb&proximity=-73.990593%2C40.740121&types=place&access_token=pk.eyJ1IjoieXVyZ2VtYW4iLCJhIjoiQkdab0FGWSJ9.Y7NDiEEk4oSryLe0JKYQPw

import { getParams } from '~/utils/helpers'
import { Base }      from '../http/base'

const Mapbox = class extends Base {

  constructor () {
    super()
    //this.mapbix_url   = process.env.MAPBOX_URL || 'https://api.mapbox.com/geocoding/v5/mapbox.places'
    //this.access_token = process.env.MAPBOX_APIKEY || 'pk.eyJ1IjoieXVyZ2VtYW4iLCJhIjoiQkdab0FGWSJ9.Y7NDiEEk4oSryLe0JKYQPw'
    this.mapbix_url   = process.env.MAPBOX_URL
    this.access_token = process.env.MAPBOX_APIKEY

    this.ipinfo_token    = process.env.IPINFO_TOKEN
    this.ipinfo_url      = process.env.IPINFO_URL
    this.meilisearch_url = process.env.MEILISEARCH_URL
  }

  async get ( params, request ) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Mapbox', request, params)
    }
    const queryParams = {
      ...params,
      access_token: this.access_token
    }
    return await this.http('GET', `/${ request }.json${ getParams(queryParams) }`, null, this.mapbix_url)
  }

  async getCountry ( ip ) {
    const queryParams = { token: this.ipinfo_token }
    const country     = await this.http('GET', `/${ ip }.json${ getParams(queryParams) }`, null, this.ipinfo_url)

    if (process.env.NODE_ENV === 'development') {
      console.log('ipInfo', ip, country)
    }
    return country
  }

  async search ( index, query, limit, offset = 0 ) {

    const params = {
      q:      query,
      limit:  limit,
      offset: offset
    }
    const resp   = await this.http('GET', `/${ index }/search${ getParams(params) }`, null, this.meilisearch_url)

    if (process.env.NODE_ENV === 'development') {
      console.log('search', index, resp, this.meilisearch_url)
    }
    return resp
  }

}

export default new Mapbox()
