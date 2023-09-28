/// <reference types="cypress" />

import { Jsc, JscWithoutAnimation } from '../../utils'

describe('close()', () => {
  it('should add .jsc-hide to popup', (done) => {
    Jsc.fire({
      title: 'Jsc.close() test',
      willClose: () => {
        expect(Jsc.getPopup().classList.contains('jsc-hide')).to.be.true
        done()
      },
    })
    Jsc.close()
  })

  it('resolves when calling Jsc.close()', (done) => {
    Jsc.fire().then((result) => {
      expect(result).to.be.eql({
        isConfirmed: false,
        isDenied: false,
        isDismissed: true,
      })
      done()
    })
    Jsc.close()
  })

  it('should trigger willClose', (done) => {
    Jsc.fire({
      willClose: () => {
        expect(Jsc.isVisible()).to.be.true
        done()
      },
    })
    Jsc.close()
  })

  it('should trigger didClose', (done) => {
    JscWithoutAnimation.fire({
      didClose: () => {
        expect(Jsc.isVisible()).to.be.false
        done()
      },
    })
    Jsc.close()
  })

  it('should not fail when calling Jsc.fire() inside didClose', (done) => {
    JscWithoutAnimation.fire({
      didClose: () => {
        expect(Jsc.isVisible()).to.be.false
        JscWithoutAnimation.fire({
          input: 'text',
          didOpen: () => {
            expect(Jsc.getInput()).to.not.be.null
            done()
          },
        })
        expect(Jsc.isVisible()).to.be.true
      },
    })
    Jsc.close()
  })

  it('should not fail inside didClose', (done) => {
    Jsc.fire({
      didClose: () => {
        Jsc.close()
        expect(Jsc.isVisible()).to.be.false
        done()
      },
    })
    Jsc.close()
  })
})
