/// <reference types="cypress" />

import { JscWithoutAnimation, triggerKeydownEvent } from '../../utils'

describe('progressSteps', () => {
  it('stopKeydownPropagation', (done) => {
    document.body.addEventListener('keydown', (e) => {
      expect(e.key).to.equal('Escape')
      done()
    })

    JscWithoutAnimation.fire({
      title: 'Esc me and I will propagate keydown',
      didOpen: () => triggerKeydownEvent(JscWithoutAnimation.getPopup(), 'Escape'),
      stopKeydownPropagation: false,
    })
  })
})
