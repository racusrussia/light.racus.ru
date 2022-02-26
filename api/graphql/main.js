export const Main = `
  query($locale: String!) {
    howItWork(locale: $locale) {
      title
      subTitle
      steps {
        id
        order
        actionLabel
        image {
          id
          url
        }
      }
    }

    universitiesTypes(sort: "sort:ASC", where: { _locale: $locale }) {
      id
      name
      locale
    }
  }
`

export const PhoneMasks = `
  query {
    countries(limit: 500, sort: "countryCodes_iso2:asc"){
      en
      id
      index
      code
      flag
      mask
      en
      countryCodes_tld
      countryCodes_fips
      countryCodes_iso2
      countryCodes_iso3
      countryCodes_isoN
    }
  }
`

export const PhoneMaskOne = `
  query {
    countries(where:{countryCodes_iso2: $code}){
      en
      id
      index
      code
      flag
      mask
      en
      countryCodes_tld
      countryCodes_fips
      countryCodes_iso2
      countryCodes_iso3
      countryCodes_isoN
    }
  }
`
