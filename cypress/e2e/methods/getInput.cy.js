/// <reference types="cypress" />

import { Jsc, JscWithoutAnimation, TIMEOUT } from '../../utils'

describe('getInput()', () => {
  it('Jsc.getInput() should return null when a popup is disposed', (done) => {
    JscWithoutAnimation.fire({
      input: 'text',
      didClose: () => {
        setTimeout(() => {
          expect(Jsc.getInput()).to.be.null
          done()
        }, TIMEOUT)
      },
    })
    Jsc.close()
  })

  it('Jsc.getInput() should be available in .then()', (done) => {
    JscWithoutAnimation.fire({
      input: 'text',
    }).then(() => {
      expect(Jsc.getInput()).to.not.be.null
      done()
    })
    Jsc.close()
  })
})
