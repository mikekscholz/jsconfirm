import { iconTypes, jscClasses } from '../classes.js'
import { warn } from '../utils.js'
import { getCancelButton, getConfirmButton, getDenyButton, getTimerProgressBar, getTimerProgressCircle } from './getters.js'

/**
 * Securely set innerHTML of an element
 * https://github.com/sweetalert2/sweetalert2/issues/1926
 *
 * @param {HTMLElement} elem
 * @param {string} html
 */

export const setInnerHtml = (elem, html) => {
		elem.textContent = ''
	
	if (html) {
		const parser = new DOMParser()
		const parsed = parser.parseFromString(html, `text/html`)
		const head = parsed.querySelector('head')
		head &&
			Array.from(head.childNodes).forEach((child) => {
				elem.appendChild(child)
			})
		const body = parsed.querySelector('body')
		body &&
			Array.from(body.childNodes).forEach((child) => {
				if (child instanceof HTMLVideoElement || child instanceof HTMLAudioElement) {
					elem.appendChild(child.cloneNode(true)) // https://github.com/sweetalert2/sweetalert2/issues/2507
				} else {
					elem.appendChild(child)
				}
			})
	}
}

/**
 * Securely set innerHTML of an element
 * https://github.com/sweetalert2/sweetalert2/issues/1926
 *
 * @param {HTMLElement} elem
 * @param {string} html
 */

export const appendHtml = (elem, html) => {
	
	if (html) {
		const parser = new DOMParser()
		const parsed = parser.parseFromString(html, `text/html`)
		const head = parsed.querySelector('head')
		head &&
			Array.from(head.childNodes).forEach((child) => {
				elem.appendChild(child)
			})
		const body = parsed.querySelector('body')
		body &&
			Array.from(body.childNodes).forEach((child) => {
				if (child instanceof HTMLVideoElement || child instanceof HTMLAudioElement) {
					elem.appendChild(child.cloneNode(true)) // https://github.com/sweetalert2/sweetalert2/issues/2507
				} else {
					elem.appendChild(child)
				}
			})
	}
}

// export const setInnerHtml = (elem, html, mime = `text/html`) => {
//   elem.textContent = ''
//   if (html) {
//     const parser = new DOMParser()
//     const parsed = parser.parseFromString(html, mime).body.childNodes[0]
//     elem.append(parsed)
//   }
// }

/**
 * @param {HTMLElement} elem
 * @param {string} className
 * @returns {boolean}
 */
export const hasClass = (elem, className) => {
	if (!className) {
		return false
	}
	const classList = className.split(/\s+/)
	for (let i = 0; i < classList.length; i++) {
		if (!elem.classList.contains(classList[i])) {
			return false
		}
	}
	return true
}

/**
 * @param {HTMLElement} elem
 * @param {JsConfirmOptions} params
 */
const removeCustomClasses = (elem, params) => {
	Array.from(elem.classList).forEach((className) => {
		if (
			!Object.values(jscClasses).includes(className) &&
			!Object.values(iconTypes).includes(className) &&
			!Object.values(params.showClass || {}).includes(className)
		) {
			elem.classList.remove(className)
		}
	})
}

/**
 * @param {HTMLElement} elem
 * @param {JsConfirmOptions} params
 * @param {string} className
 */
export const applyCustomClass = (elem, params, className) => {
	removeCustomClasses(elem, params)

	if (params.customClass && params.customClass[className]) {
		if (typeof params.customClass[className] !== 'string' && !params.customClass[className].forEach) {
			warn(
				`Invalid type of customClass.${className}! Expected string or iterable object, got "${typeof params.customClass[
					className
				]}"`
			)
			return
		}

		addClass(elem, params.customClass[className])
	}
}

/**
 * @param {HTMLElement} popup
 * @param {import('./renderers/renderInput').InputClass | JsConfirmInput} inputClass
 * @returns {HTMLInputElement | null}
 */
export const getInput = (popup, inputClass) => {
	if (!inputClass) {
		return null
	}
	switch (inputClass) {
		case 'select':
		case 'textarea':
		case 'file':
			return popup.querySelector(`.${jscClasses.body} > .${jscClasses[inputClass]}`)
		case 'checkbox':
			return popup.querySelector(`.${jscClasses.body} > .${jscClasses.checkbox} input`)
		case 'radio':
			return (
				popup.querySelector(`.${jscClasses.body} > .${jscClasses.radio} input:checked`) ||
				popup.querySelector(`.${jscClasses.body} > .${jscClasses.radio} input:first-child`)
			)
		case 'range':
			return popup.querySelector(`.${jscClasses.body} > .${jscClasses.range} input`)
		default:
			return popup.querySelector(`.${jscClasses.body} > .${jscClasses.input}`)
	}
}

/**
 * @param {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} input
 */
export const focusInput = (input) => {
	input.focus()

	// place cursor at end of text in text input
	if (input.type !== 'file') {
		// http://stackoverflow.com/a/2345915
		const val = input.value
		input.value = ''
		input.value = val
	}
	
	if (input.tagName === 'SELECT') {
		input.nextElementSibling.focus()
	}
}

/**
 * @param {HTMLElement | HTMLElement[] | null} target
 * @param {string | string[] | readonly string[] | undefined} classList
 * @param {boolean} condition
 */
export const toggleClass = (target, classList, condition) => {
	if (!target || !classList) {
		return
	}
	if (typeof classList === 'string') {
		classList = classList.split(/\s+/).filter(Boolean)
	}
	classList.forEach((className) => {
		if (Array.isArray(target)) {
			target.forEach((elem) => {
				condition ? elem.classList.add(className) : elem.classList.remove(className)
			})
		} else {
			condition ? target.classList.add(className) : target.classList.remove(className)
		}
	})
}

/**
 * @param {HTMLElement | HTMLElement[] | null} target
 * @param {string | string[] | readonly string[] | undefined} classList
 */
export const addClass = (target, classList) => {
	toggleClass(target, classList, true)
}

/**
 * @param {HTMLElement | HTMLElement[] | null} target
 * @param {string | string[] | readonly string[] | undefined} classList
 */
export const removeClass = (target, classList) => {
	toggleClass(target, classList, false)
}

/**
 * Get direct child of an element by class name
 *
 * @param {HTMLElement} elem
 * @param {string} className
 * @returns {HTMLElement | undefined}
 */
// export const getDirectChildByClass = (elem, className) => {
//       return elem.querySelector(`.${className}`)
// }
export const getDirectChildByClass = (elem, className) => {
	const children = Array.from(elem.children)
	for (let i = 0; i < children.length; i++) {
		const child = children[i]
		if (child instanceof HTMLElement && hasClass(child, className)) {
			return child
		}
	}
}

/**
 * @param {HTMLElement} elem
 * @param {string} property
 * @param {*} value
 */
export const applyNumericalStyle = (elem, property, value) => {
	if (value === `${parseInt(value)}`) {
		value = parseInt(value)
	}
	if (value || parseInt(value) === 0) {
		elem.style[property] = typeof value === 'number' ? `${value}px` : value
	} else {
		elem.style.removeProperty(property)
	}
}

/**
 * @param {HTMLElement | null} elem
 * @param {string} display
 */
export const show = (elem, display = 'flex') => {
	elem && (elem.style.display = display)
}

/**
 * @param {HTMLElement | null} elem
 */
export const hide = (elem) => {
	elem && (elem.style.display = 'none')
}

/**
 * @param {HTMLElement} parent
 * @param {string} selector
 * @param {string} property
 * @param {string} value
 */
export const setStyle = (parent, selector, property, value) => {
	/** @type {HTMLElement} */
	const el = parent.querySelector(selector)
	if (el) {
		el.style[property] = value
	}
}

/**
 * @param {HTMLElement} elem
 * @param {any} condition
 * @param {string} display
 */
export const toggle = (elem, condition, display = 'flex') => {
	condition ? show(elem, display) : hide(elem)
}

/**
 * borrowed from jquery $(elem).is(':visible') implementation
 *
 * @param {HTMLElement | null} elem
 * @returns {boolean}
 */
export const isVisible = (elem) => !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length))

/**
 * @returns {boolean}
 */
export const allButtonsAreHidden = () =>
	!isVisible(getConfirmButton()) && !isVisible(getDenyButton()) && !isVisible(getCancelButton())

/**
 * @param {HTMLElement} elem
 * @returns {boolean}
 */
export const isScrollable = (elem) => !!(elem.scrollHeight > elem.clientHeight)

/**
 * borrowed from https://stackoverflow.com/a/46352119
 *
 * @param {HTMLElement} elem
 * @returns {boolean}
 */
export const hasCssAnimation = (elem) => {
	const style = window.getComputedStyle(elem)

	const animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0')
	const transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0')

	return animDuration > 0 || transDuration > 0
}

/**
 * @param {number} timer
 * @param {boolean} reset
 */
export const animateTimerProgressBar = (timer, reset = false) => {
	const timerProgressBar = getTimerProgressBar()
	if (!timerProgressBar) {
		return
	}
	if (isVisible(timerProgressBar)) {
		if (reset) {
			timerProgressBar.style.transition = 'none'
			timerProgressBar.style.width = '100%'
		}
		setTimeout(() => {
			timerProgressBar.style.transition = `width ${timer / 1000}s linear`
			timerProgressBar.style.width = '0%'
		}, 10)
	}
}

export const stopTimerProgressBar = () => {
	const timerProgressBar = getTimerProgressBar()
	if (!timerProgressBar) {
		return
	}
	const timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width)
	timerProgressBar.style.removeProperty('transition')
	timerProgressBar.style.width = '100%'
	const timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width)
	const timerProgressBarPercent = (timerProgressBarWidth / timerProgressBarFullWidth) * 100
	timerProgressBar.style.width = `${timerProgressBarPercent}%`
}

/**
 * @param {number} timer
 * @param {boolean} reset
 */
export const animateTimerProgressCircle = (timer, reset = false) => {
	const timerProgressCircle = getTimerProgressCircle()
	if (!timerProgressCircle) {
		return
	}
	if (isVisible(timerProgressCircle)) {
		if (reset) {
			timerProgressCircle.style.transition = 'none'
			timerProgressCircle.style.strokeDashoffset = '0'
		}
		setTimeout(() => {
			timerProgressCircle.style.transition = `stroke-dashoffset ${timer / 1000}s linear`
			timerProgressCircle.style.strokeDashoffset = '100'
		}, 10)
	}
}

export const stopTimerProgressCircle = () => {
	const timerProgressCircle = getTimerProgressCircle()
	if (!timerProgressCircle) {
		return
	}
	const timerProgressCircleWidth = window.getComputedStyle(timerProgressCircle).strokeDashoffset
	timerProgressCircle.style.removeProperty('transition')
	timerProgressCircle.style.strokeDashoffset = timerProgressCircleWidth
	// const timerProgressCircleFullWidth = parseInt(window.getComputedStyle(timerProgressCircle).width)
	// const timerProgressCirclePercent = (timerProgressCircleWidth / timerProgressCircleFullWidth) * 100
	// timerProgressCircle.style.width = `${timerProgressCirclePercent}%`
}
