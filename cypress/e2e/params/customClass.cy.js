/// <reference types="cypress" />

import { $, Jsc } from '../../utils'

describe('customClass', () => {
  it('customClass as a string', () => {
    Jsc.fire({ customClass: 'custom-class' })
    expect(Jsc.getPopup().classList.contains('custom-class')).to.be.true
  })

  it('customClass as an object', () => {
    Jsc.fire({
      icon: 'question',
      input: 'text',
      imageUrl: '/assets/jsc-logo.png',
      timer: 10000,
      timerProgressBar: true,
      customClass: {
        container: 'container-class',
        popup: 'popup-class',
        title: 'title-class',
        closeButton: 'close-button-class',
        icon: 'icon-class',
        image: 'image-class',
        htmlContainer: 'html-container-class',
        input: 'input-class',
        actions: 'actions-class',
        confirmButton: 'confirm-button-class',
        denyButton: 'deny-button-class',
        cancelButton: 'cancel-button-class',
        loader: 'loader-class',
        footer: 'footer-class',
        timerProgressBar: 'timer-progress-bar-class',
      },
    })
    expect(Jsc.getContainer().classList.contains('container-class')).to.be.true
    expect(Jsc.getPopup().classList.contains('popup-class')).to.be.true
    expect(Jsc.getTitle().classList.contains('title-class')).to.be.true
    expect(Jsc.getCloseButton().classList.contains('close-button-class')).to.be.true
    expect(Jsc.getIcon().classList.contains('icon-class')).to.be.true
    expect(Jsc.getImage().classList.contains('image-class')).to.be.true
    expect(Jsc.getHtmlContainer().classList.contains('html-container-class')).to.be.true
    expect(Jsc.getInput().classList.contains('input-class')).to.be.true
    expect(Jsc.getActions().classList.contains('actions-class')).to.be.true
    expect(Jsc.getConfirmButton().classList.contains('confirm-button-class')).to.be.true
    expect(Jsc.getDenyButton().classList.contains('deny-button-class')).to.be.true
    expect(Jsc.getCancelButton().classList.contains('cancel-button-class')).to.be.true
    expect(Jsc.getLoader().classList.contains('loader-class')).to.be.true
    expect(Jsc.getFooter().classList.contains('footer-class')).to.be.true
    expect(Jsc.getTimerProgressBar().classList.contains('timer-progress-bar-class')).to.be.true
  })

  it('only visible input has custom class', () => {
    Jsc.fire({
      input: 'checkbox',
      customClass: {
        input: 'input-class',
      },
    })
    expect($('.jsc-checkbox').classList.contains('input-class')).to.be.true
    expect(Jsc.getInput().classList.contains('input-class')).to.be.false
  })

  it('customClass as an object with the only one key', () => {
    Jsc.fire({
      title: 'I should have a custom classname',
      customClass: {
        title: 'title-class',
      },
    })
    expect(Jsc.getTitle().classList.contains('title-class')).to.be.true
  })

  it('should throw console warning about unexpected type of customClass', () => {
    const spy = cy.spy(console, 'warn')
    Jsc.fire({
      customClass: {
        title: {},
        popup: 14,
      },
    })
    expect(
      spy.calledWith('JsConfirm: Invalid type of customClass.title! Expected string or iterable object, got "object"')
    ).to.be.true
    expect(
      spy.calledWith('JsConfirm: Invalid type of customClass.popup! Expected string or iterable object, got "number"')
    ).to.be.true
  })
})
