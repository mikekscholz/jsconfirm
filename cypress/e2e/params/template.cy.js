/// <reference types="cypress" />

import { isVisible } from '../../../src/utils/dom'
import { $, Jsc, JscWithoutAnimation, isHidden } from '../../utils'

describe('template', () => {
  it('template as HTMLTemplateElement', () => {
    const template = document.createElement('template')
    template.id = 'my-template'
    template.innerHTML = `
      <jsc-title>Are you sure?</jsc-title>
      <jsc-html>You won't be able to revert this!</jsc-html>
      <jsc-icon type="success"></jsc-icon>
      <jsc-image src="https://sweetalert2.github.io/images/SweetAlert2.png" width="300" height="60" alt="safdsafd"></jsc-image>
      <jsc-input type="select" placeholder="placeholderrr" value="b" label="input label">
        <jsc-input-option value="a">aa</jsc-input-option>
        <jsc-input-option value="b">bb</jsc-input-option>
      </jsc-input>
      <jsc-param name="inputAttributes" value='{ "hey": "there" }'></jsc-param>
      <jsc-param name="customClass" value='{ "popup": "my-popup" }'></jsc-param>
      <jsc-param name="showConfirmButton" value="false"></jsc-param>
      <jsc-param name="showCloseButton" value="true"></jsc-param>
      <jsc-param name="reverseButtons" value="true"></jsc-param>
      <jsc-param name="width" value="200"></jsc-param>
      <jsc-param name="closeButtonHtml" value="-"></jsc-param>
      <jsc-button type="deny" color="red">Denyyy</jsc-button>
      <jsc-button type="cancel" aria-label="no no">Nooo</jsc-button>
      <jsc-footer>footerrr</jsc-footer>
    `
    document.body.appendChild(template)
    JscWithoutAnimation.fire({
      template: document.querySelector('#my-template'),
    })
    expect(Jsc.getPopup().classList.contains('my-popup')).to.be.true
    expect(Jsc.getTitle().textContent).to.equal('Are you sure?')
    expect(Jsc.getImage().src).to.equal('https://sweetalert2.github.io/images/SweetAlert2.png')
    expect(Jsc.getImage().style.width).to.equal('300px')
    expect(Jsc.getImage().style.height).to.equal('60px')
    expect(Jsc.getInput().classList.contains('jsc-select')).to.be.true
    expect($('.jsc-input-label').innerHTML).to.equal('input label')
    expect(Jsc.getInput().getAttribute('hey')).to.equal('there')
    expect(Jsc.getInput().querySelectorAll('option').length).to.equal(3)
    expect($('.jsc-select option:nth-child(1)').innerHTML).to.equal('placeholderrr')
    expect($('.jsc-select option:nth-child(1)').disabled).to.be.true
    expect($('.jsc-select option:nth-child(2)').innerHTML).to.equal('aa')
    expect($('.jsc-select option:nth-child(2)').value).to.equal('a')
    expect($('.jsc-select option:nth-child(3)').innerHTML).to.equal('bb')
    expect($('.jsc-select option:nth-child(3)').value).to.equal('b')
    expect($('.jsc-select option:nth-child(3)').selected).to.be.true
    expect(isHidden(Jsc.getConfirmButton())).to.be.true
    expect(isVisible(Jsc.getCancelButton())).to.be.true
    expect(Jsc.getDenyButton().style.backgroundColor).to.equal('red')
    expect(Jsc.getPopup().style.width).to.equal('200px')
    expect(isVisible(Jsc.getDenyButton())).to.be.true
    expect(Jsc.getCancelButton().nextSibling).to.equal(Jsc.getDenyButton())
    expect(Jsc.getCancelButton().getAttribute('aria-label')).to.equal('no no')
    expect(isVisible(Jsc.getCloseButton())).to.be.true
    expect(Jsc.getCloseButton().innerHTML).to.equal('-')
    expect(isVisible(Jsc.getFooter())).to.be.true
    expect(Jsc.getFooter().innerHTML).to.equal('footerrr')
  })

  it('template as string', () => {
    const template = document.createElement('template')
    template.id = 'my-template-string'
    template.innerHTML = '<jsc-title>Are you sure?</jsc-title>'
    document.body.appendChild(template)
    const mixin = JscWithoutAnimation.mixin({
      title: 'this title should be overriden by template',
    })
    mixin.fire({
      template: '#my-template-string',
    })
    expect(Jsc.getTitle().textContent).to.equal('Are you sure?')
  })

  it('jsc-function-param', (done) => {
    const _consoleLog = console.log // eslint-disable-line no-console
    const spy = cy.spy(console, 'log')
    const template = document.createElement('template')
    template.id = 'my-template-functon-param'
    const didOpen = (modal) => {
      console.log(modal.querySelector('.jsc-title').innerText) // eslint-disable-line no-console
    }
    template.innerHTML = `
      <jsc-title>Function param</jsc-title>
      <jsc-function-param name="didOpen" value="${didOpen}"></jsc-function-param>
    `
    document.body.appendChild(template)
    JscWithoutAnimation.fire({
      template: '#my-template-functon-param',
    })
    setTimeout(() => {
      expect(spy.calledWith('Function param')).to.be.true
      console.log = _consoleLog // eslint-disable-line no-console
      done()
    })
  })

  it('should throw a warning when attempting to use unrecognized elements and attributes', () => {
    const spy = cy.spy(console, 'warn')
    const template = document.createElement('template')
    template.id = 'my-template-with-unexpected-attributes'
    template.innerHTML = `
      <jsc-html>Check out this <a>link</a>!</jsc-html>
      <jsc-foo>bar</jsc-foo>
      <jsc-title value="hey!"></jsc-title>
      <jsc-image src="https://sweetalert2.github.io/images/SweetAlert2.png" width="100" height="100" alt="" foo="1">Are you sure?</jsc-image>
      <jsc-input bar>Are you sure?</jsc-input>
    `
    document.body.appendChild(template)
    const mixin = JscWithoutAnimation.mixin({
      imageAlt: 'this alt should be overriden by template',
    })
    mixin.fire({
      imageWidth: 200, // user param should override <jsc-image width="100">
      template: '#my-template-with-unexpected-attributes',
    })
    expect(Jsc.getImage().src).to.equal('https://sweetalert2.github.io/images/SweetAlert2.png')
    expect(Jsc.getImage().style.width).to.equal('200px')
    expect(Jsc.getImage().style.height).to.equal('100px')
    expect(Jsc.getImage().getAttribute('alt')).to.equal('')
    expect(Jsc.getInput().type).to.equal('text')
    expect(spy.callCount).to.equal(4)
    expect(spy.getCall(0).calledWith(`JsConfirm: Unrecognized element <jsc-foo>`)).to.be.true
    expect(
      spy
        .getCall(1)
        .calledWith(
          `JsConfirm: Unrecognized attribute "foo" on <jsc-image>. Allowed attributes are: src, width, height, alt`
        )
    ).to.be.true
    expect(
      spy
        .getCall(2)
        .calledWith(
          `JsConfirm: Unrecognized attribute "bar" on <jsc-input>. Allowed attributes are: type, label, placeholder, value`
        )
    ).to.be.true
    expect(
      spy
        .getCall(3)
        .calledWith(
          `JsConfirm: Unrecognized attribute "value" on <jsc-title>. To set the value, use HTML within the element.`
        )
    ).to.be.true
  })
})
