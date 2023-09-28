/// <reference types="cypress" />

import { Jsc, JscWithoutAnimation } from '../../utils'

describe('preConfirm', () => {
  it('preConfirm return false', () => {
    JscWithoutAnimation.fire({
      preConfirm: () => false,
    })
    Jsc.clickConfirm()
    expect(Jsc.isVisible()).to.be.true
  })

  it('preConfirm custom value', (done) => {
    JscWithoutAnimation.fire({
      preConfirm: () => 'Some data from preConfirm',
    }).then((result) => {
      expect(result.value).to.equal('Some data from preConfirm')
      done()
    })
    Jsc.clickConfirm()
  })

  it('preConfirm returns 0', (done) => {
    JscWithoutAnimation.fire({
      preConfirm: () => 0,
    }).then((result) => {
      expect(result.value).to.equal(0)
      done()
    })
    Jsc.clickConfirm()
  })

  it('preConfirm returns object containing toPromise', (done) => {
    JscWithoutAnimation.fire({
      didOpen: () => Jsc.clickConfirm(),
      preConfirm: () => ({
        toPromise: () => Promise.resolve(0),
      }),
    }).then((result) => {
      expect(result.value).to.equal(0)
      done()
    })
  })

  it('preConfirm promise is rejected', (done) => {
    let thenTriggered = false
    const errorMsg = 'message1'
    JscWithoutAnimation.fire({
      preConfirm: () => {
        return Promise.reject(new Error(errorMsg))
      },
    })
      .then(() => {
        thenTriggered = true
      })
      .catch((result) => {
        expect(thenTriggered).to.equal(false)
        expect(result.message).to.equal(errorMsg)
        done()
      })
    Jsc.clickConfirm()
    expect(Jsc.isVisible()).to.be.true
  })

  it('preConfirm promise is rejected with a jsc chain inside preConfirm', (done) => {
    let thenTriggered = false
    const errorMsg = 'message1'
    JscWithoutAnimation.fire({
      preConfirm: () => {
        return JscWithoutAnimation.fire({
          preConfirm: () => {
            return Promise.reject(new Error(errorMsg))
          },
          didOpen: () => {
            Jsc.clickConfirm()
          },
        }).then(() => {
          thenTriggered = true
        })
      },
    })
      .then(() => {
        thenTriggered = true
      })
      .catch((result) => {
        expect(thenTriggered).to.equal(false)
        expect(result.message).to.equal(errorMsg)
        done()
      })
    Jsc.clickConfirm()
    expect(Jsc.isVisible()).to.be.true
  })

  it('should complete the promise when calling showValidationMessage() inside preConfirm', (done) => {
    Jsc.fire({
      showCancelButton: true,
      preConfirm: () => {
        Jsc.showValidationMessage('Now click the cancel button')
      },
      didOpen: () => {
        Jsc.clickConfirm()
      },
    }).then(() => {
      done()
    })
    Jsc.clickCancel()
  })
})
