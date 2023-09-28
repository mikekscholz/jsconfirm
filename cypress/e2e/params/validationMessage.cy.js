/// <reference types="cypress" />

import { isVisible } from '../../../src/utils/dom'
import { Jsc, JscWithoutAnimation, TIMEOUT } from '../../utils'

describe('validationMessage', () => {
  it('input: email + validationMessage', (done) => {
    JscWithoutAnimation.fire({
      input: 'email',
      validationMessage: 'custom email validation message',
    })
    Jsc.clickConfirm()
    setTimeout(() => {
      expect(isVisible(Jsc.getValidationMessage())).to.be.true
      expect(Jsc.getValidationMessage().textContent).to.equal('custom email validation message')
      done()
    }, TIMEOUT)
  })

  it('input: url + validationMessage', (done) => {
    JscWithoutAnimation.fire({
      input: 'url',
      validationMessage: 'custom url validation message',
    })
    Jsc.clickConfirm()
    setTimeout(() => {
      expect(isVisible(Jsc.getValidationMessage())).to.be.true
      expect(Jsc.getValidationMessage().textContent).to.equal('custom url validation message')
      done()
    }, TIMEOUT)
  })
})
