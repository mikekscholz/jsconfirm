import privateProps from '../../../privateProps.js'
import { iconTypes, swalClasses } from '../../classes.js'
import * as dom from '../../dom/index.js'
import { error } from '../../utils.js'

/**
 * @param {SweetAlert} instance
 * @param {SweetAlertOptions} params
 */
export const renderIcon = (instance, params) => {
  const innerParams = privateProps.innerParams.get(instance)
  const icon = dom.getIcon()
  if (!icon) {
    return
  }

  // if the given icon already rendered, apply the styling without re-rendering the icon
  if (innerParams && params.icon === innerParams.icon) {
    // Custom or default content
    setContent(icon, params)

    applyStyles(icon, params)
    return
  }

  if (!params.icon && !params.iconHtml) {
    dom.hide(icon)
    return
  }

  if (params.icon && Object.keys(iconTypes).indexOf(params.icon) === -1) {
    error(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${params.icon}"`)
    dom.hide(icon)
    return
  }

  dom.show(icon)

  // Custom or default content
  setContent(icon, params)

  applyStyles(icon, params)

  // Animate icon
  dom.addClass(icon, params.showClass && params.showClass.icon)
}

/**
 * @param {HTMLElement} icon
 * @param {SweetAlertOptions} params
 */
const applyStyles = (icon, params) => {
  for (const [iconType, iconClassName] of Object.entries(iconTypes)) {
    if (params.icon !== iconType) {
      dom.removeClass(icon, iconClassName)
    }
  }
  dom.addClass(icon, params.icon && iconTypes[params.icon])

  // Icon color
  setColor(icon, params)

  // Success icon background color
  // adjustSuccessIconBackgroundColor()

  // Custom class
  dom.applyCustomClass(icon, params, 'icon')
}

// Adjust success icon background color to match the popup background color
// const adjustSuccessIconBackgroundColor = () => {
//   const popup = dom.getPopup()
//   let modalBody = popup.querySelector('.modalBody')
//   if (!popup) {
//     return
//   }
//   const popupBackgroundColor = window.getComputedStyle(modalBody).getPropertyValue('background-color')
//   /** @type {NodeListOf<HTMLElement>} */
//   const successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix')
//   for (let i = 0; i < successIconParts.length; i++) {
//     successIconParts[i].style.backgroundColor = popupBackgroundColor
//   }
// }

const infoIconHtml = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" height="100%"><style type="text/css"></style><g class="info-circle"><path d="m256 512c-68.4 0-132.7-26.6-181-75-48.4-48.3-75-112.6-75-181s26.6-132.7 75-181c48.3-48.4 112.6-75 181-75s132.7 26.6 181 75c48.4 48.4 75 112.6 75 181s-26.6 132.7-75 181c-48.3 48.4-112.6 75-181 75zm0-458.5c-111.7 0-202.5 90.8-202.5 202.5s90.8 202.5 202.5 202.5 202.5-90.8 202.5-202.5-90.8-202.5-202.5-202.5z" /></g><g class="i-mark"><path d="m214.1 405.3c-6.8 0-13-2.5-17.7-7.3s-7.3-10.9-7.3-17.8c0-6.8 2.5-13 7.3-17.8s10.9-7.4 17.7-7.4h26.4v-110.2h-26.3c-6.8 0-13-2.5-17.8-7.3s-7.4-11-7.4-17.7 2.5-12.9 7.2-17.8c4.9-5 11-7.6 17.9-7.6h51.6c6.9 0 13.1 2.7 17.9 7.7 4.7 4.9 7.2 11 7.2 17.7v135.2h13c6.7 0 12.8 2.5 17.8 7.2 5 4.8 7.7 11 7.7 17.9 0 6.8-2.5 13-7.3 17.8s-10.9 7.4-17.7 7.4z" /><path d="m258.3 171.7h-3.2c-17.9 0-32.5-14.6-32.5-32.5s14.6-32.5 32.5-32.5h3.2c17.9 0 32.5 14.6 32.5 32.5 0 17.8-14.6 32.5-32.5 32.5z" /></g></svg>
`

// const successIconHtml = `
// <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" version="1.1" viewBox="0 0 568 512" xmlns="http://www.w3.org/2000/svg"><path d="m487 247.2v8.8c0 127.6-104.2 230.9-231.5 231-127.2 0-230.43-103.4-230.5-231 0.07-127.6 103.3-231 230.5-231 45.2-0.01 89.5 13.31 127.2 38.29" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="-1" stroke-width="50"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.3s" keyTimes="0; 1" repeatCount="0" values="-1; 0"/></path><path d="M 107,189.5 254.2,337 543,47" pathLength="12" stroke-dasharray="10 12" stroke-dashoffset="-12" stroke-width="50"><animate attributeName="stroke-dashoffset" dur="1s" begin="0.8s" repeatCount="0" values="-12; 0; -1.8; -0.6; -1; -0.8" keyTimes="0; 0.2; 0.4; 0.6; 0.8; 1" fill="freeze" /></path></svg>
// `
const successIconHtml = `
<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" version="1.1" viewBox="0 0 568 512" xmlns="http://www.w3.org/2000/svg"><style type="text/css"></style><path class="success-circle" d="m487 247.2v8.8c0 127.6-104.2 230.9-231.5 231-127.2 0-230.43-103.4-230.5-231 0.07-127.6 103.3-231 230.5-231 45.2-0.01 89.5 13.31 127.2 38.29" pathLength="1" /><path class="check-mark" d="M 107,189.5 254.2,337 543,47" pathLength="12" /></svg>
`

const questionIconHtml = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" height="100%"><style type="text/css"></style><path class="question-circle" d="m256 512c-68.4 0-132.7-26.6-181-75-48.4-48.3-75-112.6-75-181s26.6-132.7 75-181c48.3-48.4 112.6-75 181-75s132.7 26.6 181 75c48.4 48.4 75 112.6 75 181s-26.6 132.7-75 181c-48.3 48.4-112.6 75-181 75zm0-458.5c-111.7 0-202.5 90.8-202.5 202.5s90.8 202.5 202.5 202.5 202.5-90.8 202.5-202.5-90.8-202.5-202.5-202.5z" /><g class="question-mark"><path d="m279.1 315.3c0.3 6.8-1.9 12.6-6.6 17.6-4.8 5-10.9 7.6-18.2 7.8-7.3 0.4-13.5-1.7-18.7-6.2s-8-10.1-8.2-16.9l-0.8-18.9c-0.7-15.1 3.3-27.6 12-37.4 8.8-9.8 17.7-18.5 26.7-26.3 8.6-7.2 16.5-15.2 23.6-24.2 7.3-8.9 10.6-19.3 10.1-31.4-0.6-11.5-5-20.6-13.4-27.3s-19.4-9.8-33-9.1c-11.4 0.5-20.4 3.7-27 9.8-6.6 6-10.1 14.3-10.7 24.8-0.2 5.7-2.8 11-7.5 15.6-4.8 4.7-10.6 7.1-17.3 7.4-6.8 0.2-13.1-2.1-18.8-7.1-5.7-4.9-8.7-10.8-9-17.6-0.6-13.7 3.1-26.2 10.9-37.8s18.6-21.1 32.1-28.5 28.7-11.45 45.3-12.17c27.7-1.26 51 5.27 70 19.27 18.9 14.1 28.9 32.9 29.9 56.4 1 21.9-3.1 39.1-12.2 51.5-9.1 12.5-19.5 23.4-31.1 32.8-8.2 6.6-15 13-20.8 19.3-5.7 6.3-8.4 12.8-8.2 19.6z" /><path d="m258.2 414.9c-7.3 0.4-13.6-1.9-19-6.7-5.4-4.9-8.2-10.8-8.6-17.6-0.3-7.3 2-13.6 7-18.9 4.9-5.4 11.1-8.1 18.3-8.4 6.8-0.3 12.9 2 18.1 6.8 5.2 4.9 7.9 10.9 8.3 18.2 0.2 7-1.9 13-6.7 18.3-4.7 5.2-10.5 8-17.4 8.3z" /></g></svg>
`

const errorIconHtml = `
<svg fill="currentColor" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><style type="text/css"></style><path class="error-circle" d="m256 512c-68.4 0-132.7-26.6-181-75-48.4-48.3-75-112.6-75-181s26.6-132.7 75-181c48.3-48.4 112.6-75 181-75s132.7 26.6 181 75c48.4 48.4 75 112.6 75 181s-26.6 132.7-75 181c-48.3 48.4-112.6 75-181 75zm0-458.5c-111.7 0-202.5 90.8-202.5 202.5s90.8 202.5 202.5 202.5 202.5-90.8 202.5-202.5-90.8-202.5-202.5-202.5z" /><path class="x-mark" d="m347.8 374.6c-7.1 0-13.9-2.8-18.9-7.8l-72.8-72.9-72.8 72.8c-5.1 5.1-11.8 7.8-18.9 7.8s-14-2.8-19-7.8c-10.4-10.4-10.4-27.4 0-37.9l72.9-72.8-72.9-72.8c-10.4-10.4-10.5-27.4-0.1-37.9h0.1c5-5 11.9-7.9 19-7.9s13.8 2.9 18.9 7.9l72.8 72.8 72.8-72.9c5.1-5.1 11.8-7.8 18.9-7.8s13.8 2.8 18.8 7.8c10.4 10.4 10.4 27.5 0 38l-72.7 72.9 72.7 72.8c10.4 10.4 10.4 27.3 0 37.8-5 5-11.6 7.8-18.8 7.9z" /></svg>
`

const warningIconHtml = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" height="100%"><style type="text/css"></style><path class="warning-icon" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z" /></svg>
`

/**
 * @param {HTMLElement} icon
 * @param {SweetAlertOptions} params
 * @var {DOMParserSupportedType} mime
 */
const setContent = (icon, params) => {
  if (!params.icon && !params.iconHtml) {
    return
  }
  let oldContent = icon.innerHTML
  let newContent = ''
  // let mime = 'text/html'
  if (params.iconHtml) {
    newContent = iconContent(params.iconHtml)
  } else if (params.icon === 'success') {
    newContent = successIconHtml
  } else if (params.icon === 'error') {
    newContent = errorIconHtml
  } else if (params.icon === 'question') {
    newContent = questionIconHtml
  } else if (params.icon === 'info') {
    newContent = infoIconHtml
  } else if (params.icon === 'warning') {
    newContent = warningIconHtml
  }
  
  if (oldContent.trim() !== newContent.trim()) {
    dom.setInnerHtml(icon, newContent)
  }
}

/**
 * @param {HTMLElement} icon
 * @param {SweetAlertOptions} params
 */
const setColor = (icon, params) => {
  if (!params.iconColor) {
    return
  }
  icon.style.color = params.iconColor
  icon.style.borderColor = params.iconColor
  for (const sel of [
    '.swal2-success-line-tip',
    '.swal2-success-line-long',
    '.swal2-x-mark-line-left',
    '.swal2-x-mark-line-right',
  ]) {
    dom.setStyle(icon, sel, 'backgroundColor', params.iconColor)
  }
  dom.setStyle(icon, '.swal2-success-ring', 'borderColor', params.iconColor)
}

/**
 * @param {string} content
 * @returns {string}
 */
const iconContent = (content) => `<div class="${swalClasses['icon-content']}">${content}</div>`
