/// <reference types="cypress" />

import { Jsc, JscWithoutAnimation } from '../utils'

describe('bindClickHandler', () => {
  it('bindClickHandler', () => {
    JscWithoutAnimation.bindClickHandler()
    JscWithoutAnimation.mixin({
      toast: true,
    }).bindClickHandler('data-jsc-toast-template')

    const template = document.createElement('template')
    template.id = 'my-template-for-declarative-triggering'
    template.innerHTML = '<jsc-title>Are you sure?</jsc-title>'
    document.body.appendChild(template)

    const buttonTriggerPopup = document.createElement('button')
    buttonTriggerPopup.setAttribute('data-jsc-template', '#my-template-for-declarative-triggering')
    document.body.appendChild(buttonTriggerPopup)

    const buttonTriggerToast = document.createElement('button')
    buttonTriggerToast.setAttribute('data-jsc-toast-template', '#my-template-for-declarative-triggering')
    const imgInsideButtonTriggerToast = document.createElement('img')
    imgInsideButtonTriggerToast.src = 'https://sweetalert2.github.io/images/SweetAlert2.png'
    buttonTriggerToast.appendChild(imgInsideButtonTriggerToast)
    document.body.appendChild(buttonTriggerToast)

    buttonTriggerPopup.click()
    expect(Jsc.isVisible()).to.be.true
    expect(Jsc.getPopup().classList.contains('jsc-toast')).to.be.false
    expect(Jsc.getTitle().innerHTML).to.equal('Are you sure?')

    Jsc.close()
    imgInsideButtonTriggerToast.click()
    expect(Jsc.isVisible()).to.be.true
    expect(Jsc.getPopup().classList.contains('jsc-toast')).to.be.true
    expect(Jsc.getTitle().innerHTML).to.equal('Are you sure?')

    document.body.removeChild(buttonTriggerPopup)
    document.body.removeChild(buttonTriggerToast)
  })
})
