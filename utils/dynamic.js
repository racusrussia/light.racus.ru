/**
 * _Components
 * @type {{InfoCities: (function(): Promise<{readonly default?: {name: string}}>), InfoNews: (function(): Promise<{readonly default?: {name: string}}>), InfoFaq: (function(): Promise<{readonly default?: {name: string}}>), InfoPrograms: (function(): Promise<{readonly default?: {name: string}}>), InfoContent: (function(): Promise<{readonly default?: {name: string}}>), InfoTarget: (function(): Promise<{readonly default?: {name: string}}>), InfoRepresentatives: (function(): Promise<{readonly default?: {name: string}}>), InfoVideo: (function(): Promise<{readonly default?: {name: string}}>), InfoUniversities: (function(): Promise<{readonly default?: {name: string}}>)}}
 * @private
 */
const _Components = {
  InfoContacts:        () => import(/* webpackChunkName: "InfoContacts" */ '~/components/dynamic/InfoContacts'),
  InfoTarget:          () => import(/* webpackChunkName: "InfoTarget" */ '~/components/dynamic/InfoTarget'),
  InfoTestimonials:    () => import(/* webpackChunkName: "InfoTestimonials" */ '~/components/dynamic/InfoTestimonials'),
  InfoPress:           () => import(/* webpackChunkName: "InfoPress" */ '~/components/dynamic/InfoPress'),
  InfoNews:            () => import(/* webpackChunkName: "InfoNews" */ '~/components/dynamic/InfoNews'),
  InfoSteps:           () => import(/* webpackChunkName: "InfoSteps" */ '~/components/dynamic/InfoSteps'),
  InfoSlider:          () => import(/* webpackChunkName: "InfoSlider" */ '~/components/dynamic/InfoSlider'),
  InfoFaq:             () => import(/* webpackChunkName: "InfoFaq" */ '~/components/dynamic/InfoFaq'),
  InfoRepresentatives: () => import(/* webpackChunkName: "InfoRepresentatives" */ '~/components/dynamic/InfoRepresentatives'),
  InfoContent:         () => import(/* webpackChunkName: "InfoContent" */ '~/components/dynamic/InfoContent'),
  InfoVideo:           () => import(/* webpackChunkName: "InfoVideo" */ '~/components/dynamic/InfoVideo'),
  InfoCities:          () => import(/* webpackChunkName: "InfoCities" */ '~/components/dynamic/InfoCities'),
  InfoUniversities:    () => import(/* webpackChunkName: "InfoUniversities" */ '~/components/dynamic/InfoUniversities'),
  InfoPrograms:        () => import(/* webpackChunkName: "InfoPrograms" */ '~/components/dynamic/InfoPrograms'),
  InfoBenefitList:     () => import(/* webpackChunkName: "InfoBenefitList" */ '~/components/dynamic/InfoBenefitList')
}

/**
 * dynamic Component enum
 * @type {{'dynamic.news': (function(): Promise<{readonly default?: {name: string}}>), 'dynamic.content': (function(): Promise<{readonly default?: {name: string}}>), 'dynamic.faq': (function(): Promise<{readonly default?: {name: string}}>), 'dynamic.representatives': (function(): Promise<{readonly default?: {name: string}}>), 'dynamic.programs': (function(): Promise<{readonly default?: {name: string}}>), 'dynamic.target': (function(): Promise<{readonly default?: {name: string}}>), 'dynamic.universities': (function(): Promise<{readonly default?: {name: string}}>), 'dynamic.video': (function(): Promise<{readonly default?: {name: string}}>), 'dynamic.cities': (function(): Promise<{readonly default?: {name: string}}>)}}
 */
export const dynamicComponent = {
  'dynamic.target':          _Components.InfoTarget,
  'dynamic.news':            _Components.InfoNews,
  'dynamic.testimonials':    _Components.InfoTestimonials,
  'dynamic.contacts':        _Components.InfoContacts,
  'dynamic.press-about-us':  _Components.InfoPress,
  'dynamic.steps':           _Components.InfoSteps,
  'dynamic.slider':          _Components.InfoSlider,
  'dynamic.faq':             _Components.InfoFaq,
  'dynamic.representatives': _Components.InfoRepresentatives,
  'dynamic.content':         _Components.InfoContent,
  'dynamic.video':           _Components.InfoVideo,
  'dynamic.cities':          _Components.InfoCities,
  'dynamic.universities':    _Components.InfoUniversities,
  'dynamic.programs':        _Components.InfoPrograms,
  'dynamic.benefit-list':    _Components.InfoBenefitList
}

/**
 * dynamic Components
 * @param dynamic
 * @returns {null|*[]}
 */
export const dynamicComponents = ( dynamic ) => {
  if (!dynamic) return null
  let components = []
  dynamic.forEach(i => {
    if (!dynamicComponent[ i.__component ]) return
    components = [ ...components, {
      data:      i,
      images:    i.images,
      component: dynamicComponent[ i.__component ]
    } ]
  })
  return components
}
