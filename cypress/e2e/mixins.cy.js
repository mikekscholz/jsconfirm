/// <reference types="cypress" />

import { Jsc } from '../utils'
import { SHOW_CLASS_TIMEOUT } from '../../src/utils/openPopup'

describe('mixins', () => {
  it('basic mixin', (done) => {
    const MyJsc = Jsc.mixin({ title: '1_title' })
    const jsc = MyJsc.fire({
      didOpen: () => {
        expect(MyJsc.getTitle().textContent).to.equal('1_title')
        MyJsc.clickConfirm()
      },
    })
    expect(jsc instanceof MyJsc).to.be.true
    expect(jsc instanceof Jsc).to.be.true
    jsc.then((result) => {
      expect(result).to.eql({
        value: true,
        isConfirmed: true,
        isDenied: false,
        isDismissed: false,
      })
      done()
    })
  })

  it('mixins and shorthand calls', (done) => {
    const MyJsc = Jsc.mixin({
      title: 'no effect',
      html: 'no effect',
      didOpen: () => {
        expect(MyJsc.getTitle().textContent).to.equal('2_title')
        expect(MyJsc.getHtmlContainer().textContent).to.equal('2_html')
        MyJsc.clickConfirm()
        done()
      },
    })
    MyJsc.fire('2_title', '2_html')
  })

  it('mixins precedence', () => {
    Jsc.mixin({ title: '1' }).mixin({ title: '2' }).fire()
    expect(Jsc.getTitle().textContent).to.equal('2')
  })

  it('params from 2nd mixin should override params from 1st mixin', (done) => {
    Jsc.mixin({ showClass: { popup: 'i-should-be-overriden' } })
      .mixin({ showClass: { backdrop: 'backdrop-custom-show-class' } })
      .fire({
        didOpen: () => {
          setTimeout(() => {
            expect(Jsc.getContainer().classList.contains('backdrop-custom-show-class')).to.be.true
            expect(Jsc.getPopup().classList.contains('i-should-be-overriden')).to.be.false
            done()
          }, SHOW_CLASS_TIMEOUT)
        },
      })
  })

  it('params from fire() should override params from mixin()', (done) => {
    Jsc.mixin({ showClass: { popup: 'i-should-be-overriden' } }).fire({
      showClass: { backdrop: 'backdrop-custom-show-class' },
      didOpen: () => {
        setTimeout(() => {
          expect(Jsc.getContainer().classList.contains('backdrop-custom-show-class')).to.be.true
          expect(Jsc.getPopup().classList.contains('i-should-be-overriden')).to.be.false
          done()
        }, SHOW_CLASS_TIMEOUT)
      },
    })
  })
})
