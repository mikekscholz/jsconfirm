/// <reference types="cypress" />

import { isVisible } from '../../../src/utils/dom'
import { Jsc, JscWithoutAnimation, isHidden } from '../../utils'
import { iconTypes, jscClasses } from '../../../src/utils/classes'

describe('icon', () => {
  it('The popup should have the icon class', () => {
    for (const icon in iconTypes) {
      JscWithoutAnimation.fire({ icon })
      expect(Jsc.getPopup().classList.contains(jscClasses[`icon-${icon}`])).to.be.true
    }
  })

  it('should throw console error about invalid icon', () => {
    const spy = cy.spy(console, 'error')
    Jsc.fire({
      icon: 'invalid-icon',
    })
    expect(
      spy.calledWith(
        'JsConfirm: Unknown icon! Expected "success", "error", "warning", "info" or "question", got "invalid-icon"'
      )
    ).to.be.true

    // should behave the same way as empty object would be passed
    expect(isVisible(Jsc.getConfirmButton())).to.be.true
    expect(isHidden(Jsc.getCancelButton())).to.be.true
    expect(Jsc.getTitle().textContent).to.equal('')
    expect(Jsc.getHtmlContainer().textContent).to.equal('')
    expect(isHidden(Jsc.getFooter())).to.be.true
  })

  it('Success icon with custom HTML (iconHtml)', () => {
    Jsc.fire({
      icon: 'success',
      iconHtml: '<i class="fa fa-circle"></i>',
    })

    expect(Jsc.getIcon().innerHTML).to.equal('<div class="jsc-icon-content"><i class="fa fa-circle"></i></div>')
  })

  it('Undefined icon with custom HTML (iconHtml)', () => {
    Jsc.fire({
      icon: undefined,
      iconHtml: '<i class="fa fa-circle"></i>',
    })

    expect(Jsc.getIcon().innerHTML).to.equal('<div class="jsc-icon-content"><i class="fa fa-circle"></i></div>')
  })

  it('Question icon with custom color (iconColor)', () => {
    JscWithoutAnimation.fire({
      icon: 'question',
      iconColor: 'red',
    })
    expect(Jsc.getIcon().style.color).to.equal('red')
    expect(Jsc.getIcon().style.borderColor).to.equal('red')
  })
})
