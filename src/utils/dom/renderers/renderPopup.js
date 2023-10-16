import { jscClasses, popupTypes } from '../../classes.js'
import * as dom from '../../dom/index.js'
import { error } from '../../utils.js'

/**
 * @param {JsConfirm} instance
 * @param {JsConfirmOptions} params
 */
export const renderPopup = (instance, params) => {
	const container = dom.getContainer()
	const popup = dom.getPopup()
	const popupInner = dom.getPopupInner()
	// const header = dom.getHeader()
	if (!container || !popup) {
		return
	}

	// Width
	// https://github.com/sweetalert2/sweetalert2/issues/2170
	if (params.toast) {
		dom.applyNumericalStyle(popup, 'width', params.width)
		// popup.style.width = '100%'
		const loader = dom.getLoader()
		loader && popupInner.insertBefore(loader, dom.getIcon())
	} else {
		dom.applyNumericalStyle(popup, 'width', params.width)
	}

	// Padding
	dom.applyNumericalStyle(popupInner, 'padding', params.padding)

	// Color
	if (params.color) {
		popup.style.color = params.color
	}

	// Background
	if (params.background) {
		popupInner.style.background = params.background
	}

	dom.hide(dom.getValidationMessage())

	// Classes
	addClasses(popup, params)
}

/**
 * @param {HTMLElement} popup
 * @param {JsConfirmOptions} params
 */
const addClasses = (popup, params) => {
	const showClass = params.showClass || {}
	// Default Class + showClass when updating Jsc.update({})
	// popup.className = `${jscClasses.popup} ${dom.isVisible(popup) ? showClass.popup : ''}`
	popup.classList.add(jscClasses.popup)
	if (dom.isVisible(popup)){
		popup.classList.add(`${showClass.popup}`)
	}
	
	if (params.toast) {
		dom.addClass([document.documentElement, document.body], jscClasses['toast-shown'])
		dom.addClass(popup, jscClasses.toast)
	} else {
		dom.addClass(popup, jscClasses.modal)
	}

	// Custom class
	dom.applyCustomClass(popup, params, 'popup')
	if (typeof params.customClass === 'string') {
		dom.addClass(popup, params.customClass)
	}

	// Icon class (#1842)
	if (params.icon) {
		dom.addClass(popup, jscClasses[`icon-${params.icon}`])
	}
	
	if (params.type) {
		if (Object.keys(popupTypes).indexOf(params.type) === -1){
			error(`Unknown type! Expected "red", "yellow", "green", "blue", "light-gray", "dark-gray", "default", got "${params.type}"`)
			dom.addClass(popup, popupTypes['default'])
		} else {
			dom.addClass(popup, popupTypes[params.type])
		}
	} else {
		dom.addClass(popup, popupTypes['default'])
	}
	
	if (params.animated) {
		dom.addClass(popup, jscClasses.animated)
	}
}
