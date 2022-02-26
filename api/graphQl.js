import { Base } from '~/api/http/base'

const graphQl = class extends Base {

  constructor () {
    super()
  }

  data ( query, variables ) {
    const graphqlQuery = ( variables )
      ? { query: query, variables: variables }
      : { query: query }
    //if (process.env.NODE_ENV === 'development') console.log(query, variables)

    return this.http('POST', `/graphql`, graphqlQuery)
  }

}
export default new graphQl()
