import IntersectionObserver from 'intersection-observer-polyfill'

export default {

  inserted: el => {
    function loadImage () {
      const imageElement = Array.from(el.children)
                                .find(el => el.nodeName === 'IMG')
      const sourceElement = Array.from(el.children)
                                .find(el => el.nodeName === 'SOURCE')

      if (sourceElement) {
        sourceElement.addEventListener('error', () => console.log('error'))
        sourceElement.srcset = sourceElement.dataset.srcset
      }
      if (imageElement) {
        imageElement.addEventListener('error', () => console.log('error'))
        imageElement.src = imageElement.dataset.src
      }
    }

    function handleIntersect ( entries, observer ) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage()
          observer.unobserve(el)
        }
      })
    }

    function createObserver () {
      const options  = {
        root:      null,
        threshold: 0
      }
      const observer = new IntersectionObserver(handleIntersect, options)
      observer.observe(el)
    }

    if (window[ 'IntersectionObserver' ]) {createObserver()}
    else {loadImage()}
  }
}
