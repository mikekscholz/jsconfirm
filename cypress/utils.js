import Jsc from '../src/jsconfirm'
import { isVisible } from '../src/utils/dom'

export { default as Jsc } from '../src/jsconfirm'

export const $ = document.querySelector.bind(document)

export const isHidden = (elem) => !isVisible(elem)

export const TIMEOUT = 10

// We *only* access `Jsc` through this module, so that we can be sure `initialJscPropNames` is set properly
export const JscWithoutAnimation = Jsc.mixin({
  showClass: {
    container: '',
    popup: '',
    icon: '',
  },
  hideClass: {
    container: '',
    popup: '',
    icon: '',
  },
})

export const dispatchCustomEvent = (elem, eventName, eventDetail = {}) => {
  const event = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    detail: eventDetail,
  })
  elem.dispatchEvent(event)
}

export const triggerKeydownEvent = (target, key, params = {}) => {
  const event = document.createEvent('HTMLEvents')
  event.key = key
  event.initEvent(
    'keydown',
    true, // bubbles
    true // cancelable
  )
  for (const param in params) {
    event[param] = params[param]
  }
  target.dispatchEvent(event)
}

export const ensureClosed = () => {
  JscWithoutAnimation.fire()
  JscWithoutAnimation.close()
}
