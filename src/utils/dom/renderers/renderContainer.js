import { jscClasses } from '../../classes.js'
import * as dom from '../../dom/index.js'
import { warn } from '../../utils.js'

/**
 * @param {JsConfirm} instance
 * @param {JsConfirmOptions} params
 */
export const renderContainer = (instance, params) => {
  const container = dom.getContainer()

  if (!container) {
    return
  }

  handleBackdropParam(container, params.backdrop)

  handlePositionParam(container, params.position)
  handleGrowParam(container, params.grow)

  // Custom class
  dom.applyCustomClass(container, params, 'container')
}

/**
 * @param {HTMLElement} container
 * @param {JsConfirmOptions['backdrop']} backdrop
 */
function handleBackdropParam(container, backdrop) {
  if (typeof backdrop === 'string') {
    container.style.background = backdrop
  } else if (!backdrop) {
    dom.addClass([document.documentElement, document.body], jscClasses['no-backdrop'])
  }
}

/**
 * @param {HTMLElement} container
 * @param {JsConfirmOptions['position']} position
 */
function handlePositionParam(container, position) {
  if (!position) {
    return
  }
  if (position in jscClasses) {
    dom.addClass(container, jscClasses[position])
  } else {
    warn('The "position" parameter is not valid, defaulting to "center"')
    dom.addClass(container, jscClasses.center)
  }
}

/**
 * @param {HTMLElement} container
 * @param {JsConfirmOptions['grow']} grow
 */
function handleGrowParam(container, grow) {
  if (!grow) {
    return
  }
  dom.addClass(container, jscClasses[`grow-${grow}`])
}
