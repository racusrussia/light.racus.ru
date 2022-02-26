<template>
  <div ref="map"
       class="ra-map"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'

export default {
  name: 'ContactsMap',

  data () {
    return {
      leaflet:        null,
      spinShow:       false,
      map:            null,
      empty:          [ 59.942668, 30.315871 ],
      GeoPoints:      [],
      GeoPointsGroup: '',
      mapBoxToken:    'pk.eyJ1IjoieXVyZ2VtYW4iLCJhIjoiQkdab0FGWSJ9.Y7NDiEEk4oSryLe0JKYQPw',
      mapSize:        {
        w: 0,
        h: 0
      }
    }
  },

  computed: {

    content () {
      if (!this.contacts) return
      return `
      <div class="ra-text-center">
        <img src="${ this.logo }" width="80" style="margin: 0 auto"/>
      </div>
      `
      //`return `
      //<div class="ra-text-center">
      //  <img src="${ this.logo }" width="80" style="margin: 0 auto"/>
      //  <h6 style="margin: 1rem 0 0 0">${ this.siteName }</h6>
      //  <p>${ this.contacts.address }</p>
      //</div>
      //`
    },

    logo () {return this.$store.getters.logo?.url},
    siteName () {return this.$store.getters.siteName},
    contacts () {return this.$store.getters.contacts},

    points () {
      if (!this.contacts) return
      if (!this.contacts.geo) return
      const { latitude, longitude } = this.contacts.geo
      console.log(this.contacts)
      if (!latitude || !longitude) return
      return {
        title: this.contacts.siteName,
        geo:   [ latitude, longitude ]
      }
    }
  },

  mounted () {
    if (process.browser) {
      this.init()
      this.drawPoints()
      //this.fitBounce()
    }
  },

  methods: {

    init () {

      this.leaflet = require('leaflet')
      const point  = ( this.points ) ? this.points.geo : this.empty

      this.map = L.map(this.$refs.map, {
        minZoom: 1.6,
        //maxZoom:            17,
        //boundary:           null,
        zoomControl:        true,
        dragging:           true,
        scrollWheelZoom:    false,
        doubleClickZoom:    true,
        polygon:            null,
        zoomSnap:           0.3,
        attributionControl: false
      }).setView(point, 12)

      // mapbox://styles/yurgeman/cku8ve9gu1bxt18s0s9wz6ekq
      this.tileLayer = L.tileLayer(
        'https://api.mapbox.com/styles/v1/yurgeman/cku8ve9gu1bxt18s0s9wz6ekq/tiles/512/{z}/{x}/{y}?access_token={accessToken}',
        {
          attribution: false,
          maxZoom:     18,
          accessToken: this.mapBoxToken
        }
      ).addTo(this.map)

    },

    drawPoints () {

      let LeafIcon = L.Icon.extend({
        options: {
          iconUrl:      '/images/map/marker-icon-warning.svg',
          shadowUrl:    '/images/map/marker-shadow.svg',
          iconSize:     [ 25, 35 ], // size of the icon
          shadowSize:   [ 25, 25 ], // size of the shadow
          iconAnchor:   [ 13, 35 ], // point of the icon which will correspond to marker's location
          shadowAnchor: [ 7, 25 ],  // the same for the shadow
          popupAnchor:  [ 0, -22 ] // point from which the popup should open relative to the iconAnchor
        }
      })

      let iconDefault = new LeafIcon({ iconUrl: '/images/map/marker-icon-danger.svg' })

      if (!this.points) return
      L.marker(this.points.geo, { icon: iconDefault })
       .bindPopup(this.content, { maxWidth: 300, minWidth: 200 })
       .addTo(this.map)
       .openPopup()

      //this.GeoPointsGroup = L.featureGroup(this.GeoPoints)
      //
      //this.map.addLayer(this.GeoPointsGroup)
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"

.ra-map
  height: 100%
  min-height: 300px
  z-index: 1
  @media (max-width: $device-tablet-small)
    min-height: 280px
  @media (max-width: $device-phone)
    min-height: 230px

.ra-footer
  .leaflet-bar a,
  .leaflet-bar a:hover
    color: $ra-color-base
</style>
