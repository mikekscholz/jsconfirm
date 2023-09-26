import { jscClasses } from '../../classes.js'
import * as dom from '../../dom/index.js'
import { capitalizeFirstLetter } from '../../utils.js'

/**
 * @param {JsConfirm} instance
 * @param {JsConfirmOptions} params
 */
export const renderActions = (instance, params) => {
  const actions = dom.getActions()
  const loader = dom.getLoader()
  if (!actions || !loader) {
    return
  }

  // Actions (buttons) wrapper
  if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) {
    dom.hide(actions)
  } else {
    dom.show(actions)
  }

  // Custom class
  dom.applyCustomClass(actions, params, 'actions')

  // Render all the buttons
  renderButtons(actions, loader, params)

  // Loader
  dom.setInnerHtml(loader, params.loaderHtml || '')
  dom.applyCustomClass(loader, params, 'loader')
}

/**
 * @param {HTMLElement} actions
 * @param {HTMLElement} loader
 * @param {JsConfirmOptions} params
 */
function renderButtons(actions, loader, params) {
  const confirmButton = dom.getConfirmButton()
  const denyButton = dom.getDenyButton()
  const cancelButton = dom.getCancelButton()
  if (!confirmButton || !denyButton || !cancelButton) {
    return
  }

  // Render buttons
  renderButton(confirmButton, 'confirm', params)
  renderButton(denyButton, 'deny', params)
  renderButton(cancelButton, 'cancel', params)
  handleButtonsStyling(confirmButton, denyButton, cancelButton, params)

  if (params.reverseButtons) {
    if (params.toast) {
      actions.insertBefore(cancelButton, confirmButton)
      actions.insertBefore(denyButton, confirmButton)
    } else {
      actions.insertBefore(cancelButton, loader)
      actions.insertBefore(denyButton, loader)
      actions.insertBefore(confirmButton, loader)
    }
  }
}

/**
 * @param {HTMLElement} confirmButton
 * @param {HTMLElement} denyButton
 * @param {HTMLElement} cancelButton
 * @param {JsConfirmOptions} params
 */
function handleButtonsStyling(confirmButton, denyButton, cancelButton, params) {
  if (!params.buttonsStyling) {
    dom.removeClass([confirmButton, denyButton, cancelButton], jscClasses.styled)
    return
  }

  dom.addClass([confirmButton, denyButton, cancelButton], jscClasses.styled)

  // Buttons background colors
  if (params.confirmButtonColor) {
    confirmButton.style.backgroundColor = params.confirmButtonColor
    dom.addClass(confirmButton, jscClasses['default-outline'])
  }
  if (params.denyButtonColor) {
    denyButton.style.backgroundColor = params.denyButtonColor
    dom.addClass(denyButton, jscClasses['default-outline'])
  }
  if (params.cancelButtonColor) {
    cancelButton.style.backgroundColor = params.cancelButtonColor
    dom.addClass(cancelButton, jscClasses['default-outline'])
  }
}

/**
 * @param {HTMLElement} button
 * @param {'confirm' | 'deny' | 'cancel'} buttonType
 * @param {JsConfirmOptions} params
 */
function renderButton(button, buttonType, params) {
  const buttonName = /** @type {'Confirm' | 'Deny' | 'Cancel'} */ (capitalizeFirstLetter(buttonType))

  dom.toggle(button, params[`show${buttonName}Button`], '')
  dom.setInnerHtml(button, params[`${buttonType}ButtonText`] || '') // Set caption text
  button.setAttribute('aria-label', params[`${buttonType}ButtonAriaLabel`] || '') // ARIA label

  // Add buttons custom classes
  button.classList.add(jscClasses[buttonType])
  dom.applyCustomClass(button, params, `${buttonType}Button`)
}
