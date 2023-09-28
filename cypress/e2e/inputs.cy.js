/// <reference types="cypress" />

import { isVisible } from '../../src/utils/dom'
import { $, Jsc, JscWithoutAnimation, TIMEOUT, dispatchCustomEvent, isHidden, triggerKeydownEvent } from '../utils'
import defaultInputValidators from '../../src/utils/defaultInputValidators'

describe('Inputs', () => {
  it('should throw console error about unexpected input type', () => {
    const spy = cy.spy(console, 'error')
    Jsc.fire({ input: 'invalid-input-type' })
    expect(spy).to.be.calledWith(
      'JsConfirm: Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "invalid-input-type"'
    )
  })

  it('input text', (done) => {
    const string = 'Live for yourself'
    Jsc.fire({
      input: 'text',
    }).then((result) => {
      expect(result.value).to.equal(string)
      done()
    })

    Jsc.getInput().value = string
    Jsc.clickConfirm()
  })

  it('input textarea', (done) => {
    Jsc.fire({
      input: 'textarea',
    }).then((result) => {
      expect(result.value).to.equal('hola!')
      done()
    })

    // Enter should not submit but put a newline to the textarea
    triggerKeydownEvent(Jsc.getInput(), 'Enter')

    Jsc.getInput().value = ' hola! '
    Jsc.clickConfirm()
  })

  it('input textarea + inputAutoTrim: false', (done) => {
    Jsc.fire({
      input: 'textarea',
      inputAutoTrim: false,
    }).then((result) => {
      expect(result.value).to.equal(' hola! ')
      done()
    })

    // Enter should not submit but put a newline to the textarea
    triggerKeydownEvent(Jsc.getInput(), 'Enter')

    Jsc.getInput().value = ' hola! '
    Jsc.clickConfirm()
  })

  it('inputAutoFocus: true (default)', (done) => {
    Jsc.fire({
      input: 'textarea',
    })
    setTimeout(() => {
      expect(document.activeElement).to.equal(Jsc.getInput())
      done()
    })
  })

  it('inputAutoFocus: false', (done) => {
    Jsc.fire({
      input: 'textarea',
      inputAutoFocus: false,
    })
    setTimeout(() => {
      expect(document.activeElement).to.equal(Jsc.getConfirmButton())
      done()
    })
  })

  it('input email + built-in email validation', (done) => {
    const invalidEmailAddress = 'blah-blah@zzz'
    const validEmailAddress = 'team+support+a.b@example.com'
    JscWithoutAnimation.fire({ input: 'email' }).then((result) => {
      expect(result.value).to.equal(validEmailAddress)
      done()
    })

    Jsc.getInput().value = invalidEmailAddress
    Jsc.clickConfirm()
    setTimeout(() => {
      expect(isVisible(Jsc.getValidationMessage())).to.be.true
      expect(Jsc.getValidationMessage().textContent.indexOf('Invalid email address') !== -1).to.be.true

      Jsc.getInput().value = validEmailAddress
      triggerKeydownEvent(Jsc.getInput(), 'Enter')
    }, TIMEOUT)
  })

  it('input url + built-in url validation', (done) => {
    const invalidUrl = 'sweetalert2.github.io'
    const validUrl = 'https://sweetalert2.github.io/'
    JscWithoutAnimation.fire({ input: 'url' }).then((result) => {
      expect(result.value).to.equal(validUrl)
      done()
    })
    Jsc.getInput().value = invalidUrl
    Jsc.clickConfirm()
    setTimeout(() => {
      expect(isVisible(Jsc.getValidationMessage())).to.be.true
      expect(Jsc.getValidationMessage().textContent.indexOf('Invalid URL') !== -1).to.be.true

      Jsc.getInput().value = validUrl
      triggerKeydownEvent(Jsc.getInput(), 'Enter')
    }, TIMEOUT)
  })

  it('input select', (done) => {
    const selected = 'dos'
    Jsc.fire({
      input: 'select',
      inputOptions: { uno: 1, dos: 2 },
      inputPlaceholder: 'Choose a number',
    }).then((result) => {
      expect(result.value).to.equal(selected)
      done()
    })
    expect(Jsc.getInput().value).to.equal('')
    const placeholderOption = Jsc.getInput().querySelector('option')
    expect(placeholderOption.disabled).to.be.true
    expect(placeholderOption.selected).to.be.true
    expect(placeholderOption.textContent).to.equal('Choose a number')
    Jsc.getInput().value = selected
    Jsc.clickConfirm()
  })

  it('input select with optgroup and root options', (done) => {
    const selected = 'três ponto um'
    Jsc.fire({
      input: 'select',
      inputOptions: { um: 1.0, dois: 2.0, três: { 'três ponto um': 3.1, 'três ponto dois': 3.2 } },
      inputPlaceholder: 'Choose an item',
    }).then((result) => {
      expect(result.value).to.equal(selected)
      done()
    })
    expect(Jsc.getInput().value).to.equal('')
    const placeholderOption = Jsc.getInput().querySelector('option')
    expect(placeholderOption.disabled).to.be.true
    expect(placeholderOption.selected).to.be.true
    expect(placeholderOption.textContent).to.equal('Choose an item')
    Jsc.getInput().value = selected
    Jsc.clickConfirm()
  })

  it('input select with only optgroups options', (done) => {
    const selected = 'três ponto dois'
    Jsc.fire({
      input: 'select',
      inputOptions: {
        dois: { 'dois ponto um': 2.1, 'dois ponto dois': 2.2 },
        três: { 'três ponto um': 3.1, 'três ponto dois': 3.2 },
      },
      inputPlaceholder: 'Choose an item',
    }).then((result) => {
      expect(result.value).to.equal(selected)
      done()
    })
    expect(Jsc.getInput().value).to.equal('')
    const placeholderOption = Jsc.getInput().querySelector('option')
    expect(placeholderOption.disabled).to.be.true
    expect(placeholderOption.selected).to.be.true
    expect(placeholderOption.textContent).to.equal('Choose an item')
    Jsc.getInput().value = selected
    Jsc.clickConfirm()
  })

  it('input select with inputOptions as Promise', (done) => {
    Jsc.fire({
      input: 'select',
      inputOptions: Promise.resolve({ one: 1, two: 2 }),
      didOpen: () => {
        setTimeout(() => {
          Jsc.getInput().value = 'one'
          expect(Jsc.getInput().value).to.equal('one')
          done()
        }, TIMEOUT)
      },
    })
  })

  it('input select with inputOptions as object containing toPromise', (done) => {
    Jsc.fire({
      input: 'select',
      inputOptions: {
        toPromise: () => Promise.resolve({ three: 3, four: 4 }),
      },
      didOpen: () => {
        setTimeout(() => {
          Jsc.getInput().value = 'three'
          expect(Jsc.getInput().value).to.equal('three')
          done()
        }, TIMEOUT)
      },
    })
  })

  it('input text w/ inputPlaceholder as configuration', () => {
    Jsc.fire({
      input: 'text',
      inputPlaceholder: 'placeholder text',
    })
    expect(Jsc.getInput().value).to.equal('')
    expect(Jsc.getInput().placeholder).to.equal('placeholder text')
  })

  it('input checkbox', (done) => {
    Jsc.fire({ input: 'checkbox', inputAttributes: { name: 'test-checkbox' } }).then((result) => {
      expect(checkbox.getAttribute('name')).to.equal('test-checkbox')
      expect(result.value).to.equal(1)
      done()
    })
    const checkbox = $('.jsc-checkbox input')
    expect(isVisible(checkbox)).to.be.true
    checkbox.checked = true
    Jsc.clickConfirm()
  })

  it('input range', () => {
    Jsc.fire({ input: 'range', inputAttributes: { min: 1, max: 10 }, inputValue: 5 })
    const input = Jsc.getInput()
    const output = $('.jsc-range output')
    expect(isVisible(input)).to.be.true
    expect(isVisible(output)).to.be.true
    expect(input.getAttribute('min')).to.equal('1')
    expect(input.getAttribute('max')).to.equal('10')
    expect(input.value).to.equal('5')
    input.value = 10
    dispatchCustomEvent(input, 'input')
    expect(output.textContent).to.equal('10')
    input.value = 9
    dispatchCustomEvent(input, 'change')
    expect(output.textContent).to.equal('9')
  })

  it('input type "select", inputOptions Map', () => {
    const inputOptions = new Map()
    inputOptions.set(2, 'Richard Stallman')
    inputOptions.set(1, 'Linus Torvalds')
    JscWithoutAnimation.fire({
      input: 'select',
      inputOptions,
      inputValue: 1,
    })
    expect($('.jsc-select').querySelectorAll('option').length).to.equal(2)
    expect($('.jsc-select option:nth-child(1)').innerHTML).to.equal('Richard Stallman')
    expect($('.jsc-select option:nth-child(1)').value).to.equal('2')
    expect($('.jsc-select option:nth-child(2)').innerHTML).to.equal('Linus Torvalds')
    expect($('.jsc-select option:nth-child(2)').value).to.equal('1')
    expect($('.jsc-select option:nth-child(2)').selected).to.equal(true)
  })

  it('input type "select", inputOptions Map with optgroup and root options', () => {
    const inputOptions = new Map()
    inputOptions.set(2, 'Richard Stallman')
    inputOptions.set(1, 'Linus Torvalds')

    const optGroup1Options = new Map()
    optGroup1Options.set(100, 'jQuery')
    optGroup1Options.set(200, 'ReactJS')
    optGroup1Options.set(300, 'VueJS')
    inputOptions.set('Frameworks optgroup', optGroup1Options)

    JscWithoutAnimation.fire({
      input: 'select',
      inputOptions,
      inputValue: 1,
    })
    expect($('.jsc-select').querySelectorAll('option').length).to.equal(5)
    expect($('.jsc-select').querySelectorAll('optgroup').length).to.equal(1)
    expect($('.jsc-select option:nth-child(1)').innerHTML).to.equal('Richard Stallman')
    expect($('.jsc-select option:nth-child(1)').value).to.equal('2')
    expect($('.jsc-select option:nth-child(2)').innerHTML).to.equal('Linus Torvalds')
    expect($('.jsc-select option:nth-child(2)').value).to.equal('1')
    expect($('.jsc-select option:nth-child(2)').selected).to.equal(true)
    expect($('.jsc-select optgroup option:nth-child(1)').innerHTML).to.equal('jQuery')
    expect($('.jsc-select optgroup option:nth-child(1)').value).to.equal('100')
    expect($('.jsc-select optgroup option:nth-child(2)').innerHTML).to.equal('ReactJS')
    expect($('.jsc-select optgroup option:nth-child(2)').value).to.equal('200')
    expect($('.jsc-select optgroup option:nth-child(3)').innerHTML).to.equal('VueJS')
    expect($('.jsc-select optgroup option:nth-child(3)').value).to.equal('300')
  })

  it('input type "select", inputOptions Map with only optgroup options', () => {
    const inputOptions = new Map()

    const frameworkOptGroupOptions = new Map()
    frameworkOptGroupOptions.set('100', 'jQuery')
    frameworkOptGroupOptions.set('200', 'ReactJS')
    frameworkOptGroupOptions.set('300', 'VueJS')
    inputOptions.set('Frameworks optgroup', frameworkOptGroupOptions)

    const libOptGroupOptions = new Map()
    libOptGroupOptions.set('1000', 'JsConfirm')
    libOptGroupOptions.set('2000', 'Bootstrap4')
    inputOptions.set('Library optgroup', libOptGroupOptions)

    JscWithoutAnimation.fire({
      input: 'select',
      inputOptions,
      inputValue: '1000',
    })
    expect($('.jsc-select').querySelectorAll('option').length).to.equal(5)
    expect($('.jsc-select').querySelectorAll('optgroup').length).to.equal(2)
    expect($('.jsc-select optgroup:nth-child(1) option:nth-child(1)').innerHTML).to.equal('jQuery')
    expect($('.jsc-select optgroup:nth-child(1) option:nth-child(1)').value).to.equal('100')
    expect($('.jsc-select optgroup:nth-child(1) option:nth-child(2)').innerHTML).to.equal('ReactJS')
    expect($('.jsc-select optgroup:nth-child(1) option:nth-child(2)').value).to.equal('200')
    expect($('.jsc-select optgroup:nth-child(1) option:nth-child(3)').innerHTML).to.equal('VueJS')
    expect($('.jsc-select optgroup:nth-child(1) option:nth-child(3)').value).to.equal('300')
    expect($('.jsc-select optgroup:nth-child(2) option:nth-child(1)').innerHTML).to.equal('JsConfirm')
    expect($('.jsc-select optgroup:nth-child(2) option:nth-child(1)').value).to.equal('1000')
    expect($('.jsc-select optgroup:nth-child(2) option:nth-child(1)').selected).to.equal(true)
    expect($('.jsc-select optgroup:nth-child(2) option:nth-child(2)').innerHTML).to.equal('Bootstrap4')
    expect($('.jsc-select optgroup:nth-child(2) option:nth-child(2)').value).to.equal('2000')
  })

  it('input type "radio", inputOptions Map', () => {
    const inputOptions = new Map()
    inputOptions.set(2, 'Richard Stallman')
    inputOptions.set(1, 'Linus Torvalds')
    Jsc.fire({
      input: 'radio',
      inputOptions,
      inputValue: 1,
    })
    expect($('.jsc-radio').querySelectorAll('label').length).to.equal(2)
    expect($('.jsc-radio label:nth-child(1)').textContent).to.equal('Richard Stallman')
    expect($('.jsc-radio label:nth-child(1) input').value).to.equal('2')
    expect($('.jsc-radio label:nth-child(2)').textContent).to.equal('Linus Torvalds')
    expect($('.jsc-radio label:nth-child(2) input').value).to.equal('1')
    expect($('.jsc-radio label:nth-child(2) input').checked).to.equal(true)
  })

  it('input radio', () => {
    Jsc.fire({
      input: 'radio',
      inputOptions: {
        one: 'one',
        two: 'two',
      },
    })
    expect($('.jsc-radio').querySelectorAll('label').length).to.equal(2)
    expect($('.jsc-radio').querySelectorAll('input[type="radio"]').length).to.equal(2)
  })

  it('popup should expand and shrink accordingly to textarea width', (done) => {
    JscWithoutAnimation.fire({
      input: 'textarea',
    })
    setTimeout(() => {
      Jsc.getInput().style.width = '600px'
      setTimeout(() => {
        expect(Jsc.getPopup().style.width).to.equal('672px')
        Jsc.getInput().style.width = '100px'
        setTimeout(() => {
          expect(Jsc.getPopup().style.width).to.equal('')
          done()
        })
      })
    })
  })

  it('popup should keep the custom width when textarea value is a promise', (done) => {
    JscWithoutAnimation.fire({
      input: 'textarea',
      width: 600,
      inputValue: new Promise((resolve) => {
        setTimeout(() => {
          resolve('foo')
        }, 10)
      }),
    })
    setTimeout(() => {
      expect(Jsc.getInput().value).to.equal('foo')
      expect(Jsc.getPopup().style.width).to.equal('600px')
      done()
    }, 20)
  })

  it('should not fail if textarea value is a promise and popup is closed before the promise is resolved', (done) => {
    JscWithoutAnimation.fire({
      input: 'textarea',
      width: 600,
      inputValue: new Promise((resolve) => {
        setTimeout(() => {
          resolve('foo')
        }, 10)
      }),
      didOpen: () => {
        Jsc.close()
      },
    })
    setTimeout(() => {
      done()
    }, 20)
  })

  it('returnInputValueOnDeny: true should pass the input value as result.value', (done) => {
    JscWithoutAnimation.fire({
      input: 'text',
      inputValue: 'returnInputValueOnDeny',
      returnInputValueOnDeny: true,
    }).then((result) => {
      expect(result).to.eql({
        value: 'returnInputValueOnDeny',
        isConfirmed: false,
        isDenied: true,
        isDismissed: false,
      })
      done()
    })
    Jsc.clickDeny()
  })

  it(`returnInputValueOnDeny: true should throw warning if the input params isn't set`, () => {
    const spy = cy.spy(console, 'error')
    JscWithoutAnimation.fire({
      showDenyButton: true,
      returnInputValueOnDeny: true,
    })
    Jsc.clickDeny()
    expect(spy.calledWith('JsConfirm: The "input" parameter is needed to be set when using returnInputValueOnDeny'))
      .to.be.true
  })

  it('disable/enable input', () => {
    Jsc.fire('(disable/enable)Input should not fail if there is no input')
    Jsc.disableInput()
    Jsc.enableInput()

    Jsc.fire({
      input: 'text',
    })

    Jsc.disableInput()
    expect(Jsc.getInput().disabled).to.be.true
    Jsc.enableInput()
    expect(Jsc.getInput().disabled).to.be.false

    Jsc.fire({
      input: 'radio',
      inputOptions: {
        one: 'one',
        two: 'two',
      },
    })

    Jsc.disableInput()
    Array.from($('.jsc-radio').querySelectorAll('radio')).forEach((radio) => {
      expect(radio.disabled).to.be.true
    })
    Jsc.enableInput()
    Array.from($('.jsc-radio').querySelectorAll('radio')).forEach((radio) => {
      expect(radio.disabled).to.be.false
    })
  })

  it('should throw console error about unexpected type of InputOptions', () => {
    const spy = cy.spy(console, 'error')
    Jsc.fire({ input: 'select', inputOptions: 'invalid-input-options' })
    expect(spy.calledWith('JsConfirm: Unexpected type of inputOptions! Expected object, Map or Promise, got string'))
      .to.be.true
  })

  it('multiple inputs', (done) => {
    Jsc.fire({
      html: '<input id="jsc-input1" class="jsc-input">' + '<input id="jsc-input2" class="jsc-input">',
      preConfirm: () => {
        return [document.getElementById('jsc-input1').value, document.getElementById('jsc-input2').value]
      },
      didOpen: () => {
        document.getElementById('jsc-input1').value = 'foo'
        document.getElementById('jsc-input2').value = 'bar'
        Jsc.clickConfirm()
      },
    }).then((result) => {
      expect(result.value).to.eql(['foo', 'bar'])
      done()
    })
  })
})

describe('Validation', () => {
  it('input.checkValidity()', (done) => {
    Jsc.fire({
      input: 'tel',
      inputAttributes: {
        pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
      },
      validationMessage: 'Invalid phone number',
      customClass: {
        validationMessage: 'my-validation-message',
      },
    }).then((result) => {
      expect(result.value).to.equal('123-456-7890')
      done()
    })
    Jsc.getInput().value = 'blah-blah'
    Jsc.clickConfirm()
    setTimeout(() => {
      expect(Jsc.getConfirmButton().disabled).to.be.false
      expect(Jsc.getDenyButton().disabled).to.be.false
      expect(Jsc.getCancelButton().disabled).to.be.false
      expect(isVisible(Jsc.getValidationMessage())).to.be.true
      expect(Jsc.getValidationMessage().textContent).to.equal('Invalid phone number')
      expect(Jsc.getValidationMessage().classList.contains('my-validation-message')).to.be.true
      Jsc.getInput().value = '123-456-7890'
      Jsc.clickConfirm()
    }, TIMEOUT)
  })

  it('validation message', (done) => {
    const inputValidator = (value) => Promise.resolve(!value && 'no falsy values')

    JscWithoutAnimation.fire({ input: 'text', inputValidator })
    expect(isHidden(Jsc.getValidationMessage())).to.be.true
    setTimeout(() => {
      const initialModalHeight = Jsc.getPopup().offsetHeight

      Jsc.clickConfirm()
      setTimeout(() => {
        expect(isVisible(Jsc.getValidationMessage())).to.be.true
        expect(Jsc.getValidationMessage().textContent).to.equal('no falsy values')
        expect(Jsc.getInput().getAttribute('aria-invalid')).to.equal('true')
        expect(Jsc.getPopup().offsetHeight > initialModalHeight).to.be.true

        Jsc.getInput().value = 'blah-blah'

        // setting the value programmatically will not trigger the 'input' event,
        // doing that manually
        const event = document.createEvent('Event')
        event.initEvent('input', true, true)
        Jsc.getInput().dispatchEvent(event)

        expect(isHidden(Jsc.getValidationMessage())).to.be.true
        expect(Jsc.getInput().getAttribute('aria-invalid')).to.be.null
        expect(Jsc.getPopup().offsetHeight === initialModalHeight).to.be.true
        done()
      }, TIMEOUT)
    }, TIMEOUT)
  })

  it('validation message with object containing toPromise', (done) => {
    JscWithoutAnimation.fire({
      input: 'text',
      inputValidator: (value, validationMessage) => ({
        toPromise: () => Promise.resolve(!value && validationMessage),
      }),
      validationMessage: 'no falsy values',
    })

    setTimeout(() => {
      Jsc.clickConfirm()
      setTimeout(() => {
        expect(isVisible(Jsc.getValidationMessage())).to.be.true
        expect(Jsc.getValidationMessage().textContent).to.equal('no falsy values')
        done()
      }, TIMEOUT)
    }, TIMEOUT)
  })

  it('default URL validator: https://google.com', (done) => {
    defaultInputValidators.url('https://google.com').then(() => {
      done()
    })
  })

  it('default URL validator: http://g.co', (done) => {
    defaultInputValidators.url('http://g.co').then(() => {
      done()
    })
  })

  it('default URL validator: http://foo.localhost/', (done) => {
    defaultInputValidators.url('http://foo.localhost/').then(() => {
      done()
    })
  })

  it('default URL validator: invalid url', (done) => {
    defaultInputValidators.url('invalid url').then((data) => {
      expect(data).to.equal('Invalid URL')
      done()
    })
  })
})

describe('inputAttributes', () => {
  it('input text w/ placeholder', () => {
    Jsc.fire({
      input: 'text',
      inputAttributes: {
        placeholder: 'placeholder text',
      },
    })
    expect(Jsc.getInput().value).to.equal('')
    expect(Jsc.getInput().placeholder).to.equal('placeholder text')
  })

  it('input file w/ placeholder', () => {
    Jsc.fire({
      input: 'file',
      inputAttributes: {
        placeholder: 'placeholder text',
      },
    })
    expect(Jsc.getInput().value).to.equal('')
    expect(Jsc.getInput().placeholder).to.equal('placeholder text')
  })

  it('input textarea w/ placeholder', () => {
    Jsc.fire({
      input: 'textarea',
      inputAttributes: {
        placeholder: 'Provide your input here',
      },
    })
    expect(Jsc.getInput().value).to.equal('')
    expect(Jsc.getInput().placeholder).to.equal('Provide your input here')
  })
})

describe('inputValue', () => {
  it('inputValue number', () => {
    Jsc.fire({ input: 'text', inputValue: 333 })
    expect(Jsc.getInput().value).to.equal('333')
  })

  it('inputValue with object containing toPromise', (done) => {
    Jsc.fire({
      input: 'text',
      inputValue: {
        toPromise: () => Promise.resolve('test'),
      },
      didOpen: () => {
        setTimeout(() => {
          expect(Jsc.getInput().value).to.equal('test')
          done()
        }, TIMEOUT)
      },
    })
  })

  it('inputValue as a Promise', (done) => {
    const spy = cy.spy(console, 'warn')
    const inputTypes = ['text', 'email', 'number', 'tel', 'textarea']
    const value = '1.1 input value'
    const inputValue = new Promise((resolve) => {
      resolve('1.1 input value')
    })

    function showPopupWithInput() {
      const input = inputTypes.pop()
      JscWithoutAnimation.fire({
        input,
        inputValue,
        didOpen: () => {
          setTimeout(() => {
            expect(Jsc.getInput().value).to.equal(input === 'number' ? parseFloat(value).toString() : value)
            if (inputTypes.length) {
              showPopupWithInput()
            } else {
              done()
            }
          }, TIMEOUT)
        },
      })
    }
    showPopupWithInput()
    expect(spy.notCalled).to.be.true
  })

  it('should throw console error when inputValue as a Promise rejects', (done) => {
    const spy = cy.spy(console, 'error')
    JscWithoutAnimation.fire({
      input: 'text',
      inputValue: new Promise((resolve, reject) => {
        reject(new Error('input promise rejected'))
      }),
      didOpen: () => {
        setTimeout(() => {
          expect(spy.calledWith('JsConfirm: Error in inputValue promise: Error: input promise rejected')).to.be.true
          done()
        }, TIMEOUT)
      },
    })
  })

  it('should throw console warning about unexpected type of inputValue for input: text', () => {
    const spy = cy.spy(console, 'warn')
    Jsc.fire({ input: 'text', inputValue: undefined })
    expect(
      spy.calledWith(
        'JsConfirm: Unexpected type of inputValue! Expected "string", "number" or "Promise", got "undefined"'
      )
    ).to.be.true
  })

  it('should throw console warning about unexpected type of inputValue for input: textarea', () => {
    const spy = cy.spy(console, 'warn')
    Jsc.fire({ input: 'textarea', inputValue: {} })
    expect(
      spy.calledWith(
        'JsConfirm: Unexpected type of inputValue! Expected "string", "number" or "Promise", got "object"'
      )
    ).to.be.true
  })

  it('inputValue can be null', () => {
    const spy = cy.spy(console, 'error')
    Jsc.fire({ input: 'select', inputOptions: { a: 'a' }, inputValue: null })
    expect(spy.notCalled).to.be.true
  })
})
