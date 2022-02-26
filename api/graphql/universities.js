export const UniversitiesTypes = `
query($locale: String! = "en") {
  universitiesTypes(locale: $locale, sort: "sort:asc") {
    id
    sort
    name
    universities(sort: "title:asc") {
      id
      title
      slug
      logo {
        id
        url
      }
    }
  }

  universities(locale: $locale, sort: "title:asc") {
    id
    title
    slug
    locale
    localizations{
      id
      slug
      locale
    }
    logo {
      id
      url
    }
  }
}`

export const UniversityIdBySlug = `
query($slug: String!) {
  universities(where: { slug: $slug }) {
    id
    locale
    localizations {
      id
      locale
    }
  }
}`

export const UniversitiesTypesOnly = `
query($locale: String! = "en") {
  universitiesTypes(locale: $locale, sort: "sort:asc") {
    id
    name
    locale
    content
    localizations {
      id
      name
      locale
      content
    }
  }
}`
