/// <reference path="../../../../jsconfirm.d.ts"/>

/**
 * @typedef { HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement } Input
 * @typedef { 'input' | 'file' | 'range' | 'select' | 'radio' | 'checkbox' | 'textarea' } InputClass
 */
import privateProps from '../../../privateProps.js'
import { jscClasses } from '../../classes.js'
import * as dom from '../../dom/index.js'
import { error, isPromise, warn } from '../../utils.js'

/** @type {InputClass[]} */
const inputClasses = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea']

/**
 * @param {JsConfirm} instance
 * @param {JsConfirmOptions} params
 */
export const renderInput = (instance, params) => {
	const popup = dom.getPopup()
	const popupInner = dom.getPopupInner()
	if (!popup) {
		return
	}
	const innerParams = privateProps.innerParams.get(instance)
	const rerender = !innerParams || params.input !== innerParams.input

	inputClasses.forEach((inputClass) => {
		const inputContainer = dom.getDirectChildByClass(popupInner, jscClasses[inputClass])
console.log(inputContainer)
		if (!inputContainer) {
			return
		}

		// set attributes
		setAttributes(inputClass, params.inputAttributes)

		// set class
		inputContainer.classList.add(jscClasses[inputClass])

		if (rerender) {
			dom.hide(inputContainer)
		}
	})

	if (params.input) {
		if (rerender) {
			showInput(params)
		}
		// set custom class
		setCustomClass(params)
	}
}

/**
 * @param {JsConfirmOptions} params
 */
const showInput = (params) => {
	if (!params.input) {
		return
	}

	if (!renderInputType[params.input]) {
		error(
			`Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "${params.input}"`
		)
		return
	}

	const inputContainer = getInputContainer(params.input)
	const input = renderInputType[params.input](inputContainer, params)
	dom.show(inputContainer)

	// input autofocus
	if (params.inputAutoFocus) {
		setTimeout(() => {
			dom.focusInput(input)
		})
	}
}

/**
 * @param {HTMLInputElement} input
 */
const removeAttributes = (input) => {
	for (let i = 0; i < input.attributes.length; i++) {
		const attrName = input.attributes[i].name
		if (!['id', 'type', 'value', 'style', 'oninput'].includes(attrName)) {
			input.removeAttribute(attrName)
		}
	}
}

/**
 * @param {InputClass} inputClass
 * @param {JsConfirmOptions['inputAttributes']} inputAttributes
 */
const setAttributes = (inputClass, inputAttributes) => {
	const input = dom.getInput(dom.getPopup(), inputClass)
	if (!input) {
		return
	}

	removeAttributes(input)

	for (const attr in inputAttributes) {
		input.setAttribute(attr, inputAttributes[attr])
	}
}

/**
 * @param {JsConfirmOptions} params
 */
const setCustomClass = (params) => {
	const inputContainer = getInputContainer(params.input)
	if (typeof params.customClass === 'object') {
		dom.addClass(inputContainer, params.customClass.input)
	}
}

/**
 * @param {HTMLInputElement | HTMLTextAreaElement} input
 * @param {JsConfirmOptions} params
 */
const setInputPlaceholder = (input, params) => {
	if (!input.placeholder || params.inputPlaceholder) {
		input.placeholder = params.inputPlaceholder
	}
}

/**
 * @param {Input} input
 * @param {Input} prependTo
 * @param {JsConfirmOptions} params
 */
const setInputLabel = (input, prependTo, params) => {
	if (params.inputLabel) {
		const label = document.createElement('label')
		const labelClass = jscClasses['input-label']
		label.setAttribute('for', input.id)
		label.classList.add(labelClass)
		if (typeof params.customClass === 'object') {
			dom.addClass(label, params.customClass.inputLabel)
		}
		label.innerText = params.inputLabel
		prependTo.insertAdjacentElement('beforebegin', label)
	}
}

/**
 * @param {JsConfirmOptions['input']} inputType
 * @returns {HTMLElement}
 */
const getInputContainer = (inputType) => {
	return dom.getDirectChildByClass(dom.getPopupInner(), jscClasses[inputType] || jscClasses.input)
}

/**
 * @param {HTMLInputElement | HTMLOutputElement | HTMLTextAreaElement} input
 * @param {JsConfirmOptions['inputValue']} inputValue
 */
const checkAndSetInputValue = (input, inputValue) => {
	if (['string', 'number'].includes(typeof inputValue)) {
		input.value = `${inputValue}`
		input.focus()
	} else if (!isPromise(inputValue)) {
		warn(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof inputValue}"`)
	}
}

/** @type {Record<JsConfirmInput, (input: Input | HTMLElement, params: JsConfirmOptions) => Input>} */
const renderInputType = {}

/**
 * @param {HTMLInputElement} input
 * @param {JsConfirmOptions} params
 * @returns {HTMLInputElement}
 */
renderInputType.text =
	renderInputType.email =
	renderInputType.password =
	renderInputType.number =
	renderInputType.tel =
	renderInputType.url =
		(input, params) => {
			checkAndSetInputValue(input, params.inputValue)
			setInputLabel(input, input, params)
			setInputPlaceholder(input, params)
			input.type = params.input
			return input
		}

/**
 * @param {HTMLInputElement} input
 * @param {JsConfirmOptions} params
 * @returns {HTMLInputElement}
 */
renderInputType.file = (input, params) => {
	setInputLabel(input, input, params)
	setInputPlaceholder(input, params)
	return input
}

/**
 * @param {HTMLInputElement} range
 * @param {JsConfirmOptions} params
 * @returns {HTMLInputElement}
 */
renderInputType.range = (range, params) => {
	console.log(range)
	const rangeInput = range.querySelector('input')
	range.style.setProperty('--min', params.inputAttributes.min)
	range.style.setProperty('--max', params.inputAttributes.max)
	range.style.setProperty('--value', `${params.inputValue}`)
	range.style.setProperty('--text-value', `"${params.inputValue}"`)
	checkAndSetInputValue(rangeInput, params.inputValue)
	rangeInput.type = params.input
	setInputLabel(rangeInput, range, params)
	return range
}

/**
 * @param {HTMLSelectElement} select
 * @param {JsConfirmOptions} params
 * @returns {HTMLSelectElement}
 */
renderInputType.select = (select, params) => {
	select.textContent = ''
	if (params.inputPlaceholder) {
		select.setAttribute('placeholder', params.inputPlaceholder)
		const defaultOption = document.createElement('option')
		dom.setInnerHtml(defaultOption, params.inputPlaceholder)
		defaultOption.value = ''
		// placeholder.disabled = true
		defaultOption.selected = true
		select.appendChild(defaultOption)
		dom.addClass(select, 'wide')
	}
	setInputLabel(select, select, params)
	return select
}

/**
 * @param {HTMLInputElement} radio
 * @returns {HTMLInputElement}
 */
renderInputType.radio = (radio) => {
	radio.textContent = ''
	return radio
}

/**
 * @param {HTMLLabelElement} checkboxContainer
 * @param {JsConfirmOptions} params
 * @returns {HTMLInputElement}
 */
renderInputType.checkbox = (checkboxContainer, params) => {
	const checkbox = dom.getInput(dom.getPopup(), 'checkbox')
	checkbox.value = '1'
	checkbox.checked = Boolean(params.inputValue)
	const label = checkboxContainer.querySelector('span')
	dom.setInnerHtml(label, params.inputPlaceholder)
	return checkbox
}

/**
 * @param {HTMLTextAreaElement} textarea
 * @param {JsConfirmOptions} params
 * @returns {HTMLTextAreaElement}
 */
renderInputType.textarea = (textarea, params) => {
	checkAndSetInputValue(textarea, params.inputValue)
	setInputPlaceholder(textarea, params)
	setInputLabel(textarea, textarea, params)

	/**
	 * @param {HTMLElement} el
	 * @returns {number}
	 */
	const getMargin = (el) =>
		parseInt(window.getComputedStyle(el).marginLeft) + parseInt(window.getComputedStyle(el).marginRight)

	// https://github.com/sweetalert2/sweetalert2/issues/2291
	setTimeout(() => {
		// https://github.com/sweetalert2/sweetalert2/issues/1699
		if ('MutationObserver' in window) {
			const initialPopupWidth = parseInt(window.getComputedStyle(dom.getPopup()).width)
			const textareaResizeHandler = () => {
				// check if texarea is still in document (i.e. popup wasn't closed in the meantime)
				if (!document.body.contains(textarea)) {
					return
				}
				const textareaWidth = textarea.offsetWidth + getMargin(textarea)
				if (textareaWidth > initialPopupWidth) {
					dom.getPopup().style.width = `${textareaWidth}px`
				} else {
					dom.applyNumericalStyle(dom.getPopup(), 'width', params.width)
				}
			}
			new MutationObserver(textareaResizeHandler).observe(textarea, {
				attributes: true,
				attributeFilter: ['style'],
			})
		}
	})

	return textarea
}
