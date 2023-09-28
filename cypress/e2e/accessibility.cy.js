/// <reference types="cypress" />

import { Jsc, JscWithoutAnimation, triggerKeydownEvent } from '../utils'
import { RESTORE_FOCUS_TIMEOUT } from '../../src/constants'

describe('Accessibility:', () => {
  it('should restore focus', (done) => {
    const button = document.createElement('button')
    button.innerText = 'I am focused'
    document.body.appendChild(button)
    button.focus()

    JscWithoutAnimation.fire('jsc 1')
    JscWithoutAnimation.fire('jsc 2')
    Jsc.clickConfirm()

    setTimeout(() => {
      expect(document.activeElement).to.equal(button)
      document.body.removeChild(button)
      done()
    }, RESTORE_FOCUS_TIMEOUT)
  })

  it('should not restore focus when returnFocus set to false', (done) => {
    const button = document.createElement('button')
    button.innerText = 'I am focused'
    document.body.appendChild(button)
    button.focus()

    JscWithoutAnimation.fire({
      returnFocus: false,
    })
    Jsc.clickConfirm()

    setTimeout(() => {
      expect(document.activeElement).to.equal(document.body)
      document.body.removeChild(button)
      done()
    }, RESTORE_FOCUS_TIMEOUT)
  })

  it('should focus body in there is not previuos active element', (done) => {
    JscWithoutAnimation.fire('I was called programmatically and will focus body after closing')
    Jsc.clickConfirm()

    setTimeout(() => {
      expect(document.activeElement).to.equal(document.body)
      done()
    }, RESTORE_FOCUS_TIMEOUT)
  })

  it('should set aria-hidden="true" to all body children if modal', () => {
    const div = document.createElement('div')
    const divAriaHiddenFalse = document.createElement('div')
    divAriaHiddenFalse.setAttribute('aria-hidden', 'false')
    document.body.appendChild(div)
    document.body.appendChild(divAriaHiddenFalse)

    JscWithoutAnimation.fire({})
    expect(div.getAttribute('aria-hidden')).to.equal('true')
    expect(divAriaHiddenFalse.getAttribute('aria-hidden')).to.equal('true')

    Jsc.close()
    expect(div.hasAttribute('aria-hidden')).to.be.false
    expect(divAriaHiddenFalse.getAttribute('aria-hidden')).to.equal('false')
  })

  it('should not set aria-hidden="true" on the custom container (target)', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    JscWithoutAnimation.fire({
      target: div,
    })
    expect(div.hasAttribute('aria-hidden')).to.be.false
  })

  it('should not set aria-hidden="true" when `backdrop: false`', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    JscWithoutAnimation.fire({
      backdrop: false,
    })
    expect(div.hasAttribute('aria-hidden')).to.be.false
  })

  it('should not set aria-hidden="true" when `toast: true`', (done) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const divAriaHiddenTrue = document.createElement('div')
    divAriaHiddenTrue.setAttribute('aria-hidden', 'true')
    document.body.appendChild(divAriaHiddenTrue)
    JscWithoutAnimation.fire({
      toast: true,
      didClose: () => {
        expect(divAriaHiddenTrue.getAttribute('aria-hidden')).to.equal('true')
        done()
      },
    })
    expect(div.hasAttribute('aria-hidden')).to.be.false
    Jsc.close()
  })

  it('should unset aria-hidden="true" when two modals are called one after another', (done) => {
    const div = document.createElement('div')
    div.setAttribute('aria-hidden', 'true')
    document.body.appendChild(div)
    Jsc.fire({
      didClose: () => {
        Jsc.fire({
          didClose: () => {
            expect(div.hasAttribute('aria-hidden')).to.be.true
            done()
          },
        })
        Jsc.close()
      },
    })
    Jsc.close()
  })

  it('should unset aria-hidden="true" when modal is called twice', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    JscWithoutAnimation.fire()
    JscWithoutAnimation.fire()
    JscWithoutAnimation.close()
    expect(div.hasAttribute('aria-hidden')).to.be.false
  })

  it('should set modal ARIA attributes', () => {
    Jsc.fire('Modal dialog')
    expect(Jsc.getPopup().getAttribute('role')).to.equal('dialog')
    expect(Jsc.getPopup().getAttribute('aria-live')).to.equal('assertive')
    expect(Jsc.getPopup().getAttribute('aria-modal')).to.equal('true')
  })

  it('should set toast ARIA attributes', () => {
    Jsc.fire({ title: 'Toast', toast: true })
    expect(Jsc.getPopup().getAttribute('role')).to.equal('alert')
    expect(Jsc.getPopup().getAttribute('aria-live')).to.equal('polite')
    expect(Jsc.getPopup().getAttribute('aria-modal')).to.be.null
  })
})

describe('should trap focus in modals', () => {
  it('focus trap forward', (done) => {
    Jsc.fire({
      input: 'text',
      showDenyButton: true,
      showCancelButton: true,
      showCloseButton: true,
      didOpen: () => {
        expect(document.activeElement).to.equal(Jsc.getInput())
        triggerKeydownEvent(document.activeElement, 'Tab')
        expect(document.activeElement).to.equal(Jsc.getConfirmButton())
        triggerKeydownEvent(document.activeElement, 'Tab')
        expect(document.activeElement).to.equal(Jsc.getDenyButton())
        triggerKeydownEvent(document.activeElement, 'Tab')
        expect(document.activeElement).to.equal(Jsc.getCancelButton())
        triggerKeydownEvent(document.activeElement, 'Tab')
        expect(document.activeElement).to.equal(Jsc.getCloseButton())
        triggerKeydownEvent(document.activeElement, 'Tab')
        expect(document.activeElement).to.equal(Jsc.getInput())
        done()
      },
    })
  })

  it('focus trap backward', (done) => {
    Jsc.fire({
      input: 'text',
      showDenyButton: true,
      showCancelButton: true,
      showCloseButton: true,
      didOpen: () => {
        expect(document.activeElement).to.equal(Jsc.getInput())
        triggerKeydownEvent(document.activeElement, 'Tab', { shiftKey: true })
        expect(document.activeElement).to.equal(Jsc.getCloseButton())
        triggerKeydownEvent(document.activeElement, 'Tab', { shiftKey: true })
        expect(document.activeElement).to.equal(Jsc.getCancelButton())
        triggerKeydownEvent(document.activeElement, 'Tab', { shiftKey: true })
        expect(document.activeElement).to.equal(Jsc.getDenyButton())
        triggerKeydownEvent(document.activeElement, 'Tab', { shiftKey: true })
        expect(document.activeElement).to.equal(Jsc.getConfirmButton())
        triggerKeydownEvent(document.activeElement, 'Tab', { shiftKey: true })
        expect(document.activeElement).to.equal(Jsc.getInput())
        done()
      },
    })
  })

  it('arrow keys with Confirm, Cancel buttons', (done) => {
    Jsc.fire({
      showCancelButton: true,
      didOpen: () => {
        triggerKeydownEvent(document.activeElement, 'ArrowRight')
        expect(document.activeElement).to.equal(Jsc.getCancelButton())
        triggerKeydownEvent(document.activeElement, 'ArrowLeft')
        expect(document.activeElement).to.equal(Jsc.getConfirmButton())
        done()
      },
    })
  })

  it('arrow keys with Confirm, Cancel, Deny buttons', (done) => {
    Jsc.fire({
      showDenyButton: true,
      showCancelButton: true,
      didOpen: () => {
        triggerKeydownEvent(document.activeElement, 'ArrowRight')
        expect(document.activeElement).to.equal(Jsc.getDenyButton())
        triggerKeydownEvent(document.activeElement, 'ArrowRight')
        expect(document.activeElement).to.equal(Jsc.getCancelButton())
        triggerKeydownEvent(document.activeElement, 'ArrowLeft')
        expect(document.activeElement).to.equal(Jsc.getDenyButton())
        triggerKeydownEvent(document.activeElement, 'ArrowLeft')
        expect(document.activeElement).to.equal(Jsc.getConfirmButton())
        done()
      },
    })
  })
})

describe('Focus', () => {
  it('default focus', (done) => {
    JscWithoutAnimation.fire('Modal with the Confirm button only')
    expect(document.activeElement).to.equal(document.querySelector('.jsc-confirm'))
    JscWithoutAnimation.fire({
      text: 'Modal with two buttons',
      showCancelButton: true,
    })
    expect(document.activeElement).to.equal(document.querySelector('.jsc-confirm'))
    JscWithoutAnimation.fire({
      text: 'Modal with no focusable elements in it',
      showConfirmButton: false,
    })
    expect(document.activeElement).to.equal(document.querySelector('.jsc-modal'))
    JscWithoutAnimation.fire({
      text: 'Modal with an input',
      input: 'text',
      didOpen: () => {
        expect(document.activeElement).to.equal(document.querySelector('.jsc-input'))
        done()
      },
    })
  })

  it('focusConfirm', () => {
    Jsc.fire({
      showCancelButton: true,
    })
    expect(document.activeElement).to.equal(Jsc.getConfirmButton())
    const anchor = document.createElement('a')
    anchor.innerText = 'link'
    anchor.href = ''
    Jsc.fire({
      html: anchor,
      showCancelButton: true,
      focusConfirm: false,
    })
    expect(document.activeElement.outerHTML).to.equal(anchor.outerHTML)
  })

  it('focusCancel', () => {
    Jsc.fire({
      text: 'Modal with Cancel button focused',
      showCancelButton: true,
      focusCancel: true,
    })
    expect(document.activeElement).to.equal(Jsc.getCancelButton())
  })

  it('focusDeny', () => {
    Jsc.fire({
      text: 'Modal with Deny button focused',
      showDenyButton: true,
      focusDeny: true,
    })
    expect(document.activeElement).to.equal(Jsc.getDenyButton())
  })
})
