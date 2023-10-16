import privateProps from '../privateProps.js'
import { jscClasses } from '../utils/classes.js'
import * as dom from '../utils/dom/index.js'

const validationIcon = `
<svg version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="jsconfirm-validation-icon"><path d="m256 0c-141 0-256 115-256 256.1 0 141 115 255.9 256 255.9 141.1 0 256-114.9 256-255.9 0-141.1-114.9-256.1-256-256.1zm0 50c114.1 0 206 92 206 206.1 0 114-91.9 205.9-206 205.9-114 0-206-91.9-206-205.9 0-114.1 92-206.1 206-206.1zm-31.4 62.7c0-16 13-30.8 33.1-30.8 14.9 0 29.5 14.8 29.5 30.8v163.6c0 16.4-14.5 30.9-29.5 30.9-20.1 0-33.1-14.5-33.1-30.9zm33.1 317.4c-24.4 0-41.7-18.4-41.7-42.3 0-20.9 17.3-38.4 41.7-38.4 20.8 0 38.3 17.5 38.3 38.4 0 23.9-17.5 42.3-38.3 42.3z"/></svg>
`
/**
 * Show block with validation message
 *
 * @param {string} error
 * @this {JsConfirm}
 */
export function showValidationMessage(error) {
  const domCache = privateProps.domCache.get(this)
  const params = privateProps.innerParams.get(this)
  dom.setInnerHtml(domCache.validationMessage, validationIcon + error)
  domCache.validationMessage.classList.add(jscClasses['validation-message'])
  if (params.customClass && params.customClass.validationMessage) {
    dom.addClass(domCache.validationMessage, params.customClass.validationMessage)
  }
  dom.show(domCache.validationMessage)

  const input = this.getInput()
  if (input) {
    input.setAttribute('aria-invalid', 'true')
    input.setAttribute('aria-describedby', jscClasses['validation-message'])
    dom.focusInput(input)
    dom.addClass(input, jscClasses.inputerror)
  }
}

/**
 * Hide block with validation message
 *
 * @this {JsConfirm}
 */
export function resetValidationMessage() {
  const domCache = privateProps.domCache.get(this)
  if (domCache.validationMessage) {
    dom.hide(domCache.validationMessage)
  }

  const input = this.getInput()
  if (input) {
    input.removeAttribute('aria-invalid')
    input.removeAttribute('aria-describedby')
    dom.removeClass(input, jscClasses.inputerror)
  }
}
