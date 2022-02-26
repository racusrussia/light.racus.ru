const minBrowserVersion = {
  'IE':      null,
  'Edge':    13,
  'Firefox': 28,
  'Chrome':  21,
  'Safari':  7,
  'Opera':   13
}

export const Device = ( context ) => {
  const dev = context.store.state.device
  if (dev) return dev

  const version              = context.$ua.browserVersion()
  const v                    = ( version ) ? version.split('.') : null
  const browserVersionNumber = ( v && v.length ) ? Number(v[ 0 ]) : null

  const device = {
    deviceType:           context.$ua.deviceType(),
    os:                   context.$ua.os(),
    osVersion:            context.$ua.osVersion(),
    browser:              context.$ua.browser(),
    browserVersion:       context.$ua.browserVersion(),
    browserVersionNumber: browserVersionNumber,
    browserVendor:        context.$ua.browserVendor(),
    BrowserIsGood:        BrowserIsGood(context.$ua.browser(), browserVersionNumber),
    isFromIphone:         context.$ua.isFromIphone(),
    isFromIpad:           context.$ua.isFromIpad(),
    isFromIos:            context.$ua.isFromIos(),
    isFromAndroidMobile:  context.$ua.isFromAndroidMobile(),
    isFromAndroidTablet:  context.$ua.isFromAndroidTablet(),
    isFromAndroidOs:      context.$ua.isFromAndroidOs(),
    isFromWindowsPhone:   context.$ua.isFromWindowsPhone(),
    isFromPc:             context.$ua.isFromPc(),
    isFromSmartphone:     context.$ua.isFromSmartphone(),
    isFromMobilephone:    context.$ua.isFromMobilephone(),
    isFromAppliance:      context.$ua.isFromAppliance(),
    isFromCrawler:        context.$ua.isFromCrawler(),
    isFromTablet:         context.$ua.isFromTablet()
  }
  context.store.commit('SET_DEVICE_TYPE', device)
  return device
}

export const BrowserIsGood = ( browser, version ) => {
  if (!browser || !version) return false

  const inList = minBrowserVersion[ browser ]
  return ( inList )
    ? ( version >= minBrowserVersion[ browser ] )
    : false
}
