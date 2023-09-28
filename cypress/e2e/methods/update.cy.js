/// <reference types="cypress" />

import { $, Jsc, JscWithoutAnimation } from '../../utils'
import { isVisible } from '../../../src/utils/dom'
import { defaultParams, updatableParams } from '../../../src/utils/params'

describe('update()', () => {
  it('all updatableParams are valid', () => {
    expect(updatableParams.length).not.to.equal(0)
    updatableParams.forEach((updatableParam) => {
      if (!(updatableParam in defaultParams)) {
        throw new Error(`Invalid updatable param: ${updatableParam}`)
      }
    })
  })

  it('update() method', () => {
    JscWithoutAnimation.fire({
      icon: 'success',
      input: 'text',
      showConfirmButton: false,
      imageUrl: '/assets/jsc-logo.png',
      preConfirm: () => console.log('1'), // eslint-disable-line no-console
    })

    Jsc.update({
      background: 'green',
      title: 'New title',
      html: 'New content',
      icon: 'success',
      iconColor: 'blue',
      showConfirmButton: true,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: 'New deny button text',
      cancelButtonText: 'New cancel button text',
      imageUrl: '/assets/jsc-logo.png',
      showCloseButton: true,
      preConfirm: () => console.log('2'), // eslint-disable-line no-console
    })

    expect(window.getComputedStyle(Jsc.getPopup()).backgroundColor).to.equal('rgb(0, 128, 0)')

    expect(Jsc.getTitle().textContent).to.equal('New title')
    expect(Jsc.getHtmlContainer().textContent).to.equal('New content')

    expect(isVisible(Jsc.getIcon())).to.be.true
    expect(Jsc.getIcon()).to.equal($('.jsc-success'))
    expect(Jsc.getIcon().style.color).to.equal('blue')
    expect(Jsc.getIcon().style.borderColor).to.equal('blue')

    expect(isVisible(Jsc.getImage())).to.be.true
    expect(Jsc.getImage().src.indexOf('/assets/jsc-logo.png') > 0).to.be.true

    expect(isVisible(Jsc.getConfirmButton())).to.be.true
    expect(isVisible(Jsc.getCancelButton())).to.be.true
    expect(isVisible(Jsc.getDenyButton())).to.be.true
    expect(Jsc.getCancelButton().textContent).to.equal('New cancel button text')
    expect(Jsc.getDenyButton().textContent).to.equal('New deny button text')

    expect(isVisible(Jsc.getCloseButton())).to.be.true

    setTimeout(() => {
      const spy = cy.spy(console, 'warn')
      Jsc.clickConfirm()
      expect(spy.calledWith('1')).to.be.false
      expect(spy.calledWith('2')).to.be.true
    })
  })

  it('update customClass', () => {
    JscWithoutAnimation.fire({
      icon: 'success',
      imageUrl: '/assets/jsc-logo.png',
      input: 'text',
    })

    Jsc.update({
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
        footer: 'footer-class',
      },
    })

    // new custom classnames should be added, and the previous custom classnames should be removed
    Jsc.update({
      customClass: {
        container: 'container-class-NEW',
        popup: 'popup-class-NEW',
        title: 'title-class-NEW',
        closeButton: 'close-button-class-NEW',
        icon: 'icon-class-NEW',
        image: 'image-class-NEW',
        htmlContainer: 'html-container-class-NEW',
        input: 'input-class-NEW',
        actions: 'actions-class-NEW',
        confirmButton: 'confirm-button-class-NEW',
        denyButton: 'deny-button-class-NEW',
        cancelButton: 'cancel-button-class-NEW',
        footer: 'footer-class-NEW',
      },
    })

    expect(Jsc.getContainer().classList.contains('container-class')).to.be.false
    expect(Jsc.getPopup().classList.contains('popup-class')).to.be.false
    expect(Jsc.getTitle().classList.contains('title-class')).to.be.false
    expect(Jsc.getCloseButton().classList.contains('close-button-class')).to.be.false
    expect(Jsc.getIcon().classList.contains('icon-class')).to.be.false
    expect(Jsc.getImage().classList.contains('image-class')).to.be.false
    expect(Jsc.getHtmlContainer().classList.contains('html-container-class')).to.be.false
    expect(Jsc.getInput().classList.contains('input-class')).to.be.false
    expect(Jsc.getActions().classList.contains('actions-class')).to.be.false
    expect(Jsc.getConfirmButton().classList.contains('confirm-button-class')).to.be.false
    expect(Jsc.getDenyButton().classList.contains('deny-button-class')).to.be.false
    expect(Jsc.getCancelButton().classList.contains('cancel-button-class')).to.be.false
    expect(Jsc.getFooter().classList.contains('footer-class')).to.be.false

    expect(Jsc.getContainer().classList.contains('container-class-NEW')).to.be.true
    expect(Jsc.getPopup().classList.contains('popup-class-NEW')).to.be.true
    expect(Jsc.getTitle().classList.contains('title-class-NEW')).to.be.true
    expect(Jsc.getCloseButton().classList.contains('close-button-class-NEW')).to.be.true
    expect(Jsc.getIcon().classList.contains('icon-class-NEW')).to.be.true
    expect(Jsc.getImage().classList.contains('image-class-NEW')).to.be.true
    expect(Jsc.getHtmlContainer().classList.contains('html-container-class-NEW')).to.be.true
    expect(Jsc.getInput().classList.contains('input-class-NEW')).to.be.true
    expect(Jsc.getActions().classList.contains('actions-class-NEW')).to.be.true
    expect(Jsc.getConfirmButton().classList.contains('confirm-button-class-NEW')).to.be.true
    expect(Jsc.getDenyButton().classList.contains('deny-button-class-NEW')).to.be.true
    expect(Jsc.getCancelButton().classList.contains('cancel-button-class-NEW')).to.be.true
    expect(Jsc.getFooter().classList.contains('footer-class-NEW')).to.be.true
  })

  it('isUpdatableParameter() method', () => {
    expect(Jsc.isUpdatableParameter('title')).to.be.true
    expect(Jsc.isUpdatableParameter('willOpen')).to.be.false
  })

  it("should update instance's params", () => {
    const jsc = Jsc.fire({ icon: 'error' })
    expect(jsc.params.icon).to.equal('error')
    jsc.update({ icon: 'warning' })
    expect(jsc.params.icon).to.equal('warning')
  })

  it('should not affect input', () => {
    Jsc.fire({
      input: 'select',
      inputOptions: {
        uno: 'uno',
        dos: 'dos',
        tres: 'tres',
      },
    })
    Jsc.getInput().value = 'dos'
    Jsc.update({ html: 'hi' })
    expect(Jsc.getInput().value).to.equal('dos')
  })

  it('should not affect showClass', (done) => {
    Jsc.fire({
      icon: 'success',
      didOpen: () => {
        Jsc.update({})
        expect(Jsc.getContainer().classList.contains('jsc-backdrop-show')).to.be.true
        expect(Jsc.getPopup().classList.contains('jsc-show')).to.be.true
        expect(Jsc.getIcon().classList.contains('jsc-icon-show')).to.be.true
        done()
      },
    })
  })

  it('should not re-render the same success icon', (done) => {
    JscWithoutAnimation.fire({
      icon: 'success',
      didOpen: () => {
        const oldIcon = Jsc.getIcon().querySelector('.jsc-success-ring')
        Jsc.update({})
        const newIcon = Jsc.getIcon().querySelector('.jsc-success-ring')
        expect(newIcon).to.equal(oldIcon)
        done()
      },
    })
  })

  it('should not re-render the same error icon', (done) => {
    JscWithoutAnimation.fire({
      icon: 'success',
      didOpen: () => {
        const oldIcon = Jsc.getIcon().querySelector('.jsc-x-mark')
        Jsc.update({})
        const newIcon = Jsc.getIcon().querySelector('.jsc-x-mark')
        expect(newIcon).to.equal(oldIcon)
        done()
      },
    })
  })

  it('should not re-render the same info icon', (done) => {
    JscWithoutAnimation.fire({
      icon: 'info',
      didOpen: () => {
        const oldIcon = Jsc.getIcon().querySelector('.jsc-icon-content')
        Jsc.update({})
        const newIcon = Jsc.getIcon().querySelector('.jsc-icon-content')
        expect(newIcon).to.equal(oldIcon)
        done()
      },
    })
  })

  it('should not re-render the same icon with a custom content', (done) => {
    JscWithoutAnimation.fire({
      icon: 'success',
      iconHtml: '<span>custom content</span>',
      didOpen: () => {
        const oldIcon = Jsc.getIcon().querySelector('.jsc-icon-content')
        Jsc.update({})
        const newIcon = Jsc.getIcon().querySelector('.jsc-icon-content')
        expect(newIcon).to.equal(oldIcon)
        done()
      },
    })
  })

  it('update() method should throw a warning when attempting to update the closing popup', (done) => {
    const spy = cy.spy(console, 'warn')
    Jsc.fire().then(() => {
      Jsc.update()
      expect(
        spy.calledWith(
          `JsConfirm: You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.`
        )
      ).to.be.true
      done()
    })
    Jsc.clickConfirm()
  })
})
