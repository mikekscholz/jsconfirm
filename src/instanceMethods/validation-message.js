import privateProps from '../privateProps.js'
import { jscClasses } from '../utils/classes.js'
import * as dom from '../utils/dom/index.js'

/**
 * Show block with validation message
 *
 * @param {string} error
 * @this {JsConfirm}
 */
export function showValidationMessage(error) {
  const domCache = privateProps.domCache.get(this)
  const params = privateProps.innerParams.get(this)
  dom.setInnerHtml(domCache.validationMessage, error)
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
