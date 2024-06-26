import defaultParams from './params.js'
import { capitalizeFirstLetter, warn } from './utils.js'

const jscStringParams = ['jsc-title', 'jsc-html', 'jsc-footer']

/**
 * @param {JsConfirmOptions} params
 * @returns {JsConfirmOptions}
 */
export const getTemplateParams = (params) => {
  /** @type {HTMLTemplateElement} */
  const template = typeof params.template === 'string' ? document.querySelector(params.template) : params.template
  if (!template) {
    return {}
  }
  /** @type {DocumentFragment} */
  const templateContent = template.content

  showWarningsForElements(templateContent)

  const result = Object.assign(
    getJscParams(templateContent),
    getJscFunctionParams(templateContent),
    getJscButtons(templateContent),
    getJscImage(templateContent),
    getJscIcon(templateContent),
    getJscInput(templateContent),
    getJscStringParams(templateContent, jscStringParams)
  )
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @returns {JsConfirmOptions}
 */
const getJscParams = (templateContent) => {
  const result = {}
  /** @type {HTMLElement[]} */
  const jscParams = Array.from(templateContent.querySelectorAll('jsc-param'))
  jscParams.forEach((param) => {
    showWarningsForAttributes(param, ['name', 'value'])
    const paramName = param.getAttribute('name')
    const value = param.getAttribute('value')
    if (typeof defaultParams[paramName] === 'boolean') {
      result[paramName] = value !== 'false'
    } else if (typeof defaultParams[paramName] === 'object') {
      result[paramName] = JSON.parse(value)
    } else {
      result[paramName] = value
    }
  })
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @returns {JsConfirmOptions}
 */
const getJscFunctionParams = (templateContent) => {
  const result = {}
  /** @type {HTMLElement[]} */
  const jscFunctions = Array.from(templateContent.querySelectorAll('jsc-function-param'))
  jscFunctions.forEach((param) => {
    const paramName = param.getAttribute('name')
    const value = param.getAttribute('value')
    result[paramName] = new Function(`return ${value}`)()
  })
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @returns {JsConfirmOptions}
 */
const getJscButtons = (templateContent) => {
  const result = {}
  /** @type {HTMLElement[]} */
  const jscButtons = Array.from(templateContent.querySelectorAll('jsc-button'))
  jscButtons.forEach((button) => {
    showWarningsForAttributes(button, ['type', 'color', 'aria-label'])
    const type = button.getAttribute('type')
    result[`${type}ButtonText`] = button.innerHTML
    result[`show${capitalizeFirstLetter(type)}Button`] = true
    if (button.hasAttribute('color')) {
      result[`${type}ButtonColor`] = button.getAttribute('color')
    }
    if (button.hasAttribute('aria-label')) {
      result[`${type}ButtonAriaLabel`] = button.getAttribute('aria-label')
    }
  })
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @returns {JsConfirmOptions}
 */
const getJscImage = (templateContent) => {
  const result = {}
  /** @type {HTMLElement} */
  const image = templateContent.querySelector('jsc-image')
  if (image) {
    showWarningsForAttributes(image, ['src', 'width', 'height', 'alt'])
    if (image.hasAttribute('src')) {
      result.imageUrl = image.getAttribute('src')
    }
    if (image.hasAttribute('width')) {
      result.imageWidth = image.getAttribute('width')
    }
    if (image.hasAttribute('height')) {
      result.imageHeight = image.getAttribute('height')
    }
    if (image.hasAttribute('alt')) {
      result.imageAlt = image.getAttribute('alt')
    }
  }
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @returns {JsConfirmOptions}
 */
const getJscIcon = (templateContent) => {
  const result = {}
  /** @type {HTMLElement} */
  const icon = templateContent.querySelector('jsc-icon')
  if (icon) {
    showWarningsForAttributes(icon, ['type', 'color'])
    if (icon.hasAttribute('type')) {
      /** @type {JsConfirmIcon} */
      // @ts-ignore
      result.icon = icon.getAttribute('type')
    }
    if (icon.hasAttribute('color')) {
      result.iconColor = icon.getAttribute('color')
    }
    result.iconHtml = icon.innerHTML
  }
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @returns {JsConfirmOptions}
 */
const getJscInput = (templateContent) => {
  const result = {}
  /** @type {HTMLElement} */
  const input = templateContent.querySelector('jsc-input')
  if (input) {
    showWarningsForAttributes(input, ['type', 'label', 'placeholder', 'value'])
    /** @type {JsConfirmInput} */
    // @ts-ignore
    result.input = input.getAttribute('type') || 'text'
    if (input.hasAttribute('label')) {
      result.inputLabel = input.getAttribute('label')
    }
    if (input.hasAttribute('placeholder')) {
      result.inputPlaceholder = input.getAttribute('placeholder')
    }
    if (input.hasAttribute('value')) {
      result.inputValue = input.getAttribute('value')
    }
  }
  /** @type {HTMLElement[]} */
  const inputOptions = Array.from(templateContent.querySelectorAll('jsc-input-option'))
  if (inputOptions.length) {
    result.inputOptions = {}
    inputOptions.forEach((option) => {
      showWarningsForAttributes(option, ['value'])
      const optionValue = option.getAttribute('value')
      const optionName = option.innerHTML
      result.inputOptions[optionValue] = optionName
    })
  }
  return result
}

/**
 * @param {DocumentFragment} templateContent
 * @param {string[]} paramNames
 * @returns {JsConfirmOptions}
 */
const getJscStringParams = (templateContent, paramNames) => {
  const result = {}
  for (const i in paramNames) {
    const paramName = paramNames[i]
    /** @type {HTMLElement} */
    const tag = templateContent.querySelector(paramName)
    if (tag) {
      showWarningsForAttributes(tag, [])
      result[paramName.replace(/^jsc-/, '')] = tag.innerHTML.trim()
    }
  }
  return result
}

/**
 * @param {DocumentFragment} templateContent
 */
const showWarningsForElements = (templateContent) => {
  const allowedElements = jscStringParams.concat([
    'jsc-param',
    'jsc-function-param',
    'jsc-button',
    'jsc-image',
    'jsc-icon',
    'jsc-input',
    'jsc-input-option',
  ])
  Array.from(templateContent.children).forEach((el) => {
    const tagName = el.tagName.toLowerCase()
    if (!allowedElements.includes(tagName)) {
      warn(`Unrecognized element <${tagName}>`)
    }
  })
}

/**
 * @param {HTMLElement} el
 * @param {string[]} allowedAttributes
 */
const showWarningsForAttributes = (el, allowedAttributes) => {
  Array.from(el.attributes).forEach((attribute) => {
    if (allowedAttributes.indexOf(attribute.name) === -1) {
      warn([
        `Unrecognized attribute "${attribute.name}" on <${el.tagName.toLowerCase()}>.`,
        `${
          allowedAttributes.length
            ? `Allowed attributes are: ${allowedAttributes.join(', ')}`
            : 'To set the value, use HTML within the element.'
        }`,
      ])
    }
  })
}
