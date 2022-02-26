export const GetPageLocalizations = `
query($id: ID!) {
  infoPage(id: $id) {
    id
    title
    locale
    localizations {
      id
      locale
    }
  }
}`

export const UniversitiesTypes = `
  query($locale: String!) {
    universitiesTypes(sort: "sort:ASC", where: { _locale: $locale }) {
      id
      name
      description
      locale
    }
  }
`

export const Contacts = `
  query($locale: String! = "en") {
    contacts(locale: $locale) {
      id
      address
      locale
      phones {
        id
        number
        label
      }
      emails {
        id
        email
        label
      }
      geo {
        latitude
        longitude
      }
      country {
        id
        flag
        en
        ru
        countryCodes_tld
        geo
      }
    }
  }`

export const Polygons = `
query($id: ID!){
  polygon(id:$id){
    id
    ADMIN
    ISO_A3
    geometry
  }
}`

export const Faq = `
query($locale: String! = "en") {
  faqCategories(locale: $locale) {
    id
    title
    faqs {
      id
      question
      answer
    }
  }
}`

export const Steps = `
query($locale: String!) {
  howItWork(locale: $locale) {
    steps {
      id
      order
      actionLabel
      title
      content
      image {
        id
        url
      }
    }
  }
}`

export const NewsCategories = `
query( $locale: String! ){
  newsCategories(locale: $locale, sort: "id:asc") {
    id
    title
    titleEn
    locale
    slug
  }
}`

export const NewsLine = `
query(
  $locale: String!
  $limit: Int! = 12
  $start: Int! = 0
) {
  newsLines(
    locale: $locale
    start: $start
    limit: $limit
    sort: "publishedAt:desc"
  ) {
    id
    title
    slug
    previewImage
    publishedAt
    news_categories {
      id
      title
    }
    image {
      formats
      url
    }
  }
}`

export const NewsLineSmall = `
query(
  $locale: String!
  $limit: Int! = 12
) {
  newsLines(
    locale: $locale
    limit: $limit
    sort: "publishedAt:desc"
  ) {
    id
    title
    slug
    publishedAt
    news_categories {
      id
      title
    }
  }
}`

export const NewsCategoryLine = `
query(
  $locale: String!
  $limit: Int! = 12
  $start: Int! = 0
  $category: String!
) {
  newsLines(
    locale: $locale
    start: $start
    where: { news_categories: { titleEn: $category } }
    limit: $limit
    sort: "publishedAt:DESC"
  ) {
    id
    title
    slug
    publishedAt
    news_categories {
      id
      title
    }
    image {
      formats
      url
    }
  }
}`

export const NewsIdBySlug = `
query ($locale: String! = "en", $slug: String!){
  newsLines(where:{slug: $slug}, locale: $locale, limit: 1){
    id
  }
}`

export const Specialties = `
query Specialties($id: ID! = 2) {
  universitiesType(id: $id) {
    id
    main_specialities {
      id
      specialties {
        id
        title
        locale
        localizations {
          id
          locale
          title
        }
      }
    }
  }
}`

export const MainSpecialitiesByType = `
query MainSpecialities($id: ID!, $locale: String! = "en") {
  mainSpecialities(where: { type: $id }, locale: $locale) {
    id
    title
    content
    locale
    specialist_degree
    clinical_residency
    postgraduate_studies
    specialties {
      id
      title
      locale
      localizations {
        id
        locale
        title
      }
    }
  }
}`

export const Cities = `
query($locale: String! = "en") {
  cities(locale: $locale) {
    id
    title
    cover {
      formats
    }
    universities{
      id
    }
    geo {
      latitude
      longitude
    }
    locale
  }
}`

export const City = `
query($id: ID!) {
  city(id: $id) {
    id
    title
    locale
    images {
      id
      formats
    }
  }
}`

export const CitiesAll = `
query($locale: String! = "en") {
  cities(locale: $locale) {
    id
    title
    localizations{
      locale
      id
      title
    }
    cover {
      formats
    }
    universities{
      id
    }
    geo {
      latitude
      longitude
    }
    locale
  }

  universities {
    id
    title
    slug
    logo {
      url
    }
    city{
      id
      title
    }
    localizations {
      id
      title
      locale
      slug
    }
  }
}`

export const UniversitiesList = `
query($locale: String!) {
  universities(locale: $locale) {
    title
    slug
    logo {
      url
    }
    localizations {
      locale
      id
      slug
      title
    }
    galleries {
      id
    }
  }
}`

export const UniversitySpecialties = `
query($id: ID! = 27) {
  university(id: $id) {
    specialties {
      locale
      title
      localizations {
        title
        locale
      }
    }
  }
}`

export const UniversityGalleries = `
query($id: ID!) {
  galleries(where: { university: $id }) {
    slug
    id
    title
    locale
    localizations {
      slug
      id
      locale
      title
    }
    images {
      id
      formats
    }
  }
}`

export const Testimonials = `
query($locale: String! = "en", $limit: Int = -1) {
  testimonials(locale: $locale, limit: $limit) {
    id
    date
    name
    content
    locale
    avatar {
      url
    }
    localizations {
      name
      content
      locale
    }
    university {
      id
      slug
      title
      locale
      logo {
        url
      }
      localizations {
        title
        locale
      }
    }
  }
}`

export const PressAboutUse   = `
query($locale: String! = "en") {
  pressAboutuses(locale: $locale) {
    id
    date
    title
    mediaName
    locale
    slug
    localizations {
      title
      mediaName
      locale
    }
  }
}`
export const PressAboutUseId = `
query(
  $locale: String! = "en", $slug: String!) {
  pressAboutuses(locale: $locale, where: { slug: $slug }) {
    id
    locale
    localizations {
      id
      locale
    }
  }
}`
