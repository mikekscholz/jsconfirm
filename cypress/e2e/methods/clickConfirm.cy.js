/// <reference types="cypress" />

import { $, Jsc, JscWithoutAnimation } from '../../utils'

describe('clickConfirm()', () => {
  it('clickConfirm() should click the confirm button', (done) => {
    Jsc.fire({
      input: 'radio',
      inputOptions: {
        one: 'one',
        two: 'two',
      },
    }).then((result) => {
      expect(result).to.eql({
        value: 'two',
        isConfirmed: true,
        isDenied: false,
        isDismissed: false,
      })
      done()
    })
    $('.jsc-radio').querySelector('input[value="two"]').checked = true
    Jsc.clickConfirm()
  })

  it('clickConfirm() should not fail if a popup is not visible', () => {
    JscWithoutAnimation.fire()
    Jsc.close()
    expect(Jsc.isVisible()).to.be.false
    Jsc.clickConfirm()
  })
})
