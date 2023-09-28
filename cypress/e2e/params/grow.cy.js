/// <reference types="cypress" />

import { Jsc } from '../../utils'

describe('grow', () => {
  it('grow row', () => {
    Jsc.fire({
      grow: 'row',
    })
    const containerStyles = window.getComputedStyle(Jsc.getContainer())
    expect(Jsc.getPopup().clientWidth).to.equal(
      parseInt(
        Jsc.getContainer().clientWidth -
          parseFloat(containerStyles.paddingLeft) -
          parseFloat(containerStyles.paddingRight)
      )
    )
  })

  it('grow column', () => {
    Jsc.fire({
      grow: 'column',
    })
    const containerStyles = window.getComputedStyle(Jsc.getContainer())
    expect(Jsc.getPopup().clientHeight).to.equal(
      parseInt(Jsc.getContainer().clientHeight - parseFloat(containerStyles.paddingTop) * 2)
    )
  })

  it('grow fullscreen', () => {
    Jsc.fire({
      grow: 'fullscreen',
    })
    const containerStyles = window.getComputedStyle(Jsc.getContainer())

    expect(Jsc.getPopup().clientWidth).to.equal(
      parseInt(
        Jsc.getContainer().clientWidth -
          parseFloat(containerStyles.paddingLeft) -
          parseFloat(containerStyles.paddingRight)
      )
    )

    expect(Jsc.getPopup().clientHeight).to.equal(
      parseInt(Jsc.getContainer().clientHeight - parseFloat(containerStyles.paddingTop) * 2)
    )
  })
})
