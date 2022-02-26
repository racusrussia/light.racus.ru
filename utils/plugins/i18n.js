export default function ( { app } ) {

  // onBeforeLanguageSwitch called right before setting a new locale
  app.i18n.onBeforeLanguageSwitch = async ( oldLocale, newLocale, isInitialSetup, context ) => {
    console.log('onBeforeLanguageSwitch', oldLocale, newLocale, isInitialSetup)
    //await context.store.dispatch('GET_TOP_MENU', newLocale )
  }

  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched     = async ( oldLocale, newLocale ) => {
    console.log('onLanguageSwitched', oldLocale, newLocale)
  }
}
