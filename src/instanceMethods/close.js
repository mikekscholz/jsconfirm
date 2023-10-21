import globalState, { restoreActiveElement } from '../globalState.js'
import { removeKeydownHandler } from '../keydown-handler.js'
import privateMethods from '../privateMethods.js'
import privateProps from '../privateProps.js'
import { unsetAriaHidden } from '../utils/aria.js'
import { jscClasses } from '../utils/classes.js'
import * as dom from '../utils/dom/index.js'
import { undoIOSfix } from '../utils/iosFix.js'
import { undoReplaceScrollbarWithPadding } from '../utils/scrollbar.js'
import { isSafariOrIOS } from '../utils/iosFix.js'

function sleep(ms) {
	return new Promise(resolveFunc => setTimeout(resolveFunc, ms));
}

/**
 * @param {JsConfirm} instance
 * @param {HTMLElement} container
 * @param {boolean} returnFocus
 * @param {Function} didClose
 */
function removePopupAndResetState(instance, container, returnFocus, didClose) {
	if (dom.isToast()) {
		triggerDidCloseAndDispose(instance, didClose)
	} else {
		restoreActiveElement(returnFocus).then(() => triggerDidCloseAndDispose(instance, didClose))
		removeKeydownHandler(globalState)
	}

	// workaround for https://github.com/sweetalert2/sweetalert2/issues/2088
	// for some reason removing the container in Safari will scroll the document to bottom
	if (isSafariOrIOS) {
		container.setAttribute('style', 'display:none !important')
		container.removeAttribute('class')
		container.innerHTML = ''
	} else {
		container.remove()
	}

	if (dom.isModal()) {
		undoReplaceScrollbarWithPadding()
		undoIOSfix()
		unsetAriaHidden()
	}

	removeBodyClasses()
}

/**
 * Remove JsConfirm classes from body
 */
function removeBodyClasses() {
	dom.removeClass(
		[document.documentElement, document.body],
		[jscClasses.shown, jscClasses['height-auto'], jscClasses['no-backdrop'], jscClasses['toast-shown']]
	)
}

/**
 * Instance method to close sweetAlert
 *
 * @param {any} resolveValue
 */
export function close(resolveValue) {
	resolveValue = prepareResolveValue(resolveValue)

	const jscPromiseResolve = privateMethods.jscPromiseResolve.get(this)

	const didClose = triggerClosePopup(this)

	if (this.isAwaitingPromise) {
		// A jsc awaiting for a promise (after a click on Confirm or Deny) cannot be dismissed anymore #2335
		if (!resolveValue.isDismissed) {
			handleAwaitingPromise(this)
			jscPromiseResolve(resolveValue)
		}
	} else if (didClose) {
		// Resolve Jsc promise
		jscPromiseResolve(resolveValue)
	}
}

async function triggerClosePopup(instance) {
	const popup = dom.getPopup()

	if (!popup) {
		return false
	}

	const niceSelect = document.querySelector('.nice-select-float')

	if (niceSelect) {
		await sleep(500)
	}
	
	const innerParams = privateProps.innerParams.get(instance)
	if (!innerParams || dom.hasClass(popup, innerParams.hideClass.popup)) {
		return false
	}

	dom.removeClass(popup, innerParams.showClass.popup)
	dom.addClass(popup, innerParams.hideClass.popup)

	const backdrop = dom.getContainer()
	dom.removeClass(backdrop, innerParams.showClass.backdrop)
	dom.addClass(backdrop, innerParams.hideClass.backdrop)

	handlePopupAnimation(instance, popup, innerParams)

	return true
}

/**
 * @param {any} error
 */
export function rejectPromise(error) {
	const rejectPromise = privateMethods.jscPromiseReject.get(this)
	handleAwaitingPromise(this)
	if (rejectPromise) {
		// Reject Jsc promise
		rejectPromise(error)
	}
}

/**
 * @param {JsConfirm} instance
 */
export const handleAwaitingPromise = (instance) => {
	if (instance.isAwaitingPromise) {
		delete instance.isAwaitingPromise
		// The instance might have been previously partly destroyed, we must resume the destroy process in this case #2335
		if (!privateProps.innerParams.get(instance)) {
			instance._destroy()
		}
	}
}

/**
 * @param {any} resolveValue
 * @returns {JsConfirmResult}
 */
const prepareResolveValue = (resolveValue) => {
	// When user calls Jsc.close()
	if (typeof resolveValue === 'undefined') {
		return {
			isConfirmed: false,
			isDenied: false,
			isDismissed: true,
		}
	}

	return Object.assign(
		{
			isConfirmed: false,
			isDenied: false,
			isDismissed: false,
		},
		resolveValue
	)
}

/**
 * @param {JsConfirm} instance
 * @param {HTMLElement} popup
 * @param {JsConfirmOptions} innerParams
 */
const handlePopupAnimation = (instance, popup, innerParams) => {
	const container = dom.getContainer()
	// If animation is supported, animate
	const animationIsSupported = dom.animationEndEvent && dom.hasCssAnimation(popup)

	if (typeof innerParams.willClose === 'function') {
		innerParams.willClose(popup)
	}

	if (animationIsSupported) {
		animatePopup(instance, popup, container, innerParams.returnFocus, innerParams.didClose)
	} else {
		// Otherwise, remove immediately
		removePopupAndResetState(instance, container, innerParams.returnFocus, innerParams.didClose)
	}
}

/**
 * @param {JsConfirm} instance
 * @param {HTMLElement} popup
 * @param {HTMLElement} container
 * @param {boolean} returnFocus
 * @param {Function} didClose
 */
const animatePopup = (instance, popup, container, returnFocus, didClose) => {
	if (!dom.animationEndEvent) {
		return
	}
	globalState.jscCloseEventFinishedCallback = removePopupAndResetState.bind(
		null,
		instance,
		container,
		returnFocus,
		didClose
	)
	popup.addEventListener(dom.animationEndEvent, function (e) {
		if (e.target === popup) {
			globalState.jscCloseEventFinishedCallback()
			delete globalState.jscCloseEventFinishedCallback
		}
	})
}

/**
 * @param {JsConfirm} instance
 * @param {Function} didClose
 */
const triggerDidCloseAndDispose = (instance, didClose) => {
	setTimeout(() => {
		if (typeof didClose === 'function') {
			didClose.bind(instance.params)()
		}
		// instance might have been destroyed already
		if (instance._destroy) {
			instance._destroy()
		}
	})
}

export { close as closePopup, close as closeModal, close as closeToast }
