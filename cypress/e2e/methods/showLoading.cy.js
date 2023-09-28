/// <reference types="cypress" />

import { isVisible } from '../../../src/utils/dom'
import { $, Jsc, ensureClosed, isHidden } from '../../utils'

describe('showLoading() and hideLoading()', () => {
  it('showLoading() and hideLoading()', () => {
    Jsc.showLoading()
    expect(Jsc.getActions().classList.contains('jsc-loading')).to.be.true

    Jsc.hideLoading()
    expect(Jsc.getActions().classList.contains('jsc-loading')).to.be.false

    Jsc.fire({
      title: 'test loading state',
      showConfirmButton: false,
    })

    Jsc.showLoading()
    expect(isVisible(Jsc.getActions())).to.be.true
    expect(Jsc.getActions().classList.contains('jsc-loading')).to.be.true

    Jsc.hideLoading()
    expect(isVisible(Jsc.getActions())).to.be.false
    expect(Jsc.getActions().classList.contains('jsc-loading')).to.be.false
  })

  it('hideLoading()', () => {
    ensureClosed()
    Jsc.hideLoading()
    expect(Jsc.isVisible()).to.be.false
  })

  it('should open an empty popup with loader', () => {
    ensureClosed()
    Jsc.showLoading()
    expect(Jsc.isVisible()).to.be.true
    expect(Jsc.getActions().classList.contains('jsc-loading')).to.be.true
    expect(isVisible($('.jsc-loader'))).to.be.true
    expect($('.jsc-loader').innerHTML).to.equal('')
  })

  it('showConfirmButton: false + showLoading()', (done) => {
    Jsc.fire({
      showConfirmButton: false,
      loaderHtml: '<i>hi</i>',
      didOpen: () => {
        expect(isHidden(Jsc.getActions())).to.be.true
        Jsc.showLoading()
        expect(isVisible(Jsc.getActions())).to.be.true
        expect(Jsc.getActions().classList.contains('jsc-loading')).to.be.true
        expect(isVisible($('.jsc-loader'))).to.be.true
        expect($('.jsc-loader').innerHTML).to.equal('<i>hi</i>')
        expect(isHidden(Jsc.getConfirmButton())).to.be.true
        expect(isHidden(Jsc.getCancelButton())).to.be.true
        done()
      },
    })
  })
})
