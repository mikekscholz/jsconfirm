/// <reference types="cypress" />

import { Jsc } from '../../utils'

describe('padding', () => {
  it('padding should allow 0', () => {
    Jsc.fire({
      padding: 0,
    })
    expect(Jsc.getPopup().style.padding).to.equal('0px')
  })

  it('padding should allow a number', () => {
    Jsc.fire({
      padding: 15,
    })
    expect(Jsc.getPopup().style.padding).to.equal('15px')
  })

  it('padding should allow a string', () => {
    Jsc.fire({
      padding: '2rem',
    })
    expect(Jsc.getPopup().style.padding).to.equal('2rem')
  })

  it('padding should be empty with undefined', () => {
    Jsc.fire({
      padding: undefined,
    })
    expect(Jsc.getPopup().style.padding).to.equal('')
  })

  it('padding should be empty with an object', () => {
    Jsc.fire({
      padding: {},
    })
    expect(Jsc.getPopup().style.padding).to.equal('')
  })

  it('padding should be empty with an array', () => {
    Jsc.fire({
      padding: [],
    })
    expect(Jsc.getPopup().style.padding).to.equal('')
  })

  it('padding should be empty with `true`', () => {
    Jsc.fire({
      padding: true,
    })
    expect(Jsc.getPopup().style.padding).to.equal('')
  })
})
