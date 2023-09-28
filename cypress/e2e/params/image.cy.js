/// <reference types="cypress" />

import { Jsc } from '../../utils'

describe('image', () => {
  it('imageUrl, imageWidth, imageHeight', () => {
    Jsc.fire({
      imageUrl: 'https://sweetalert2.github.io/images/jsc-logo.png',
      imageWidth: 498,
      imageHeight: 84,
    })
    expect(Jsc.getImage().src).to.equal('https://sweetalert2.github.io/images/jsc-logo.png')
    expect(Jsc.getImage().style.width).to.equal('498px')
    expect(Jsc.getImage().style.height).to.equal('84px')
  })

  it('image dimentions in custom CSS units', () => {
    Jsc.fire({
      imageUrl: 'https://sweetalert2.github.io/images/jsc-logo.png',
      imageWidth: '50%',
      imageHeight: '3em',
    })
    expect(Jsc.getImage().style.width).to.equal('50%')
    expect(Jsc.getImage().style.height).to.equal('3em')
  })

  it('image alt text', () => {
    Jsc.fire({
      imageUrl: '/assets/jsc-logo.png',
      imageAlt: 'Custom icon',
    })
    expect(Jsc.getImage().getAttribute('alt')).to.equal('Custom icon')
  })
})
