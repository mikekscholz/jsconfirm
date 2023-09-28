/// <reference types="cypress" />

import { $, Jsc } from '../../utils'

describe('getIcon()', () => {
  it('getIcon()', () => {
    Jsc.fire({ icon: 'success' })
    expect(Jsc.getIcon()).to.equal($('.jsc-success'))
  })

  it('getIconContent()', () => {
    Jsc.fire({ icon: 'success', iconHtml: 'hey' })
    expect(Jsc.getIcon()).to.equal($('.jsc-success'))
    expect(Jsc.getIconContent()).to.equal($('.jsc-success .jsc-icon-content'))
    expect(Jsc.getIconContent().innerHTML).to.equal('hey')
  })
})
