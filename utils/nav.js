export const NavLocaleNames = ( pages ) => {

  let newPages = []
  pages.forEach(i => {
    newPages = [ ...newPages, { id: i.id, title: i.title, locale: 'en', localizations: i.localizations } ]
    //if (i.localizations.length) {
    //  newPages = [ ...newPages, ...i.localizations ]
    //}
  })

  //setName(nav, newPages, code)
  return newPages
}

export const NavLocalized = ( nav, pages, code ) => {
  nav.forEach(item => {
    if (!item.related) return
    const page = ( pages ) ? pages.find(i => +i.id === +item.related.id) : null

    item.localizations = ( page ) ? page.localizations : item.title
    if (!item.items) return
    NavLocalized(item.items, pages)

  })
  return nav
}

export const NavFlatter = ( nav ) => {
  if (!nav) return null
  let flatNav = []

  const splitPath = ( path ) => {
    const p = path.split('/')
    return p[ p.length - 1 ]
  }

  const getMenu = ( items ) => {
    items.forEach(i => {
      const item = {
        id:           i.id,
        path:         splitPath(i.path),
        pathFull:     i.path,
        title:        i.title,
        type:         i.type,
        menuAttached: i.menuAttached,
        uiRouterKey:  i.uiRouterKey,
        related:      i.related
      }
      flatNav    = [ ...flatNav, item ]
      if (i.items && i.items.length) {getMenu(i.items)}
    })
  }

  getMenu(nav)
  return flatNav
}

export const NavAttached = ( nav ) => {
  if (!nav) return null
  return nav.filter(i => i.menuAttached)
}
