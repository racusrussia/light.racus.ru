export const TopNav = `
  query topNav(
    $type: NavigationRenderType = TREE
    $menuOnly: Boolean! = false
    $navigationIdOrSlug: String! = "1"
  ) {
    renderNavigation(
      type: $type
      menuOnly: $menuOnly
      navigationIdOrSlug: $navigationIdOrSlug
    ) {
      id
      path
      title
      type
      menuAttached
      uiRouterKey
      related {
        id
        title
      }
      items {
        id
        path
        title
        type
        menuAttached
        uiRouterKey
        related {
          id
          title
        }
      }
    }
  }
`

export const TopNavName = `
  query {
    infoPages(locale: "en") {
      id
      title
      localizations {
        locale
        id
        title
      }
    }
  }
`
