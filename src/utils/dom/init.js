import globalState from '../../globalState.js'
import { swalClasses } from '../classes.js'
import { isNodeEnv } from '../isNodeEnv.js'
import { error } from '../utils.js'
import { addClass, getDirectChildByClass, removeClass, setInnerHtml } from './domUtils.js'
import { getContainer, getPopup } from './getters.js'

//  <button type="button" class="${swalClasses.close}"></button>
const sweetHTML = `
<div aria-labelledby="${swalClasses.title}" aria-describedby="${swalClasses['html-container']}" class="${swalClasses.popup}" tabindex="-1">
<div class="modalBody modalClip">
   <ul class="${swalClasses['progress-steps']}"></ul>
   <div class="swalHeaderRow">
   <div class="${swalClasses.icon}"></div>
   <h2 class="${swalClasses.title}" id="${swalClasses.title}"></h2>
   </div>
   <img class="${swalClasses.image}" />
   <div class="${swalClasses['html-container']}" id="${swalClasses['html-container']}"></div>
   <input class="${swalClasses.input}" id="${swalClasses.input}" />
   <input type="file" class="${swalClasses.file}" />
   <div class="${swalClasses.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${swalClasses.select}" id="${swalClasses.select}"></select>
   <div class="${swalClasses.radio}"></div>
   <label class="${swalClasses.checkbox}">
     <input type="checkbox" id="${swalClasses.checkbox}" />
     <span class="${swalClasses.label}"></span>
   </label>
   <textarea class="${swalClasses.textarea}" id="${swalClasses.textarea}"></textarea>
   <div class="${swalClasses['validation-message']}" id="${swalClasses['validation-message']}"></div>
   <div class="${swalClasses.actions}">
     <div class="${swalClasses.loader}"></div>
     <button type="button" class="${swalClasses.confirm}"></button>
     <button type="button" class="${swalClasses.deny}"></button>
     <button type="button" class="${swalClasses.cancel}"></button>
   </div>
   <div class="${swalClasses.footer}"></div>
   <div class="${swalClasses['timer-progress-bar-container']}">
     <div class="${swalClasses['timer-progress-bar']}"></div>
   </div>
 </div>
 <div class="${swalClasses.close}"><svg class="solid" data-src="./assets/xmark.svg" height="22px" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path></svg></div>
 </div>
`.replace(/(^|\n)\s*/g, '')

/**
 * @returns {boolean}
 */
const resetOldContainer = () => {
  const oldContainer = getContainer()
  if (!oldContainer) {
    return false
  }

  oldContainer.remove()
  removeClass(
    [document.documentElement, document.body],
    [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]
  )

  return true
}

const resetValidationMessage = () => {
  globalState.currentInstance.resetValidationMessage()
}

const addInputChangeListeners = () => {
  const popup = getPopup()

  /** @type {HTMLInputElement} */
  const input = popup.querySelector(`.${swalClasses.input}`)
  /** @type {HTMLInputElement} */
  const file = popup.querySelector(`.${swalClasses.file}`)
  /** @type {HTMLInputElement} */
  const range = popup.querySelector(`.${swalClasses.range} input`)
  /** @type {HTMLOutputElement} */
  const rangeOutput = popup.querySelector(`.${swalClasses.range} output`)
  /** @type {HTMLInputElement} */
  const select = popup.querySelector(`.${swalClasses.select}`)
  /** @type {HTMLInputElement} */
  const checkbox = popup.querySelector(`.${swalClasses.checkbox} input`)
  /** @type {HTMLInputElement} */
  const textarea = popup.querySelector(`.${swalClasses.textarea}`)

  input.oninput = resetValidationMessage
  file.onchange = resetValidationMessage
  select.onchange = resetValidationMessage
  checkbox.onchange = resetValidationMessage
  textarea.oninput = resetValidationMessage

  range.oninput = () => {
    resetValidationMessage()
    rangeOutput.value = range.value
  }

  range.onchange = () => {
    resetValidationMessage()
    rangeOutput.value = range.value
  }
}

/**
 * @param {string | HTMLElement} target
 * @returns {HTMLElement}
 */
const getTarget = (target) => (typeof target === 'string' ? document.querySelector(target) : target)

/**
 * @param {SweetAlertOptions} params
 */
const setupAccessibility = (params) => {
  const popup = getPopup()

  popup.setAttribute('role', params.toast ? 'alert' : 'dialog')
  popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive')
  if (!params.toast) {
    popup.setAttribute('aria-modal', 'true')
  }
}

/**
 * @param {HTMLElement} targetElement
 */
const setupRTL = (targetElement) => {
  if (window.getComputedStyle(targetElement).direction === 'rtl') {
    addClass(getContainer(), swalClasses.rtl)
  }
}

/**
 * Add modal + backdrop + no-war message for Russians to DOM
 *
 * @param {SweetAlertOptions} params
 */
export const init = (params) => {
  // Clean up the old popup container if it exists
  const oldContainerExisted = resetOldContainer()

  if (isNodeEnv()) {
    error('SweetAlert2 requires document to initialize')
    return
  }

  const container = document.createElement('div')
  container.className = swalClasses.container
  if (oldContainerExisted) {
    addClass(container, swalClasses['no-transition'])
  }
  setInnerHtml(container, sweetHTML)

  const targetElement = getTarget(params.target)
  targetElement.appendChild(container)

  setupAccessibility(params)
  setupRTL(targetElement)
  addInputChangeListeners()
}
