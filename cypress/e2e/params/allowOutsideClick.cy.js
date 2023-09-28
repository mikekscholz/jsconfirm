/// <reference types="cypress" />

import { Jsc, JscWithoutAnimation, TIMEOUT } from '../../utils'

describe('allowOutsideClick', () => {
  it('allowOutsideClick: false', (done) => {
    JscWithoutAnimation.fire({
      title: 'allowOutsideClick: false',
      allowOutsideClick: false,
    })
    Jsc.getContainer().click()
    setTimeout(() => {
      expect(Jsc.isVisible()).to.be.true
      done()
    })
  })

  it('allowOutsideClick: () => !jsc.isLoading()', (done) => {
    JscWithoutAnimation.fire({
      title: 'allowOutsideClick: () => !jsc.isLoading()',
      allowOutsideClick: () => !Jsc.isLoading(),
    }).then((result) => {
      expect(result).to.eql({
        dismiss: Jsc.DismissReason.backdrop,
        isConfirmed: false,
        isDenied: false,
        isDismissed: true,
      })
      done()
    })
    Jsc.showLoading()
    Jsc.getContainer().click()
    setTimeout(() => {
      expect(Jsc.isVisible()).to.be.true
      Jsc.hideLoading()
      Jsc.getContainer().click()
    }, TIMEOUT)
  })

  it('should throw console warning for { backdrop: false, allowOutsideClick: true }', () => {
    const spy = cy.spy(console, 'warn')
    JscWithoutAnimation.fire({
      title: 'allowOutsideClick is not compatible with modeless popups',
      allowOutsideClick: true,
      backdrop: false,
    })
    expect(
      spy.calledWith('JsConfirm: "allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`')
    ).to.be.true
  })

  it('should not throw console warning for { allowOutsideClick: true }', () => {
    const spy = cy.spy(console, 'warn')
    JscWithoutAnimation.fire({
      allowOutsideClick: true,
    })
    expect(spy.notCalled).to.be.true
  })

  it('should not throw console warning for { backdrop: false }', () => {
    const spy = cy.spy(console, 'warn')
    JscWithoutAnimation.fire({
      backdrop: false,
    })
    expect(spy.notCalled).to.be.true
  })
})
