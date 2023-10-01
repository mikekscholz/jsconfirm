import { handleCancelButtonClick, handleConfirmButtonClick, handleDenyButtonClick } from './buttons-handlers.js'
import globalState from './globalState.js'
import * as instanceMethods from './instanceMethods.js'
import { addKeydownHandler, setFocus } from './keydown-handler.js'
import { handlePopupClick } from './popup-click-handler.js'
import privateMethods from './privateMethods.js'
import privateProps from './privateProps.js'
import * as staticMethods from './staticMethods.js'
import { DismissReason } from './utils/DismissReason.js'
import Timer from './utils/Timer.js'
import { unsetAriaHidden } from './utils/aria.js'
import * as dom from './utils/dom/index.js'
import { handleInputOptionsAndValue } from './utils/dom/inputUtils.js'
import { getTemplateParams } from './utils/getTemplateParams.js'
import { openPopup } from './utils/openPopup.js'
import defaultParams, { showWarningsForParams } from './utils/params.js'
import setParameters from './utils/setParameters.js'
import { callIfFunction } from './utils/utils.js'

/** @type {JsConfirm} */
let currentInstance

export class JsConfirm {
	/**
	 * @type {Promise<JsConfirmResult>}
	 */
	#promise

	/**
	 * @param {...any} args
	 * @this {JsConfirm}
	 */
	constructor(...args) {
		// Prevent run in Node env
		if (typeof window === 'undefined') {
			return
		}

		currentInstance = this

		// @ts-ignore
		const outerParams = Object.freeze(this.constructor.argsToParams(args))

		/** @type {Readonly<JsConfirmOptions>} */
		this.params = outerParams

		/** @type {boolean} */
		this.isAwaitingPromise = false

		this.#promise = this._main(currentInstance.params)
	}

	_main(userParams, mixinParams = {}) {
		showWarningsForParams(Object.assign({}, mixinParams, userParams))

		if (globalState.currentInstance) {
			globalState.currentInstance._destroy()
			if (dom.isModal()) {
				unsetAriaHidden()
			}
		}

		globalState.currentInstance = currentInstance

		const innerParams = prepareParams(userParams, mixinParams)
		setParameters(innerParams)
		Object.freeze(innerParams)

		// clear the previous timer
		if (globalState.timeout) {
			globalState.timeout.stop()
			delete globalState.timeout
		}

		// clear the restore focus timeout
		clearTimeout(globalState.restoreFocusTimeout)

		const domCache = populateDomCache(currentInstance)

		dom.render(currentInstance, innerParams)

		privateProps.innerParams.set(currentInstance, innerParams)

		return jscPromise(currentInstance, domCache, innerParams)
	}

	// `catch` cannot be the name of a module export, so we define our thenable methods here instead
	then(onFulfilled) {
		return this.#promise.then(onFulfilled)
	}

	finally(onFinally) {
		return this.#promise.finally(onFinally)
	}
}

/**
 * @param {JsConfirm} instance
 * @param {DomCache} domCache
 * @param {JsConfirmOptions} innerParams
 * @returns {Promise}
 */
const jscPromise = (instance, domCache, innerParams) => {
	return new Promise((resolve, reject) => {
		// functions to handle all closings/dismissals
		/**
		 * @param {DismissReason} dismiss
		 */
		const dismissWith = (dismiss) => {
			instance.close({ isDismissed: true, dismiss })
		}

		privateMethods.jscPromiseResolve.set(instance, resolve)
		privateMethods.jscPromiseReject.set(instance, reject)

		domCache.confirmButton.onclick = () => {
			handleConfirmButtonClick(instance)
		}

		domCache.denyButton.onclick = () => {
			handleDenyButtonClick(instance)
		}

		domCache.cancelButton.onclick = () => {
			handleCancelButtonClick(instance, dismissWith)
		}

		domCache.closeButton.onclick = () => {
			dismissWith(DismissReason.close)
		}

		handlePopupClick(innerParams, domCache, dismissWith)

		addKeydownHandler(globalState, innerParams, dismissWith)

		handleInputOptionsAndValue(instance, innerParams)

		openPopup(innerParams)

		setupTimer(globalState, innerParams, dismissWith)

		initFocus(domCache, innerParams)

		// Scroll container to top on open (#1247, #1946)
		setTimeout(() => {
			domCache.container.scrollTop = 0
		})
	})
}

/**
 * @param {JsConfirmOptions} userParams
 * @param {JsConfirmOptions} mixinParams
 * @returns {JsConfirmOptions}
 */
const prepareParams = (userParams, mixinParams) => {
	const templateParams = getTemplateParams(userParams)
	const params = Object.assign({}, defaultParams, mixinParams, templateParams, userParams) // precedence is described in #2131
	params.showClass = Object.assign({}, defaultParams.showClass, params.showClass)
	params.hideClass = Object.assign({}, defaultParams.hideClass, params.hideClass)
	return params
}

/**
 * @param {JsConfirm} instance
 * @returns {DomCache}
 */
const populateDomCache = (instance) => {
	const domCache = {
		body: dom.getBody(),
		popup: dom.getPopup(),
		container: dom.getContainer(),
		actions: dom.getActions(),
		confirmButton: dom.getConfirmButton(),
		denyButton: dom.getDenyButton(),
		cancelButton: dom.getCancelButton(),
		loader: dom.getLoader(),
		closeButton: dom.getCloseButton(),
		validationMessage: dom.getValidationMessage(),
		progressSteps: dom.getProgressSteps(),
	}
	privateProps.domCache.set(instance, domCache)

	return domCache
}

/**
 * @param {GlobalState} globalState
 * @param {JsConfirmOptions} innerParams
 * @param {Function} dismissWith
 */
const setupTimer = (globalState, innerParams, dismissWith) => {
	const timerProgressBar = dom.getTimerProgressBar()
	dom.hide(timerProgressBar)
	if (innerParams.timer) {
		globalState.timeout = new Timer(() => {
			dismissWith('timer')
			delete globalState.timeout
		}, innerParams.timer)
		if (innerParams.timerProgressBar) {
			dom.show(timerProgressBar)
			dom.applyCustomClass(timerProgressBar, innerParams, 'timerProgressBar')
			setTimeout(() => {
				if (globalState.timeout && globalState.timeout.running) {
					// timer can be already stopped or unset at this point
					dom.animateTimerProgressBar(innerParams.timer)
				}
			})
		}
	}
}

/**
 * @param {DomCache} domCache
 * @param {JsConfirmOptions} innerParams
 */
const initFocus = (domCache, innerParams) => {
	if (innerParams.toast) {
		return
	}

	if (!callIfFunction(innerParams.allowEnterKey)) {
		blurActiveElement()
		return
	}

	if (!focusButton(domCache, innerParams)) {
		setFocus(-1, 1)
	}
}

/**
 * @param {DomCache} domCache
 * @param {JsConfirmOptions} innerParams
 * @returns {boolean}
 */
const focusButton = (domCache, innerParams) => {
	if (innerParams.focusDeny && dom.isVisible(domCache.denyButton)) {
		domCache.denyButton.focus()
		return true
	}

	if (innerParams.focusCancel && dom.isVisible(domCache.cancelButton)) {
		domCache.cancelButton.focus()
		return true
	}

	if (innerParams.focusConfirm && dom.isVisible(domCache.confirmButton)) {
		domCache.confirmButton.focus()
		return true
	}

	return false
}

const blurActiveElement = () => {
	if (document.activeElement instanceof HTMLElement && typeof document.activeElement.blur === 'function') {
		document.activeElement.blur()
	}
}

// Assign instance methods from src/instanceMethods/*.js to prototype
JsConfirm.prototype.disableButtons = instanceMethods.disableButtons
JsConfirm.prototype.enableButtons = instanceMethods.enableButtons
JsConfirm.prototype.getInput = instanceMethods.getInput
JsConfirm.prototype.disableInput = instanceMethods.disableInput
JsConfirm.prototype.enableInput = instanceMethods.enableInput
JsConfirm.prototype.hideLoading = instanceMethods.hideLoading
JsConfirm.prototype.disableLoading = instanceMethods.disableLoading
JsConfirm.prototype.showValidationMessage = instanceMethods.showValidationMessage
JsConfirm.prototype.resetValidationMessage = instanceMethods.resetValidationMessage
JsConfirm.prototype.close = instanceMethods.close
JsConfirm.prototype.closePopup = instanceMethods.closePopup
JsConfirm.prototype.closeModal = instanceMethods.closeModal
JsConfirm.prototype.closeToast = instanceMethods.closeToast
JsConfirm.prototype.rejectPromise = instanceMethods.rejectPromise
JsConfirm.prototype.update = instanceMethods.update
JsConfirm.prototype._destroy = instanceMethods._destroy

// Assign static methods from src/staticMethods/*.js to constructor
Object.assign(JsConfirm, staticMethods)

// Proxy to instance methods to constructor, for now, for backwards compatibility
Object.keys(instanceMethods).forEach((key) => {
	/**
	 * @param {...any} args
	 * @returns {any | undefined}
	 */
	JsConfirm[key] = function (...args) {
		if (currentInstance && currentInstance[key]) {
			return currentInstance[key](...args)
		}
		return null
	}
})

JsConfirm.DismissReason = DismissReason

JsConfirm.version = '11.7.28'

// export default JsConfirm

const Jsc = JsConfirm
// @ts-ignore
Jsc.default = Jsc

export default Jsc