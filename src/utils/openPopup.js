import globalState from '../globalState.js'
import { setAriaHidden } from './aria.js'
import { jscClasses } from './classes.js'
import * as dom from './dom/index.js'
import { iOSfix } from './iosFix.js'
import { replaceScrollbarWithPadding } from './scrollbar.js'

export const SHOW_CLASS_TIMEOUT = 10

/**
 * Open popup, add necessary classes and styles, fix scrollbar
 *
 * @param {JsConfirmOptions} params
 */
export const openPopup = (params) => {
	const container = dom.getContainer()
	const popup = dom.getPopup()

	if (typeof params.willOpen === 'function') {
		params.willOpen(popup)
	}

	const bodyStyles = window.getComputedStyle(document.body)
	const initialBodyOverflow = bodyStyles.overflowY
	addClasses(container, popup, params)

	// scrolling is 'hidden' until animation is done, after that 'auto'
	setTimeout(() => {
		setScrollingVisibility(container, popup)
	}, SHOW_CLASS_TIMEOUT)

	if (dom.isModal()) {
		fixScrollContainer(container, params.scrollbarPadding, initialBodyOverflow)
		setAriaHidden()
	}

	if (!dom.isToast() && !globalState.previousActiveElement) {
		globalState.previousActiveElement = document.activeElement
	}

	if (typeof params.didOpen === 'function') {
		setTimeout(() => params.didOpen(popup))
	}

	dom.removeClass(container, jscClasses['no-transition'])
}

/**
 * @param {AnimationEvent} event
 */
const jscOpenAnimationFinished = (event) => {
	const popup = dom.getPopup()
	if (event.target !== popup || !dom.animationEndEvent) {
		return
	}
	const container = dom.getContainer()
	popup.removeEventListener(dom.animationEndEvent, jscOpenAnimationFinished)
	popup.classList.remove('jsconfirm-show')
	// container.style.overflowY = 'auto'
}

/**
 * @param {HTMLElement} container
 * @param {HTMLElement} popup
 */
const setScrollingVisibility = (container, popup) => {
	if (dom.animationEndEvent && dom.hasCssAnimation(popup)) {
		// container.style.overflowY = 'hidden'
		popup.addEventListener(dom.animationEndEvent, jscOpenAnimationFinished)
	} else {
		// container.style.overflowY = 'auto'
	}
}

/**
 * @param {HTMLElement} container
 * @param {boolean} scrollbarPadding
 * @param {string} initialBodyOverflow
 */
const fixScrollContainer = (container, scrollbarPadding, initialBodyOverflow) => {
	iOSfix()

	if (scrollbarPadding && initialBodyOverflow !== 'hidden') {
		replaceScrollbarWithPadding(initialBodyOverflow)
	}

	// sweetalert2/issues/1247
	setTimeout(() => {
		container.scrollTop = 0
	})
}

/**
 * @param {HTMLElement} container
 * @param {HTMLElement} popup
 * @param {JsConfirmOptions} params
 */
const addClasses = (container, popup, params) => {
	if (!params.toast) {
		
		dom.addClass(container, params.showClass.backdrop)
	}
	// this workaround with opacity is needed for https://github.com/sweetalert2/sweetalert2/issues/2059
	popup.style.setProperty('opacity', '0', 'important')
	dom.show(popup, 'block')
	dom.show(dom.getPopupInner(), 'grid')
	setTimeout(() => {
		// Animate popup right after showing it
		dom.addClass(popup, params.showClass.popup)
		// and remove the opacity workaround
		popup.style.removeProperty('opacity')
		
		// dom.applyNumericalStyle(popup, "height", popup.clientHeight)
	}, SHOW_CLASS_TIMEOUT) // 10ms in order to fix #2062

	dom.addClass([document.documentElement, document.body], jscClasses.shown)
	if (params.heightAuto && params.backdrop && !params.toast) {
		dom.addClass([document.documentElement, document.body], jscClasses['height-auto'])
	}
}
