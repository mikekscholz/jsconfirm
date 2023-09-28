/// <reference types="cypress" />

import { Jsc } from '../utils'

describe('Styling', () => {
  it('overriding styles with customClass', (done) => {
    const style = document.createElement('style')
    style.textContent = `
      .my-container {
        z-index: 9999;
      }
      .my-popup {
        width: 500px;
      }
      .my-title {
        font-size: 10px;
      }
      .my-close-button {
        font-size: 11px;
      }
      .my-icon {
        width: 12px;
      }
      .my-image {
        max-width: 13px;
      }
      .my-input {
        font-size: 14px;
      }
      .my-input-label {
        margin: 0;
      }
      .my-validation-message {
        padding: 0;
      }
      .my-actions {
        padding: 1px;
      }
      .my-confirm-button {
        padding: 2px;
      }
      .my-deny-button {
        padding: 3px;
      }
      .my-cancel-button {
        padding: 4px;
      }
      .my-loader {
        border-width: 7px;
      }
      .my-footer {
        padding: 8px;
      }
      .my-timer-progress-bar {
        height: 9px;
      }
    `
    document.head.prepend(style)
    Jsc.fire({
      title: 'title',
      icon: 'success',
      imageUrl: '/assets/jsc-logo.png',
      input: 'text',
      inputLabel: 'inputLabel',
      showDenyButton: true,
      showCancelButton: true,
      footer: 'footer',
      timer: 1000,
      timerProgressBar: true,
      customClass: {
        container: 'my-container',
        popup: 'my-popup',
        title: 'my-title',
        closeButton: 'my-close-button',
        icon: 'my-icon',
        image: 'my-image',
        input: 'my-input',
        inputLabel: 'my-input-label',
        validationMessage: 'my-validation-message',
        actions: 'my-actions',
        confirmButton: 'my-confirm-button',
        denyButton: 'my-deny-button',
        cancelButton: 'my-cancel-button',
        loader: 'my-loader',
        footer: 'my-footer',
        timerProgressBar: 'my-timer-progress-bar',
      },
      didOpen: () => {
        expect(window.getComputedStyle(Jsc.getContainer()).zIndex).to.equal('9999')
        expect(window.getComputedStyle(Jsc.getPopup()).width).to.equal('500px')
        expect(window.getComputedStyle(Jsc.getTitle()).fontSize).to.equal('10px')
        expect(window.getComputedStyle(Jsc.getCloseButton()).fontSize).to.equal('11px')
        expect(window.getComputedStyle(Jsc.getIcon()).width).to.equal('12px')
        expect(window.getComputedStyle(Jsc.getImage()).maxWidth).to.equal('13px')
        expect(window.getComputedStyle(Jsc.getInput()).fontSize).to.equal('14px')
        expect(window.getComputedStyle(Jsc.getInputLabel()).margin).to.equal('0px')
        Jsc.showValidationMessage('validationMessage')
        expect(window.getComputedStyle(Jsc.getValidationMessage()).padding).to.equal('0px')
        expect(window.getComputedStyle(Jsc.getActions()).padding).to.equal('1px')
        expect(window.getComputedStyle(Jsc.getConfirmButton()).padding).to.equal('2px')
        expect(window.getComputedStyle(Jsc.getDenyButton()).padding).to.equal('3px')
        expect(window.getComputedStyle(Jsc.getCancelButton()).padding).to.equal('4px')
        Jsc.showLoading()
        expect(window.getComputedStyle(Jsc.getLoader()).borderWidth).to.equal('7px')
        expect(window.getComputedStyle(Jsc.getFooter()).padding).to.equal('8px')
        expect(window.getComputedStyle(Jsc.getTimerProgressBar()).height).to.equal('9px')
        done()
      },
    })
  })

  it('should not allow frameworks like bulma to ovrrride default styles', (done) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css'
    document.head.appendChild(link)
    Jsc.fire({
      title: 'title',
      icon: 'success',
      imageUrl: '/assets/jsc-logo.png',
      input: 'text',
      inputLabel: 'inputLabel',
      showDenyButton: true,
      showCancelButton: true,
      footer: 'footer',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        expect(window.getComputedStyle(Jsc.getContainer()).zIndex).to.equal('1060')
        expect(window.getComputedStyle(Jsc.getPopup()).width).to.equal('512px')
        expect(window.getComputedStyle(Jsc.getTitle()).fontSize).to.equal('30px')
        expect(window.getComputedStyle(Jsc.getCloseButton()).fontSize).to.equal('40px')
        expect(window.getComputedStyle(Jsc.getIcon()).width).to.equal('80px')
        expect(window.getComputedStyle(Jsc.getImage()).maxWidth).to.equal('100%')
        expect(window.getComputedStyle(Jsc.getInput()).fontSize).to.equal('18px')
        expect(window.getComputedStyle(Jsc.getInputLabel()).marginTop).to.equal('16px')
        Jsc.showValidationMessage('validationMessage')
        expect(window.getComputedStyle(Jsc.getValidationMessage()).padding).to.equal('10px')
        expect(window.getComputedStyle(Jsc.getActions()).padding).to.equal('0px')
        expect(window.getComputedStyle(Jsc.getConfirmButton()).paddingTop).to.equal('10px')
        expect(window.getComputedStyle(Jsc.getDenyButton()).paddingLeft).to.equal('17.6px')
        expect(window.getComputedStyle(Jsc.getCancelButton()).paddingBottom).to.equal('10px')
        Jsc.showLoading()
        expect(window.getComputedStyle(Jsc.getLoader()).borderWidth).to.equal('4px')
        expect(window.getComputedStyle(Jsc.getFooter()).paddingTop).to.equal('16px')
        expect(window.getComputedStyle(Jsc.getTimerProgressBar()).height).to.equal('4px')
        done()
      },
    })
  })
})
