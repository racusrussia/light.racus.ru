import {Base} from '~/api/http/base'

const Nav = class extends Base {

  constructor () {
    super()
  }

  async get (id, type = 'flat') { // type [ flat, tree, rfr ]
    return await this.http('GET', `/navigation/render/${id}?type=${type}`)
  }

}
export default new Nav()
