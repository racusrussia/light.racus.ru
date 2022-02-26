import graphQl from '~/api/graphQl'

export const GetCoordinates = ( data, code = 'en' ) => {
  if (!data) return null

  let geo = []
  data.forEach(i => {
    const item = {
      geo:     ( i.geo )
                 ? [ i.geo.latitude, i.geo.longitude ]
                 : ( i.country ) ? i.country.geo : null,
      address: i.address,
      phones:  i.phones,
      emails:  i.emails,
      id:      i.id,
      country: i.country,
      name:    ( i.country && code === 'ru' )
                 ? ( i.country.ru ) ? i.country.ru : i.country?.en
                 : ( i.country && i.country.en ) ? i.country.en : null
    }
    geo        = [ ...geo, item ]
  })

  return geo
}
