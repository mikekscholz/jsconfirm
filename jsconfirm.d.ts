declare module 'jsconfirm' {
	/**
	 * A namespace inside the default function, containing utility function for controlling the currently-displayed popup.
	 *
	 * Example:
	 * ```
	 * Jsc.fire('Hey user!', 'You are the rockstar!', 'info');
	 *
	 * Jsc.update({
	 *   icon: 'success'
	 * })
	 * ```
	 */
	namespace Jsc {
		/**
		 * Function to display a JsConfirm popup, with an object of options, all being optional.
		 * See the `JsConfirmOptions` interface for the list of accepted fields and values.
		 *
		 * Example:
		 * ```
		 * Jsc.fire({
		 *   title: 'Auto close alert!',
		 *   text: 'I will close in 2 seconds.',
		 *   timer: 2000
		 * })
		 * ```
		 */
		function fire<T = any>(options: JsConfirmOptions): Promise<JsConfirmResult<Awaited<T>>>

		/**
		 * Function to display a simple JsConfirm popup.
		 *
		 * Example:
		 * ```
		 * Jsc.fire('The Internet?', 'That thing is still around?', 'question');
		 * ```
		 */
		function fire<T = any>(title?: string, html?: string, icon?: JsConfirmIcon): Promise<JsConfirmResult<Awaited<T>>>

		/**
		 * Reuse configuration by creating a `Jsc` instance.
		 *
		 * Example:
		 * ```
		 * const Toast = Jsc.mixin({
		 *   toast: true,
		 *   position: 'top-end',
		 *   timer: 3000,
		 *   timerProgressBar: true
		 * })
		 * Toast.fire('Something interesting happened', '', 'info')
		 * ```
		 *
		 * @param options the default options to set for this instance.
		 */
		function mixin(options: JsConfirmOptions): typeof Jsc

		/**
		 * Determines if a popup is shown.
		 */
		function isVisible(): boolean

		/**
		 * Updates popup options.
		 * See the `JsConfirmOptions` interface for the list of accepted fields and values.
		 *
		 * Example:
		 * ```
		 * Jsc.update({
		 *   icon: 'error'
		 * })
		 * ```
		 */
		function update(options: Pick<JsConfirmOptions, JsConfirmUpdatableParameters>): void

		/**
		 * Closes the currently open JsConfirm popup programmatically.
		 *
		 * @param result The promise originally returned by `Jsc.fire()` will be resolved with this value.
		 * If no object is given, the promise is resolved with an empty `SweetAlertResult` object.
		 */
		function close(result?: Partial<JsConfirmResult>): void

		/**
		 * Gets the popup container which contains the backdrop and the popup itself.
		 */
		function getContainer(): HTMLElement | null

		/**
		 * Gets the popup outer wrapper.
		 */
		function getPopup(): HTMLElement | null

		/**
		 * Gets the popup inner body.
		 */
		function getBody(): HTMLElement | null

		/**
		 * Gets the popup title.
		 */
		function getTitle(): HTMLElement | null

		/**
		 * Gets progress steps.
		 */
		function getProgressSteps(): HTMLElement | null

		/**
		 * Gets the DOM element where the `html`/`text` parameter is rendered to.
		 */
		function getHtmlContainer(): HTMLElement | null

		/**
		 * Gets the image.
		 */
		function getImage(): HTMLElement | null

		/**
		 * Gets the close button.
		 */
		function getCloseButton(): HTMLButtonElement | null

		/**
		 * Gets the icon.
		 */
		function getIcon(): HTMLElement | null

		/**
		 * Gets the icon content (without border).
		 */
		function getIconContent(): HTMLElement | null

		/**
		 * Gets the "Confirm" button.
		 */
		function getConfirmButton(): HTMLButtonElement | null

		/**
		 * Gets the "Deny" button.
		 */
		function getDenyButton(): HTMLButtonElement | null

		/**
		 * Gets the "Cancel" button.
		 */
		function getCancelButton(): HTMLButtonElement | null

		/**
		 * Gets actions (buttons) wrapper.
		 */
		function getActions(): HTMLElement | null

		/**
		 * Gets the popup footer.
		 */
		function getFooter(): HTMLElement | null

		/**
		 * Gets the timer progress bar (see the `timerProgressBar` param).
		 */
		function getTimerProgressBar(): HTMLElement | null

		/**
		 * Gets all focusable elements in the popup.
		 */
		function getFocusableElements(): readonly HTMLElement[]

		/**
		 * Enables "Confirm" and "Cancel" buttons.
		 */
		function enableButtons(): void

		/**
		 * Disables "Confirm" and "Cancel" buttons.
		 */
		function disableButtons(): void

		/**
		 * Shows loader (spinner), this is useful with AJAX requests.
		 *
		 * By default the loader be shown instead of the "Confirm" button, but if you want
		 * another button to be replaced with a loader, just pass it like this:
		 * ```
		 * Jsc.showLoading(Jsc.getDenyButton())
		 * ```
		 */
		function showLoading(buttonToReplace?: HTMLButtonElement): void

		/**
		 * Hides loader and shows back the button which was hidden by .showLoading()
		 */
		function hideLoading(): void

		/**
		 * Determines if popup is in the loading state.
		 */
		function isLoading(): boolean

		/**
		 * Clicks the "Confirm" button programmatically.
		 */
		function clickConfirm(): void

		/**
		 * Clicks the "Deny" button programmatically.
		 */
		function clickDeny(): void

		/**
		 * Clicks the "Cancel" button programmatically.
		 */
		function clickCancel(): void

		/**
		 * Shows a validation message.
		 *
		 * @param validationMessage The validation message.
		 */
		function showValidationMessage(validationMessage: string): void

		/**
		 * Hides validation message.
		 */
		function resetValidationMessage(): void

		/**
		 * Gets the input DOM node, this method works with input parameter.
		 */
		function getInput(): HTMLInputElement | null

		/**
		 * Disables the popup input. A disabled input element is unusable and un-clickable.
		 */
		function disableInput(): void

		/**
		 * Enables the popup input.
		 */
		function enableInput(): void

		/**
		 * Gets the validation message container.
		 */
		function getValidationMessage(): HTMLElement | null

		/**
		 * If `timer` parameter is set, returns number of milliseconds of timer remained.
		 * Otherwise, returns undefined.
		 */
		function getTimerLeft(): number | undefined

		/**
		 * Stop timer. Returns number of milliseconds of timer remained.
		 * If `timer` parameter isn't set, returns `undefined`.
		 */
		function stopTimer(): number | undefined

		/**
		 * Resume timer. Returns number of milliseconds of timer remained.
		 * If `timer` parameter isn't set, returns `undefined`.
		 */
		function resumeTimer(): number | undefined

		/**
		 * Toggle timer. Returns number of milliseconds of timer remained.
		 * If `timer` parameter isn't set, returns `undefined`.
		 */
		function toggleTimer(): number | undefined

		/**
		 * Check if timer is running. Returns true if timer is running,
		 * and false is timer is paused / stopped.
		 * If `timer` parameter isn't set, returns `undefined`.
		 */
		function isTimerRunning(): boolean | undefined

		/**
		 * Increase timer. Returns number of milliseconds of an updated timer.
		 * If `timer` parameter isn't set, returns `undefined`.
		 *
		 * @param ms The number of milliseconds to add to the currect timer
		 */
		function increaseTimer(ms: number): number | undefined

    /**
     * Allows to trigger popups declaratively:
     *
     * ```
     * <button data-jsc-template="#hello-world-alert">Click me!</button>
     *
     * <template id="hello-world-alert">
     *   <jsc-title>Hello world!</jsc-title>
     *   <jsc-html>Here I come...</jsc-html>
     * </template>
     * ```
     *
     * @param attribute The attribute name to search for, defaults to `data-jsc-template`
     */
    function bindClickHandler(attribute?: string): void

		/**
		 * Determines if a given parameter name is valid.
		 *
		 * @param paramName The parameter to check
		 */
		function isValidParameter(paramName: string): paramName is keyof JsConfirmOptions

		/**
		 * Determines if a given parameter name is valid for `Jsc.update()` method.
		 *
		 * @param paramName The parameter to check
		 */
		function isUpdatableParameter(paramName: string): paramName is JsConfirmUpdatableParameters

		/**
		 * Normalizes the arguments you can give to Jsc.fire() in an object of type JsConfirmOptions.
		 *
		 * Example:
		 * ```
		 * Jsc.argsToParams(['title', 'text']); //=> { title: 'title', text: 'text' }
		 * Jsc.argsToParams([{ title: 'title', text: 'text' }]); //=> { title: 'title', text: 'text' }
		 * ```
		 *
		 * @param params The array of arguments to normalize.
		 */
		function argsToParams(params: JsConfirmArrayOptions | readonly [JsConfirmOptions]): JsConfirmOptions

		/**
		 * An enum of possible reasons that can explain an alert dismissal.
		 */
		enum DismissReason {
			cancel,
			backdrop,
			close,
			esc,
			timer,
		}

		/**
		 * JsConfirm's version
		 */
		const version: string
	}

	interface JsConfirmHideShowClass {
		backdrop?: string | readonly string[]
		icon?: string | readonly string[]
		popup?: string | readonly string[]
	}

	type Awaited<T> = T extends Promise<infer U> ? U : T

	type SyncOrAsync<T> = T | Promise<T> | { toPromise: () => T }

	/** In computer programming, a thunk is a subroutine used to
	 * inject a calculation into another subroutine. Thunks are
	 * primarily used to delay a calculation until its result is
	 * needed, or to insert operations at the beginning or end of
	 * the other subroutine. https://en.wikipedia.org/wiki/Thunk
	 */

	type ValueOrThunk<T> = T | (() => T)

	export type JsConfirmArrayOptions = readonly [string?, string?, JsConfirmIcon?]

	export type JsConfirmGrow = 'row' | 'column' | 'fullscreen' | false

	export type JsConfirmHideClass = JsConfirmHideShowClass

	export type JsConfirmShowClass = Readonly<JsConfirmHideShowClass>

	export type JsConfirmIcon = 'success' | 'error' | 'warning' | 'info' | 'question'

	export type JsConfirmType = 'red' | 'yellow' | 'green' | 'blue' | 'light' | 'dark' | 'default'

	export type JsConfirmInput =
		| 'text'
		| 'email'
		| 'password'
		| 'number'
		| 'tel'
		| 'range'
		| 'textarea'
		| 'select'
		| 'radio'
		| 'checkbox'
		| 'file'
		| 'url'

	export type JsConfirmPosition =
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'top-left'
		| 'top-right'
		| 'center'
		| 'center-start'
		| 'center-end'
		| 'center-left'
		| 'center-right'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'bottom-left'
		| 'bottom-right'

	export type JsConfirmUpdatableParameters =
		| 'allowEscapeKey'
		| 'allowOutsideClick'
		| 'background'
		| 'buttonsStyling'
		| 'cancelButtonAriaLabel'
		| 'cancelButtonColor'
		| 'cancelButtonText'
		| 'closeButtonAriaLabel'
		| 'closeButtonHtml'
		| 'confirmButtonAriaLabel'
		| 'confirmButtonColor'
		| 'confirmButtonText'
		| 'currentProgressStep'
		| 'customClass'
		| 'denyButtonAriaLabel'
		| 'denyButtonColor'
		| 'denyButtonText'
		| 'didClose'
		| 'didDestroy'
		| 'footer'
		| 'hideClass'
		| 'html'
		| 'icon'
		| 'iconColor'
		| 'imageAlt'
		| 'imageHeight'
		| 'imageUrl'
		| 'imageWidth'
		| 'preConfirm'
		| 'preDeny'
		| 'progressSteps'
		| 'reverseButtons'
		| 'showCancelButton'
		| 'showCloseButton'
		| 'showConfirmButton'
		| 'showDenyButton'
		| 'text'
		| 'title'
		| 'titleText'
		| 'willClose'

	export interface JsConfirmCustomClass {
		container?: string | readonly string[]
		popup?: string | readonly string[]
		title?: string | readonly string[]
		closeButton?: string | readonly string[]
		icon?: string | readonly string[]
		image?: string | readonly string[]
		htmlContainer?: string | readonly string[]
		input?: string | readonly string[]
		inputLabel?: string | readonly string[]
		validationMessage?: string | readonly string[]
		actions?: string | readonly string[]
		confirmButton?: string | readonly string[]
		denyButton?: string | readonly string[]
		cancelButton?: string | readonly string[]
		loader?: string | readonly string[]
		footer?: string | readonly string[]
		timerProgressBar?: string | readonly string[]
		timerProgressCircle?: string | readonly string[]
	}

	export interface JsConfirmResult<T = any> {
		readonly isConfirmed: boolean
		readonly isDenied: boolean
		readonly isDismissed: boolean
		readonly value?: T
		readonly dismiss?: Jsc.DismissReason
	}

	export interface JsConfirmOptions {
		/**
		 * The title of the popup, as HTML.
		 * It can either be added to the object under the key `title` or passed as the first parameter of `Jsc.fire()`.
		 *
		 * @default ''
		 */
		title?: string | HTMLElement | JQuery

		/**
		 * The title of the popup, as text. Useful to avoid HTML injection.
		 *
		 * @default ''
		 */
		titleText?: string

		/**
		 * A description for the popup.
		 * If `text` and `html` parameters are provided in the same time, `html` will be used.
		 *
		 * @default ''
		 */
		text?: string

		/**
		 * A HTML description for the popup.
		 * If `text` and `html` parameters are provided in the same time, `html` will be used.
		 *
		 * [Security] JsConfirm does NOT sanitize this parameter. It is the developer's responsibility
		 * to escape any user input when using the `html` option, so XSS attacks would be prevented.
		 *
		 * @default ''
		 */
		html?: string | HTMLElement | JQuery

		/**
		 * The icon of the popup.
		 * JsConfirm comes with 5 built-in icons which will show a corresponding icon animation:
		 * `'warning'`, `'error'`, `'success'`, `'info'` and `'question'`.
		 * It can either be put to the object under the key `icon` or passed as the third parameter of `Jsc.fire()`.
		 *
		 * @default undefined
		 */
		icon?: JsConfirmIcon

		/**
		 * The type of the popup.
		 * JsConfirm comes with 7 built-in types which will show a corresponding accent color:
		 * `'warning'`, `'error'`, `'success'`, `'info'` and `'question'`.
		 * It can either be put to the object under the key `type` or passed as the fourth parameter of `Jsc.fire()`.
		 *
		 * @default 'default'
		 */
		type?: JsConfirmType

		/**
		 * Use this to enable popup and icon animations.
		 *
		 * @default false
		 */
		animated?: boolean

		/**
		 * Use this to change the color of the icon.
		 *
		 * @default undefined
		 */
		iconColor?: string

		/**
		 * The custom HTML content for an icon.
		 *
		 * Example:
		 * ```
		 * Jsc.fire({
		 *   icon: 'error',
		 *   iconHtml: '<i class="fas fa-bug"></i>'
		 * })
		 * ```
		 *
		 * @default undefined
		 */
		iconHtml?: string

		/**
		 * The footer of the popup, as HTML.
		 *
		 * @default ''
		 */
		footer?: string | HTMLElement | JQuery

		/**
		 * The declarative <template> of the popup. All API prams can be set via
		 * `<jsc-param name="..." value="..."></jsc-param>`, e.g.
		 * `<jsc-param name="toast" value="true"></jsc-param>`
		 *
		 * Additionally, there are specialized elements for specific params:
		 *  - `<jsc-title>`
		 *  - `<jsc-html>`
		 *  - `<jsc-icon>`
		 *  - `<jsc-image>`
		 *  - `<jsc-input>`
		 *  - `<jsc-input-option>`
		 *  - `<jsc-button>`
		 *  - `<jsc-footer>`
		 *
		 * Example:
		 * ```html
		 * <template id="my-template">
		 *   <jsc-title>Are you sure?</jsc-title>
		 *   <jsc-html>You won't be able to revert this!</jsc-html>
		 *
		 *   <jsc-icon type="success"></jsc-icon>
		 *   <jsc-image src="..." width="..." height="..." alt="..."></jsc-image>
		 *
		 *   <jsc-input type="select" placeholder="..." label="..." value="...">
		 *     <jsc-input-option value="...">...</jsc-input-option>
		 *   </jsc-input>
		 *   <jsc-param name="inputAttributes" value='{ "multiple": true }'></jsc-param>
		 *
		 *   <jsc-button type="confirm" color="..." aria-label="...">Yes</jsc-button>
		 *   <jsc-button type="cancel" color="..." aria-label="...">No</jsc-button>
		 *
		 *   <jsc-footer>read more here</jsc-footer>
		 * </template>
		 * ```
		 *
		 * ```
		 * Jsc.fire({
		 *   template: '#my-template'
		 * })
		 * ```
		 *
		 * @default undefined
		 */
		template?: string | HTMLTemplateElement

		/**
		 * Whether or not JsConfirm should show a full screen click-to-dismiss backdrop.
		 * Either a boolean value or a css background value (hex, rgb, rgba, url, etc.)
		 *
		 * @default true
		 */
		backdrop?: boolean | string

		/**
		 * Whether or not an alert should be treated as a toast notification.
		 * This option is normally coupled with the `position` and `timer` parameters.
		 * Toasts are NEVER autofocused.
		 *
		 * @default false
		 */
		toast?: boolean

		/**
		 * The container element for adding popup into (query selector only).
		 *
		 * @default 'body'
		 */
		target?: string | HTMLElement | null

		/**
		 * Input field type, can be `'text'`, `'email'`, `'password'`, `'number'`, `'tel'`, `'range'`, `'textarea'`,
		 * `'select'`, `'radio'`, `'checkbox'`, `'file'` and `'url'`.
		 *
		 * @default undefined
		 */
		input?: JsConfirmInput

		/**
		 * Popup width, including paddings (`box-sizing: border-box`).
		 *
		 * @default undefined
		 */
		width?: number | string

		/**
		 * Popup padding.
		 *
		 * @default undefined
		 */
		padding?: number | string

		/**
		 * Color for title, content and footer (CSS `color` property).  The default color is `#545454`.
		 *
		 * @default undefined
		 */
		color?: string

		/**
		 * Popup background (CSS `background` property). The default background is `#fff`.
		 *
		 * @default undefined
		 */
		background?: string

		/**
		 * Popup position
		 *
		 * @default 'center'
		 */
		position?: JsConfirmPosition

		/**
		 * Popup grow direction
		 *
		 * @default false
		 */
		grow?: JsConfirmGrow

		/**
		 * CSS classes for animations when showing a popup (fade in)
		 *
		 * @default { popup: 'jsc-show', backdrop: 'jsc-backdrop-show', icon: 'jsc-icon-show' }
		 */
		showClass?: JsConfirmShowClass

		/**
		 * CSS classes for animations when hiding a popup (fade out)
		 *
		 * @default { popup: 'jsc-hide', backdrop: 'jsc-backdrop-hide', icon: 'jsc-icon-hide' }
		 */
		hideClass?: JsConfirmHideClass

		/**
		 * A custom CSS class for the popup.
		 * If a string value is provided, the classname will be applied to the popup.
		 * If an object is provided, the classnames will be applied to the corresponding fields:
		 *
		 * Example:
		 * ```
		 * Jsc.fire({
		 *   customClass: {
		 *     container: '...',
		 *     popup: '...',
		 *     title: '...',
		 *     closeButton: '...',
		 *     icon: '...',
		 *     image: '...',
		 *     htmlContainer: '...',
		 *     input: '...',
		 *     inputLabel: '...',
		 *     validationMessage: '...',
		 *     actions: '...',
		 *     confirmButton: '...',
		 *     denyButton: '...',
		 *     cancelButton: '...',
		 *     loader: '...',
		 *     footer: '...',
		 *     timerProgressBar: '...',
		 *   }
		 * })
		 * ```
		 *
		 * @default {}
		 */
		customClass?: JsConfirmCustomClass | string

		/**
		 * Auto close timer of the popup. Set in ms (milliseconds).
		 *
		 * @default undefined
		 */
		timer?: number

		/**
		 * If set to `true`, the timer will have a linear progress bar at the bottom of a popup.
		 * Mostly, this feature is useful with toasts.
		 *
		 * @default false
		 */
		timerProgressBar?: boolean

		/**
		 * If set to `true`, the timer will have a circular progress bar at the bottom of a popup.
		 * Mostly, this feature is useful with toasts.
		 *
		 * @default false
		 */
		timerProgressCircle?: boolean

		/**
		 * By default, JsConfirm sets html's and body's CSS `height` to `auto !important`.
		 * If this behavior isn't compatible with your project's layout, set `heightAuto` to `false`.
		 *
		 * @default true
		 */
		heightAuto?: boolean

		/**
		 * If set to `false`, the user can't dismiss the popup by clicking outside it.
		 * You can also pass a custom function returning a boolean value, e.g. if you want
		 * to disable outside clicks for the loading state of a popup.
		 *
		 * @default true
		 */
		allowOutsideClick?: ValueOrThunk<boolean>

		/**
		 * If set to `false`, the user can't dismiss the popup by pressing the Escape key.
		 * You can also pass a custom function returning a boolean value, e.g. if you want
		 * to disable the escape key for the loading state of a popup.
		 *
		 * @default true
		 */
		allowEscapeKey?: ValueOrThunk<boolean>

		/**
		 * If set to `false`, the user can't confirm the popup by pressing the Enter or Space keys,
		 * unless they manually focus the confirm button.
		 * You can also pass a custom function returning a boolean value.
		 *
		 * @default true
		 */
		allowEnterKey?: ValueOrThunk<boolean>

		/**
		 * If set to `false`, JsConfirm will allow keydown events propagation to the document.
		 *
		 * @default true
		 */
		stopKeydownPropagation?: boolean

		/**
		 * Useful for those who are using JsConfirm along with Bootstrap modals.
		 * By default keydownListenerCapture is `false` which means when a user hits `Esc`,
		 * both JsConfirm and Bootstrap modals will be closed.
		 * Set `keydownListenerCapture` to `true` to fix that behavior.
		 *
		 * @default false
		 */
		keydownListenerCapture?: boolean

		/**
		 * If set to `false`, the "Confirm" button will not be shown.
		 * It can be useful when you're using custom HTML description.
		 *
		 * @default true
		 */
		showConfirmButton?: boolean

		/**
		 * If set to `true`, the "Deny" button will be shown, which the user can click on to deny the popup.
		 *
		 * @default false
		 */
		showDenyButton?: boolean

		/**
		 * If set to `true`, the "Cancel" button will be shown, which the user can click on to dismiss the popup.
		 *
		 * @default false
		 */
		showCancelButton?: boolean

		/**
		 * Use this to change the text on the "Confirm" button.
		 *
		 * @default 'OK'
		 */
		confirmButtonText?: string

		/**
		 * Use this to change the text on the "Confirm" button.
		 *
		 * @default 'No'
		 */
		denyButtonText?: string

		/**
		 * Use this to change the text on the "Cancel" button.
		 *
		 * @default 'Cancel'
		 */
		cancelButtonText?: string

		/**
		 * Use this to change the background color of the "Confirm" button.
		 *
		 * @default undefined
		 */
		confirmButtonColor?: string

		/**
		 * Use this to change the background color of the "Deny" button.
		 *
		 * @default undefined
		 */
		denyButtonColor?: string

		/**
		 * Use this to change the background color of the "Cancel" button.
		 *
		 * @default undefined
		 */
		cancelButtonColor?: string

		/**
		 * Use this to change the `aria-label` for the "Confirm" button.
		 *
		 * @default ''
		 */
		confirmButtonAriaLabel?: string

		/**
		 * Use this to change the `aria-label` for the "Deny" button.
		 *
		 * @default ''
		 */
		denyButtonAriaLabel?: string

		/**
		 * Use this to change the `aria-label` for the "Cancel" button.
		 *
		 * @default ''
		 */
		cancelButtonAriaLabel?: string

		/**
		 * Whether to apply the default JsConfirm styling to buttons.
		 * If you want to use your own classes (e.g. Bootstrap classes) set this parameter to `false`.
		 *
		 * @default true
		 */
		buttonsStyling?: boolean

		/**
		 * Set to `true` if you want to invert default buttons positions.
		 *
		 * @default false
		 */
		reverseButtons?: boolean

		/**
		 * Set to `false` if you want to focus the first element in tab order instead of the "Confirm" button by default.
		 *
		 * @default true
		 */
		focusConfirm?: boolean

		/**
		 * Set to `true` if you want to focus the "Deny" button by default.
		 *
		 * @default false
		 */
		focusDeny?: boolean

		/**
		 * Set to `true` if you want to focus the "Cancel" button by default.
		 *
		 * @default false
		 */
		focusCancel?: boolean

		/**
		 * Set to `true` if you want to focus the "Close" button by default.
		 *
		 * @default false
		 */
		focusClose?: boolean

		/**
		 * Set to `false` if you don't want to return the focus to the element that invoked the modal
		 * after the modal is closed.
		 *
		 * @default true
		 */
		returnFocus?: boolean

		/**
		 * Set to `true` to show close button.
		 *
		 * @default false
		 */
		showCloseButton?: boolean

		/**
		 * Use this to change the HTML content of the close button.
		 *
		 * @default '&times;'
		 */
		closeButtonHtml?: string

		/**
		 * Use this to change the `aria-label` for the close button.
		 *
		 * @default 'Close this dialog'
		 */
		closeButtonAriaLabel?: string

		/**
		 * Use this to change the HTML content of the loader.
		 *
		 * @default ''
		 */
		loaderHtml?: string

		/**
		 * Set to `true` to disable buttons and show the loader instead of the Confirm button.
		 * Use it in combination with the `preConfirm` parameter.
		 *
		 * @default false
		 */
		showLoaderOnConfirm?: boolean

		/**
		 * Set to `true` to disable buttons and show the loader instead of the Deny button.
		 * Use it in combination with the `preDeny` parameter.
		 *
		 * @default false
		 */
		showLoaderOnDeny?: boolean

		/**
		 * Function to execute before confirming, may be async (Promise-returning) or sync.
		 * Returned (or resolved) value can be:
		 *  - `false` to prevent a popup from closing
		 *  - anything else to pass that value as the `result.value` of `Jsc.fire()`
		 *  - `undefined` to keep the default `result.value`
		 *
		 * Example:
		 * ```
		 * Jsc.fire({
		 *   title: 'Multiple inputs',
		 *   html:
		 *     '<input id="jsc-input1" class="jsc-input">' +
		 *     '<input id="jsc-input2" class="jsc-input">',
		 *   focusConfirm: false,
		 *   preConfirm: () => [
		 *     document.querySelector('#jsc-input1').value,
		 *     document.querySelector('#jsc-input2').value
		 *   ]
		 * }).then(result => Jsc.fire(JSON.stringify(result));
		 * ```
		 *
		 * @default undefined
		 */
		preConfirm?(inputValue: any): SyncOrAsync<any>

		/**
		 * Function to execute before denying, may be async (Promise-returning) or sync.
		 * Returned (or resolved) value can be:
		 *  - `false` to prevent a popup from closing
		 *  - anything else to pass that value as the `result.value` of `Jsc.fire()`
		 *  - `undefined` to keep the default `result.value`
		 *
		 * @default undefined
		 */
		preDeny?(value: any): SyncOrAsync<any | void>

		/**
		 * Add an image to the popup. Should contain a string with the path or URL to the image.
		 *
		 * @default undefined
		 */
		imageUrl?: string | null

		/**
		 * If imageUrl is set, you can specify imageWidth to describes image width.
		 *
		 * @default undefined
		 */
		imageWidth?: number | string

		/**
		 * If imageUrl is set, you can specify imageHeight to describes image height.
		 *
		 * @default undefined
		 */
		imageHeight?: number | string

		/**
		 * An alternative text for the custom image icon.
		 *
		 * @default ''
		 */
		imageAlt?: string

		/**
		 * Input field label.
		 *
		 * @default ''
		 */
		inputLabel?: string

		/**
		 * Input field placeholder.
		 *
		 * @default ''
		 */
		inputPlaceholder?: string

		/**
		 * Input field initial value.
		 *
		 * @default ''
		 */
		inputValue?: SyncOrAsync<string | number | File | FileList>

		/**
		 * If the `input` parameter is set to `'select'` or `'radio'`, you can provide options.
		 * Object keys will represent options values, object values will represent options text values.
		 *
		 * @default {}
		 */
		inputOptions?: SyncOrAsync<ReadonlyMap<string, string> | Record<string, any>>

		/**
		 * Automatically focus the input when popup is shown.
		 * Set this parameter to `false` to disable auto-focusing.
		 *
		 * @default true
		 */
		inputAutoFocus?: boolean

		/**
		 * Automatically remove whitespaces from both ends of a result string.
		 * Set this parameter to `false` to disable auto-trimming.
		 *
		 * @default true
		 */
		inputAutoTrim?: boolean

		/**
		 * HTML input attributes (e.g. `min`, `max`, `step`, `accept`), that are added to the input field.
		 *
		 * Example:
		 * ```
		 * Jsc.fire({
		 *   title: 'Select a file',
		 *   input: 'file',
		 *   inputAttributes: {
		 *     accept: 'image/*'
		 *   }
		 * })
		 * ```
		 *
		 * @default {}
		 */
		inputAttributes?: Record<string, string>

		/**
		 * Validator for input field, may be async (Promise-returning) or sync.
		 *
		 * Example:
		 * ```
		 * Jsc.fire({
		 *   title: 'Select color',
		 *   input: 'radio',
		 *   inputValidator: result => !result && 'You need to select something!'
		 * })
		 * ```
		 *
		 * @default undefined
		 */
		inputValidator?(inputValue: string, validationMessage?: string): SyncOrAsync<string | null | false | void>

		/**
		 * If you want to return the input value as `result.value` when denying the popup, set to `true`.
		 * Otherwise, the denying will set `result.value` to `false`.
		 *
		 * @default false
		 */
		returnInputValueOnDeny?: boolean

		/**
		 * A custom validation message for default validators (email, url).
		 *
		 * Example:
		 * ```
		 * Jsc.fire({
		 *   input: 'email',
		 *   validationMessage: 'Adresse e-mail invalide'
		 * })
		 * ```
		 *
		 * @default undefined
		 */
		validationMessage?: string

		/**
		 * Progress steps, useful for popup queues.
		 *
		 * @default []
		 */
		progressSteps?: readonly string[]

		/**
		 * Current active progress step.
		 *
		 * @default undefined
		 */
		currentProgressStep?: number

		/**
		 * Distance between progress steps.
		 *
		 * @default undefined
		 */
		progressStepsDistance?: number | string

		/**
		 * Popup lifecycle hook. Synchronously runs before the popup is shown on screen.
		 *
		 * @default undefined
		 * @param popup The popup DOM element.
		 */
		willOpen?(popup: HTMLElement): void

		/**
		 * Popup lifecycle hook. Asynchronously runs after the popup has been shown on screen.
		 *
		 * @default undefined
		 * @param popup The popup DOM element.
		 */
		didOpen?(popup: HTMLElement): void

		/**
		 * Popup lifecycle hook. Synchronously runs after the popup DOM has been updated (ie. just before the popup is
		 * repainted on the screen).
		 * Typically, this will happen after `Jsc.fire()` or `Jsc.update()`.
		 * If you want to perform changes in the popup's DOM, that survive `Jsc.update()`, prefer `didRender` over
		 * `willOpen`.
		 *
		 * @default undefined
		 * @param popup The popup DOM element.
		 */
		didRender?(popup: HTMLElement): void

		/**
		 * Popup lifecycle hook. Synchronously runs when the popup closes by user interaction (and not due to another popup
		 * being fired).
		 *
		 * @default undefined
		 * @param popup The popup DOM element.
		 */
		willClose?(popup: HTMLElement): void

		/**
		 * Popup lifecycle hook. Asynchronously runs after the popup has been disposed by user interaction (and not due to
		 * another popup being fired).
		 *
		 * @default undefined
		 */
		didClose?(): void

		/**
		 * Popup lifecycle hook. Synchronously runs after popup has been destroyed either by user interaction or by another
		 * popup.
		 * If you have cleanup operations that you need to reliably execute each time a popup is closed, prefer
		 * `didDestroy` over `didClose`.
		 *
		 * @default undefined
		 */
		didDestroy?(): void

		/**
		 * Set to `false` to disable body padding adjustment when scrollbar is present.
		 *
		 * @default true
		 */
		scrollbarPadding?: boolean
	}
	declare global {
		interface HTMLElement {
			NiceSelect: instance
		}
		interface Element {
			focus(): void
		}
	}

	export default Jsc
}

declare module 'jsconfirm/*/jsconfirm.js' {
	export * from 'jsconfirm'
	// "export *" does not matches the default export, so do it explicitly.
	export { default } from 'jsconfirm' // eslint-disable-line
}

declare module 'jsconfirm/*/jsconfirm.all.js' {
	export * from 'jsconfirm'
	// "export *" does not matches the default export, so do it explicitly.
	export { default } from 'jsconfirm' // eslint-disable-line
}

/**
 * These interfaces aren't provided by JsConfirm, but its definitions use them.
 * They will be merged with 'true' definitions.
 */

interface JQuery {}

