/// <reference types="cypress" />

import { Jsc, JscWithoutAnimation } from '../../utils'

describe('progressSteps', () => {
  it('current .jsc-progress-step', (done) => {
    JscWithoutAnimation.fire({
      progressSteps: ['1', '2', '3'],
      currentProgressStep: 0,
      didOpen: () => {
        expect(
          Jsc.getProgressSteps().querySelector('.jsc-progress-step').classList.contains('jsc-active-progress-step')
        ).to.be.true
        done()
      },
    })
  })
})
