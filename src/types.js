/**
 * @typedef { import('./jsconfirm').JsConfirm } JsConfirm
 * @typedef { import('jsconfirm').JsConfirmOptions } JsConfirmOptions
 * @typedef { import('jsconfirm').JsConfirmIcon } JsConfirmIcon
 * @typedef { import('jsconfirm').JsConfirmInput } JsConfirmInput
 * @typedef { import('jsconfirm').JsConfirmResult } JsConfirmResult
 * @typedef { import('jsconfirm').JsConfirmOptions['inputValue'] } JsConfirmInputValue
 */

/**
 * @typedef { import('./utils/Timer').default } Timer
 */

/**
 * @typedef GlobalState
 * @property {JsConfirm} [currentInstance]
 * @property {Element | null} [previousActiveElement]
 * @property {Timer} [timeout]
 * @property {NodeJS.Timeout} [restoreFocusTimeout]
 * @property {(this: HTMLElement, event: KeyboardEvent) => any} [keydownHandler]
 * @property {HTMLElement | (Window & typeof globalThis)} [keydownTarget]
 * @property {boolean} [keydownHandlerAdded]
 * @property {boolean} [keydownListenerCapture]
 * @property {Function} [jscCloseEventFinishedCallback]
 */

/**
 * @typedef DomCache
 * @property {HTMLElement} popupInner
 * @property {HTMLElement} popup
 * @property {HTMLElement} container
 * @property {HTMLElement} actions
 * @property {HTMLElement} confirmButton
 * @property {HTMLElement} denyButton
 * @property {HTMLElement} cancelButton
 * @property {HTMLElement} loader
 * @property {HTMLElement} closeButton
 * @property {HTMLElement} validationMessage
 * @property {HTMLElement} progressSteps
 */
