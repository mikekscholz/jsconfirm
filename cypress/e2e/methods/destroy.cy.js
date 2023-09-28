/// <reference types="cypress" />

import { Jsc } from '../../utils'
import privateMethods from '../../../src/privateMethods'
import globalState from '../../../src/globalState'
import privateProps from '../../../src/privateProps'

describe('_destroy()', () => {
  it('should empty the private methods', (done) => {
    Jsc.fire({})
    const instance = globalState.currentInstance
    Jsc.fire({})
    expect(privateMethods.jscPromiseResolve.get(instance)).to.equal(undefined)
    done()
  })
  it('should empty the private props', (done) => {
    Jsc.fire({})
    const instance = globalState.currentInstance
    Jsc.fire({})
    expect(privateProps.innerParams.get(instance)).to.equal(undefined)
    done()
  })
  it('should empty the private methods after having received a reject of an async call', (done) => {
    let instance = null
    Jsc.fire({
      preConfirm: () => new Promise((resolve, reject) => cy.wait(500).then(() => reject(new Error('msg3')))),
    })
      .then(() => {
        //
      })
      .catch(() => {
        expect(privateMethods.jscPromiseResolve.get(instance)).to.equal(undefined)
        done()
      })
    instance = globalState.currentInstance
    Jsc.clickConfirm()
    Jsc.fire({})
    expect(privateMethods.jscPromiseResolve.get(instance)).to.not.equal(undefined)
  })
  it('should empty the private methods after having received a resolve of an async call', (done) => {
    let instance = null
    Jsc.fire({
      preConfirm: () => new Promise((resolve) => cy.wait(500).then(resolve)),
    }).then(() => {
      expect(privateMethods.jscPromiseResolve.get(instance)).to.equal(undefined)
      done()
    })
    instance = globalState.currentInstance
    Jsc.clickConfirm()
    Jsc.fire({})
    expect(privateMethods.jscPromiseResolve.get(instance)).to.not.equal(undefined)
  })
  it('should empty the private methods after the result of an async call in preConfirm even when another unrelated jsc is fired', (done) => {
    let instance = null
    Jsc.fire({
      preConfirm: () =>
        new Promise((resolve) => {
          Jsc.fire({
            test: 'Unrelated Jsc',
            didOpen: () => {
              expect(privateProps.innerParams.get(instance)).to.equal(undefined)
              expect(privateMethods.jscPromiseResolve.get(instance)).to.not.equal(undefined)
            },
          })
          cy.wait(500).then(resolve)
        }),
    }).then(() => {
      expect(privateMethods.jscPromiseResolve.get(instance)).to.equal(undefined)
      done()
    })
    instance = globalState.currentInstance
    Jsc.clickConfirm()
  })
  it('should destroy privateMethods after the result of an async call in preDeny even when another unrelated jsc is fired', (done) => {
    let instance = null
    Jsc.fire({
      preDeny: () =>
        new Promise((resolve) => {
          Jsc.fire({
            test: 'Unrelated Jsc',
            didOpen: () => {
              expect(privateProps.innerParams.get(instance)).to.equal(undefined)
              expect(privateMethods.jscPromiseResolve.get(instance)).to.not.equal(undefined)
            },
          })
          cy.wait(500).then(resolve)
        }),
    }).then(() => {
      expect(privateMethods.jscPromiseResolve.get(instance)).to.equal(undefined)
      done()
    })
    instance = globalState.currentInstance
    Jsc.clickDeny()
  })
  it('should destroy privateMethods after having received the result of the chained jsc', (done) => {
    let instance = null
    let isResolved = false
    Jsc.fire({
      preConfirm: () => {
        return Jsc.fire({
          preConfirm: () => {
            return Promise.resolve()
          },
          didOpen: () => {
            expect(isResolved).to.equal(false)
            expect(privateMethods.jscPromiseResolve.get(instance)).to.not.equal(undefined)
            Jsc.clickConfirm()
          },
        })
      },
    }).then(() => {
      isResolved = true
      expect(privateMethods.jscPromiseResolve.get(instance)).to.equal(undefined)
      done()
    })
    instance = globalState.currentInstance
    Jsc.clickConfirm()
  })
})
