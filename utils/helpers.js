/**
 * get Token
 * @returns {string}
 */
export const getToken = () => {
  return Math.random().toString(36).substr(2)
}

/**
 * phone Format
 * @param number
 * @returns {string|*}
 */
export const phoneFormat = ( number ) => {
  //Filter only numbers from the input
  let cleaned = ( '' + number ).replace(/\D/g, '')

  //Check if the input is of correct length
  let match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/)

  if (match) {
    return `+${ match[ 1 ] } (${ match[ 2 ] }) ${ match[ 3 ] }-${ match[ 4 ] }-${ match[ 5 ] }`
  }
  return number
}

/**
 * sort By Field
 * @param arr
 * @param field
 * @param number
 * @returns {*}
 */
export const sortByField = ( arr, field, number = false ) => {

  const compare = ( a, b ) => {
    if (a[ field ] < b[ field ]) {
      return -1
    }
    if (a[ field ] > b[ field ]) {
      return 1
    }
    return 0
  }

  const compareNumber = ( ( a, b ) => a[ field ] - b[ field ] )
  return ( number ) ? arr.sort(compareNumber) : arr.sort(compare)
}

/**
 * validation Email
 * @param email
 * @returns {boolean}
 */
export const validationEmail = ( email ) => {
  const reg = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * validation Phone
 * @param phone
 * @returns {boolean|*}
 */
export const validationPhone = ( phone ) => {
  if (!phone) return false
  const onlyNumber = phone.replace(/[^0-9]/g, '')
  return ( onlyNumber ) ? onlyNumber.length >= 10 && onlyNumber.length <= 12 : false
}
/**
 * Query params from object
 * @param params
 * @returns {string|string}
 */
export const getParams       = ( params ) => {
  const arr = []
  for (let key in params) {
    const param = `${ key }=${ params[ key ] }`
    if (params[ key ]) {
      arr.push(param)
    }
  }
  return ( arr.length ) ? '?' + arr.join('&') : ''
}

/**
 * image Url
 * @param image
 * @param params
 * @returns {*}
 */
export const imageUrl = ( image, params = '' ) => {
  const formats = image?.formats
  if (!formats) return
  const format = formats[ params ]
  if (!format) return
  return format.url
}

/**
 * show On Device
 * @param sizes
 * @param device
 */
export const showOnDevice = ( sizes, device ) => sizes.includes(device)

/**
 * groupBy('sent_date')
 * https://gitlab.com/carabi/carabi.mini.prototype/-/blob/master/src/store.js#L673
 * @param items
 * @param key
 */
export const groupBy = ( items, key ) => {
  let out = []
  items.forEach(i => {
    const index = out.findIndex(a => a[ key ] === i[ key ])
    if (index !== -1) {
      out[ index ].data.push(i)
    }
    else {
      const item = {
        name: i[ key ],
        data: [ i ]
      }
      out        = [ ...out, item ]
    }
  })
  return out
}

/**
 * Navigator Language
 * @returns {string|*|string}
 */
export const getNavigatorLanguage = () => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[ 0 ]
  }
  else {
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en'
  }
}

/**
 * sort First Later
 * @param arr
 * @param key
 * @returns {{names: *, letter: *}[]|null}
 */
export const sortFirstLater = ( arr, key ) => {
  if (!arr) return null

  const obj = arr.reduce(( acc, c ) => {
    const letter  = c[ key ][ 0 ]
    acc[ letter ] = ( acc[ letter ] || [] ).concat(c[ key ])
    return acc
  }, {})

  arr = Object.entries(obj)
              .map(( [ letter, names ] ) => {return { letter, names }})
  sortByField(arr, 'letter')
  return arr
}

/** clone
 *
 * @param obj
 * @param hash
 * @returns {any|Set<T>}
 */
export const clone = (obj, hash = new WeakMap()) => {

  if (Object(obj) !== obj) return obj
  if (obj instanceof Set) return new Set(obj)
  if (hash.has(obj)) return hash.get(obj)

  const result = obj instanceof Date
    ? new Date(obj)
    : obj instanceof RegExp
      ? new RegExp(obj.source, obj.flags)
      : obj.constructor
        ? new obj.constructor()
        : Object.create(null)

  hash.set(obj, result)

  if (obj instanceof Map) {
    Array.from(obj, ([ key, val ]) => result.set(key, clone(val, hash)))
  }

  return Object.assign(result, ...Object.keys(obj)
                                        .map(key => ({[key]: clone(obj[key], hash)})))
}
