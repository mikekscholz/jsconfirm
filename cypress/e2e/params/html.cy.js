/// <reference types="cypress" />

import { Jsc } from '../../utils'

describe('html', () => {
  it('HTMLElement as html', () => {
    const form = document.createElement('form')
    const div = document.createElement('div')
    div.appendChild(document.createElement('label'))
    div.appendChild(document.createElement('input'))
    form.appendChild(div)

    Jsc.fire({
      html: form,
    })
    expect(Jsc.getHtmlContainer().innerHTML).to.equal('<form><div><label></label><input></div></form>')
  })

  it('Error as html', () => {
    const error = new Error()
    error.message = 'something is broken'

    Jsc.fire({
      html: error,
    })
    expect(Jsc.getHtmlContainer().innerHTML).to.equal('Error: something is broken')
  })
})
