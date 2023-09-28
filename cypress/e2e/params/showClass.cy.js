/// <reference types="cypress" />

import { Jsc } from '../../utils'

describe('showClass', () => {
  it('showClass + hideClass', (done) => {
    Jsc.fire({
      title: 'Custom animation with Animate.css',
      showClass: {
        popup: 'animated fadeInDown faster',
      },
      hideClass: {
        popup: 'animated fadeOutUp faster',
      },
      didClose: () => {
        expect(Jsc.isVisible()).to.be.false
        done()
      },
    })
    Jsc.close()
  })
})
