import globalState from '../../globalState.js'
import { jscClasses } from '../classes.js'
import { isNodeEnv } from '../isNodeEnv.js'
import { error } from '../utils.js'
import { addClass, getDirectChildByClass, removeClass, setInnerHtml } from './domUtils.js'
import { getContainer, getPopup } from './getters.js'

const jscTemplate = `
<div aria-labelledby="${jscClasses.title}" aria-describedby="${jscClasses['html-container']}" class="${jscClasses.popup}" tabindex="-1">
	<div class="${jscClasses.body}">
		<ul class="${jscClasses['progress-steps']}"></ul>
		<div class="${jscClasses['header']}">
			<div class="${jscClasses.icon}"></div>
			<h2 class="${jscClasses.title}" id="${jscClasses.title}"></h2>
		</div>
		<img class="${jscClasses.image}" />
		<div class="${jscClasses['html-container']}" id="${jscClasses['html-container']}"></div>
		<input class="${jscClasses.input}" id="${jscClasses.input}" />
		<input type="file" class="${jscClasses.file}" />
		<div class="${jscClasses.range}">
			<input type="range" oninput="this.parentNode.style.setProperty('--value',this.value); this.parentNode.style.setProperty('--text-value', JSON.stringify(this.value))"/>
			<output></output>
			<div class='jsconfirm-range__progress'></div>
		</div>
		<select class="${jscClasses.select}" id="${jscClasses.select}"></select>
		<div class="${jscClasses.radio}"></div>
		<label class="${jscClasses.checkbox}">
			<input type="checkbox" id="${jscClasses.checkbox}" />
			<span class="${jscClasses.label}"></span>
		</label>
		<textarea class="${jscClasses.textarea}" id="${jscClasses.textarea}"></textarea>
		<div class="${jscClasses['validation-message']}" id="${jscClasses['validation-message']}"></div>
		<div class="${jscClasses.actions}">
			<div class="${jscClasses.loader}"></div>
			<button type="button" class="${jscClasses.confirm}"></button>
			<button type="button" class="${jscClasses.deny}"></button>
			<button type="button" class="${jscClasses.cancel}"></button>
		</div>
		<div class="${jscClasses.footer}"></div>
		<div class="${jscClasses['timer-progress-bar-container']}">
			<div class="${jscClasses['timer-progress-bar']}"></div>
		</div>
	</div>
	<button type="button" class="${jscClasses.close}"></button>
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
		[jscClasses['no-backdrop'], jscClasses['toast-shown'], jscClasses['has-column']]
	)

	return true
}

const resetValidationMessage = () => {
	globalState.currentInstance.resetValidationMessage()
}

const addInputChangeListeners = () => {
	const popup = getPopup()

	/** @type {HTMLInputElement} */
	const input = popup.querySelector(`.${jscClasses.input}`)
	/** @type {HTMLInputElement} */
	const file = popup.querySelector(`.${jscClasses.file}`)
	/** @type {HTMLInputElement} */
	const range = popup.querySelector(`.${jscClasses.range} input`)
	/** @type {HTMLOutputElement} */
	const rangeOutput = popup.querySelector(`.${jscClasses.range} output`)
	/** @type {HTMLInputElement} */
	const select = popup.querySelector(`.${jscClasses.select}`)
	/** @type {HTMLInputElement} */
	const checkbox = popup.querySelector(`.${jscClasses.checkbox} input`)
	/** @type {HTMLInputElement} */
	const textarea = popup.querySelector(`.${jscClasses.textarea}`)

	input.oninput = resetValidationMessage
	file.onchange = resetValidationMessage
	select.onchange = resetValidationMessage
	checkbox.onchange = resetValidationMessage
	textarea.oninput = resetValidationMessage

	// range.oninput = () => {
	// 	resetValidationMessage()
	// 	// rangeOutput.value = range.value
	// }

	// range.onchange = () => {
	// 	resetValidationMessage()
	// 	// rangeOutput.value = range.value
	// }
}

/**
 * @param {string | HTMLElement} target
 * @returns {HTMLElement}
 */
const getTarget = (target) => (typeof target === 'string' ? document.querySelector(target) : target)

/**
 * @param {JsConfirmOptions} params
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
		addClass(getContainer(), jscClasses.rtl)
	}
}

/**
 * Add modal + backdrop + no-war message for Russians to DOM
 *
 * @param {JsConfirmOptions} params
 */
export const init = (params) => {
	// Clean up the old popup container if it exists
	const oldContainerExisted = resetOldContainer()

	if (isNodeEnv()) {
		error('JsConfirm requires document to initialize')
		return
	}

	const container = document.createElement('div')
	container.classList.add(jscClasses.container)
	if (oldContainerExisted) {
		addClass(container, jscClasses['no-transition'])
	}
	setInnerHtml(container, jscTemplate)

	const targetElement = getTarget(params.target)
	targetElement.appendChild(container)

	setupAccessibility(params)
	setupRTL(targetElement)
	addInputChangeListeners()
}
