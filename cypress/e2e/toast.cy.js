/// <reference types="cypress" />

import { Jsc, JscWithoutAnimation } from '../utils'

const Toast = JscWithoutAnimation.mixin({ toast: true })
const ToastWithoutAnimation = JscWithoutAnimation.mixin({ toast: true })

describe('Toast', () => {
  it('.jsc-toast-shown', () => {
    Toast.fire()
    expect(document.body.classList.contains('jsc-toast-shown')).to.be.true
    expect(document.documentElement.classList.contains('jsc-toast-shown')).to.be.true
    Jsc.fire()
    expect(document.body.classList.contains('jsc-toast-shown')).to.be.false
    expect(document.documentElement.classList.contains('jsc-toast-shown')).to.be.false
  })

  it('should throw console warnings for incompatible parameters', () => {
    const _consoleWarn = console.warn
    const spy = cy.spy(console, 'warn')

    Toast.fire({
      allowOutsideClick: true,
    })
    expect(spy.calledWith('JsConfirm: The parameter "allowOutsideClick" is incompatible with toasts')).to.be.true

    console.warn = _consoleWarn
  })

  it('toast click closes when no buttons or input are specified', (done) => {
    Toast.fire({
      showConfirmButton: false,
    }).then((result) => {
      expect(result).to.eql({
        dismiss: Toast.DismissReason.close,
        isConfirmed: false,
        isDenied: false,
        isDismissed: true,
      })
      done()
    })
    Toast.getPopup().click()
  })

  it('toast click does not close if cancel button is present', (done) => {
    ToastWithoutAnimation.fire({
      showConfirmButton: false,
      showCancelButton: true,
    })
    Toast.getPopup().click()
    setTimeout(() => {
      expect(Toast.isVisible()).to.be.true
      done()
    })
  })

  it('toast click does not close if input option is specified', (done) => {
    ToastWithoutAnimation.fire({
      showConfirmButton: false,
      showCancelButton: false,
      input: 'text',
    })
    Toast.getPopup().click()
    setTimeout(() => {
      expect(Toast.isVisible()).to.be.true
      done()
    })
  })

  it('Body classes are removed after closing toats', (done) => {
    Toast.fire({
      didOpen: () => {
        Toast.close()
      },
      didClose: () => {
        expect(document.body.classList.contains('jsc-shown')).to.be.false
        expect(document.body.classList.contains('jsc-toast-shown')).to.be.false
        done()
      },
    })
  })

  it('Percentage width should work for toasts', () => {
    const targetDiv = document.createElement('div')
    document.body.appendChild(targetDiv)
    targetDiv.style.width = '300px'
    targetDiv.style.position = 'relative'

    ToastWithoutAnimation.fire({
      target: targetDiv,
      width: '50%',
    })

    Jsc.getContainer().style.position = 'absolute'
    expect(window.getComputedStyle(Jsc.getContainer()).width).to.equal('150px')
  })

  it('Should be possible to reverse buttons', () => {
    Jsc.fire({
      toast: true,
      showCancelButton: true,
      reverseButtons: true,
    })
    expect(Jsc.getCancelButton().nextElementSibling.innerText).to.equal('No')
    expect(Jsc.getCancelButton().nextElementSibling.nextElementSibling.innerText).to.equal('OK')
  })
})
