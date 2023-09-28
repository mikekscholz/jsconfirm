/// <reference types="cypress" />

import { Jsc, JscWithoutAnimation } from '../../utils'

describe('preDeny', () => {
  it('preDeny return false', () => {
    JscWithoutAnimation.fire({
      showDenyButton: true,
      preDeny: (value) => {
        expect(value).to.be.false
        return false
      },
    })
    Jsc.clickDeny()
    expect(Jsc.isVisible()).to.be.true
  })

  it('preDeny custom value', (done) => {
    JscWithoutAnimation.fire({
      showDenyButton: true,
      input: 'text',
      inputValue: 'Initial input value',
      returnInputValueOnDeny: true,
      preDeny: (value) => `${value} + Some data from preDeny`,
    }).then((result) => {
      expect(result.value).to.equal('Initial input value + Some data from preDeny')
      done()
    })
    Jsc.clickDeny()
  })

  it('preDeny returns 0', (done) => {
    JscWithoutAnimation.fire({
      showDenyButton: true,
      preDeny: () => 0,
    }).then((result) => {
      expect(result.value).to.equal(0)
      done()
    })
    Jsc.clickDeny()
  })

  it('preDeny returns object containing toPromise', (done) => {
    JscWithoutAnimation.fire({
      showDenyButton: true,
      didOpen: () => Jsc.clickDeny(),
      preDeny: () => ({
        toPromise: () => Promise.resolve(0),
      }),
    }).then((result) => {
      expect(result.value).to.equal(0)
      done()
    })
  })

  it('preDeny promise is rejected', (done) => {
    let thenTriggered = false
    const errorMsg = 'message1'
    JscWithoutAnimation.fire({
      preDeny: () => {
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
    Jsc.clickDeny()
    expect(Jsc.isVisible()).to.be.true
  })

  it('preDeny promise is rejected with a jsc chain inside preDeny', (done) => {
    let thenTriggered = false
    const errorMsg = 'message1'
    JscWithoutAnimation.fire({
      preDeny: () => {
        return JscWithoutAnimation.fire({
          preDeny: () => {
            return Promise.reject(new Error(errorMsg))
          },
          didOpen: () => {
            Jsc.clickDeny()
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
    Jsc.clickDeny()
    expect(Jsc.isVisible()).to.be.true
  })
})
