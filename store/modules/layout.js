export const namespaced = true

export const state = () => ( {
  showTopNav:         true,
  showSideBar:        false,
  bodyWidth:          null,
  hideMenuBreakpoint: 1300,
  modalCompleteShow: false,

  modal: {
    show:  false,
    title: null,
    type:  null,
    src:   null
  },

  search: {
    show:    false,
    request: '',
    result:  null,
    count:   null
  },

  applicationsForm: {
    title:       '',
    description: null,
    action:      null,
    show:        false
  }
} )

export const mutations = {

  DARK_MODE ( state, data ) {state.darkMode = data},
  TOP_NAV_TOGGLE ( state, data ) {state.showTopNav = data},

  MODAL ( state, data ) {
    state.modal.show  = true
    state.modal.title = data.title
    state.modal.type  = data.type
    state.modal.src   = data.src
  },

  SEARCH_REQUEST ( state, request ) {
    state.search.request = request || ''
  },

  TOGGLE_SEARCH_RESULT ( state, payload ) {
    state.search.show = payload || !state.search.show
  },

  MODAL_CLOSE ( state ) {
    state.modal.show  = false
    state.modal.title = null
    state.modal.type  = null
    state.modal.src   = null
    if (process.browser) {
      //document.body.style.
    }
  },

  MODAL_FORM ( state, data ) {
    state.applicationsForm.title       = data.title || ''
    state.applicationsForm.description = data.title || ''
    state.applicationsForm.show        = true
    state.applicationsForm.action      = data.action
  },

  MODAL_FORM_CLOSE ( state ) {
    state.applicationsForm.title       = ''
    state.applicationsForm.description = null
    state.applicationsForm.action      = null
    state.applicationsForm.show        = false
  },

  MODAL_COMPLETE ( state ) {
    state.modalCompleteShow = true
  },

  MODAL_COMPLETE_CLOSE ( state ) {
    state.modalCompleteShow = false
  },

  SIDEBAR_TOGGLE ( state, data ) {
    if (data) {
      state.showSideBar = data
    }
    else {
      state.showSideBar = !state.showSideBar
    }
  },

  WIDTH ( state, data ) {if (data) state.bodyWidth = data}
}

export const actions = {

  async GET_NAV ( { commit, state } ) {
    //if (!state.navMain || !state.navInfo || !state.navFooter) {
      //const nav   = await graphQl.data(Nav)
      //const terms = await graphQl.data(Terms)
      //commit('NAV_MAIN', nav.pages)
      //commit('NAV_FOOTER', nav.services)
      //commit('NAV_PERMISSIONS', nav.permissions)
      //commit('NAV_INFO', terms.pages)
    //}
  }
}

export const getters = {

  width ( state ) {
    return state.bodyWidth?.w
  },

  device ( state ) {
    if (!state.bodyWidth) return
    const width = state.bodyWidth.w
    if (width <= 480) {return 'phone'}
    else if (width > 480 && width <= 640) {return 'tablet-small'}
    else if (width > 640 && width <= 768) {return 'tablet-portrait'}
    else if (width > 768 && width <= 1024) {return 'tablet-landscape'}
    else if (width > 1024 && width <= 1200) {return 'desktop'}
    else if (width > 1200) {return 'desktop-large'}
  }

}
