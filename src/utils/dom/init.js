import globalState from '../../globalState.js'
import { jscClasses } from '../classes.js'
import { isNodeEnv } from '../isNodeEnv.js'
import { error } from '../utils.js'
import { addClass, getDirectChildByClass, removeClass, setInnerHtml, appendHtml } from './domUtils.js'
import { getContainer, getPopup, getToastContainer } from './getters.js'
import { nanoid } from 'nanoid/non-secure'

const uid = nanoid(4)

const jscTemplate = `
<div aria-labelledby="${jscClasses.title + uid}" aria-describedby="${jscClasses['html-container'] + uid}" class="${jscClasses.popup}" id="${uid}" tabindex="-1">
	<div class="${jscClasses.body}">
		<ul class="${jscClasses['progress-steps']}"></ul>
		<!-- <div class="${jscClasses['header']}">-->
			<div class="${jscClasses.icon}"></div>
			<h2 class="${jscClasses.title}" id="${jscClasses.title + uid}"></h2>
		<!-- </div>-->
		<img class="${jscClasses.image}" />
		<div class="${jscClasses['html-container']}" id="${jscClasses['html-container'] + uid}"></div>
		<input class="${jscClasses.input}" id="${jscClasses.input + uid}" />
		<input type="file" class="${jscClasses.file}" />
		<div class="${jscClasses.range}">
			<input type="range" oninput="this.parentNode.style.setProperty('--value',this.value); this.parentNode.style.setProperty('--text-value', JSON.stringify(this.value))"/>
			<output></output>
			<div class='jsconfirm-range__progress'></div>
		</div>
		<select class="${jscClasses.select}" id="${jscClasses.select + uid}"></select>
		<div class="${jscClasses.radio}"></div>
		<label class="${jscClasses.checkbox}">
			<input type="checkbox" id="${jscClasses.checkbox + uid}" />
			<span class="${jscClasses.label}"></span>
		</label>
		<textarea class="${jscClasses.textarea}" id="${jscClasses.textarea + uid}"></textarea>
		<div class="${jscClasses['validation-message']}" id="${jscClasses['validation-message'] + uid}"></div>
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
		<svg class="${jscClasses['timer-progress-circle-container']}" height="100%" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
			<circle class="${jscClasses['timer-progress-circle-track']}" r="231" cx="256" cy="256" />
			<circle class="${jscClasses['timer-progress-circle-fill']}" r="231" cx="256" cy="256" pathLength="100" />
		</svg>
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
	// const popup = document.querySelector(`#${uid}`)
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
	// const popup = document.querySelector(`#${uid}`)

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
 * Add modal + backdrop to DOM
 *
 * @param {JsConfirmOptions} params
 */
export const init = (params) => {
	// if (!params.toast) {
		// Clean up the old popup container if it exists
		const oldContainerExisted = resetOldContainer()

		if (isNodeEnv()) {
			error('JsConfirm requires document to initialize')
			return
		}

		const container = document.createElement('div')
		container.classList.add(jscClasses['container'])
		if (oldContainerExisted) {
			addClass(container, jscClasses['no-transition'])
		}
		setInnerHtml(container, jscTemplate)

		const targetElement = getTarget(params.target)
		targetElement.appendChild(container)

		setupAccessibility(params)
		setupRTL(targetElement)
		addInputChangeListeners()
	// }
	// else if (params.toast) {
	// 	// Clean up the old popup container if it exists
	// 	const toastContainer = getToastContainer()
	// 	const targetElement = getTarget(params.target)

	// 	if (isNodeEnv()) {
	// 		error('JsConfirm requires document to initialize')
	// 		return
	// 	}
	// 	if (!toastContainer) {
	// 		const container = document.createElement('div')
	// 		container.classList.add(jscClasses['toast-container'])
	// 		targetElement.appendChild(container)
	// 		setInnerHtml(container, jscTemplate)
	// 	} else {
	// 		appendHtml(toastContainer, jscTemplate)
	// 	}

	// 	// if (oldContainerExisted) {
	// 	// 	addClass(container, jscClasses['no-transition'])
	// 	// }
		


	// 	setupAccessibility(params)
	// 	setupRTL(targetElement)
	// 	addInputChangeListeners()
	// }

}
