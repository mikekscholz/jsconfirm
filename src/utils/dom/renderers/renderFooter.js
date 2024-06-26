import * as dom from '../../dom/index.js'

/**
 * @param {JsConfirm} instance
 * @param {JsConfirmOptions} params
 */
export const renderFooter = (instance, params) => {
  const footer = dom.getFooter()
  if (!footer) {
    return
  }

  dom.toggle(footer, params.footer, 'block')

  if (params.footer) {
    dom.parseHtmlToContainer(params.footer, footer)
  }

  // Custom class
  dom.applyCustomClass(footer, params, 'footer')
}
