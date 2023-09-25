import { swalClasses } from '../../classes.js'
import * as dom from '../../dom/index.js'

/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
export const renderImage = (instance, params) => {
  const image = dom.getImage()
  if (!image) {
    return
  }

  if (!params.imageUrl) {
    dom.hide(image)
    return
  }

  dom.show(image, '')

  // Src, alt
  image.setAttribute('src', params.imageUrl)
  image.setAttribute('alt', params.imageAlt || '')

  // Width, height
  dom.applyNumericalStyle(image, 'width', params.imageWidth)
  dom.applyNumericalStyle(image, 'height', params.imageHeight)

  // Class
  image.classList.add(swalClasses.image)
  dom.applyCustomClass(image, params, 'image')
}
