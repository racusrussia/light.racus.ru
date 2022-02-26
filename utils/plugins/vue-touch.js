import Vue from 'vue'

// Vue2 Touch Events
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents, {
  touchClass:          'pos-touch', // Add an extra CSS class when touch start, and remove it when touch end.
                                    // This is a global config, and you can use v-touch-class directive to overwrite this setting in a single component.
  tapTolerance:        10,  // default 10. The tolerance to ensure whether the tap event effective or not.
  swipeTolerance:      40,  // default 30. The tolerance to ensure whether the swipe event effective or not.
  longTapTimeInterval: 400  // default 400 in millisecond.
                            // The minimum time interval to detect whether long tap event effective or not.
})
