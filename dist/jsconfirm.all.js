/*!
* jsconfirm v11.7.28
* Released under the MIT License.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.JsConfirm = {}));
})(this, (function (exports) { 'use strict';

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
    return _classApplyDescriptorGet(receiver, descriptor);
  }
  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }

  const RESTORE_FOCUS_TIMEOUT = 100;

  /** @type {GlobalState} */
  const globalState = {};
  const focusPreviousActiveElement = () => {
    if (globalState.previousActiveElement instanceof HTMLElement) {
      globalState.previousActiveElement.focus();
      globalState.previousActiveElement = null;
    } else if (document.body) {
      document.body.focus();
    }
  };

  /**
   * Restore previous active (focused) element
   *
   * @param {boolean} returnFocus
   * @returns {Promise<void>}
   */
  const restoreActiveElement = returnFocus => {
    return new Promise(resolve => {
      if (!returnFocus) {
        return resolve();
      }
      const x = window.scrollX;
      const y = window.scrollY;
      globalState.restoreFocusTimeout = setTimeout(() => {
        focusPreviousActiveElement();
        resolve();
      }, RESTORE_FOCUS_TIMEOUT); // issues/900

      window.scrollTo(x, y);
    });
  };

  const jscPrefix = 'jsconfirm-';

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
  const classNames = ['container', 'shown', 'height-auto', 'iosfix', 'popup', 'body', 'header-row', 'clip', 'modal', 'no-backdrop', 'no-transition', 'toast', 'toast-shown', 'show', 'hide', 'close', 'title', 'html-container', 'actions', 'confirm', 'deny', 'cancel', 'default-outline', 'footer', 'icon', 'icon-content', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'label', 'textarea', 'inputerror', 'input-label', 'validation-message', 'progress-steps', 'active-progress-step', 'progress-step', 'progress-step-line', 'loader', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen', 'rtl', 'timer-progress-bar', 'timer-progress-bar-container', 'scrollbar-measure', 'icon-success', 'icon-warning', 'icon-info', 'icon-question', 'icon-error'];
  const jscClasses = classNames.reduce((acc, className) => {
    acc[className] = jscPrefix + className;
    return acc;
  }, /** @type {JscClasses} */{});

  /** @type {JscIcon[]} */
  const icons = ['success', 'warning', 'info', 'question', 'error'];
  const iconTypes = icons.reduce((acc, icon) => {
    acc[icon] = jscPrefix + icon;
    return acc;
  }, /** @type {JscIcons} */{});

  const consolePrefix = 'JsConfirm:';

  /**
   * Capitalize the first letter of a string
   *
   * @param {string} str
   * @returns {string}
   */
  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

  /**
   * Standardize console warnings
   *
   * @param {string | string[]} message
   */
  const warn = message => {
    console.warn("".concat(consolePrefix, " ").concat(typeof message === 'object' ? message.join(' ') : message));
  };

  /**
   * Standardize console errors
   *
   * @param {string} message
   */
  const error = message => {
    console.error("".concat(consolePrefix, " ").concat(message));
  };

  /**
   * Private global state for `warnOnce`
   *
   * @type {string[]}
   * @private
   */
  const previousWarnOnceMessages = [];

  /**
   * Show a console warning, but only if it hasn't already been shown
   *
   * @param {string} message
   */
  const warnOnce = message => {
    if (!previousWarnOnceMessages.includes(message)) {
      previousWarnOnceMessages.push(message);
      warn(message);
    }
  };

  /**
   * Show a one-time console warning about deprecated params/methods
   *
   * @param {string} deprecatedParam
   * @param {string} useInstead
   */
  const warnAboutDeprecation = (deprecatedParam, useInstead) => {
    warnOnce("\"".concat(deprecatedParam, "\" is deprecated and will be removed in the next major release. Please use \"").concat(useInstead, "\" instead."));
  };

  /**
   * If `arg` is a function, call it (with no arguments or context) and return the result.
   * Otherwise, just pass the value through
   *
   * @param {Function | any} arg
   * @returns {any}
   */
  const callIfFunction = arg => typeof arg === 'function' ? arg() : arg;

  /**
   * @param {any} arg
   * @returns {boolean}
   */
  const hasToPromiseFn = arg => arg && typeof arg.toPromise === 'function';

  /**
   * @param {any} arg
   * @returns {Promise<any>}
   */
  const asPromise = arg => hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg);

  /**
   * @param {any} arg
   * @returns {boolean}
   */
  const isPromise = arg => arg && Promise.resolve(arg) === arg;

  /**
   * Gets the popup container which contains the backdrop and the popup itself.
   *
   * @returns {HTMLElement | null}
   */
  const getContainer = () => document.body.querySelector(".".concat(jscClasses.container));

  /**
   * @param {string} selectorString
   * @returns {HTMLElement | null}
   */
  const elementBySelector = selectorString => {
    const container = getContainer();
    return container ? container.querySelector(selectorString) : null;
  };

  /**
   * @param {string} className
   * @returns {HTMLElement | null}
   */
  const elementByClass = className => {
    return elementBySelector(".".concat(className));
  };

  /**
   * @returns {HTMLElement | null}
   */
  const getPopup = () => elementByClass(jscClasses.popup);

  /**
   * @returns {HTMLElement | null}
   */
  const getBody = () => elementByClass(jscClasses.body);

  /**
   * @returns {HTMLElement | null}
   */
  const getIcon = () => elementByClass(jscClasses.icon);

  /**
   * @returns {HTMLElement | null}
   */
  const getIconContent = () => elementByClass(jscClasses['icon-content']);

  /**
   * @returns {HTMLElement | null}
   */
  const getTitle = () => elementByClass(jscClasses.title);

  /**
   * @returns {HTMLElement | null}
   */
  const getHtmlContainer = () => elementByClass(jscClasses['html-container']);

  /**
   * @returns {HTMLElement | null}
   */
  const getImage = () => elementByClass(jscClasses.image);

  /**
   * @returns {HTMLElement | null}
   */
  const getProgressSteps = () => elementByClass(jscClasses['progress-steps']);

  /**
   * @returns {HTMLElement | null}
   */
  const getValidationMessage = () => elementByClass(jscClasses['validation-message']);

  /**
   * @returns {HTMLButtonElement | null}
   */
  const getConfirmButton = () => /** @type {HTMLButtonElement} */elementBySelector(".".concat(jscClasses.actions, " .").concat(jscClasses.confirm));

  /**
   * @returns {HTMLButtonElement | null}
   */
  const getCancelButton = () => /** @type {HTMLButtonElement} */elementBySelector(".".concat(jscClasses.actions, " .").concat(jscClasses.cancel));

  /**
   * @returns {HTMLButtonElement | null}
   */
  const getDenyButton = () => /** @type {HTMLButtonElement} */elementBySelector(".".concat(jscClasses.actions, " .").concat(jscClasses.deny));

  /**
   * @returns {HTMLElement | null}
   */
  const getInputLabel = () => elementByClass(jscClasses['input-label']);

  /**
   * @returns {HTMLElement | null}
   */
  const getLoader = () => elementBySelector(".".concat(jscClasses.loader));

  /**
   * @returns {HTMLElement | null}
   */
  const getActions = () => elementByClass(jscClasses.actions);

  /**
   * @returns {HTMLElement | null}
   */
  const getFooter = () => elementByClass(jscClasses.footer);

  /**
   * @returns {HTMLElement | null}
   */
  const getTimerProgressBar = () => elementByClass(jscClasses['timer-progress-bar']);

  /**
   * @returns {HTMLElement | null}
   */
  const getCloseButton = () => elementByClass(jscClasses.close);

  // https://github.com/jkup/focusable/blob/master/index.js
  const focusable = "\n\ta[href],\n\tarea[href],\n\tinput:not([disabled]),\n\tselect:not([disabled]),\n\ttextarea:not([disabled]),\n\tbutton:not([disabled]),\n\tiframe,\n\tobject,\n\tembed,\n\t[tabindex=\"0\"],\n\t[contenteditable],\n\taudio[controls],\n\tvideo[controls],\n\tsummary\n";
  /**
   * @returns {HTMLElement[]}
   */
  const getFocusableElements = () => {
    const popup = getPopup();
    if (!popup) {
      return [];
    }
    /** @type {NodeListOf<HTMLElement>} */
    const focusableElementsWithTabindex = popup.querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])');
    const focusableElementsWithTabindexSorted = Array.from(focusableElementsWithTabindex)
    // sort according to tabindex
    .sort((a, b) => {
      const tabindexA = parseInt(a.getAttribute('tabindex') || '0');
      const tabindexB = parseInt(b.getAttribute('tabindex') || '0');
      if (tabindexA > tabindexB) {
        return 1;
      } else if (tabindexA < tabindexB) {
        return -1;
      }
      return 0;
    });

    /** @type {NodeListOf<HTMLElement>} */
    const otherFocusableElements = popup.querySelectorAll(focusable);
    const otherFocusableElementsFiltered = Array.from(otherFocusableElements).filter(el => el.getAttribute('tabindex') !== '-1');
    return [...new Set(focusableElementsWithTabindexSorted.concat(otherFocusableElementsFiltered))].filter(el => isVisible$1(el));
  };

  /**
   * @returns {boolean}
   */
  const isModal = () => {
    return hasClass(document.body, jscClasses.shown) && !hasClass(document.body, jscClasses['toast-shown']) && !hasClass(document.body, jscClasses['no-backdrop']);
  };

  /**
   * @returns {boolean}
   */
  const isToast = () => {
    const popup = getPopup();
    if (!popup) {
      return false;
    }
    return hasClass(popup, jscClasses.toast);
  };

  /**
   * @returns {boolean}
   */
  const isLoading = () => {
    const popup = getPopup();
    if (!popup) {
      return false;
    }
    return popup.hasAttribute('data-loading');
  };

  /**
   * Securely set innerHTML of an element
   * https://github.com/sweetalert2/sweetalert2/issues/1926
   *
   * @param {HTMLElement} elem
   * @param {string} html
   */

  const setInnerHtml = (elem, html) => {
    elem.textContent = '';
    if (html) {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(html, "text/html");
      const head = parsed.querySelector('head');
      head && Array.from(head.childNodes).forEach(child => {
        elem.appendChild(child);
      });
      const body = parsed.querySelector('body');
      body && Array.from(body.childNodes).forEach(child => {
        if (child instanceof HTMLVideoElement || child instanceof HTMLAudioElement) {
          elem.appendChild(child.cloneNode(true)); // https://github.com/sweetalert2/sweetalert2/issues/2507
        } else {
          elem.appendChild(child);
        }
      });
    }
  };

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
  const hasClass = (elem, className) => {
    if (!className) {
      return false;
    }
    const classList = className.split(/\s+/);
    for (let i = 0; i < classList.length; i++) {
      if (!elem.classList.contains(classList[i])) {
        return false;
      }
    }
    return true;
  };

  /**
   * @param {HTMLElement} elem
   * @param {JsConfirmOptions} params
   */
  const removeCustomClasses = (elem, params) => {
    Array.from(elem.classList).forEach(className => {
      if (!Object.values(jscClasses).includes(className) && !Object.values(iconTypes).includes(className) && !Object.values(params.showClass || {}).includes(className)) {
        elem.classList.remove(className);
      }
    });
  };

  /**
   * @param {HTMLElement} elem
   * @param {JsConfirmOptions} params
   * @param {string} className
   */
  const applyCustomClass = (elem, params, className) => {
    removeCustomClasses(elem, params);
    if (params.customClass && params.customClass[className]) {
      if (typeof params.customClass[className] !== 'string' && !params.customClass[className].forEach) {
        warn("Invalid type of customClass.".concat(className, "! Expected string or iterable object, got \"").concat(typeof params.customClass[className], "\""));
        return;
      }
      addClass(elem, params.customClass[className]);
    }
  };

  /**
   * @param {HTMLElement} popup
   * @param {import('./renderers/renderInput').InputClass | JsConfirmInput} inputClass
   * @returns {HTMLInputElement | null}
   */
  const getInput$1 = (popup, inputClass) => {
    if (!inputClass) {
      return null;
    }
    switch (inputClass) {
      case 'select':
      case 'textarea':
      case 'file':
        return popup.querySelector(".".concat(jscClasses.popup, " > .").concat(jscClasses[inputClass]));
      case 'checkbox':
        return popup.querySelector(".".concat(jscClasses.popup, " > .").concat(jscClasses.checkbox, " input"));
      case 'radio':
        return popup.querySelector(".".concat(jscClasses.popup, " > .").concat(jscClasses.radio, " input:checked")) || popup.querySelector(".".concat(jscClasses.popup, " > .").concat(jscClasses.radio, " input:first-child"));
      case 'range':
        return popup.querySelector(".".concat(jscClasses.popup, " > .").concat(jscClasses.range, " input"));
      default:
        return popup.querySelector(".".concat(jscClasses.popup, " > .").concat(jscClasses.input));
    }
  };

  /**
   * @param {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} input
   */
  const focusInput = input => {
    input.focus();

    // place cursor at end of text in text input
    if (input.type !== 'file') {
      // http://stackoverflow.com/a/2345915
      const val = input.value;
      input.value = '';
      input.value = val;
    }
  };

  /**
   * @param {HTMLElement | HTMLElement[] | null} target
   * @param {string | string[] | readonly string[] | undefined} classList
   * @param {boolean} condition
   */
  const toggleClass = (target, classList, condition) => {
    if (!target || !classList) {
      return;
    }
    if (typeof classList === 'string') {
      classList = classList.split(/\s+/).filter(Boolean);
    }
    classList.forEach(className => {
      if (Array.isArray(target)) {
        target.forEach(elem => {
          condition ? elem.classList.add(className) : elem.classList.remove(className);
        });
      } else {
        condition ? target.classList.add(className) : target.classList.remove(className);
      }
    });
  };

  /**
   * @param {HTMLElement | HTMLElement[] | null} target
   * @param {string | string[] | readonly string[] | undefined} classList
   */
  const addClass = (target, classList) => {
    toggleClass(target, classList, true);
  };

  /**
   * @param {HTMLElement | HTMLElement[] | null} target
   * @param {string | string[] | readonly string[] | undefined} classList
   */
  const removeClass = (target, classList) => {
    toggleClass(target, classList, false);
  };

  /**
   * Get direct child of an element by class name
   *
   * @param {HTMLElement} elem
   * @param {string} className
   * @returns {HTMLElement | undefined}
   */
  const getDirectChildByClass = (elem, className) => {
    return elem.querySelector(".".concat(className));
  };
  // export const getDirectChildByClass = (elem, className) => {
  //   const children = Array.from(elem.children)
  //   for (let i = 0; i < children.length; i++) {
  //     const child = children[i]
  //     if (child instanceof HTMLElement && hasClass(child, className)) {
  //       return child
  //     }
  //   }
  // }

  /**
   * @param {HTMLElement} elem
   * @param {string} property
   * @param {*} value
   */
  const applyNumericalStyle = (elem, property, value) => {
    if (value === "".concat(parseInt(value))) {
      value = parseInt(value);
    }
    if (value || parseInt(value) === 0) {
      elem.style[property] = typeof value === 'number' ? "".concat(value, "px") : value;
    } else {
      elem.style.removeProperty(property);
    }
  };

  /**
   * @param {HTMLElement | null} elem
   * @param {string} display
   */
  const show = function (elem) {
    let display = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'flex';
    elem && (elem.style.display = display);
  };

  /**
   * @param {HTMLElement | null} elem
   */
  const hide = elem => {
    elem && (elem.style.display = 'none');
  };

  /**
   * @param {HTMLElement} parent
   * @param {string} selector
   * @param {string} property
   * @param {string} value
   */
  const setStyle = (parent, selector, property, value) => {
    /** @type {HTMLElement} */
    const el = parent.querySelector(selector);
    if (el) {
      el.style[property] = value;
    }
  };

  /**
   * @param {HTMLElement} elem
   * @param {any} condition
   * @param {string} display
   */
  const toggle = function (elem, condition) {
    let display = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'flex';
    condition ? show(elem, display) : hide(elem);
  };

  /**
   * borrowed from jquery $(elem).is(':visible') implementation
   *
   * @param {HTMLElement | null} elem
   * @returns {boolean}
   */
  const isVisible$1 = elem => !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));

  /**
   * @returns {boolean}
   */
  const allButtonsAreHidden = () => !isVisible$1(getConfirmButton()) && !isVisible$1(getDenyButton()) && !isVisible$1(getCancelButton());

  /**
   * @param {HTMLElement} elem
   * @returns {boolean}
   */
  const isScrollable = elem => !!(elem.scrollHeight > elem.clientHeight);

  /**
   * borrowed from https://stackoverflow.com/a/46352119
   *
   * @param {HTMLElement} elem
   * @returns {boolean}
   */
  const hasCssAnimation = elem => {
    const style = window.getComputedStyle(elem);
    const animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
    const transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
    return animDuration > 0 || transDuration > 0;
  };

  /**
   * @param {number} timer
   * @param {boolean} reset
   */
  const animateTimerProgressBar = function (timer) {
    let reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const timerProgressBar = getTimerProgressBar();
    if (!timerProgressBar) {
      return;
    }
    if (isVisible$1(timerProgressBar)) {
      if (reset) {
        timerProgressBar.style.transition = 'none';
        timerProgressBar.style.width = '100%';
      }
      setTimeout(() => {
        timerProgressBar.style.transition = "width ".concat(timer / 1000, "s linear");
        timerProgressBar.style.width = '0%';
      }, 10);
    }
  };
  const stopTimerProgressBar = () => {
    const timerProgressBar = getTimerProgressBar();
    if (!timerProgressBar) {
      return;
    }
    const timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    timerProgressBar.style.removeProperty('transition');
    timerProgressBar.style.width = '100%';
    const timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    const timerProgressBarPercent = timerProgressBarWidth / timerProgressBarFullWidth * 100;
    timerProgressBar.style.width = "".concat(timerProgressBarPercent, "%");
  };

  /**
   * Detect Node env
   *
   * @returns {boolean}
   */
  const isNodeEnv = () => typeof window === 'undefined' || typeof document === 'undefined';

  const jscTemplate = "\n<div aria-labelledby=\"".concat(jscClasses.title, "\" aria-describedby=\"").concat(jscClasses['html-container'], "\" class=\"").concat(jscClasses.popup, "\" tabindex=\"-1\">\n\t<div class=\"").concat(jscClasses.body, "\">\n\t\t<ul class=\"").concat(jscClasses['progress-steps'], "\"></ul>\n\t\t<div class=\"").concat(jscClasses['header-row'], "\">\n\t\t\t<div class=\"").concat(jscClasses.icon, "\"></div>\n\t\t\t<h2 class=\"").concat(jscClasses.title, "\" id=\"").concat(jscClasses.title, "\"></h2>\n\t\t</div>\n\t\t<img class=\"").concat(jscClasses.image, "\" />\n\t\t<div class=\"").concat(jscClasses['html-container'], "\" id=\"").concat(jscClasses['html-container'], "\"></div>\n\t\t<input class=\"").concat(jscClasses.input, "\" id=\"").concat(jscClasses.input, "\" />\n\t\t<input type=\"file\" class=\"").concat(jscClasses.file, "\" />\n\t\t<div class=\"").concat(jscClasses.range, "\">\n\t\t\t<input type=\"range\" />\n\t\t\t<output></output>\n\t\t</div>\n\t\t<select class=\"").concat(jscClasses.select, "\" id=\"").concat(jscClasses.select, "\"></select>\n\t\t<div class=\"").concat(jscClasses.radio, "\"></div>\n\t\t<label class=\"").concat(jscClasses.checkbox, "\">\n\t\t\t<input type=\"checkbox\" id=\"").concat(jscClasses.checkbox, "\" />\n\t\t\t<span class=\"").concat(jscClasses.label, "\"></span>\n\t\t</label>\n\t\t<textarea class=\"").concat(jscClasses.textarea, "\" id=\"").concat(jscClasses.textarea, "\"></textarea>\n\t\t<div class=\"").concat(jscClasses['validation-message'], "\" id=\"").concat(jscClasses['validation-message'], "\"></div>\n\t\t<div class=\"").concat(jscClasses.actions, "\">\n\t\t\t<div class=\"").concat(jscClasses.loader, "\"></div>\n\t\t\t<button type=\"button\" class=\"").concat(jscClasses.confirm, "\"></button>\n\t\t\t<button type=\"button\" class=\"").concat(jscClasses.deny, "\"></button>\n\t\t\t<button type=\"button\" class=\"").concat(jscClasses.cancel, "\"></button>\n\t\t</div>\n\t\t<div class=\"").concat(jscClasses.footer, "\"></div>\n\t\t<div class=\"").concat(jscClasses['timer-progress-bar-container'], "\">\n\t\t\t<div class=\"").concat(jscClasses['timer-progress-bar'], "\"></div>\n\t\t</div>\n\t</div>\n\t<button type=\"button\" class=\"").concat(jscClasses.close, "\"></button>\n </div>\n").replace(/(^|\n)\s*/g, '');

  /**
   * @returns {boolean}
   */
  const resetOldContainer = () => {
    const oldContainer = getContainer();
    if (!oldContainer) {
      return false;
    }
    oldContainer.remove();
    removeClass([document.documentElement, document.body], [jscClasses['no-backdrop'], jscClasses['toast-shown'], jscClasses['has-column']]);
    return true;
  };
  const resetValidationMessage$1 = () => {
    globalState.currentInstance.resetValidationMessage();
  };
  const addInputChangeListeners = () => {
    const popup = getPopup();

    /** @type {HTMLInputElement} */
    const input = popup.querySelector(".".concat(jscClasses.input));
    /** @type {HTMLInputElement} */
    const file = popup.querySelector(".".concat(jscClasses.file));
    /** @type {HTMLInputElement} */
    const range = popup.querySelector(".".concat(jscClasses.range, " input"));
    /** @type {HTMLOutputElement} */
    const rangeOutput = popup.querySelector(".".concat(jscClasses.range, " output"));
    /** @type {HTMLInputElement} */
    const select = popup.querySelector(".".concat(jscClasses.select));
    /** @type {HTMLInputElement} */
    const checkbox = popup.querySelector(".".concat(jscClasses.checkbox, " input"));
    /** @type {HTMLInputElement} */
    const textarea = popup.querySelector(".".concat(jscClasses.textarea));
    input.oninput = resetValidationMessage$1;
    file.onchange = resetValidationMessage$1;
    select.onchange = resetValidationMessage$1;
    checkbox.onchange = resetValidationMessage$1;
    textarea.oninput = resetValidationMessage$1;
    range.oninput = () => {
      resetValidationMessage$1();
      rangeOutput.value = range.value;
    };
    range.onchange = () => {
      resetValidationMessage$1();
      rangeOutput.value = range.value;
    };
  };

  /**
   * @param {string | HTMLElement} target
   * @returns {HTMLElement}
   */
  const getTarget = target => typeof target === 'string' ? document.querySelector(target) : target;

  /**
   * @param {JsConfirmOptions} params
   */
  const setupAccessibility = params => {
    const popup = getPopup();
    popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
    popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');
    if (!params.toast) {
      popup.setAttribute('aria-modal', 'true');
    }
  };

  /**
   * @param {HTMLElement} targetElement
   */
  const setupRTL = targetElement => {
    if (window.getComputedStyle(targetElement).direction === 'rtl') {
      addClass(getContainer(), jscClasses.rtl);
    }
  };

  /**
   * Add modal + backdrop + no-war message for Russians to DOM
   *
   * @param {JsConfirmOptions} params
   */
  const init = params => {
    // Clean up the old popup container if it exists
    const oldContainerExisted = resetOldContainer();
    if (isNodeEnv()) {
      error('JsConfirm requires document to initialize');
      return;
    }
    const container = document.createElement('div');
    container.classList.add(jscClasses.container);
    if (oldContainerExisted) {
      addClass(container, jscClasses['no-transition']);
    }
    setInnerHtml(container, jscTemplate);
    const targetElement = getTarget(params.target);
    targetElement.appendChild(container);
    setupAccessibility(params);
    setupRTL(targetElement);
    addInputChangeListeners();
  };

  /**
   * @param {HTMLElement | object | string} param
   * @param {HTMLElement} target
   */
  const parseHtmlToContainer = (param, target) => {
    // DOM element
    if (param instanceof HTMLElement) {
      target.appendChild(param);
    }

    // Object
    else if (typeof param === 'object') {
      handleObject(param, target);
    }

    // Plain string
    else if (param) {
      setInnerHtml(target, param);
    }
  };

  /**
   * @param {any} param
   * @param {HTMLElement} target
   */
  const handleObject = (param, target) => {
    // JQuery element(s)
    if (param.jquery) {
      handleJqueryElem(target, param);
    }

    // For other objects use their string representation
    else {
      setInnerHtml(target, param.toString());
    }
  };

  /**
   * @param {HTMLElement} target
   * @param {any} elem
   */
  const handleJqueryElem = (target, elem) => {
    target.textContent = '';
    if (0 in elem) {
      for (let i = 0; (i in elem); i++) {
        target.appendChild(elem[i].cloneNode(true));
      }
    } else {
      target.appendChild(elem.cloneNode(true));
    }
  };

  /**
   * @returns {'webkitAnimationEnd' | 'animationend' | false}
   */
  const animationEndEvent = (() => {
    // Prevent run in Node env
    if (isNodeEnv()) {
      return false;
    }
    const testEl = document.createElement('div');

    // Chrome, Safari and Opera
    if (typeof testEl.style.webkitAnimation !== 'undefined') {
      return 'webkitAnimationEnd';
    }

    // Standard syntax
    if (typeof testEl.style.animation !== 'undefined') {
      return 'animationend';
    }
    return false;
  })();

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const renderActions = (instance, params) => {
    const actions = getActions();
    const loader = getLoader();
    if (!actions || !loader) {
      return;
    }

    // Actions (buttons) wrapper
    if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) {
      hide(actions);
    } else {
      show(actions);
    }

    // Custom class
    applyCustomClass(actions, params, 'actions');

    // Render all the buttons
    renderButtons(actions, loader, params);

    // Loader
    setInnerHtml(loader, params.loaderHtml || '');
    applyCustomClass(loader, params, 'loader');
  };

  /**
   * @param {HTMLElement} actions
   * @param {HTMLElement} loader
   * @param {JsConfirmOptions} params
   */
  function renderButtons(actions, loader, params) {
    const confirmButton = getConfirmButton();
    const denyButton = getDenyButton();
    const cancelButton = getCancelButton();
    if (!confirmButton || !denyButton || !cancelButton) {
      return;
    }

    // Render buttons
    renderButton(confirmButton, 'confirm', params);
    renderButton(denyButton, 'deny', params);
    renderButton(cancelButton, 'cancel', params);
    handleButtonsStyling(confirmButton, denyButton, cancelButton, params);
    if (params.reverseButtons) {
      if (params.toast) {
        actions.insertBefore(cancelButton, confirmButton);
        actions.insertBefore(denyButton, confirmButton);
      } else {
        actions.insertBefore(cancelButton, loader);
        actions.insertBefore(denyButton, loader);
        actions.insertBefore(confirmButton, loader);
      }
    }
  }

  /**
   * @param {HTMLElement} confirmButton
   * @param {HTMLElement} denyButton
   * @param {HTMLElement} cancelButton
   * @param {JsConfirmOptions} params
   */
  function handleButtonsStyling(confirmButton, denyButton, cancelButton, params) {
    if (!params.buttonsStyling) {
      removeClass([confirmButton, denyButton, cancelButton], jscClasses.styled);
      return;
    }
    addClass([confirmButton, denyButton, cancelButton], jscClasses.styled);

    // Buttons background colors
    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
      addClass(confirmButton, jscClasses['default-outline']);
    }
    if (params.denyButtonColor) {
      denyButton.style.backgroundColor = params.denyButtonColor;
      addClass(denyButton, jscClasses['default-outline']);
    }
    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
      addClass(cancelButton, jscClasses['default-outline']);
    }
  }

  /**
   * @param {HTMLElement} button
   * @param {'confirm' | 'deny' | 'cancel'} buttonType
   * @param {JsConfirmOptions} params
   */
  function renderButton(button, buttonType, params) {
    const buttonName = /** @type {'Confirm' | 'Deny' | 'Cancel'} */capitalizeFirstLetter(buttonType);
    toggle(button, params["show".concat(buttonName, "Button")], '');
    setInnerHtml(button, params["".concat(buttonType, "ButtonText")] || ''); // Set caption text
    button.setAttribute('aria-label', params["".concat(buttonType, "ButtonAriaLabel")] || ''); // ARIA label

    // Add buttons custom classes
    button.classList.add(jscClasses[buttonType]);
    applyCustomClass(button, params, "".concat(buttonType, "Button"));
  }

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const renderCloseButton = (instance, params) => {
    const closeButton = getCloseButton();
    if (!closeButton) {
      return;
    }
    setInnerHtml(closeButton, params.closeButtonHtml || '<svg height="22px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>');

    // Custom class
    applyCustomClass(closeButton, params, 'closeButton');
    if (!params.closeButtonHtml) {
      document.querySelector('.jsconfirm-body').classList.add('jsconfirm-clip');
    } else {
      document.querySelector('.jsconfirm-body').classList.remove('jsconfirm-clip');
    }
    toggle(closeButton, params.showCloseButton);
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel || '');
  };

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const renderContainer = (instance, params) => {
    const container = getContainer();
    if (!container) {
      return;
    }
    handleBackdropParam(container, params.backdrop);
    handlePositionParam(container, params.position);
    handleGrowParam(container, params.grow);

    // Custom class
    applyCustomClass(container, params, 'container');
  };

  /**
   * @param {HTMLElement} container
   * @param {JsConfirmOptions['backdrop']} backdrop
   */
  function handleBackdropParam(container, backdrop) {
    if (typeof backdrop === 'string') {
      container.style.background = backdrop;
    } else if (!backdrop) {
      addClass([document.documentElement, document.body], jscClasses['no-backdrop']);
    }
  }

  /**
   * @param {HTMLElement} container
   * @param {JsConfirmOptions['position']} position
   */
  function handlePositionParam(container, position) {
    if (!position) {
      return;
    }
    if (position in jscClasses) {
      addClass(container, jscClasses[position]);
    } else {
      warn('The "position" parameter is not valid, defaulting to "center"');
      addClass(container, jscClasses.center);
    }
  }

  /**
   * @param {HTMLElement} container
   * @param {JsConfirmOptions['grow']} grow
   */
  function handleGrowParam(container, grow) {
    if (!grow) {
      return;
    }
    addClass(container, jscClasses["grow-".concat(grow)]);
  }

  /**
   * This module contains `WeakMap`s for each effectively-"private  property" that a `Jsc` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */

  var privateProps = {
    innerParams: new WeakMap(),
    domCache: new WeakMap()
  };

  /// <reference path="../../../../jsconfirm.d.ts"/>


  /** @type {InputClass[]} */
  const inputClasses = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const renderInput = (instance, params) => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    const innerParams = privateProps.innerParams.get(instance);
    const rerender = !innerParams || params.input !== innerParams.input;
    inputClasses.forEach(inputClass => {
      const inputContainer = getDirectChildByClass(popup, jscClasses[inputClass]);
      if (!inputContainer) {
        return;
      }

      // set attributes
      setAttributes(inputClass, params.inputAttributes);

      // set class
      inputContainer.classList.add(jscClasses[inputClass]);
      if (rerender) {
        hide(inputContainer);
      }
    });
    if (params.input) {
      if (rerender) {
        showInput(params);
      }
      // set custom class
      setCustomClass(params);
    }
  };

  /**
   * @param {JsConfirmOptions} params
   */
  const showInput = params => {
    if (!params.input) {
      return;
    }
    if (!renderInputType[params.input]) {
      error("Unexpected type of input! Expected \"text\", \"email\", \"password\", \"number\", \"tel\", \"select\", \"radio\", \"checkbox\", \"textarea\", \"file\" or \"url\", got \"".concat(params.input, "\""));
      return;
    }
    const inputContainer = getInputContainer(params.input);
    const input = renderInputType[params.input](inputContainer, params);
    show(inputContainer);

    // input autofocus
    if (params.inputAutoFocus) {
      setTimeout(() => {
        focusInput(input);
      });
    }
  };

  /**
   * @param {HTMLInputElement} input
   */
  const removeAttributes = input => {
    for (let i = 0; i < input.attributes.length; i++) {
      const attrName = input.attributes[i].name;
      if (!['id', 'type', 'value', 'style'].includes(attrName)) {
        input.removeAttribute(attrName);
      }
    }
  };

  /**
   * @param {InputClass} inputClass
   * @param {JsConfirmOptions['inputAttributes']} inputAttributes
   */
  const setAttributes = (inputClass, inputAttributes) => {
    const input = getInput$1(getPopup(), inputClass);
    if (!input) {
      return;
    }
    removeAttributes(input);
    for (const attr in inputAttributes) {
      input.setAttribute(attr, inputAttributes[attr]);
    }
  };

  /**
   * @param {JsConfirmOptions} params
   */
  const setCustomClass = params => {
    const inputContainer = getInputContainer(params.input);
    if (typeof params.customClass === 'object') {
      addClass(inputContainer, params.customClass.input);
    }
  };

  /**
   * @param {HTMLInputElement | HTMLTextAreaElement} input
   * @param {JsConfirmOptions} params
   */
  const setInputPlaceholder = (input, params) => {
    if (!input.placeholder || params.inputPlaceholder) {
      input.placeholder = params.inputPlaceholder;
    }
  };

  /**
   * @param {Input} input
   * @param {Input} prependTo
   * @param {JsConfirmOptions} params
   */
  const setInputLabel = (input, prependTo, params) => {
    if (params.inputLabel) {
      const label = document.createElement('label');
      const labelClass = jscClasses['input-label'];
      label.setAttribute('for', input.id);
      label.classList.add(labelClass);
      if (typeof params.customClass === 'object') {
        addClass(label, params.customClass.inputLabel);
      }
      label.innerText = params.inputLabel;
      prependTo.insertAdjacentElement('beforebegin', label);
    }
  };

  /**
   * @param {JsConfirmOptions['input']} inputType
   * @returns {HTMLElement}
   */
  const getInputContainer = inputType => {
    return getDirectChildByClass(getPopup(), jscClasses[inputType] || jscClasses.input);
  };

  /**
   * @param {HTMLInputElement | HTMLOutputElement | HTMLTextAreaElement} input
   * @param {JsConfirmOptions['inputValue']} inputValue
   */
  const checkAndSetInputValue = (input, inputValue) => {
    if (['string', 'number'].includes(typeof inputValue)) {
      input.value = "".concat(inputValue);
    } else if (!isPromise(inputValue)) {
      warn("Unexpected type of inputValue! Expected \"string\", \"number\" or \"Promise\", got \"".concat(typeof inputValue, "\""));
    }
  };

  /** @type {Record<JsConfirmInput, (input: Input | HTMLElement, params: JsConfirmOptions) => Input>} */
  const renderInputType = {};

  /**
   * @param {HTMLInputElement} input
   * @param {JsConfirmOptions} params
   * @returns {HTMLInputElement}
   */
  renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = (input, params) => {
    checkAndSetInputValue(input, params.inputValue);
    setInputLabel(input, input, params);
    setInputPlaceholder(input, params);
    input.type = params.input;
    return input;
  };

  /**
   * @param {HTMLInputElement} input
   * @param {JsConfirmOptions} params
   * @returns {HTMLInputElement}
   */
  renderInputType.file = (input, params) => {
    setInputLabel(input, input, params);
    setInputPlaceholder(input, params);
    return input;
  };

  /**
   * @param {HTMLInputElement} range
   * @param {JsConfirmOptions} params
   * @returns {HTMLInputElement}
   */
  renderInputType.range = (range, params) => {
    const rangeInput = range.querySelector('input');
    const rangeOutput = range.querySelector('output');
    checkAndSetInputValue(rangeInput, params.inputValue);
    rangeInput.type = params.input;
    checkAndSetInputValue(rangeOutput, params.inputValue);
    setInputLabel(rangeInput, range, params);
    return range;
  };

  /**
   * @param {HTMLSelectElement} select
   * @param {JsConfirmOptions} params
   * @returns {HTMLSelectElement}
   */
  renderInputType.select = (select, params) => {
    select.textContent = '';
    if (params.inputPlaceholder) {
      const placeholder = document.createElement('option');
      setInnerHtml(placeholder, params.inputPlaceholder);
      placeholder.value = '';
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);
    }
    setInputLabel(select, select, params);
    return select;
  };

  /**
   * @param {HTMLInputElement} radio
   * @returns {HTMLInputElement}
   */
  renderInputType.radio = radio => {
    radio.textContent = '';
    return radio;
  };

  /**
   * @param {HTMLLabelElement} checkboxContainer
   * @param {JsConfirmOptions} params
   * @returns {HTMLInputElement}
   */
  renderInputType.checkbox = (checkboxContainer, params) => {
    const checkbox = getInput$1(getPopup(), 'checkbox');
    checkbox.value = '1';
    checkbox.checked = Boolean(params.inputValue);
    const label = checkboxContainer.querySelector('span');
    setInnerHtml(label, params.inputPlaceholder);
    return checkbox;
  };

  /**
   * @param {HTMLTextAreaElement} textarea
   * @param {JsConfirmOptions} params
   * @returns {HTMLTextAreaElement}
   */
  renderInputType.textarea = (textarea, params) => {
    checkAndSetInputValue(textarea, params.inputValue);
    setInputPlaceholder(textarea, params);
    setInputLabel(textarea, textarea, params);

    /**
     * @param {HTMLElement} el
     * @returns {number}
     */
    const getMargin = el => parseInt(window.getComputedStyle(el).marginLeft) + parseInt(window.getComputedStyle(el).marginRight);

    // https://github.com/sweetalert2/sweetalert2/issues/2291
    setTimeout(() => {
      // https://github.com/sweetalert2/sweetalert2/issues/1699
      if ('MutationObserver' in window) {
        const initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);
        const textareaResizeHandler = () => {
          // check if texarea is still in document (i.e. popup wasn't closed in the meantime)
          if (!document.body.contains(textarea)) {
            return;
          }
          const textareaWidth = textarea.offsetWidth + getMargin(textarea);
          if (textareaWidth > initialPopupWidth) {
            getPopup().style.width = "".concat(textareaWidth, "px");
          } else {
            applyNumericalStyle(getPopup(), 'width', params.width);
          }
        };
        new MutationObserver(textareaResizeHandler).observe(textarea, {
          attributes: true,
          attributeFilter: ['style']
        });
      }
    });
    return textarea;
  };

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const renderContent = (instance, params) => {
    const htmlContainer = getHtmlContainer();
    if (!htmlContainer) {
      return;
    }
    applyCustomClass(htmlContainer, params, 'htmlContainer');

    // Content as HTML
    if (params.html) {
      parseHtmlToContainer(params.html, htmlContainer);
      show(htmlContainer, 'block');
    }

    // Content as plain text
    else if (params.text) {
      htmlContainer.textContent = params.text;
      show(htmlContainer, 'block');
    }

    // No content
    else {
      hide(htmlContainer);
    }
    renderInput(instance, params);
  };

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const renderFooter = (instance, params) => {
    const footer = getFooter();
    if (!footer) {
      return;
    }
    toggle(footer, params.footer, 'block');
    if (params.footer) {
      parseHtmlToContainer(params.footer, footer);
    }

    // Custom class
    applyCustomClass(footer, params, 'footer');
  };

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const renderIcon = (instance, params) => {
    const innerParams = privateProps.innerParams.get(instance);
    const icon = getIcon();
    if (!icon) {
      return;
    }

    // if the given icon already rendered, apply the styling without re-rendering the icon
    if (innerParams && params.icon === innerParams.icon) {
      // Custom or default content
      setContent(icon, params);
      applyStyles(icon, params);
      return;
    }
    if (!params.icon && !params.iconHtml) {
      hide(icon);
      return;
    }
    if (params.icon && Object.keys(iconTypes).indexOf(params.icon) === -1) {
      error("Unknown icon! Expected \"success\", \"error\", \"warning\", \"info\" or \"question\", got \"".concat(params.icon, "\""));
      hide(icon);
      return;
    }
    show(icon);

    // Custom or default content
    setContent(icon, params);
    applyStyles(icon, params);

    // Animate icon
    addClass(icon, params.showClass && params.showClass.icon);
  };

  /**
   * @param {HTMLElement} icon
   * @param {JsConfirmOptions} params
   */
  const applyStyles = (icon, params) => {
    for (const [iconType, iconClassName] of Object.entries(iconTypes)) {
      if (params.icon !== iconType) {
        removeClass(icon, iconClassName);
      }
    }
    addClass(icon, params.icon && iconTypes[params.icon]);

    // Icon color
    setColor(icon, params);

    // Success icon background color
    // adjustSuccessIconBackgroundColor()

    // Custom class
    applyCustomClass(icon, params, 'icon');
  };

  // Adjust success icon background color to match the popup background color
  // const adjustSuccessIconBackgroundColor = () => {
  //   const popup = dom.getPopup()
  //   let modalBody = popup.querySelector('.modalBody')
  //   if (!popup) {
  //     return
  //   }
  //   const popupBackgroundColor = window.getComputedStyle(modalBody).getPropertyValue('background-color')
  //   /** @type {NodeListOf<HTMLElement>} */
  //   const successIconParts = popup.querySelectorAll('[class^=jsc2-success-circular-line], .jsc2-success-fix')
  //   for (let i = 0; i < successIconParts.length; i++) {
  //     successIconParts[i].style.backgroundColor = popupBackgroundColor
  //   }
  // }

  const infoIconHtml = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" fill=\"currentColor\" height=\"100%\"><g class=\"info-circle\"><path d=\"m256 512c-68.4 0-132.7-26.6-181-75-48.4-48.3-75-112.6-75-181s26.6-132.7 75-181c48.3-48.4 112.6-75 181-75s132.7 26.6 181 75c48.4 48.4 75 112.6 75 181s-26.6 132.7-75 181c-48.3 48.4-112.6 75-181 75zm0-458.5c-111.7 0-202.5 90.8-202.5 202.5s90.8 202.5 202.5 202.5 202.5-90.8 202.5-202.5-90.8-202.5-202.5-202.5z\" /></g><g class=\"i-mark\"><path d=\"m214.1 405.3c-6.8 0-13-2.5-17.7-7.3s-7.3-10.9-7.3-17.8c0-6.8 2.5-13 7.3-17.8s10.9-7.4 17.7-7.4h26.4v-110.2h-26.3c-6.8 0-13-2.5-17.8-7.3s-7.4-11-7.4-17.7 2.5-12.9 7.2-17.8c4.9-5 11-7.6 17.9-7.6h51.6c6.9 0 13.1 2.7 17.9 7.7 4.7 4.9 7.2 11 7.2 17.7v135.2h13c6.7 0 12.8 2.5 17.8 7.2 5 4.8 7.7 11 7.7 17.9 0 6.8-2.5 13-7.3 17.8s-10.9 7.4-17.7 7.4z\" /><path d=\"m258.3 171.7h-3.2c-17.9 0-32.5-14.6-32.5-32.5s14.6-32.5 32.5-32.5h3.2c17.9 0 32.5 14.6 32.5 32.5 0 17.8-14.6 32.5-32.5 32.5z\" /></g></svg>\n";

  // const successIconHtml = `
  // <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" version="1.1" viewBox="0 0 568 512" xmlns="http://www.w3.org/2000/svg"><path d="m487 247.2v8.8c0 127.6-104.2 230.9-231.5 231-127.2 0-230.43-103.4-230.5-231 0.07-127.6 103.3-231 230.5-231 45.2-0.01 89.5 13.31 127.2 38.29" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="-1" stroke-width="50"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.3s" keyTimes="0; 1" repeatCount="0" values="-1; 0"/></path><path d="M 107,189.5 254.2,337 543,47" pathLength="12" stroke-dasharray="10 12" stroke-dashoffset="-12" stroke-width="50"><animate attributeName="stroke-dashoffset" dur="1s" begin="0.8s" repeatCount="0" values="-12; 0; -1.8; -0.6; -1; -0.8" keyTimes="0; 0.2; 0.4; 0.6; 0.8; 1" fill="freeze" /></path></svg>
  // `
  const successIconHtml = "\n<svg fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" version=\"1.1\" viewBox=\"0 0 568 512\" xmlns=\"http://www.w3.org/2000/svg\"><path class=\"success-circle\" d=\"m487 247.2v8.8c0 127.6-104.2 230.9-231.5 231-127.2 0-230.43-103.4-230.5-231 0.07-127.6 103.3-231 230.5-231 45.2-0.01 89.5 13.31 127.2 38.29\" pathLength=\"1\" /><path class=\"check-mark\" d=\"M 107,189.5 254.2,337 543,47\" pathLength=\"12\" /></svg>\n";
  const questionIconHtml = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" fill=\"currentColor\" height=\"100%\"><path class=\"question-circle\" d=\"m256 512c-68.4 0-132.7-26.6-181-75-48.4-48.3-75-112.6-75-181s26.6-132.7 75-181c48.3-48.4 112.6-75 181-75s132.7 26.6 181 75c48.4 48.4 75 112.6 75 181s-26.6 132.7-75 181c-48.3 48.4-112.6 75-181 75zm0-458.5c-111.7 0-202.5 90.8-202.5 202.5s90.8 202.5 202.5 202.5 202.5-90.8 202.5-202.5-90.8-202.5-202.5-202.5z\" /><g class=\"question-mark\"><path d=\"m279.1 315.3c0.3 6.8-1.9 12.6-6.6 17.6-4.8 5-10.9 7.6-18.2 7.8-7.3 0.4-13.5-1.7-18.7-6.2s-8-10.1-8.2-16.9l-0.8-18.9c-0.7-15.1 3.3-27.6 12-37.4 8.8-9.8 17.7-18.5 26.7-26.3 8.6-7.2 16.5-15.2 23.6-24.2 7.3-8.9 10.6-19.3 10.1-31.4-0.6-11.5-5-20.6-13.4-27.3s-19.4-9.8-33-9.1c-11.4 0.5-20.4 3.7-27 9.8-6.6 6-10.1 14.3-10.7 24.8-0.2 5.7-2.8 11-7.5 15.6-4.8 4.7-10.6 7.1-17.3 7.4-6.8 0.2-13.1-2.1-18.8-7.1-5.7-4.9-8.7-10.8-9-17.6-0.6-13.7 3.1-26.2 10.9-37.8s18.6-21.1 32.1-28.5 28.7-11.45 45.3-12.17c27.7-1.26 51 5.27 70 19.27 18.9 14.1 28.9 32.9 29.9 56.4 1 21.9-3.1 39.1-12.2 51.5-9.1 12.5-19.5 23.4-31.1 32.8-8.2 6.6-15 13-20.8 19.3-5.7 6.3-8.4 12.8-8.2 19.6z\" /><path d=\"m258.2 414.9c-7.3 0.4-13.6-1.9-19-6.7-5.4-4.9-8.2-10.8-8.6-17.6-0.3-7.3 2-13.6 7-18.9 4.9-5.4 11.1-8.1 18.3-8.4 6.8-0.3 12.9 2 18.1 6.8 5.2 4.9 7.9 10.9 8.3 18.2 0.2 7-1.9 13-6.7 18.3-4.7 5.2-10.5 8-17.4 8.3z\" /></g></svg>\n";
  const errorIconHtml = "\n<svg fill=\"currentColor\" version=\"1.1\" viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path class=\"error-circle\" d=\"m256 512c-68.4 0-132.7-26.6-181-75-48.4-48.3-75-112.6-75-181s26.6-132.7 75-181c48.3-48.4 112.6-75 181-75s132.7 26.6 181 75c48.4 48.4 75 112.6 75 181s-26.6 132.7-75 181c-48.3 48.4-112.6 75-181 75zm0-458.5c-111.7 0-202.5 90.8-202.5 202.5s90.8 202.5 202.5 202.5 202.5-90.8 202.5-202.5-90.8-202.5-202.5-202.5z\" /><path class=\"x-mark\" d=\"m347.8 374.6c-7.1 0-13.9-2.8-18.9-7.8l-72.8-72.9-72.8 72.8c-5.1 5.1-11.8 7.8-18.9 7.8s-14-2.8-19-7.8c-10.4-10.4-10.4-27.4 0-37.9l72.9-72.8-72.9-72.8c-10.4-10.4-10.5-27.4-0.1-37.9h0.1c5-5 11.9-7.9 19-7.9s13.8 2.9 18.9 7.9l72.8 72.8 72.8-72.9c5.1-5.1 11.8-7.8 18.9-7.8s13.8 2.8 18.8 7.8c10.4 10.4 10.4 27.5 0 38l-72.7 72.9 72.7 72.8c10.4 10.4 10.4 27.3 0 37.8-5 5-11.6 7.8-18.8 7.9z\" /></svg>\n";
  const warningIconHtml = "\n<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"50\"><path class=\"warning-triangle\" d=\"m256 460.8-177.46-0.1c-41.36 0-67.2-44.3-46.49-79.7l177.45-303.95c20.7-35.39 72.3-35.39 93 0.01l177.5 304.04c20.7 35.5-5.2 79.8-46.6 79.7h-177.4\" pathLength=\"1\"/><g class=\"warning-exclamation-point\"><path class=\"warning-exclamation-point-stroke\" d=\"m256 290v-110\" pathLength=\"1\"/><path class=\"warning-exclamation-point-dot\" d=\"m256 380v-1\" pathLength=\"1\"/></g></svg>\n";

  // const warningIconHtml = `
  // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" height="100%"><style type="text/css"></style><path class="warning-icon" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z" /></svg>
  // `

  /**
   * @param {HTMLElement} icon
   * @param {JsConfirmOptions} params
   * @var {DOMParserSupportedType} mime
   */
  const setContent = (icon, params) => {
    if (!params.icon && !params.iconHtml) {
      return;
    }
    let oldContent = icon.innerHTML;
    let newContent = '';
    // let mime = 'text/html'
    if (params.iconHtml) {
      newContent = iconContent(params.iconHtml);
    } else if (params.icon === 'success') {
      newContent = successIconHtml;
    } else if (params.icon === 'error') {
      newContent = errorIconHtml;
    } else if (params.icon === 'question') {
      newContent = questionIconHtml;
    } else if (params.icon === 'info') {
      newContent = infoIconHtml;
    } else if (params.icon === 'warning') {
      newContent = warningIconHtml;
    }
    if (oldContent.trim() !== newContent.trim()) {
      setInnerHtml(icon, newContent);
    }
  };

  /**
   * @param {HTMLElement} icon
   * @param {JsConfirmOptions} params
   */
  const setColor = (icon, params) => {
    if (!params.iconColor) {
      return;
    }
    icon.style.color = params.iconColor;
    icon.style.borderColor = params.iconColor;
    for (const sel of ['.jsc2-success-line-tip', '.jsc2-success-line-long', '.jsc2-x-mark-line-left', '.jsc2-x-mark-line-right']) {
      setStyle(icon, sel, 'backgroundColor', params.iconColor);
    }
    setStyle(icon, '.jsc2-success-ring', 'borderColor', params.iconColor);
  };

  /**
   * @param {string} content
   * @returns {string}
   */
  const iconContent = content => "<div class=\"".concat(jscClasses['icon-content'], "\">").concat(content, "</div>");

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const renderImage = (instance, params) => {
    const image = getImage();
    if (!image) {
      return;
    }
    if (!params.imageUrl) {
      hide(image);
      return;
    }
    show(image, '');

    // Src, alt
    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt || '');

    // Width, height
    applyNumericalStyle(image, 'width', params.imageWidth);
    applyNumericalStyle(image, 'height', params.imageHeight);

    // Class
    image.classList.add(jscClasses.image);
    applyCustomClass(image, params, 'image');
  };

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const renderPopup = (instance, params) => {
    const container = getContainer();
    const popup = getPopup();
    const body = getBody();
    if (!container || !popup) {
      return;
    }

    // Width
    // https://github.com/sweetalert2/sweetalert2/issues/2170
    if (params.toast) {
      applyNumericalStyle(container, 'width', params.width);
      popup.style.width = '100%';
      const loader = getLoader();
      loader && popup.insertBefore(loader, getIcon());
    } else {
      applyNumericalStyle(popup, 'width', params.width);
    }

    // Padding
    applyNumericalStyle(body, 'padding', params.padding);

    // Color
    if (params.color) {
      popup.style.color = params.color;
    }

    // Background
    if (params.background) {
      body.style.background = params.background;
    }
    hide(getValidationMessage());

    // Classes
    addClasses$1(popup, params);
  };

  /**
   * @param {HTMLElement} popup
   * @param {JsConfirmOptions} params
   */
  const addClasses$1 = (popup, params) => {
    params.showClass || {};
    // Default Class + showClass when updating Jsc.update({})
    // popup.className = `${jscClasses.popup} ${dom.isVisible(popup) ? showClass.popup : ''}`
    popup.classList.add(jscClasses.popup);
    // popup.classList.add(`${dom.isVisible(popup) ? showClass.popup : ''}`)

    console.log(jscClasses.popup);
    if (params.toast) {
      addClass([document.documentElement, document.body], jscClasses['toast-shown']);
      addClass(popup, jscClasses.toast);
    } else {
      addClass(popup, jscClasses.modal);
    }

    // Custom class
    applyCustomClass(popup, params, 'popup');
    if (typeof params.customClass === 'string') {
      addClass(popup, params.customClass);
    }

    // Icon class (#1842)
    if (params.icon) {
      addClass(popup, jscClasses["icon-".concat(params.icon)]);
    }
  };

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const renderProgressSteps = (instance, params) => {
    const progressStepsContainer = getProgressSteps();
    if (!progressStepsContainer) {
      return;
    }
    const {
      progressSteps,
      currentProgressStep
    } = params;
    if (!progressSteps || progressSteps.length === 0 || currentProgressStep === undefined) {
      hide(progressStepsContainer);
      return;
    }
    show(progressStepsContainer);
    progressStepsContainer.textContent = '';
    if (currentProgressStep >= progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }
    progressSteps.forEach((step, index) => {
      const stepEl = createStepElement(step);
      progressStepsContainer.appendChild(stepEl);
      if (index === currentProgressStep) {
        addClass(stepEl, jscClasses['active-progress-step']);
      }
      if (index !== progressSteps.length - 1) {
        const lineEl = createLineElement(params);
        progressStepsContainer.appendChild(lineEl);
      }
    });
  };

  /**
   * @param {string} step
   * @returns {HTMLLIElement}
   */
  const createStepElement = step => {
    const stepEl = document.createElement('li');
    addClass(stepEl, jscClasses['progress-step']);
    setInnerHtml(stepEl, step);
    return stepEl;
  };

  /**
   * @param {JsConfirmOptions} params
   * @returns {HTMLLIElement}
   */
  const createLineElement = params => {
    const lineEl = document.createElement('li');
    addClass(lineEl, jscClasses['progress-step-line']);
    if (params.progressStepsDistance) {
      applyNumericalStyle(lineEl, 'width', params.progressStepsDistance);
    }
    return lineEl;
  };

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const renderTitle = (instance, params) => {
    const title = getTitle();
    if (!title) {
      return;
    }
    toggle(title, params.title || params.titleText, 'block');
    if (params.title) {
      parseHtmlToContainer(params.title, title);
    }
    if (params.titleText) {
      title.innerText = params.titleText;
    }

    // Custom class
    applyCustomClass(title, params, 'title');
  };

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const render = (instance, params) => {
    renderPopup(instance, params);
    renderContainer(instance, params);
    renderProgressSteps(instance, params);
    renderIcon(instance, params);
    renderImage(instance, params);
    renderTitle(instance, params);
    renderCloseButton(instance, params);
    renderContent(instance, params);
    renderActions(instance, params);
    renderFooter(instance, params);
    const popup = getPopup();
    if (typeof params.didRender === 'function' && popup) {
      params.didRender(popup);
    }
  };

  /*
   * Global function to determine if JsConfirm popup is shown
   */
  const isVisible = () => {
    return isVisible$1(getPopup());
  };

  /*
   * Global function to click 'Confirm' button
   */
  const clickConfirm = () => {
    var _dom$getConfirmButton;
    return (_dom$getConfirmButton = getConfirmButton()) === null || _dom$getConfirmButton === void 0 ? void 0 : _dom$getConfirmButton.click();
  };

  /*
   * Global function to click 'Deny' button
   */
  const clickDeny = () => {
    var _dom$getDenyButton;
    return (_dom$getDenyButton = getDenyButton()) === null || _dom$getDenyButton === void 0 ? void 0 : _dom$getDenyButton.click();
  };

  /*
   * Global function to click 'Cancel' button
   */
  const clickCancel = () => {
    var _dom$getCancelButton;
    return (_dom$getCancelButton = getCancelButton()) === null || _dom$getCancelButton === void 0 ? void 0 : _dom$getCancelButton.click();
  };

  /** @typedef {'cancel' | 'backdrop' | 'close' | 'esc' | 'timer'} DismissReason */

  /** @type {Record<DismissReason, DismissReason>} */
  const DismissReason = Object.freeze({
    cancel: 'cancel',
    backdrop: 'backdrop',
    close: 'close',
    esc: 'esc',
    timer: 'timer'
  });

  /**
   * @param {GlobalState} globalState
   */
  const removeKeydownHandler = globalState => {
    if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = false;
    }
  };

  /**
   * @param {GlobalState} globalState
   * @param {JsConfirmOptions} innerParams
   * @param {*} dismissWith
   */
  const addKeydownHandler = (globalState, innerParams, dismissWith) => {
    removeKeydownHandler(globalState);
    if (!innerParams.toast) {
      globalState.keydownHandler = e => keydownHandler(innerParams, e, dismissWith);
      globalState.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
      globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
      globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = true;
    }
  };

  /**
   * @param {number} index
   * @param {number} increment
   */
  const setFocus = (index, increment) => {
    var _dom$getPopup;
    const focusableElements = getFocusableElements();
    // search for visible elements and select the next possible match
    if (focusableElements.length) {
      index = index + increment;

      // rollover to first item
      if (index === focusableElements.length) {
        index = 0;

        // go to last item
      } else if (index === -1) {
        index = focusableElements.length - 1;
      }
      focusableElements[index].focus();
      return;
    }
    // no visible focusable elements, focus the popup
    (_dom$getPopup = getPopup()) === null || _dom$getPopup === void 0 || _dom$getPopup.focus();
  };
  const arrowKeysNextButton = ['ArrowRight', 'ArrowDown'];
  const arrowKeysPreviousButton = ['ArrowLeft', 'ArrowUp'];

  /**
   * @param {JsConfirmOptions} innerParams
   * @param {KeyboardEvent} event
   * @param {Function} dismissWith
   */
  const keydownHandler = (innerParams, event, dismissWith) => {
    if (!innerParams) {
      return; // This instance has already been destroyed
    }

    // Ignore keydown during IME composition
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event#ignoring_keydown_during_ime_composition
    // https://github.com/sweetalert2/sweetalert2/issues/720
    // https://github.com/sweetalert2/sweetalert2/issues/2406
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (innerParams.stopKeydownPropagation) {
      event.stopPropagation();
    }

    // ENTER
    if (event.key === 'Enter') {
      handleEnter(event, innerParams);
    }

    // TAB
    else if (event.key === 'Tab') {
      handleTab(event);
    }

    // ARROWS - switch focus between buttons
    else if ([...arrowKeysNextButton, ...arrowKeysPreviousButton].includes(event.key)) {
      handleArrows(event.key);
    }

    // ESC
    else if (event.key === 'Escape') {
      handleEsc(event, innerParams, dismissWith);
    }
  };

  /**
   * @param {KeyboardEvent} event
   * @param {JsConfirmOptions} innerParams
   */
  const handleEnter = (event, innerParams) => {
    // https://github.com/sweetalert2/sweetalert2/issues/2386
    if (!callIfFunction(innerParams.allowEnterKey)) {
      return;
    }
    const input = getInput$1(getPopup(), innerParams.input);
    if (event.target && input && event.target instanceof HTMLElement && event.target.outerHTML === input.outerHTML) {
      if (['textarea', 'file'].includes(innerParams.input)) {
        return; // do not submit
      }

      clickConfirm();
      event.preventDefault();
    }
  };

  /**
   * @param {KeyboardEvent} event
   */
  const handleTab = event => {
    const targetElement = event.target;
    const focusableElements = getFocusableElements();
    let btnIndex = -1;
    for (let i = 0; i < focusableElements.length; i++) {
      if (targetElement === focusableElements[i]) {
        btnIndex = i;
        break;
      }
    }

    // Cycle to the next button
    if (!event.shiftKey) {
      setFocus(btnIndex, 1);
    }

    // Cycle to the prev button
    else {
      setFocus(btnIndex, -1);
    }
    event.stopPropagation();
    event.preventDefault();
  };

  /**
   * @param {string} key
   */
  const handleArrows = key => {
    const actions = getActions();
    const confirmButton = getConfirmButton();
    const denyButton = getDenyButton();
    const cancelButton = getCancelButton();
    if (!actions || !confirmButton || !denyButton || !cancelButton) {
      return;
    }
    /** @type HTMLElement[] */
    const buttons = [confirmButton, denyButton, cancelButton];
    if (document.activeElement instanceof HTMLElement && !buttons.includes(document.activeElement)) {
      return;
    }
    const sibling = arrowKeysNextButton.includes(key) ? 'nextElementSibling' : 'previousElementSibling';
    let buttonToFocus = document.activeElement;
    if (!buttonToFocus) {
      return;
    }
    for (let i = 0; i < actions.children.length; i++) {
      buttonToFocus = buttonToFocus[sibling];
      if (!buttonToFocus) {
        return;
      }
      if (buttonToFocus instanceof HTMLButtonElement && isVisible$1(buttonToFocus)) {
        break;
      }
    }
    if (buttonToFocus instanceof HTMLButtonElement) {
      buttonToFocus.focus();
    }
  };

  /**
   * @param {KeyboardEvent} event
   * @param {JsConfirmOptions} innerParams
   * @param {Function} dismissWith
   */
  const handleEsc = (event, innerParams, dismissWith) => {
    if (callIfFunction(innerParams.allowEscapeKey)) {
      event.preventDefault();
      dismissWith(DismissReason.esc);
    }
  };

  /**
   * This module contains `WeakMap`s for each effectively-"private  property" that a `Jsc` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */

  var privateMethods = {
    jscPromiseResolve: new WeakMap(),
    jscPromiseReject: new WeakMap()
  };

  // From https://developer.paciellogroup.com/blog/2018/06/the-current-state-of-modal-dialog-accessibility/
  // Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
  // elements not within the active modal dialog will not be surfaced if a user opens a screen
  // reader’s list of elements (headings, form controls, landmarks, etc.) in the document.

  const setAriaHidden = () => {
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(el => {
      if (el === getContainer() || el.contains(getContainer())) {
        return;
      }
      if (el.hasAttribute('aria-hidden')) {
        el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden') || '');
      }
      el.setAttribute('aria-hidden', 'true');
    });
  };
  const unsetAriaHidden = () => {
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(el => {
      if (el.hasAttribute('data-previous-aria-hidden')) {
        el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden') || '');
        el.removeAttribute('data-previous-aria-hidden');
      } else {
        el.removeAttribute('aria-hidden');
      }
    });
  };

  // @ts-ignore
  const isSafariOrIOS = typeof window !== 'undefined' && !!window.GestureEvent; // true for Safari desktop + all iOS browsers https://stackoverflow.com/a/70585394

  /**
   * Fix iOS scrolling
   * http://stackoverflow.com/q/39626302
   */
  const iOSfix = () => {
    if (isSafariOrIOS && !hasClass(document.body, jscClasses.iosfix)) {
      const offset = document.body.scrollTop;
      document.body.style.top = "".concat(offset * -1, "px");
      addClass(document.body, jscClasses.iosfix);
      lockBodyScroll();
    }
  };

  /**
   * https://github.com/sweetalert2/sweetalert2/issues/1246
   */
  const lockBodyScroll = () => {
    const container = getContainer();
    if (!container) {
      return;
    }
    /** @type {boolean} */
    let preventTouchMove;
    /**
     * @param {TouchEvent} event
     */
    container.ontouchstart = event => {
      preventTouchMove = shouldPreventTouchMove(event);
    };
    /**
     * @param {TouchEvent} event
     */
    container.ontouchmove = event => {
      if (preventTouchMove) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
  };

  /**
   * @param {TouchEvent} event
   * @returns {boolean}
   */
  const shouldPreventTouchMove = event => {
    const target = event.target;
    const container = getContainer();
    const htmlContainer = getHtmlContainer();
    if (!container || !htmlContainer) {
      return false;
    }
    if (isStylus(event) || isZoom(event)) {
      return false;
    }
    if (target === container) {
      return true;
    }
    if (!isScrollable(container) && target instanceof HTMLElement && target.tagName !== 'INPUT' &&
    // #1603
    target.tagName !== 'TEXTAREA' &&
    // #2266
    !(isScrollable(htmlContainer) &&
    // #1944
    htmlContainer.contains(target))) {
      return true;
    }
    return false;
  };

  /**
   * https://github.com/sweetalert2/sweetalert2/issues/1786
   *
   * @param {*} event
   * @returns {boolean}
   */
  const isStylus = event => {
    return event.touches && event.touches.length && event.touches[0].touchType === 'stylus';
  };

  /**
   * https://github.com/sweetalert2/sweetalert2/issues/1891
   *
   * @param {TouchEvent} event
   * @returns {boolean}
   */
  const isZoom = event => {
    return event.touches && event.touches.length > 1;
  };
  const undoIOSfix = () => {
    if (hasClass(document.body, jscClasses.iosfix)) {
      const offset = parseInt(document.body.style.top, 10);
      removeClass(document.body, jscClasses.iosfix);
      document.body.style.top = '';
      document.body.scrollTop = offset * -1;
    }
  };

  /**
   * Measure scrollbar width for padding body during modal show/hide
   * https://github.com/twbs/bootstrap/blob/master/js/src/modal.js
   *
   * @returns {number}
   */
  const measureScrollbar = () => {
    const scrollDiv = document.createElement('div');
    scrollDiv.classList.add(jscClasses['scrollbar-measure']);
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  /**
   * Remember state in cases where opening and handling a modal will fiddle with it.
   * @type {number | null}
   */
  let previousBodyPadding = null;

  /**
   * @param {string} initialBodyOverflow
   */
  const replaceScrollbarWithPadding = initialBodyOverflow => {
    // for queues, do not do this more than once
    if (previousBodyPadding !== null) {
      return;
    }
    // if the body has overflow
    if (document.body.scrollHeight > window.innerHeight || initialBodyOverflow === 'scroll' // https://github.com/sweetalert2/sweetalert2/issues/2663
    ) {
      // add padding so the content doesn't shift after removal of scrollbar
      previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
      document.body.style.paddingRight = "".concat(previousBodyPadding + measureScrollbar(), "px");
    }
  };
  const undoReplaceScrollbarWithPadding = () => {
    if (previousBodyPadding !== null) {
      document.body.style.paddingRight = "".concat(previousBodyPadding, "px");
      previousBodyPadding = null;
    }
  };

  /**
   * @param {JsConfirm} instance
   * @param {HTMLElement} container
   * @param {boolean} returnFocus
   * @param {Function} didClose
   */
  function removePopupAndResetState(instance, container, returnFocus, didClose) {
    if (isToast()) {
      triggerDidCloseAndDispose(instance, didClose);
    } else {
      restoreActiveElement(returnFocus).then(() => triggerDidCloseAndDispose(instance, didClose));
      removeKeydownHandler(globalState);
    }

    // workaround for https://github.com/sweetalert2/sweetalert2/issues/2088
    // for some reason removing the container in Safari will scroll the document to bottom
    if (isSafariOrIOS) {
      container.setAttribute('style', 'display:none !important');
      container.removeAttribute('class');
      container.innerHTML = '';
    } else {
      container.remove();
    }
    if (isModal()) {
      undoReplaceScrollbarWithPadding();
      undoIOSfix();
      unsetAriaHidden();
    }
    removeBodyClasses();
  }

  /**
   * Remove JsConfirm classes from body
   */
  function removeBodyClasses() {
    removeClass([document.documentElement, document.body], [jscClasses.shown, jscClasses['height-auto'], jscClasses['no-backdrop'], jscClasses['toast-shown']]);
  }

  /**
   * Instance method to close sweetAlert
   *
   * @param {any} resolveValue
   */
  function close(resolveValue) {
    resolveValue = prepareResolveValue(resolveValue);
    const jscPromiseResolve = privateMethods.jscPromiseResolve.get(this);
    const didClose = triggerClosePopup(this);
    if (this.isAwaitingPromise) {
      // A jsc awaiting for a promise (after a click on Confirm or Deny) cannot be dismissed anymore #2335
      if (!resolveValue.isDismissed) {
        handleAwaitingPromise(this);
        jscPromiseResolve(resolveValue);
      }
    } else if (didClose) {
      // Resolve Jsc promise
      jscPromiseResolve(resolveValue);
    }
  }
  const triggerClosePopup = instance => {
    const popup = getPopup();
    if (!popup) {
      return false;
    }
    const innerParams = privateProps.innerParams.get(instance);
    if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) {
      return false;
    }
    removeClass(popup, innerParams.showClass.popup);
    addClass(popup, innerParams.hideClass.popup);
    const backdrop = getContainer();
    removeClass(backdrop, innerParams.showClass.backdrop);
    addClass(backdrop, innerParams.hideClass.backdrop);
    handlePopupAnimation(instance, popup, innerParams);
    return true;
  };

  /**
   * @param {any} error
   */
  function rejectPromise(error) {
    const rejectPromise = privateMethods.jscPromiseReject.get(this);
    handleAwaitingPromise(this);
    if (rejectPromise) {
      // Reject Jsc promise
      rejectPromise(error);
    }
  }

  /**
   * @param {JsConfirm} instance
   */
  const handleAwaitingPromise = instance => {
    if (instance.isAwaitingPromise) {
      delete instance.isAwaitingPromise;
      // The instance might have been previously partly destroyed, we must resume the destroy process in this case #2335
      if (!privateProps.innerParams.get(instance)) {
        instance._destroy();
      }
    }
  };

  /**
   * @param {any} resolveValue
   * @returns {JsConfirmResult}
   */
  const prepareResolveValue = resolveValue => {
    // When user calls Jsc.close()
    if (typeof resolveValue === 'undefined') {
      return {
        isConfirmed: false,
        isDenied: false,
        isDismissed: true
      };
    }
    return Object.assign({
      isConfirmed: false,
      isDenied: false,
      isDismissed: false
    }, resolveValue);
  };

  /**
   * @param {JsConfirm} instance
   * @param {HTMLElement} popup
   * @param {JsConfirmOptions} innerParams
   */
  const handlePopupAnimation = (instance, popup, innerParams) => {
    const container = getContainer();
    // If animation is supported, animate
    const animationIsSupported = animationEndEvent && hasCssAnimation(popup);
    if (typeof innerParams.willClose === 'function') {
      innerParams.willClose(popup);
    }
    if (animationIsSupported) {
      animatePopup(instance, popup, container, innerParams.returnFocus, innerParams.didClose);
    } else {
      // Otherwise, remove immediately
      removePopupAndResetState(instance, container, innerParams.returnFocus, innerParams.didClose);
    }
  };

  /**
   * @param {JsConfirm} instance
   * @param {HTMLElement} popup
   * @param {HTMLElement} container
   * @param {boolean} returnFocus
   * @param {Function} didClose
   */
  const animatePopup = (instance, popup, container, returnFocus, didClose) => {
    if (!animationEndEvent) {
      return;
    }
    globalState.jscCloseEventFinishedCallback = removePopupAndResetState.bind(null, instance, container, returnFocus, didClose);
    popup.addEventListener(animationEndEvent, function (e) {
      if (e.target === popup) {
        globalState.jscCloseEventFinishedCallback();
        delete globalState.jscCloseEventFinishedCallback;
      }
    });
  };

  /**
   * @param {JsConfirm} instance
   * @param {Function} didClose
   */
  const triggerDidCloseAndDispose = (instance, didClose) => {
    setTimeout(() => {
      if (typeof didClose === 'function') {
        didClose.bind(instance.params)();
      }
      // instance might have been destroyed already
      if (instance._destroy) {
        instance._destroy();
      }
    });
  };

  /**
   * Shows loader (spinner), this is useful with AJAX requests.
   * By default the loader be shown instead of the "Confirm" button.
   *
   * @param {HTMLButtonElement | null} [buttonToReplace]
   */
  const showLoading = buttonToReplace => {
    let popup = getPopup();
    if (!popup) {
      new Jsc(); // eslint-disable-line no-new
    }

    popup = getPopup();
    if (!popup) {
      return;
    }
    const loader = getLoader();
    if (isToast()) {
      hide(getIcon());
    } else {
      replaceButton(popup, buttonToReplace);
    }
    show(loader);
    popup.setAttribute('data-loading', 'true');
    popup.setAttribute('aria-busy', 'true');
    popup.focus();
  };

  /**
   * @param {HTMLElement} popup
   * @param {HTMLButtonElement | null} [buttonToReplace]
   */
  const replaceButton = (popup, buttonToReplace) => {
    const actions = getActions();
    const loader = getLoader();
    if (!actions || !loader) {
      return;
    }
    if (!buttonToReplace && isVisible$1(getConfirmButton())) {
      buttonToReplace = getConfirmButton();
    }
    show(actions);
    if (buttonToReplace) {
      hide(buttonToReplace);
      loader.setAttribute('data-button-to-replace', buttonToReplace.className);
      actions.insertBefore(loader, buttonToReplace);
    }
    addClass([popup, actions], jscClasses.loading);
  };

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const handleInputOptionsAndValue = (instance, params) => {
    if (params.input === 'select' || params.input === 'radio') {
      handleInputOptions(instance, params);
    } else if (['text', 'email', 'number', 'tel', 'textarea'].some(i => i === params.input) && (hasToPromiseFn(params.inputValue) || isPromise(params.inputValue))) {
      showLoading(getConfirmButton());
      handleInputValue(instance, params);
    }
  };

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} innerParams
   * @returns {JsConfirmInputValue}
   */
  const getInputValue = (instance, innerParams) => {
    const input = instance.getInput();
    if (!input) {
      return null;
    }
    switch (innerParams.input) {
      case 'checkbox':
        return getCheckboxValue(input);
      case 'radio':
        return getRadioValue(input);
      case 'file':
        return getFileValue(input);
      default:
        return innerParams.inputAutoTrim ? input.value.trim() : input.value;
    }
  };

  /**
   * @param {HTMLInputElement} input
   * @returns {number}
   */
  const getCheckboxValue = input => input.checked ? 1 : 0;

  /**
   * @param {HTMLInputElement} input
   * @returns {string | null}
   */
  const getRadioValue = input => input.checked ? input.value : null;

  /**
   * @param {HTMLInputElement} input
   * @returns {FileList | File | null}
   */
  const getFileValue = input => input.files && input.files.length ? input.getAttribute('multiple') !== null ? input.files : input.files[0] : null;

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const handleInputOptions = (instance, params) => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    /**
     * @param {Record<string, any>} inputOptions
     */
    const processInputOptions = inputOptions => {
      if (params.input === 'select') {
        populateSelectOptions(popup, formatInputOptions(inputOptions), params);
      } else if (params.input === 'radio') {
        populateRadioOptions(popup, formatInputOptions(inputOptions), params);
      }
    };
    if (hasToPromiseFn(params.inputOptions) || isPromise(params.inputOptions)) {
      showLoading(getConfirmButton());
      asPromise(params.inputOptions).then(inputOptions => {
        instance.hideLoading();
        processInputOptions(inputOptions);
      });
    } else if (typeof params.inputOptions === 'object') {
      processInputOptions(params.inputOptions);
    } else {
      error("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(typeof params.inputOptions));
    }
  };

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmOptions} params
   */
  const handleInputValue = (instance, params) => {
    const input = instance.getInput();
    if (!input) {
      return;
    }
    hide(input);
    asPromise(params.inputValue).then(inputValue => {
      input.value = params.input === 'number' ? "".concat(parseFloat(inputValue) || 0) : "".concat(inputValue);
      show(input);
      input.focus();
      instance.hideLoading();
    }).catch(err => {
      error("Error in inputValue promise: ".concat(err));
      input.value = '';
      show(input);
      input.focus();
      instance.hideLoading();
    });
  };

  /**
   * @param {HTMLElement} popup
   * @param {InputOptionFlattened[]} inputOptions
   * @param {JsConfirmOptions} params
   */
  function populateSelectOptions(popup, inputOptions, params) {
    const select = getDirectChildByClass(popup, jscClasses.select);
    if (!select) {
      return;
    }
    /**
     * @param {HTMLElement} parent
     * @param {string} optionLabel
     * @param {string} optionValue
     */
    const renderOption = (parent, optionLabel, optionValue) => {
      const option = document.createElement('option');
      option.value = optionValue;
      setInnerHtml(option, optionLabel);
      option.selected = isSelected(optionValue, params.inputValue);
      parent.appendChild(option);
    };
    inputOptions.forEach(inputOption => {
      const optionValue = inputOption[0];
      const optionLabel = inputOption[1];
      // <optgroup> spec:
      // https://www.w3.org/TR/html401/interact/forms.html#h-17.6
      // "...all OPTGROUP elements must be specified directly within a SELECT element (i.e., groups may not be nested)..."
      // check whether this is a <optgroup>
      if (Array.isArray(optionLabel)) {
        // if it is an array, then it is an <optgroup>
        const optgroup = document.createElement('optgroup');
        optgroup.label = optionValue;
        optgroup.disabled = false; // not configurable for now
        select.appendChild(optgroup);
        optionLabel.forEach(o => renderOption(optgroup, o[1], o[0]));
      } else {
        // case of <option>
        renderOption(select, optionLabel, optionValue);
      }
    });
    select.focus();
  }

  /**
   * @param {HTMLElement} popup
   * @param {InputOptionFlattened[]} inputOptions
   * @param {JsConfirmOptions} params
   */
  function populateRadioOptions(popup, inputOptions, params) {
    const radio = getDirectChildByClass(popup, jscClasses.radio);
    if (!radio) {
      return;
    }
    inputOptions.forEach(inputOption => {
      const radioValue = inputOption[0];
      const radioLabel = inputOption[1];
      const radioInput = document.createElement('input');
      const radioLabelElement = document.createElement('label');
      radioInput.type = 'radio';
      radioInput.name = jscClasses.radio;
      radioInput.value = radioValue;
      if (isSelected(radioValue, params.inputValue)) {
        radioInput.checked = true;
      }
      const label = document.createElement('span');
      setInnerHtml(label, radioLabel);
      label.classList.add(jscClasses.label);
      radioLabelElement.appendChild(radioInput);
      radioLabelElement.appendChild(label);
      radio.appendChild(radioLabelElement);
    });
    const radios = radio.querySelectorAll('input');
    if (radios.length) {
      radios[0].focus();
    }
  }

  /**
   * Converts `inputOptions` into an array of `[value, label]`s
   *
   * @param {Record<string, any>} inputOptions
   * @typedef {string[]} InputOptionFlattened
   * @returns {InputOptionFlattened[]}
   */
  const formatInputOptions = inputOptions => {
    /** @type {InputOptionFlattened[]} */
    const result = [];
    if (inputOptions instanceof Map) {
      inputOptions.forEach((value, key) => {
        let valueFormatted = value;
        if (typeof valueFormatted === 'object') {
          // case of <optgroup>
          valueFormatted = formatInputOptions(valueFormatted);
        }
        result.push([key, valueFormatted]);
      });
    } else {
      Object.keys(inputOptions).forEach(key => {
        let valueFormatted = inputOptions[key];
        if (typeof valueFormatted === 'object') {
          // case of <optgroup>
          valueFormatted = formatInputOptions(valueFormatted);
        }
        result.push([key, valueFormatted]);
      });
    }
    return result;
  };

  /**
   * @param {string} optionValue
   * @param {JsConfirmInputValue} inputValue
   * @returns {boolean}
   */
  const isSelected = (optionValue, inputValue) => {
    return !!inputValue && inputValue.toString() === optionValue.toString();
  };

  /**
   * @param {JsConfirm} instance
   */
  const handleConfirmButtonClick = instance => {
    const innerParams = privateProps.innerParams.get(instance);
    instance.disableButtons();
    if (innerParams.input) {
      handleConfirmOrDenyWithInput(instance, 'confirm');
    } else {
      confirm(instance, true);
    }
  };

  /**
   * @param {JsConfirm} instance
   */
  const handleDenyButtonClick = instance => {
    const innerParams = privateProps.innerParams.get(instance);
    instance.disableButtons();
    if (innerParams.returnInputValueOnDeny) {
      handleConfirmOrDenyWithInput(instance, 'deny');
    } else {
      deny(instance, false);
    }
  };

  /**
   * @param {JsConfirm} instance
   * @param {Function} dismissWith
   */
  const handleCancelButtonClick = (instance, dismissWith) => {
    instance.disableButtons();
    dismissWith(DismissReason.cancel);
  };

  /**
   * @param {JsConfirm} instance
   * @param {'confirm' | 'deny'} type
   */
  const handleConfirmOrDenyWithInput = (instance, type) => {
    const innerParams = privateProps.innerParams.get(instance);
    if (!innerParams.input) {
      error("The \"input\" parameter is needed to be set when using returnInputValueOn".concat(capitalizeFirstLetter(type)));
      return;
    }
    const input = instance.getInput();
    const inputValue = getInputValue(instance, innerParams);
    if (innerParams.inputValidator) {
      handleInputValidator(instance, inputValue, type);
    } else if (input && !input.checkValidity()) {
      instance.enableButtons();
      instance.showValidationMessage(innerParams.validationMessage);
    } else if (type === 'deny') {
      deny(instance, inputValue);
    } else {
      confirm(instance, inputValue);
    }
  };

  /**
   * @param {JsConfirm} instance
   * @param {JsConfirmInputValue} inputValue
   * @param {'confirm' | 'deny'} type
   */
  const handleInputValidator = (instance, inputValue, type) => {
    const innerParams = privateProps.innerParams.get(instance);
    instance.disableInput();
    const validationPromise = Promise.resolve().then(() => asPromise(innerParams.inputValidator(inputValue, innerParams.validationMessage)));
    validationPromise.then(validationMessage => {
      instance.enableButtons();
      instance.enableInput();
      if (validationMessage) {
        instance.showValidationMessage(validationMessage);
      } else if (type === 'deny') {
        deny(instance, inputValue);
      } else {
        confirm(instance, inputValue);
      }
    });
  };

  /**
   * @param {JsConfirm} instance
   * @param {any} value
   */
  const deny = (instance, value) => {
    const innerParams = privateProps.innerParams.get(instance || undefined);
    if (innerParams.showLoaderOnDeny) {
      showLoading(getDenyButton());
    }
    if (innerParams.preDeny) {
      instance.isAwaitingPromise = true; // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preDeny's promise is received
      const preDenyPromise = Promise.resolve().then(() => asPromise(innerParams.preDeny(value, innerParams.validationMessage)));
      preDenyPromise.then(preDenyValue => {
        if (preDenyValue === false) {
          instance.hideLoading();
          handleAwaitingPromise(instance);
        } else {
          instance.close({
            isDenied: true,
            value: typeof preDenyValue === 'undefined' ? value : preDenyValue
          });
        }
      }).catch(error => rejectWith(instance || undefined, error));
    } else {
      instance.close({
        isDenied: true,
        value
      });
    }
  };

  /**
   * @param {JsConfirm} instance
   * @param {any} value
   */
  const succeedWith = (instance, value) => {
    instance.close({
      isConfirmed: true,
      value
    });
  };

  /**
   *
   * @param {JsConfirm} instance
   * @param {string} error
   */
  const rejectWith = (instance, error) => {
    instance.rejectPromise(error);
  };

  /**
   *
   * @param {JsConfirm} instance
   * @param {any} value
   */
  const confirm = (instance, value) => {
    const innerParams = privateProps.innerParams.get(instance || undefined);
    if (innerParams.showLoaderOnConfirm) {
      showLoading();
    }
    if (innerParams.preConfirm) {
      instance.resetValidationMessage();
      instance.isAwaitingPromise = true; // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preConfirm's promise is received
      const preConfirmPromise = Promise.resolve().then(() => asPromise(innerParams.preConfirm(value, innerParams.validationMessage)));
      preConfirmPromise.then(preConfirmValue => {
        if (isVisible$1(getValidationMessage()) || preConfirmValue === false) {
          instance.hideLoading();
          handleAwaitingPromise(instance);
        } else {
          succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
        }
      }).catch(error => rejectWith(instance || undefined, error));
    } else {
      succeedWith(instance, value);
    }
  };

  /**
   * Hides loader and shows back the button which was hidden by .showLoading()
   */
  function hideLoading() {
    // do nothing if popup is closed
    const innerParams = privateProps.innerParams.get(this);
    if (!innerParams) {
      return;
    }
    const domCache = privateProps.domCache.get(this);
    hide(domCache.loader);
    if (isToast()) {
      if (innerParams.icon) {
        show(getIcon());
      }
    } else {
      showRelatedButton(domCache);
    }
    removeClass([domCache.popup, domCache.actions], jscClasses.loading);
    domCache.popup.removeAttribute('aria-busy');
    domCache.popup.removeAttribute('data-loading');
    domCache.confirmButton.disabled = false;
    domCache.denyButton.disabled = false;
    domCache.cancelButton.disabled = false;
  }
  const showRelatedButton = domCache => {
    const buttonToReplace = domCache.popup.getElementsByClassName(domCache.loader.getAttribute('data-button-to-replace'));
    if (buttonToReplace.length) {
      show(buttonToReplace[0], 'inline-block');
    } else if (allButtonsAreHidden()) {
      hide(domCache.actions);
    }
  };

  /**
   * Gets the input DOM node, this method works with input parameter.
   *
   * @returns {HTMLInputElement | null}
   */
  function getInput() {
    const innerParams = privateProps.innerParams.get(this);
    const domCache = privateProps.domCache.get(this);
    if (!domCache) {
      return null;
    }
    return getInput$1(domCache.popup, innerParams.input);
  }

  /**
   * @param {JsConfirm} instance
   * @param {string[]} buttons
   * @param {boolean} disabled
   */
  function setButtonsDisabled(instance, buttons, disabled) {
    const domCache = privateProps.domCache.get(instance);
    buttons.forEach(button => {
      domCache[button].disabled = disabled;
    });
  }

  /**
   * @param {HTMLInputElement | null} input
   * @param {boolean} disabled
   */
  function setInputDisabled(input, disabled) {
    const popup = getPopup();
    if (!popup || !input) {
      return;
    }
    if (input.type === 'radio') {
      /** @type {NodeListOf<HTMLInputElement>} */
      const radios = popup.querySelectorAll("[name=\"".concat(jscClasses.radio, "\"]"));
      for (let i = 0; i < radios.length; i++) {
        radios[i].disabled = disabled;
      }
    } else {
      input.disabled = disabled;
    }
  }

  /**
   * Enable all the buttons
   * @this {JsConfirm}
   */
  function enableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], false);
  }

  /**
   * Disable all the buttons
   * @this {JsConfirm}
   */
  function disableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], true);
  }

  /**
   * Enable the input field
   * @this {JsConfirm}
   */
  function enableInput() {
    setInputDisabled(this.getInput(), false);
  }

  /**
   * Disable the input field
   * @this {JsConfirm}
   */
  function disableInput() {
    setInputDisabled(this.getInput(), true);
  }

  /**
   * Show block with validation message
   *
   * @param {string} error
   * @this {JsConfirm}
   */
  function showValidationMessage(error) {
    const domCache = privateProps.domCache.get(this);
    const params = privateProps.innerParams.get(this);
    setInnerHtml(domCache.validationMessage, error);
    domCache.validationMessage.classList.add(jscClasses['validation-message']);
    if (params.customClass && params.customClass.validationMessage) {
      addClass(domCache.validationMessage, params.customClass.validationMessage);
    }
    show(domCache.validationMessage);
    const input = this.getInput();
    if (input) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', jscClasses['validation-message']);
      focusInput(input);
      addClass(input, jscClasses.inputerror);
    }
  }

  /**
   * Hide block with validation message
   *
   * @this {JsConfirm}
   */
  function resetValidationMessage() {
    const domCache = privateProps.domCache.get(this);
    if (domCache.validationMessage) {
      hide(domCache.validationMessage);
    }
    const input = this.getInput();
    if (input) {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      removeClass(input, jscClasses.inputerror);
    }
  }

  const defaultParams = {
    title: '',
    titleText: '',
    text: '',
    html: '',
    footer: '',
    type: undefined,
    icon: undefined,
    iconColor: undefined,
    iconHtml: undefined,
    template: undefined,
    toast: false,
    showClass: {
      popup: 'jsconfirm-show',
      backdrop: 'jsconfirm-backdrop-show',
      icon: 'jsconfirm-icon-show'
    },
    hideClass: {
      popup: 'jsconfirm-hide',
      backdrop: 'jsconfirm-backdrop-hide',
      icon: 'jsconfirm-icon-hide'
    },
    customClass: {},
    target: 'body',
    color: undefined,
    backdrop: true,
    heightAuto: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    stopKeydownPropagation: true,
    keydownListenerCapture: false,
    showConfirmButton: true,
    showDenyButton: false,
    showCancelButton: false,
    preConfirm: undefined,
    preDeny: undefined,
    confirmButtonText: 'OK',
    confirmButtonAriaLabel: '',
    confirmButtonColor: undefined,
    denyButtonText: 'No',
    denyButtonAriaLabel: '',
    denyButtonColor: undefined,
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: '',
    cancelButtonColor: undefined,
    buttonsStyling: true,
    reverseButtons: false,
    focusConfirm: true,
    focusDeny: false,
    focusCancel: false,
    returnFocus: true,
    showCloseButton: true,
    closeButtonHtml: undefined,
    closeButtonAriaLabel: 'Close this dialog',
    loaderHtml: '',
    showLoaderOnConfirm: false,
    showLoaderOnDeny: false,
    imageUrl: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    imageAlt: '',
    timer: undefined,
    timerProgressBar: false,
    width: undefined,
    padding: undefined,
    background: undefined,
    input: undefined,
    inputPlaceholder: '',
    inputLabel: '',
    inputValue: '',
    inputOptions: {},
    inputAutoFocus: true,
    inputAutoTrim: true,
    inputAttributes: {},
    inputValidator: undefined,
    returnInputValueOnDeny: false,
    validationMessage: undefined,
    grow: false,
    position: 'center',
    progressSteps: [],
    currentProgressStep: undefined,
    progressStepsDistance: undefined,
    willOpen: undefined,
    didOpen: undefined,
    didRender: undefined,
    willClose: undefined,
    didClose: undefined,
    didDestroy: undefined,
    scrollbarPadding: true
  };
  const updatableParams = ['allowEscapeKey', 'allowOutsideClick', 'background', 'buttonsStyling', 'cancelButtonAriaLabel', 'cancelButtonColor', 'cancelButtonText', 'closeButtonAriaLabel', 'closeButtonHtml', 'color', 'confirmButtonAriaLabel', 'confirmButtonColor', 'confirmButtonText', 'currentProgressStep', 'customClass', 'denyButtonAriaLabel', 'denyButtonColor', 'denyButtonText', 'didClose', 'didDestroy', 'footer', 'hideClass', 'html', 'icon', 'iconColor', 'iconHtml', 'imageAlt', 'imageHeight', 'imageUrl', 'imageWidth', 'preConfirm', 'preDeny', 'progressSteps', 'returnFocus', 'reverseButtons', 'showCancelButton', 'showCloseButton', 'showConfirmButton', 'showDenyButton', 'text', 'title', 'titleText', 'willClose'];

  /** @type {Record<string, string>} */
  const deprecatedParams = {};
  const toastIncompatibleParams = ['allowOutsideClick', 'allowEnterKey', 'backdrop', 'focusConfirm', 'focusDeny', 'focusCancel', 'returnFocus', 'heightAuto', 'keydownListenerCapture'];

  /**
   * Is valid parameter
   *
   * @param {string} paramName
   * @returns {boolean}
   */
  const isValidParameter = paramName => {
    return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
  };

  /**
   * Is valid parameter for Jsc.update() method
   *
   * @param {string} paramName
   * @returns {boolean}
   */
  const isUpdatableParameter = paramName => {
    return updatableParams.indexOf(paramName) !== -1;
  };

  /**
   * Is deprecated parameter
   *
   * @param {string} paramName
   * @returns {string | undefined}
   */
  const isDeprecatedParameter = paramName => {
    return deprecatedParams[paramName];
  };

  /**
   * @param {string} param
   */
  const checkIfParamIsValid = param => {
    if (!isValidParameter(param)) {
      warn("Unknown parameter \"".concat(param, "\""));
    }
  };

  /**
   * @param {string} param
   */
  const checkIfToastParamIsValid = param => {
    if (toastIncompatibleParams.includes(param)) {
      warn("The parameter \"".concat(param, "\" is incompatible with toasts"));
    }
  };

  /**
   * @param {string} param
   */
  const checkIfParamIsDeprecated = param => {
    const isDeprecated = isDeprecatedParameter(param);
    if (isDeprecated) {
      warnAboutDeprecation(param, isDeprecated);
    }
  };

  /**
   * Show relevant warnings for given params
   *
   * @param {JsConfirmOptions} params
   */
  const showWarningsForParams = params => {
    if (params.backdrop === false && params.allowOutsideClick) {
      warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
    }
    for (const param in params) {
      checkIfParamIsValid(param);
      if (params.toast) {
        checkIfToastParamIsValid(param);
      }
      checkIfParamIsDeprecated(param);
    }
  };

  /**
   * Updates popup parameters.
   *
   * @param {JsConfirmOptions} params
   */
  function update(params) {
    const popup = getPopup();
    const innerParams = privateProps.innerParams.get(this);
    if (!popup || hasClass(popup, innerParams.hideClass.popup)) {
      warn("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
      return;
    }
    const validUpdatableParams = filterValidParams(params);
    const updatedParams = Object.assign({}, innerParams, validUpdatableParams);
    render(this, updatedParams);
    privateProps.innerParams.set(this, updatedParams);
    Object.defineProperties(this, {
      params: {
        value: Object.assign({}, this.params, params),
        writable: false,
        enumerable: true
      }
    });
  }

  /**
   * @param {JsConfirmOptions} params
   * @returns {JsConfirmOptions}
   */
  const filterValidParams = params => {
    const validUpdatableParams = {};
    Object.keys(params).forEach(param => {
      if (isUpdatableParameter(param)) {
        validUpdatableParams[param] = params[param];
      } else {
        warn("Invalid parameter to update: ".concat(param));
      }
    });
    return validUpdatableParams;
  };

  /**
   * Dispose the current JsConfirm instance
   */
  function _destroy() {
    const domCache = privateProps.domCache.get(this);
    const innerParams = privateProps.innerParams.get(this);
    if (!innerParams) {
      disposeWeakMaps(this); // The WeakMaps might have been partly destroyed, we must recall it to dispose any remaining WeakMaps #2335
      return; // This instance has already been destroyed
    }

    // Check if there is another Jsc closing
    if (domCache.popup && globalState.jscCloseEventFinishedCallback) {
      globalState.jscCloseEventFinishedCallback();
      delete globalState.jscCloseEventFinishedCallback;
    }
    if (typeof innerParams.didDestroy === 'function') {
      innerParams.didDestroy();
    }
    disposeJsc(this);
  }

  /**
   * @param {JsConfirm} instance
   */
  const disposeJsc = instance => {
    disposeWeakMaps(instance);
    // Unset this.params so GC will dispose it (#1569)
    delete instance.params;
    // Unset globalState props so GC will dispose globalState (#1569)
    delete globalState.keydownHandler;
    delete globalState.keydownTarget;
    // Unset currentInstance
    delete globalState.currentInstance;
  };

  /**
   * @param {JsConfirm} instance
   */
  const disposeWeakMaps = instance => {
    // If the current instance is awaiting a promise result, we keep the privateMethods to call them once the promise result is retrieved #2335
    if (instance.isAwaitingPromise) {
      unsetWeakMaps(privateProps, instance);
      instance.isAwaitingPromise = true;
    } else {
      unsetWeakMaps(privateMethods, instance);
      unsetWeakMaps(privateProps, instance);
      delete instance.isAwaitingPromise;
      // Unset instance methods
      delete instance.disableButtons;
      delete instance.enableButtons;
      delete instance.getInput;
      delete instance.disableInput;
      delete instance.enableInput;
      delete instance.hideLoading;
      delete instance.disableLoading;
      delete instance.showValidationMessage;
      delete instance.resetValidationMessage;
      delete instance.close;
      delete instance.closePopup;
      delete instance.closeModal;
      delete instance.closeToast;
      delete instance.rejectPromise;
      delete instance.update;
      delete instance._destroy;
    }
  };

  /**
   * @param {object} obj
   * @param {JsConfirm} instance
   */
  const unsetWeakMaps = (obj, instance) => {
    for (const i in obj) {
      obj[i].delete(instance);
    }
  };

  var instanceMethods = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _destroy: _destroy,
    close: close,
    closeModal: close,
    closePopup: close,
    closeToast: close,
    disableButtons: disableButtons,
    disableInput: disableInput,
    disableLoading: hideLoading,
    enableButtons: enableButtons,
    enableInput: enableInput,
    getInput: getInput,
    handleAwaitingPromise: handleAwaitingPromise,
    hideLoading: hideLoading,
    rejectPromise: rejectPromise,
    resetValidationMessage: resetValidationMessage,
    showValidationMessage: showValidationMessage,
    update: update
  });

  /**
   * @param {JsConfirmOptions} innerParams
   * @param {DomCache} domCache
   * @param {Function} dismissWith
   */
  const handlePopupClick = (innerParams, domCache, dismissWith) => {
    if (innerParams.toast) {
      handleToastClick(innerParams, domCache, dismissWith);
    } else {
      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      handleModalMousedown(domCache);

      // Ignore click events that had mousedown on the container but mouseup on the popup
      handleContainerMousedown(domCache);
      handleModalClick(innerParams, domCache, dismissWith);
    }
  };

  /**
   * @param {JsConfirmOptions} innerParams
   * @param {DomCache} domCache
   * @param {Function} dismissWith
   */
  const handleToastClick = (innerParams, domCache, dismissWith) => {
    // Closing toast by internal click
    domCache.popup.onclick = () => {
      if (innerParams && (isAnyButtonShown(innerParams) || innerParams.timer || innerParams.input)) {
        return;
      }
      dismissWith(DismissReason.close);
    };
  };

  /**
   * @param {JsConfirmOptions} innerParams
   * @returns {boolean}
   */
  const isAnyButtonShown = innerParams => {
    return innerParams.showConfirmButton || innerParams.showDenyButton || innerParams.showCancelButton || innerParams.showCloseButton;
  };
  let ignoreOutsideClick = false;

  /**
   * @param {DomCache} domCache
   */
  const handleModalMousedown = domCache => {
    domCache.popup.onmousedown = () => {
      domCache.container.onmouseup = function (e) {
        domCache.container.onmouseup = undefined;
        // We only check if the mouseup target is the container because usually it doesn't
        // have any other direct children aside of the popup
        if (e.target === domCache.container) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  /**
   * @param {DomCache} domCache
   */
  const handleContainerMousedown = domCache => {
    domCache.container.onmousedown = () => {
      domCache.popup.onmouseup = function (e) {
        domCache.popup.onmouseup = undefined;
        // We also need to check if the mouseup target is a child of the popup
        if (e.target === domCache.popup || e.target instanceof HTMLElement && domCache.popup.contains(e.target)) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  /**
   * @param {JsConfirmOptions} innerParams
   * @param {DomCache} domCache
   * @param {Function} dismissWith
   */
  const handleModalClick = (innerParams, domCache, dismissWith) => {
    domCache.container.onclick = e => {
      if (ignoreOutsideClick) {
        ignoreOutsideClick = false;
        return;
      }
      if (e.target === domCache.container) {
        if (callIfFunction(innerParams.allowOutsideClick)) {
          dismissWith(DismissReason.backdrop);
        } else {
          domCache.popup.classList.add('modal-shake');
          let dur = parseFloat(window.getComputedStyle(domCache.popup)['animation-duration']);
          setTimeout(() => {
            domCache.popup.classList.remove('modal-shake');
          }, dur * 1000);
        }
      }
    };
  };

  const isJqueryElement = elem => typeof elem === 'object' && elem.jquery;
  const isElement = elem => elem instanceof Element || isJqueryElement(elem);
  const argsToParams = args => {
    const params = {};
    if (typeof args[0] === 'object' && !isElement(args[0])) {
      Object.assign(params, args[0]);
    } else {
      ['title', 'html', 'icon'].forEach((name, index) => {
        const arg = args[index];
        if (typeof arg === 'string' || isElement(arg)) {
          params[name] = arg;
        } else if (arg !== undefined) {
          error("Unexpected type of ".concat(name, "! Expected \"string\" or \"Element\", got ").concat(typeof arg));
        }
      });
    }
    return params;
  };

  /**
   * Main method to create a new JsConfirm popup
   *
   * @param  {...JsConfirmOptions} args
   * @returns {Promise<JsConfirmResult>}
   */
  function fire() {
    const Jsc = this; // eslint-disable-line @typescript-eslint/no-this-alias
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return new Jsc(...args);
  }

  /**
   * Returns an extended version of `Jsc` containing `params` as defaults.
   * Useful for reusing Jsc configuration.
   *
   * For example:
   *
   * Before:
   * const textPromptOptions = { input: 'text', showCancelButton: true }
   * const {value: firstName} = await Jsc.fire({ ...textPromptOptions, title: 'What is your first name?' })
   * const {value: lastName} = await Jsc.fire({ ...textPromptOptions, title: 'What is your last name?' })
   *
   * After:
   * const TextPrompt = Jsc.mixin({ input: 'text', showCancelButton: true })
   * const {value: firstName} = await TextPrompt('What is your first name?')
   * const {value: lastName} = await TextPrompt('What is your last name?')
   *
   * @param {JsConfirmOptions} mixinParams
   * @returns {JsConfirm}
   */
  function mixin(mixinParams) {
    class MixinJsc extends this {
      _main(params, priorityMixinParams) {
        return super._main(params, Object.assign({}, mixinParams, priorityMixinParams));
      }
    }
    // @ts-ignore
    return MixinJsc;
  }

  /**
   * If `timer` parameter is set, returns number of milliseconds of timer remained.
   * Otherwise, returns undefined.
   *
   * @returns {number | undefined}
   */
  const getTimerLeft = () => {
    return globalState.timeout && globalState.timeout.getTimerLeft();
  };

  /**
   * Stop timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   *
   * @returns {number | undefined}
   */
  const stopTimer = () => {
    if (globalState.timeout) {
      stopTimerProgressBar();
      return globalState.timeout.stop();
    }
  };

  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   *
   * @returns {number | undefined}
   */
  const resumeTimer = () => {
    if (globalState.timeout) {
      const remaining = globalState.timeout.start();
      animateTimerProgressBar(remaining);
      return remaining;
    }
  };

  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   *
   * @returns {number | undefined}
   */
  const toggleTimer = () => {
    const timer = globalState.timeout;
    return timer && (timer.running ? stopTimer() : resumeTimer());
  };
  /**
   * Increase timer. Returns number of milliseconds of an updated timer.
   * If `timer` parameter isn't set, returns undefined.
   *
   * @param {number} ms
   * @returns {number | undefined}
   */
  const increaseTimer = ms => {
    if (globalState.timeout) {
      const remaining = globalState.timeout.increase(ms);
      animateTimerProgressBar(remaining, true);
      return remaining;
    }
  };

  /**
   * Check if timer is running. Returns true if timer is running
   * or false if timer is paused or stopped.
   * If `timer` parameter isn't set, returns undefined
   *
   * @returns {boolean}
   */
  const isTimerRunning = () => {
    return !!(globalState.timeout && globalState.timeout.isRunning());
  };

  let bodyClickListenerAdded = false;
  const clickHandlers = {};

  /**
   * @param {string} attr
   */
  function bindClickHandler() {
    let attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'data-jsc-template';
    clickHandlers[attr] = this;
    if (!bodyClickListenerAdded) {
      document.body.addEventListener('click', bodyClickListener);
      bodyClickListenerAdded = true;
    }
  }
  const bodyClickListener = event => {
    for (let el = event.target; el && el !== document; el = el.parentNode) {
      for (const attr in clickHandlers) {
        const template = el.getAttribute(attr);
        if (template) {
          clickHandlers[attr].fire({
            template
          });
          return;
        }
      }
    }
  };

  var staticMethods = /*#__PURE__*/Object.freeze({
    __proto__: null,
    argsToParams: argsToParams,
    bindClickHandler: bindClickHandler,
    clickCancel: clickCancel,
    clickConfirm: clickConfirm,
    clickDeny: clickDeny,
    enableLoading: showLoading,
    fire: fire,
    getActions: getActions,
    getCancelButton: getCancelButton,
    getCloseButton: getCloseButton,
    getConfirmButton: getConfirmButton,
    getContainer: getContainer,
    getDenyButton: getDenyButton,
    getFocusableElements: getFocusableElements,
    getFooter: getFooter,
    getHtmlContainer: getHtmlContainer,
    getIcon: getIcon,
    getIconContent: getIconContent,
    getImage: getImage,
    getInputLabel: getInputLabel,
    getLoader: getLoader,
    getPopup: getPopup,
    getProgressSteps: getProgressSteps,
    getTimerLeft: getTimerLeft,
    getTimerProgressBar: getTimerProgressBar,
    getTitle: getTitle,
    getValidationMessage: getValidationMessage,
    increaseTimer: increaseTimer,
    isDeprecatedParameter: isDeprecatedParameter,
    isLoading: isLoading,
    isTimerRunning: isTimerRunning,
    isUpdatableParameter: isUpdatableParameter,
    isValidParameter: isValidParameter,
    isVisible: isVisible,
    mixin: mixin,
    resumeTimer: resumeTimer,
    showLoading: showLoading,
    stopTimer: stopTimer,
    toggleTimer: toggleTimer
  });

  class Timer {
    /**
     * @param {Function} callback
     * @param {number} delay
     */
    constructor(callback, delay) {
      this.callback = callback;
      this.remaining = delay;
      this.running = false;
      this.start();
    }

    /**
     * @returns {number}
     */
    start() {
      if (!this.running) {
        this.running = true;
        this.started = new Date();
        this.id = setTimeout(this.callback, this.remaining);
      }
      return this.remaining;
    }

    /**
     * @returns {number}
     */
    stop() {
      if (this.started && this.running) {
        this.running = false;
        clearTimeout(this.id);
        this.remaining -= new Date().getTime() - this.started.getTime();
      }
      return this.remaining;
    }

    /**
     * @param {number} n
     * @returns {number}
     */
    increase(n) {
      const running = this.running;
      if (running) {
        this.stop();
      }
      this.remaining += n;
      if (running) {
        this.start();
      }
      return this.remaining;
    }

    /**
     * @returns {number}
     */
    getTimerLeft() {
      if (this.running) {
        this.stop();
        this.start();
      }
      return this.remaining;
    }

    /**
     * @returns {boolean}
     */
    isRunning() {
      return this.running;
    }
  }

  const jscStringParams = ['jsc-title', 'jsc-html', 'jsc-footer'];

  /**
   * @param {JsConfirmOptions} params
   * @returns {JsConfirmOptions}
   */
  const getTemplateParams = params => {
    /** @type {HTMLTemplateElement} */
    const template = typeof params.template === 'string' ? document.querySelector(params.template) : params.template;
    if (!template) {
      return {};
    }
    /** @type {DocumentFragment} */
    const templateContent = template.content;
    showWarningsForElements(templateContent);
    const result = Object.assign(getJscParams(templateContent), getJscFunctionParams(templateContent), getJscButtons(templateContent), getJscImage(templateContent), getJscIcon(templateContent), getJscInput(templateContent), getJscStringParams(templateContent, jscStringParams));
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {JsConfirmOptions}
   */
  const getJscParams = templateContent => {
    const result = {};
    /** @type {HTMLElement[]} */
    const jscParams = Array.from(templateContent.querySelectorAll('jsc-param'));
    jscParams.forEach(param => {
      showWarningsForAttributes(param, ['name', 'value']);
      const paramName = param.getAttribute('name');
      const value = param.getAttribute('value');
      if (typeof defaultParams[paramName] === 'boolean') {
        result[paramName] = value !== 'false';
      } else if (typeof defaultParams[paramName] === 'object') {
        result[paramName] = JSON.parse(value);
      } else {
        result[paramName] = value;
      }
    });
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {JsConfirmOptions}
   */
  const getJscFunctionParams = templateContent => {
    const result = {};
    /** @type {HTMLElement[]} */
    const jscFunctions = Array.from(templateContent.querySelectorAll('jsc-function-param'));
    jscFunctions.forEach(param => {
      const paramName = param.getAttribute('name');
      const value = param.getAttribute('value');
      result[paramName] = new Function("return ".concat(value))();
    });
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {JsConfirmOptions}
   */
  const getJscButtons = templateContent => {
    const result = {};
    /** @type {HTMLElement[]} */
    const jscButtons = Array.from(templateContent.querySelectorAll('jsc-button'));
    jscButtons.forEach(button => {
      showWarningsForAttributes(button, ['type', 'color', 'aria-label']);
      const type = button.getAttribute('type');
      result["".concat(type, "ButtonText")] = button.innerHTML;
      result["show".concat(capitalizeFirstLetter(type), "Button")] = true;
      if (button.hasAttribute('color')) {
        result["".concat(type, "ButtonColor")] = button.getAttribute('color');
      }
      if (button.hasAttribute('aria-label')) {
        result["".concat(type, "ButtonAriaLabel")] = button.getAttribute('aria-label');
      }
    });
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {JsConfirmOptions}
   */
  const getJscImage = templateContent => {
    const result = {};
    /** @type {HTMLElement} */
    const image = templateContent.querySelector('jsc-image');
    if (image) {
      showWarningsForAttributes(image, ['src', 'width', 'height', 'alt']);
      if (image.hasAttribute('src')) {
        result.imageUrl = image.getAttribute('src');
      }
      if (image.hasAttribute('width')) {
        result.imageWidth = image.getAttribute('width');
      }
      if (image.hasAttribute('height')) {
        result.imageHeight = image.getAttribute('height');
      }
      if (image.hasAttribute('alt')) {
        result.imageAlt = image.getAttribute('alt');
      }
    }
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {JsConfirmOptions}
   */
  const getJscIcon = templateContent => {
    const result = {};
    /** @type {HTMLElement} */
    const icon = templateContent.querySelector('jsc-icon');
    if (icon) {
      showWarningsForAttributes(icon, ['type', 'color']);
      if (icon.hasAttribute('type')) {
        /** @type {JsConfirmIcon} */
        // @ts-ignore
        result.icon = icon.getAttribute('type');
      }
      if (icon.hasAttribute('color')) {
        result.iconColor = icon.getAttribute('color');
      }
      result.iconHtml = icon.innerHTML;
    }
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {JsConfirmOptions}
   */
  const getJscInput = templateContent => {
    const result = {};
    /** @type {HTMLElement} */
    const input = templateContent.querySelector('jsc-input');
    if (input) {
      showWarningsForAttributes(input, ['type', 'label', 'placeholder', 'value']);
      /** @type {JsConfirmInput} */
      // @ts-ignore
      result.input = input.getAttribute('type') || 'text';
      if (input.hasAttribute('label')) {
        result.inputLabel = input.getAttribute('label');
      }
      if (input.hasAttribute('placeholder')) {
        result.inputPlaceholder = input.getAttribute('placeholder');
      }
      if (input.hasAttribute('value')) {
        result.inputValue = input.getAttribute('value');
      }
    }
    /** @type {HTMLElement[]} */
    const inputOptions = Array.from(templateContent.querySelectorAll('jsc-input-option'));
    if (inputOptions.length) {
      result.inputOptions = {};
      inputOptions.forEach(option => {
        showWarningsForAttributes(option, ['value']);
        const optionValue = option.getAttribute('value');
        const optionName = option.innerHTML;
        result.inputOptions[optionValue] = optionName;
      });
    }
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @param {string[]} paramNames
   * @returns {JsConfirmOptions}
   */
  const getJscStringParams = (templateContent, paramNames) => {
    const result = {};
    for (const i in paramNames) {
      const paramName = paramNames[i];
      /** @type {HTMLElement} */
      const tag = templateContent.querySelector(paramName);
      if (tag) {
        showWarningsForAttributes(tag, []);
        result[paramName.replace(/^jsc-/, '')] = tag.innerHTML.trim();
      }
    }
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   */
  const showWarningsForElements = templateContent => {
    const allowedElements = jscStringParams.concat(['jsc-param', 'jsc-function-param', 'jsc-button', 'jsc-image', 'jsc-icon', 'jsc-input', 'jsc-input-option']);
    Array.from(templateContent.children).forEach(el => {
      const tagName = el.tagName.toLowerCase();
      if (!allowedElements.includes(tagName)) {
        warn("Unrecognized element <".concat(tagName, ">"));
      }
    });
  };

  /**
   * @param {HTMLElement} el
   * @param {string[]} allowedAttributes
   */
  const showWarningsForAttributes = (el, allowedAttributes) => {
    Array.from(el.attributes).forEach(attribute => {
      if (allowedAttributes.indexOf(attribute.name) === -1) {
        warn(["Unrecognized attribute \"".concat(attribute.name, "\" on <").concat(el.tagName.toLowerCase(), ">."), "".concat(allowedAttributes.length ? "Allowed attributes are: ".concat(allowedAttributes.join(', ')) : 'To set the value, use HTML within the element.')]);
      }
    });
  };

  const SHOW_CLASS_TIMEOUT = 10;

  /**
   * Open popup, add necessary classes and styles, fix scrollbar
   *
   * @param {JsConfirmOptions} params
   */
  const openPopup = params => {
    const container = getContainer();
    const popup = getPopup();
    if (typeof params.willOpen === 'function') {
      params.willOpen(popup);
    }
    const bodyStyles = window.getComputedStyle(document.body);
    const initialBodyOverflow = bodyStyles.overflowY;
    addClasses(container, popup, params);

    // scrolling is 'hidden' until animation is done, after that 'auto'
    setTimeout(() => {
      setScrollingVisibility(container, popup);
    }, SHOW_CLASS_TIMEOUT);
    if (isModal()) {
      fixScrollContainer(container, params.scrollbarPadding, initialBodyOverflow);
      setAriaHidden();
    }
    if (!isToast() && !globalState.previousActiveElement) {
      globalState.previousActiveElement = document.activeElement;
    }
    if (typeof params.didOpen === 'function') {
      setTimeout(() => params.didOpen(popup));
    }
    removeClass(container, jscClasses['no-transition']);
  };

  /**
   * @param {AnimationEvent} event
   */
  const jscOpenAnimationFinished = event => {
    const popup = getPopup();
    if (event.target !== popup || !animationEndEvent) {
      return;
    }
    getContainer();
    popup.removeEventListener(animationEndEvent, jscOpenAnimationFinished);
    popup.classList.remove('jsconfirm-show');
    // container.style.overflowY = 'auto'
  };

  /**
   * @param {HTMLElement} container
   * @param {HTMLElement} popup
   */
  const setScrollingVisibility = (container, popup) => {
    if (animationEndEvent && hasCssAnimation(popup)) {
      // container.style.overflowY = 'hidden'
      popup.addEventListener(animationEndEvent, jscOpenAnimationFinished);
    }
  };

  /**
   * @param {HTMLElement} container
   * @param {boolean} scrollbarPadding
   * @param {string} initialBodyOverflow
   */
  const fixScrollContainer = (container, scrollbarPadding, initialBodyOverflow) => {
    iOSfix();
    if (scrollbarPadding && initialBodyOverflow !== 'hidden') {
      replaceScrollbarWithPadding(initialBodyOverflow);
    }

    // sweetalert2/issues/1247
    setTimeout(() => {
      container.scrollTop = 0;
    });
  };

  /**
   * @param {HTMLElement} container
   * @param {HTMLElement} popup
   * @param {JsConfirmOptions} params
   */
  const addClasses = (container, popup, params) => {
    addClass(container, params.showClass.backdrop);
    // this workaround with opacity is needed for https://github.com/sweetalert2/sweetalert2/issues/2059
    popup.style.setProperty('opacity', '0', 'important');
    show(popup, 'grid');
    setTimeout(() => {
      // Animate popup right after showing it
      addClass(popup, params.showClass.popup);
      // and remove the opacity workaround
      popup.style.removeProperty('opacity');
    }, SHOW_CLASS_TIMEOUT); // 10ms in order to fix #2062

    addClass([document.documentElement, document.body], jscClasses.shown);
    if (params.heightAuto && params.backdrop && !params.toast) {
      addClass([document.documentElement, document.body], jscClasses['height-auto']);
    }
  };

  var defaultInputValidators = {
    /**
     * @param {string} string
     * @param {string} [validationMessage]
     * @returns {Promise<string | void>}
     */
    email: (string, validationMessage) => {
      return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid email address');
    },
    /**
     * @param {string} string
     * @param {string} [validationMessage]
     * @returns {Promise<string | void>}
     */
    url: (string, validationMessage) => {
      // taken from https://stackoverflow.com/a/3809435 with a small change from #1306 and #2013
      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid URL');
    }
  };

  /**
   * @param {JsConfirmOptions} params
   */
  function setDefaultInputValidators(params) {
    // Use default `inputValidator` for supported input types if not provided
    if (params.inputValidator) {
      return;
    }
    if (params.input === 'email') {
      params.inputValidator = defaultInputValidators['email'];
    }
    if (params.input === 'url') {
      params.inputValidator = defaultInputValidators['url'];
    }
  }

  /**
   * @param {JsConfirmOptions} params
   */
  function validateCustomTargetElement(params) {
    // Determine if the custom target element is valid
    if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
      warn('Target parameter is not valid, defaulting to "body"');
      params.target = 'body';
    }
  }

  /**
   * Set type, text and actions on popup
   *
   * @param {JsConfirmOptions} params
   */
  function setParameters(params) {
    setDefaultInputValidators(params);

    // showLoaderOnConfirm && preConfirm
    if (params.showLoaderOnConfirm && !params.preConfirm) {
      warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
    }
    validateCustomTargetElement(params);

    // Replace newlines with <br> in title
    if (typeof params.title === 'string') {
      params.title = params.title.split('\n').join('<br />');
    }
    init(params);
  }

  /** @type {JsConfirm} */
  let currentInstance;
  var _promise = /*#__PURE__*/new WeakMap();
  class JsConfirm {
    /**
     * @param {...any} args
     * @this {JsConfirm}
     */
    constructor() {
      /**
       * @type {Promise<JsConfirmResult>}
       */
      _classPrivateFieldInitSpec(this, _promise, {
        writable: true,
        value: void 0
      });
      // Prevent run in Node env
      if (typeof window === 'undefined') {
        return;
      }
      currentInstance = this;

      // @ts-ignore
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      const outerParams = Object.freeze(this.constructor.argsToParams(args));

      /** @type {Readonly<JsConfirmOptions>} */
      this.params = outerParams;

      /** @type {boolean} */
      this.isAwaitingPromise = false;
      _classPrivateFieldSet(this, _promise, this._main(currentInstance.params));
    }
    _main(userParams) {
      let mixinParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      showWarningsForParams(Object.assign({}, mixinParams, userParams));
      if (globalState.currentInstance) {
        globalState.currentInstance._destroy();
        if (isModal()) {
          unsetAriaHidden();
        }
      }
      globalState.currentInstance = currentInstance;
      const innerParams = prepareParams(userParams, mixinParams);
      setParameters(innerParams);
      Object.freeze(innerParams);

      // clear the previous timer
      if (globalState.timeout) {
        globalState.timeout.stop();
        delete globalState.timeout;
      }

      // clear the restore focus timeout
      clearTimeout(globalState.restoreFocusTimeout);
      const domCache = populateDomCache(currentInstance);
      render(currentInstance, innerParams);
      privateProps.innerParams.set(currentInstance, innerParams);
      return jscPromise(currentInstance, domCache, innerParams);
    }

    // `catch` cannot be the name of a module export, so we define our thenable methods here instead
    then(onFulfilled) {
      return _classPrivateFieldGet(this, _promise).then(onFulfilled);
    }
    finally(onFinally) {
      return _classPrivateFieldGet(this, _promise).finally(onFinally);
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
      const dismissWith = dismiss => {
        instance.close({
          isDismissed: true,
          dismiss
        });
      };
      privateMethods.jscPromiseResolve.set(instance, resolve);
      privateMethods.jscPromiseReject.set(instance, reject);
      domCache.confirmButton.onclick = () => {
        handleConfirmButtonClick(instance);
      };
      domCache.denyButton.onclick = () => {
        handleDenyButtonClick(instance);
      };
      domCache.cancelButton.onclick = () => {
        handleCancelButtonClick(instance, dismissWith);
      };
      domCache.closeButton.onclick = () => {
        dismissWith(DismissReason.close);
      };
      handlePopupClick(innerParams, domCache, dismissWith);
      addKeydownHandler(globalState, innerParams, dismissWith);
      handleInputOptionsAndValue(instance, innerParams);
      openPopup(innerParams);
      setupTimer(globalState, innerParams, dismissWith);
      initFocus(domCache, innerParams);

      // Scroll container to top on open (#1247, #1946)
      setTimeout(() => {
        domCache.container.scrollTop = 0;
      });
    });
  };

  /**
   * @param {JsConfirmOptions} userParams
   * @param {JsConfirmOptions} mixinParams
   * @returns {JsConfirmOptions}
   */
  const prepareParams = (userParams, mixinParams) => {
    const templateParams = getTemplateParams(userParams);
    const params = Object.assign({}, defaultParams, mixinParams, templateParams, userParams); // precedence is described in #2131
    params.showClass = Object.assign({}, defaultParams.showClass, params.showClass);
    params.hideClass = Object.assign({}, defaultParams.hideClass, params.hideClass);
    return params;
  };

  /**
   * @param {JsConfirm} instance
   * @returns {DomCache}
   */
  const populateDomCache = instance => {
    const domCache = {
      body: getBody(),
      popup: getPopup(),
      container: getContainer(),
      actions: getActions(),
      confirmButton: getConfirmButton(),
      denyButton: getDenyButton(),
      cancelButton: getCancelButton(),
      loader: getLoader(),
      closeButton: getCloseButton(),
      validationMessage: getValidationMessage(),
      progressSteps: getProgressSteps()
    };
    privateProps.domCache.set(instance, domCache);
    return domCache;
  };

  /**
   * @param {GlobalState} globalState
   * @param {JsConfirmOptions} innerParams
   * @param {Function} dismissWith
   */
  const setupTimer = (globalState, innerParams, dismissWith) => {
    const timerProgressBar = getTimerProgressBar();
    hide(timerProgressBar);
    if (innerParams.timer) {
      globalState.timeout = new Timer(() => {
        dismissWith('timer');
        delete globalState.timeout;
      }, innerParams.timer);
      if (innerParams.timerProgressBar) {
        show(timerProgressBar);
        applyCustomClass(timerProgressBar, innerParams, 'timerProgressBar');
        setTimeout(() => {
          if (globalState.timeout && globalState.timeout.running) {
            // timer can be already stopped or unset at this point
            animateTimerProgressBar(innerParams.timer);
          }
        });
      }
    }
  };

  /**
   * @param {DomCache} domCache
   * @param {JsConfirmOptions} innerParams
   */
  const initFocus = (domCache, innerParams) => {
    if (innerParams.toast) {
      return;
    }
    if (!callIfFunction(innerParams.allowEnterKey)) {
      blurActiveElement();
      return;
    }
    if (!focusButton(domCache, innerParams)) {
      setFocus(-1, 1);
    }
  };

  /**
   * @param {DomCache} domCache
   * @param {JsConfirmOptions} innerParams
   * @returns {boolean}
   */
  const focusButton = (domCache, innerParams) => {
    if (innerParams.focusDeny && isVisible$1(domCache.denyButton)) {
      domCache.denyButton.focus();
      return true;
    }
    if (innerParams.focusCancel && isVisible$1(domCache.cancelButton)) {
      domCache.cancelButton.focus();
      return true;
    }
    if (innerParams.focusConfirm && isVisible$1(domCache.confirmButton)) {
      domCache.confirmButton.focus();
      return true;
    }
    return false;
  };
  const blurActiveElement = () => {
    if (document.activeElement instanceof HTMLElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  };

  // Assign instance methods from src/instanceMethods/*.js to prototype
  JsConfirm.prototype.disableButtons = disableButtons;
  JsConfirm.prototype.enableButtons = enableButtons;
  JsConfirm.prototype.getInput = getInput;
  JsConfirm.prototype.disableInput = disableInput;
  JsConfirm.prototype.enableInput = enableInput;
  JsConfirm.prototype.hideLoading = hideLoading;
  JsConfirm.prototype.disableLoading = hideLoading;
  JsConfirm.prototype.showValidationMessage = showValidationMessage;
  JsConfirm.prototype.resetValidationMessage = resetValidationMessage;
  JsConfirm.prototype.close = close;
  JsConfirm.prototype.closePopup = close;
  JsConfirm.prototype.closeModal = close;
  JsConfirm.prototype.closeToast = close;
  JsConfirm.prototype.rejectPromise = rejectPromise;
  JsConfirm.prototype.update = update;
  JsConfirm.prototype._destroy = _destroy;

  // Assign static methods from src/staticMethods/*.js to constructor
  Object.assign(JsConfirm, staticMethods);

  // Proxy to instance methods to constructor, for now, for backwards compatibility
  Object.keys(instanceMethods).forEach(key => {
    /**
     * @param {...any} args
     * @returns {any | undefined}
     */
    JsConfirm[key] = function () {
      if (currentInstance && currentInstance[key]) {
        return currentInstance[key](...arguments);
      }
      return null;
    };
  });
  JsConfirm.DismissReason = DismissReason;
  JsConfirm.version = '11.7.28';

  // export default JsConfirm

  const Jsc = JsConfirm;
  // @ts-ignore
  Jsc.default = Jsc;

  exports.JsConfirm = JsConfirm;
  exports.default = Jsc;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
if (typeof this !== 'undefined' && this.jsconfirm){this.jsc = this.jsconfirm = this.Jsc = this.jsConfirm = this.JsConfirm}
"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,".jsconfirm-popup.jsconfirm-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.jsconfirm-popup.jsconfirm-toast>*{grid-column:2}.jsconfirm-popup.jsconfirm-toast .jsconfirm-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.jsconfirm-popup.jsconfirm-toast .jsconfirm-loading{justify-content:center}.jsconfirm-popup.jsconfirm-toast .jsconfirm-input{height:2em;margin:.5em;font-size:1em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-validation-message{font-size:1em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.jsconfirm-popup.jsconfirm-toast .jsconfirm-html-container:empty{padding:0}.jsconfirm-popup.jsconfirm-toast .jsconfirm-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.jsconfirm-popup.jsconfirm-toast .jsconfirm-icon .jsconfirm-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.jsconfirm-popup.jsconfirm-toast .jsconfirm-icon.jsconfirm-success .jsconfirm-success-ring{width:2em;height:2em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-icon.jsconfirm-error [class^=jsconfirm-x-mark-line]{top:.875em;width:1.375em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-icon.jsconfirm-error [class^=jsconfirm-x-mark-line][class$=left]{left:.3125em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-icon.jsconfirm-error [class^=jsconfirm-x-mark-line][class$=right]{right:.3125em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-success{border-color:#66f500}.jsconfirm-popup.jsconfirm-toast .jsconfirm-success [class^=jsconfirm-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.jsconfirm-popup.jsconfirm-toast .jsconfirm-success [class^=jsconfirm-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-success [class^=jsconfirm-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.jsconfirm-popup.jsconfirm-toast .jsconfirm-success .jsconfirm-success-ring{width:2em;height:2em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-success .jsconfirm-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-success [class^=jsconfirm-success-line]{height:.3125em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-success [class^=jsconfirm-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-success [class^=jsconfirm-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.jsconfirm-popup.jsconfirm-toast .jsconfirm-success.jsconfirm-icon-show .jsconfirm-success-line-tip{animation:jsconfirm-toast-animate-success-line-tip .75s}.jsconfirm-popup.jsconfirm-toast .jsconfirm-success.jsconfirm-icon-show .jsconfirm-success-line-long{animation:jsconfirm-toast-animate-success-line-long .75s}.jsconfirm-popup.jsconfirm-toast.jsconfirm-show{animation:jsconfirm-toast-show .5s}.jsconfirm-popup.jsconfirm-toast.jsconfirm-hide{animation:jsconfirm-toast-hide .1s forwards}.jsconfirm-popup{box-shadow:0 0 20px 10px rgba(0,0,0,.6),inset 1px -1px 0 1px rgba(0,0,0,.6);border-radius:16px;position:relative;width:401px;overflow:hidden;min-width:max-content}.jsconfirm-body{border-radius:16px 16px 0 0;position:relative;background-color:#333;display:flex;flex-wrap:nowrap;flex-direction:column;gap:10px;justify-content:flex-start;padding:10px;z-index:4;max-height:80dvh}.jsconfirm-close{background-color:rgba(255,255,255,.3);position:absolute;top:0;right:0;width:70px;height:35px;border-bottom-left-radius:16px;border-top-right-radius:16px;box-shadow:-6px 6px 0 6px #333;transition:background-color 400ms ease-in-out,color 400ms ease-in-out;align-items:center;justify-content:center;appearance:none;color:#fff;border-width:0}.jsconfirm-close:hover{background-color:#e90000}.jsconfirm-close:focus,.jsconfirm-close:focus-visible,.jsconfirm-close::-moz-focus-inner{outline:none;background-color:#e90000}.modal-animated .jsconfirm-body{animation-duration:2s;animation-iteration-count:infinite}.modal-blue .jsconfirm-body{border-top:solid 7px #00e1ff;animation-name:type-blue}.modal-blue .jsconfirm-close:hover,.modal-blue .jsconfirm-close:focus,.modal-blue .jsconfirm-close:focus-visible{outline:none;background-color:#00e1ff}.modal-green .jsconfirm-body{border-top:solid 7px #66f500;animation-name:type-green}.modal-green .jsconfirm-close:hover,.modal-green .jsconfirm-close:focus,.modal-green .jsconfirm-close:focus-visible{outline:none;background-color:#66f500}.modal-red .jsconfirm-body{border-top:solid 7px #e90000;animation-name:type-red}.modal-red .jsconfirm-close:hover,.modal-red .jsconfirm-close:focus,.modal-red .jsconfirm-close:focus-visible{outline:none;background-color:#e90000}.modal-yellow .jsconfirm-body{border-top:solid 7px #ffc107;animation-name:type-yellow}.modal-yellow .jsconfirm-close:hover,.modal-yellow .jsconfirm-close:focus,.modal-yellow .jsconfirm-close:focus-visible{outline:none;background-color:#ffc107}.modal-purple .jsconfirm-body{border-top:solid 7px #9954bb;animation-name:type-purple}.modal-purple .jsconfirm-close:hover,.modal-purple .jsconfirm-close:focus,.modal-purple .jsconfirm-close:focus-visible{outline:none;background-color:#9954bb}.modal-dark .jsconfirm-body{border-top:solid 7px #222;animation-name:type-dark}.modal-dark .jsconfirm-close:hover,.modal-dark .jsconfirm-close:focus,.modal-dark .jsconfirm-close:focus-visible{outline:none;background-color:#222}.modal-light .jsconfirm-body{border-top:solid 7px #e5e5e5;animation-name:type-light}.modal-light .jsconfirm-close:hover,.modal-light .jsconfirm-close:focus,.modal-light .jsconfirm-close:focus-visible{outline:none;background-color:#e5e5e5;color:#222}.modal-shake{animation:shake .82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both !important}.modal-title{display:flex;font-size:22px;line-height:0px;user-select:none;align-items:center;cursor:default;padding-bottom:10px}.jsconfirm-clip{clip-path:polygon(calc(100% - 70px) -2%, calc(100% - 70px) 19px, calc(100% - 69px) 25px, calc(100% - 68px) 27px, calc(100% - 67px) 29px, calc(100% - 66px) 30px, calc(100% - 65px) 31px, calc(100% - 64px) 32px, calc(100% - 62px) 33px, calc(100% - 60px) 34px, calc(100% - 54px) 35px, 102% 35px, 102% calc(102% + 150px), -2% calc(102% + 150px), -2% -2%)}.jsconfirm-header-row{display:flex;align-items:center;gap:10px}.jsconfirm-actions{display:flex;gap:10px;justify-content:flex-end}.jsconfirm-actions button{height:30px;font-size:14px;font-weight:600;border-radius:6px;display:flex;justify-content:center;align-items:center;padding:0 12px;touch-action:manipulation;cursor:pointer;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);border:1px solid rgba(0,0,0,0);background-image:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.jsconfirm-actions button.btn-blue{background-color:#00e1ff;color:#000;text-shadow:none;transition:background .2s}.jsconfirm-actions button.btn-blue:hover{background-color:#00b4cc;color:#000}.jsconfirm-actions button.btn-blue:focus,.jsconfirm-actions button.btn-blue:focus-visible{outline:none;box-shadow:0 0 0 1px currentColor,0 0 0 3px #00e1ff;border:1px solid currentColor}.jsconfirm-actions button.btn-green{background-color:#66f500;color:#000;text-shadow:none;transition:background .2s}.jsconfirm-actions button.btn-green:hover{background-color:#52c400;color:#000}.jsconfirm-actions button.btn-green:focus,.jsconfirm-actions button.btn-green:focus-visible{outline:none;box-shadow:0 0 0 1px currentColor,0 0 0 3px #66f500;border:1px solid currentColor}.jsconfirm-actions button.btn-red{background-color:#e90000;color:#000;text-shadow:none;transition:background .2s}.jsconfirm-actions button.btn-red:hover{background-color:#ba0000;color:#000}.jsconfirm-actions button.btn-red:focus,.jsconfirm-actions button.btn-red:focus-visible{outline:none;box-shadow:0 0 0 1px currentColor,0 0 0 3px #e90000;border:1px solid currentColor}.jsconfirm-actions button.btn-yellow{background-color:#ffc107;color:#000;text-shadow:none;transition:background .2s}.jsconfirm-actions button.btn-yellow:hover{background-color:#cc9a06;color:#000}.jsconfirm-actions button.btn-yellow:focus,.jsconfirm-actions button.btn-yellow:focus-visible{outline:none;box-shadow:0 0 0 1px currentColor,0 0 0 3px #ffc107;border:1px solid currentColor}.jsconfirm-actions button.btn-purple{background-color:#9954bb;color:#fff;text-shadow:none;transition:background .2s}.jsconfirm-actions button.btn-purple:hover{background-color:#7a4396;color:#fff}.jsconfirm-actions button.btn-purple:focus,.jsconfirm-actions button.btn-purple:focus-visible{outline:none;box-shadow:0 0 0 1px currentColor,0 0 0 3px #9954bb;border:1px solid currentColor}.jsconfirm-actions button.btn-dark{background-color:#222;color:#fff;text-shadow:none;transition:background .2s}.jsconfirm-actions button.btn-dark:hover{background-color:#111;color:#fff}.jsconfirm-actions button.btn-dark:focus,.jsconfirm-actions button.btn-dark:focus-visible{outline:none;box-shadow:0 0 0 1px currentColor,0 0 0 3px #222;border:1px solid currentColor}.jsconfirm-actions button.btn-light{background-color:#e5e5e5;color:#000;text-shadow:none;transition:background .2s}.jsconfirm-actions button.btn-light:hover{background-color:#b7b7b7;color:#000}.jsconfirm-actions button.btn-light:focus,.jsconfirm-actions button.btn-light:focus-visible{outline:none;box-shadow:0 0 0 1px currentColor,0 0 0 3px #e5e5e5;border:1px solid currentColor}div:where(.jsconfirm-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);width:100dvw;height:100dvh;padding:.625em;backdrop-filter:none;overflow-x:hidden;overflow:hidden;scrollbar-width:none;transition:backdrop-filter 500ms,background-color 500ms;-webkit-overflow-scrolling:touch}div:where(.jsconfirm-container).jsconfirm-backdrop-show,div:where(.jsconfirm-container).jsconfirm-noanimation{background:rgba(24,24,24,.6);backdrop-filter:blur(8px)}div:where(.jsconfirm-container).jsconfirm-backdrop-hide{backdrop-filter:none;background:rgba(0,0,0,0) !important}div:where(.jsconfirm-container).jsconfirm-top-start,div:where(.jsconfirm-container).jsconfirm-center-start,div:where(.jsconfirm-container).jsconfirm-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.jsconfirm-container).jsconfirm-top,div:where(.jsconfirm-container).jsconfirm-center,div:where(.jsconfirm-container).jsconfirm-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.jsconfirm-container).jsconfirm-top-end,div:where(.jsconfirm-container).jsconfirm-center-end,div:where(.jsconfirm-container).jsconfirm-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.jsconfirm-container).jsconfirm-top-start>.jsconfirm-popup{align-self:start}div:where(.jsconfirm-container).jsconfirm-top>.jsconfirm-popup{grid-column:2;align-self:start;justify-self:center}div:where(.jsconfirm-container).jsconfirm-top-end>.jsconfirm-popup,div:where(.jsconfirm-container).jsconfirm-top-right>.jsconfirm-popup{grid-column:3;align-self:start;justify-self:end}div:where(.jsconfirm-container).jsconfirm-center-start>.jsconfirm-popup,div:where(.jsconfirm-container).jsconfirm-center-left>.jsconfirm-popup{grid-row:2;align-self:center}div:where(.jsconfirm-container).jsconfirm-center>.jsconfirm-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}div:where(.jsconfirm-container).jsconfirm-center-end>.jsconfirm-popup,div:where(.jsconfirm-container).jsconfirm-center-right>.jsconfirm-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}div:where(.jsconfirm-container).jsconfirm-bottom-start>.jsconfirm-popup,div:where(.jsconfirm-container).jsconfirm-bottom-left>.jsconfirm-popup{grid-column:1;grid-row:3;align-self:end}div:where(.jsconfirm-container).jsconfirm-bottom>.jsconfirm-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}div:where(.jsconfirm-container).jsconfirm-bottom-end>.jsconfirm-popup,div:where(.jsconfirm-container).jsconfirm-bottom-right>.jsconfirm-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}div:where(.jsconfirm-container).jsconfirm-grow-row>.jsconfirm-popup,div:where(.jsconfirm-container).jsconfirm-grow-fullscreen>.jsconfirm-popup{grid-column:1/4;width:100%}div:where(.jsconfirm-container).jsconfirm-grow-column>.jsconfirm-popup,div:where(.jsconfirm-container).jsconfirm-grow-fullscreen>.jsconfirm-popup{grid-row:1/4;align-self:stretch}div:where(.jsconfirm-container).jsconfirm-no-transition{transition:none !important}div:where(.jsconfirm-container) div:where(.jsconfirm-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:32em;max-width:100%;padding:0;border:none;border-radius:5px;background:rgba(0,0,0,0);color:#fff;font-family:inherit;font-size:1rem;transform:translate3d(0, 0, 0)}div:where(.jsconfirm-container) div:where(.jsconfirm-popup):focus{outline:none}div:where(.jsconfirm-container) div:where(.jsconfirm-popup).jsconfirm-loading{overflow-y:hidden}div:where(.jsconfirm-container) h2:where(.jsconfirm-title){position:relative;max-width:100%;margin:0;padding:0 80px 0 0;color:inherit;font-size:22px;font-weight:500;text-align:center;text-transform:none;word-wrap:break-word}div:where(.jsconfirm-container) div:where(.jsconfirm-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:0;padding:0}div:where(.jsconfirm-container) div:where(.jsconfirm-actions):not(.jsconfirm-loading) .jsconfirm-styled[disabled]{opacity:.4}div:where(.jsconfirm-container) div:where(.jsconfirm-actions):not(.jsconfirm-loading) .jsconfirm-styled:hover{background-image:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))}div:where(.jsconfirm-container) div:where(.jsconfirm-actions):not(.jsconfirm-loading) .jsconfirm-styled:active{background-image:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))}div:where(.jsconfirm-container) div:where(.jsconfirm-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:jsconfirm-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.jsconfirm-container)::-moz-focus-inner{border:0}div:where(.jsconfirm-footer){margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em;text-align:center}.jsconfirm-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}div:where(.jsconfirm-timer-progress-bar){width:100%;height:.25em;background:rgba(0,0,0,.2)}img:where(.jsconfirm-image){max-width:100%;margin:2em auto 1em}.jsconfirm-html-container{z-index:1;justify-content:left;margin:0;padding:0;overflow:auto;color:inherit;font-size:16px;font-weight:400;line-height:normal;text-align:left;word-wrap:break-word;word-break:break-word}input:where(.jsconfirm-input),input:where(.jsconfirm-file),textarea:where(.jsconfirm-textarea),select:where(.jsconfirm-select),div:where(.jsconfirm-radio),label:where(.jsconfirm-checkbox){margin:1em 2em 3px}input:where(.jsconfirm-input),input:where(.jsconfirm-file),textarea:where(.jsconfirm-textarea){box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:rgba(0,0,0,0);box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(0,0,0,0);color:inherit;font-size:1.125em}input:where(.jsconfirm-input).jsconfirm-inputerror,input:where(.jsconfirm-file).jsconfirm-inputerror,textarea:where(.jsconfirm-textarea).jsconfirm-inputerror{border-color:#e90000 !important;box-shadow:0 0 2px #e90000 !important}input:where(.jsconfirm-input):focus,input:where(.jsconfirm-file):focus,textarea:where(.jsconfirm-textarea):focus{border:1px solid #b4dbed;outline:none;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}input:where(.jsconfirm-input)::placeholder,input:where(.jsconfirm-file)::placeholder,textarea:where(.jsconfirm-textarea)::placeholder{color:#ccc}.jsconfirm-range{margin:1em 2em 3px;background:rgba(0,0,0,0)}.jsconfirm-range input{width:80%}.jsconfirm-range output{width:20%;color:inherit;font-weight:600;text-align:center}.jsconfirm-range input,.jsconfirm-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.jsconfirm-input{height:2.625em;padding:0 .75em}.jsconfirm-file{width:75%;margin-right:auto;margin-left:auto;background:rgba(0,0,0,0);font-size:1.125em}.jsconfirm-textarea{height:6.75em;padding:.75em}.jsconfirm-select{min-width:50%;max-width:100%;padding:.375em .625em;background:rgba(0,0,0,0);color:inherit;font-size:1.125em}.jsconfirm-radio,.jsconfirm-checkbox{align-items:center;justify-content:center;background:rgba(0,0,0,0);color:inherit}.jsconfirm-radio label,.jsconfirm-checkbox label{margin:0 .6em;font-size:1.125em}.jsconfirm-radio input,.jsconfirm-checkbox input{flex-shrink:0;margin:0 .4em}label:where(.jsconfirm-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.jsconfirm-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}div:where(.jsconfirm-validation-message)::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#e90000;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.jsconfirm-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}.jsconfirm-progress-steps li{display:inline-block;position:relative}.jsconfirm-progress-steps .jsconfirm-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.jsconfirm-progress-steps .jsconfirm-progress-step.jsconfirm-active-progress-step{background:#2778c4}.jsconfirm-progress-steps .jsconfirm-progress-step.jsconfirm-active-progress-step~.jsconfirm-progress-step{background:#add8e6;color:#fff}.jsconfirm-progress-steps .jsconfirm-progress-step.jsconfirm-active-progress-step~.jsconfirm-progress-step-line{background:#add8e6}.jsconfirm-progress-steps .jsconfirm-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.jsconfirm-icon){position:relative;box-sizing:content-box;justify-content:center;height:35px;margin:0;cursor:default;user-select:none;transform:translateZ(0);perspective:400px}div:where(.jsconfirm-icon) .jsconfirm-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.jsconfirm-icon).jsconfirm-error{border-color:rgba(0,0,0,0);color:#e90000}div:where(.jsconfirm-icon).jsconfirm-error.jsconfirm-icon-show .error-circle{animation:animate-error-circle 1s;transform-origin:50% 50%}div:where(.jsconfirm-icon).jsconfirm-error.jsconfirm-icon-show .x-mark{animation:animate-error-x-mark 1.5s;transform-origin:50% 50%}@keyframes animate-error-circle{0%,50%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes animate-error-x-mark{0%{transform:scale(0.4) translateY(30%);opacity:0}66.6%{transform:scale(0.4) translateY(30%);opacity:0}86.58%{transform:scale(1.15) translateY(-4%)}100%{transform:scale(1) translateY(0);opacity:1}}div:where(.jsconfirm-icon).jsconfirm-warning{border-color:rgba(0,0,0,0);color:#ffc107}div:where(.jsconfirm-icon).jsconfirm-warning.jsconfirm-icon-show .warning-triangle{animation:animate-warning-triangle 1.5s ease both;transform-origin:50% 50%;stroke-dasharray:1 1}div:where(.jsconfirm-icon).jsconfirm-warning.jsconfirm-icon-show .warning-exclamation-point{animation:animate-warning-exclamation-point 2s both;transform-origin:50% 50%;stroke-dasharray:1 1}div:where(.jsconfirm-icon).jsconfirm-warning.jsconfirm-icon-show .warning-exclamation-point-stroke{animation:animate-warning-exclamation-point-stroke 2s both;transform-origin:50% 50%;stroke-dasharray:1 1}div:where(.jsconfirm-icon).jsconfirm-warning.jsconfirm-icon-show .warning-exclamation-point-dot{animation:animate-warning-exclamation-point-dot 2s both;transform-origin:50% 50%;stroke-dasharray:1 1}@keyframes animate-warning-triangle{0%,33.3%{stroke-dashoffset:-1}100%{stroke-dashoffset:0}}@keyframes animate-warning-exclamation-point{0%,60%{transform:translateY(12%)}100%{transform:translateY(0)}}@keyframes animate-warning-exclamation-point-stroke{0%,60%{stroke-dashoffset:1}100%{stroke-dashoffset:0}}@keyframes animate-warning-exclamation-point-dot{0%,60%{stroke-width:0}100%{stroke-width:50}}div:where(.jsconfirm-icon).jsconfirm-info{border-color:rgba(0,0,0,0);color:#e5e5e5}div:where(.jsconfirm-icon).jsconfirm-info.jsconfirm-icon-show .info-circle{animation:animate-info-circle 1s;transform-origin:50% 50%}div:where(.jsconfirm-icon).jsconfirm-info.jsconfirm-icon-show .i-mark{animation:animate-i-mark 1.5s;transform-origin:50% 50%}@keyframes animate-info-circle{0%,50%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes animate-i-mark{0%,33.3%{transform:rotateZ(45deg);opacity:0}50.05%{transform:rotateZ(-25deg);opacity:.4}66.7%{transform:rotateZ(15deg);opacity:.8}83.35%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateZ(0);opacity:1}}div:where(.jsconfirm-icon).jsconfirm-question{border-color:rgba(0,0,0,0);color:#00e1ff}div:where(.jsconfirm-icon).jsconfirm-question.jsconfirm-icon-show .question-circle{animation:animate-question-circle 1s;transform-origin:50% 50%}div:where(.jsconfirm-icon).jsconfirm-question.jsconfirm-icon-show .question-mark{animation:animate-question-mark 2s;transform-origin:50% 50%}@keyframes animate-question-circle{0%,50%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes animate-question-mark{0%,33.3%{opacity:0;transform:rotateY(-540deg)}100%{opacity:1;transform:rotateY(0)}}div:where(.jsconfirm-icon).jsconfirm-success{border-color:rgba(0,0,0,0);color:#66f500;backface-visibility:hidden}div:where(.jsconfirm-icon).jsconfirm-success .success-circle{stroke-dasharray:1 1;stroke-dashoffset:-1;stroke-width:50}div:where(.jsconfirm-icon).jsconfirm-success .check-mark{stroke-dasharray:10 12;stroke-dashoffset:-12;stroke-width:50}div:where(.jsconfirm-icon).jsconfirm-success.jsconfirm-icon-show .success-circle{animation:animate-success-circle 1s both;transform-origin:50% 50%}div:where(.jsconfirm-icon).jsconfirm-success.jsconfirm-icon-show .check-mark{animation:animate-success-check-mark 2s both;transform-origin:50% 50%}@keyframes animate-success-circle{0%,50%{stroke-dashoffset:-1}100%{stroke-dashoffset:0}}@keyframes animate-success-check-mark{0%,66.7%{stroke-dashoffset:-12}73.36%{stroke-dashoffset:0}80.02%{stroke-dashoffset:-1.8}86.68%{stroke-dashoffset:-0.6}93.34%{stroke-dashoffset:-1}100%{stroke-dashoffset:-0.8}}[class^=jsconfirm]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.jsconfirm-show{animation:jsconfirm-show .5s}.jsconfirm-hide{animation:jsconfirm-hide .5s forwards}.jsconfirm-noanimation{transition:none}.modalHide{animation:modalHide .5s ease forwards}.modalHideBackdrop{animation:modalHideBackdrop .5s ease forwards}.modalShow{animation:modalShow .5s ease forwards}.modalBackdrop.modalShowBackdrop{animation:modalShowBackdrop .5s ease forwards}.jsconfirm-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.jsconfirm-rtl .jsconfirm-close{margin-right:initial;margin-left:0}.jsconfirm-rtl .jsconfirm-timer-progress-bar{right:0;left:auto}@keyframes jsconfirm-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes jsconfirm-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes jsconfirm-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes jsconfirm-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes jsconfirm-show{0%,50%{opacity:0;transform:scale(0.8)}90%{transform:scale(1.05)}100%{opacity:1;transform:scale(1)}}@keyframes jsconfirm-hide{0%{transform:scale(1) t;opacity:1}100%{transform:scale(0.5);opacity:0}}@keyframes jsconfirm-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes jsconfirm-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes jsconfirm-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes jsconfirm-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes jsconfirm-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes jsconfirm-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes jsconfirm-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes jsconfirm-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes flip{0%{transform:rotateY(-540deg);opacity:0}75%{opacity:1}100%{transform:rotateY(0deg);opacity:1}}@keyframes jconfirm-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes wobble{0%{transform:rotate(45deg);opacity:0}25%{transform:rotate(-25deg);opacity:.4}50%{transform:rotate(15deg);opacity:.8}75%{transform:rotate(-5deg);opacity:1}100%{transform:rotate(0deg);opacity:1}}@keyframes shake{10%,90%{transform:translate3d(-2px, 0, 0)}20%,80%{transform:translate3d(4px, 0, 0)}30%,50%,70%{transform:translate3d(-8px, 0, 0)}40%,60%{transform:translate3d(8px, 0, 0)}}@keyframes glow{0%,100%{box-shadow:0 0 0px red}50%{box-shadow:0 0 30px red}}@keyframes type-blue{0%,100%{border-color:#00e1ff}50%{border-color:#009eb3}}@keyframes type-green{0%,100%{border-color:#66f500}50%{border-color:#52c400}}@keyframes type-red{0%,100%{border-color:#e90000}50%{border-color:#ba0000}}@keyframes type-yellow{0%,100%{border-color:#ffc107}50%{border-color:#cc9a06}}@keyframes type-purple{0%,100%{border-color:#9954bb}50%{border-color:#7a4396}}@keyframes type-dark{0%,100%{border-color:#222}50%{border-color:#4e4e4e}}@keyframes type-light{0%,100%{border-color:#e5e5e5}50%{border-color:#b7b7b7}}@keyframes modalShow{0%,50%{opacity:0;transform:scale(0.8)}90%{transform:scale(1.02)}100%{opacity:1;transform:scale(1)}}@keyframes modalHide{0%{opacity:1;transform:scale(1)}10%{transform:scale(1.02)}50%,100%{opacity:0;transform:scale(0.8)}}@keyframes modalShowBackdrop{0%{opacity:0;transform:translate(0px, 0px)}50%,100%{opacity:1}}@keyframes modalHideBackdrop{0%,50%{opacity:1}99%{opacity:0;transform:translate(0px, 0px)}100%{opacity:0;opacity:0;transform:translate(-100%, 0px)}}body.jsconfirm-no-backdrop .jsconfirm-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.jsconfirm-no-backdrop .jsconfirm-container .jsconfirm-popup{pointer-events:all}body.jsconfirm-no-backdrop .jsconfirm-container .jsconfirm-modal{box-shadow:0 0 10px rgba(24,24,24,.6)}@media print{body.jsconfirm-shown:not(.jsconfirm-no-backdrop):not(.jsconfirm-toast-shown){overflow-y:scroll !important}body.jsconfirm-shown:not(.jsconfirm-no-backdrop):not(.jsconfirm-toast-shown)>[aria-hidden=true]{display:none}body.jsconfirm-shown:not(.jsconfirm-no-backdrop):not(.jsconfirm-toast-shown) .jsconfirm-container{position:static !important}}body.jsconfirm-toast-shown .jsconfirm-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-top-end,body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-top-right{inset:0 0 auto auto}body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-top-start,body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-top-left{inset:0 auto auto 0}body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-center-start,body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-center-end,body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-bottom-start,body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-bottom-left{inset:auto auto 0 0}body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-bottom-end,body.jsconfirm-toast-shown .jsconfirm-container.jsconfirm-bottom-right{inset:auto 0 0 auto}");