import { jscClasses } from '../classes.js'
import { hasClass, isVisible } from './domUtils.js'

/**
 * Gets the popup container which contains the backdrop and the popup itself.
 *
 * @returns {HTMLElement | null}
 */
export const getContainer = () => document.body.querySelector(`.${jscClasses.container}`)

/**
 * @param {string} selectorString
 * @returns {HTMLElement | null}
 */
export const elementBySelector = (selectorString) => {
	const container = getContainer()
	return container ? container.querySelector(selectorString) : null
}

/**
 * @param {string} className
 * @returns {HTMLElement | null}
 */
const elementByClass = (className) => {
	return elementBySelector(`.${className}`)
}

/**
 * @returns {HTMLElement | null}
 */
export const getPopup = () => elementByClass(jscClasses.popup)

/**
 * @returns {HTMLElement | null}
 */
export const getBody = () => elementByClass(jscClasses.body)

/**
 * @returns {HTMLElement | null}
 */
export const getHeader = () => elementByClass(jscClasses.header)

/**
 * @returns {HTMLElement | null}
 */
export const getIcon = () => elementByClass(jscClasses.icon)

/**
 * @returns {HTMLElement | null}
 */
export const getIconContent = () => elementByClass(jscClasses['icon-content'])

/**
 * @returns {HTMLElement | null}
 */
export const getTitle = () => elementByClass(jscClasses.title)

/**
 * @returns {HTMLElement | null}
 */
export const getHtmlContainer = () => elementByClass(jscClasses['html-container'])

/**
 * @returns {HTMLElement | null}
 */
export const getImage = () => elementByClass(jscClasses.image)

/**
 * @returns {HTMLElement | null}
 */
export const getProgressSteps = () => elementByClass(jscClasses['progress-steps'])

/**
 * @returns {HTMLElement | null}
 */
export const getValidationMessage = () => elementByClass(jscClasses['validation-message'])

/**
 * @returns {HTMLButtonElement | null}
 */
export const getConfirmButton = () =>
	/** @type {HTMLButtonElement} */(elementBySelector(`.${jscClasses.actions} .${jscClasses.confirm}`))

/**
 * @returns {HTMLButtonElement | null}
 */
export const getCancelButton = () =>
	/** @type {HTMLButtonElement} */(elementBySelector(`.${jscClasses.actions} .${jscClasses.cancel}`))

/**
 * @returns {HTMLButtonElement | null}
 */
export const getDenyButton = () =>
	/** @type {HTMLButtonElement} */(elementBySelector(`.${jscClasses.actions} .${jscClasses.deny}`))

/**
 * @returns {HTMLElement | null}
 */
export const getInputLabel = () => elementByClass(jscClasses['input-label'])

/**
 * @returns {HTMLElement | null}
 */
export const getLoader = () => elementBySelector(`.${jscClasses.loader}`)

/**
 * @returns {HTMLElement | null}
 */
export const getActions = () => elementByClass(jscClasses.actions)

/**
 * @returns {HTMLElement | null}
 */
export const getFooter = () => elementByClass(jscClasses.footer)

/**
 * @returns {HTMLElement | null}
 */
export const getTimerProgressBar = () => elementByClass(jscClasses['timer-progress-bar'])

/**
 * @returns {HTMLElement | null}
 */
export const getCloseButton = () => elementByClass(jscClasses.close)

// https://github.com/jkup/focusable/blob/master/index.js
const focusable = `
	a[href],
	area[href],
	input:not([disabled]),
	select:not([disabled]),
	textarea:not([disabled]),
	button:not([disabled]),
	iframe,
	object,
	embed,
	[tabindex="0"],
	[contenteditable],
	audio[controls],
	video[controls],
	summary
`
/**
 * @returns {HTMLElement[]}
 */
export const getFocusableElements = () => {
	const popup = getPopup()
	if (!popup) {
		return []
	}
	/** @type {NodeListOf<HTMLElement>} */
	const focusableElementsWithTabindex = popup.querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')
	const focusableElementsWithTabindexSorted = Array.from(focusableElementsWithTabindex)
		// sort according to tabindex
		.sort((a, b) => {
			const tabindexA = parseInt(a.getAttribute('tabindex') || '0')
			const tabindexB = parseInt(b.getAttribute('tabindex') || '0')
			if (tabindexA > tabindexB) {
				return 1
			} else if (tabindexA < tabindexB) {
				return -1
			}
			return 0
		})

	/** @type {NodeListOf<HTMLElement>} */
	const otherFocusableElements = popup.querySelectorAll(focusable)
	const otherFocusableElementsFiltered = Array.from(otherFocusableElements).filter(
		(el) => el.getAttribute('tabindex') !== '-1'
	)

	return [...new Set(focusableElementsWithTabindexSorted.concat(otherFocusableElementsFiltered))].filter((el) =>
		isVisible(el)
	)
}

/**
 * @returns {boolean}
 */
export const isModal = () => {
	return (
		hasClass(document.body, jscClasses.shown) &&
		!hasClass(document.body, jscClasses['toast-shown']) &&
		!hasClass(document.body, jscClasses['no-backdrop'])
	)
}

/**
 * @returns {boolean}
 */
export const isToast = () => {
	const popup = getPopup()
	if (!popup) {
		return false
	}
	return hasClass(popup, jscClasses.toast)
}

/**
 * @returns {boolean}
 */
export const isLoading = () => {
	const popup = getPopup()
	if (!popup) {
		return false
	}
	return popup.hasAttribute('data-loading')
}
