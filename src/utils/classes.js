export const jscPrefix = 'jsconfirm-'

/**
 * @typedef
 * { | 'container'
 *   | 'shown'
 *   | 'height-auto'
 *   | 'iosfix'
 *   | 'popup'
 *   | 'body'
 *   | 'header-row'
 *   | 'clip'
 *   | 'modal'
 *   | 'no-backdrop'
 *   | 'no-transition'
 *   | 'toast'
 *   | 'toast-shown'
 *   | 'show'
 *   | 'hide'
 *   | 'close'
 *   | 'title'
 *   | 'html-container'
 *   | 'actions'
 *   | 'confirm'
 *   | 'deny'
 *   | 'cancel'
 *   | 'default-outline'
 *   | 'footer'
 *   | 'icon'
 *   | 'icon-content'
 *   | 'image'
 *   | 'input'
 *   | 'file'
 *   | 'range'
 *   | 'select'
 *   | 'radio'
 *   | 'checkbox'
 *   | 'label'
 *   | 'textarea'
 *   | 'inputerror'
 *   | 'input-label'
 *   | 'validation-message'
 *   | 'progress-steps'
 *   | 'active-progress-step'
 *   | 'progress-step'
 *   | 'progress-step-line'
 *   | 'loader'
 *   | 'loading'
 *   | 'styled'
 *   | 'top'
 *   | 'top-start'
 *   | 'top-end'
 *   | 'top-left'
 *   | 'top-right'
 *   | 'center'
 *   | 'center-start'
 *   | 'center-end'
 *   | 'center-left'
 *   | 'center-right'
 *   | 'bottom'
 *   | 'bottom-start'
 *   | 'bottom-end'
 *   | 'bottom-left'
 *   | 'bottom-right'
 *   | 'grow-row'
 *   | 'grow-column'
 *   | 'grow-fullscreen'
 *   | 'rtl'
 *   | 'timer-progress-bar'
 *   | 'timer-progress-bar-container'
 *   | 'scrollbar-measure'
 *   | 'icon-success'
 *   | 'icon-warning'
 *   | 'icon-info'
 *   | 'icon-question'
 *   | 'icon-error'
 * } JscClass
 * @typedef {Record<JscClass, string>} JscClasses
 */

/**
 * @typedef {'success' | 'warning' | 'info' | 'question' | 'error'} JscIcon
 * @typedef {Record<JscIcon, string>} JscIcons
 */

/** @type {JscClass[]} */
const classNames = [
	'container',
	'shown',
	'height-auto',
	'iosfix',
	'popup',
	'body',
	'header-row',
	'clip',
	'modal',
	'no-backdrop',
	'no-transition',
	'toast',
	'toast-shown',
	'show',
	'hide',
	'close',
	'title',
	'html-container',
	'actions',
	'confirm',
	'deny',
	'cancel',
	'default-outline',
	'footer',
	'icon',
	'icon-content',
	'image',
	'input',
	'file',
	'range',
	'select',
	'radio',
	'checkbox',
	'label',
	'textarea',
	'inputerror',
	'input-label',
	'validation-message',
	'progress-steps',
	'active-progress-step',
	'progress-step',
	'progress-step-line',
	'loader',
	'loading',
	'styled',
	'top',
	'top-start',
	'top-end',
	'top-left',
	'top-right',
	'center',
	'center-start',
	'center-end',
	'center-left',
	'center-right',
	'bottom',
	'bottom-start',
	'bottom-end',
	'bottom-left',
	'bottom-right',
	'grow-row',
	'grow-column',
	'grow-fullscreen',
	'rtl',
	'timer-progress-bar',
	'timer-progress-bar-container',
	'scrollbar-measure',
	'icon-success',
	'icon-warning',
	'icon-info',
	'icon-question',
	'icon-error',
]

export const jscClasses = classNames.reduce((acc, className) => {
	acc[className] = jscPrefix + className
	return acc
}, /** @type {JscClasses} */ ({}))

/** @type {JscIcon[]} */
const icons = ['success', 'warning', 'info', 'question', 'error']

export const iconTypes = icons.reduce((acc, icon) => {
	acc[icon] = jscPrefix + icon
	return acc
}, /** @type {JscIcons} */ ({}))
