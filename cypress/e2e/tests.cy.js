/// <reference types="cypress" />

import jQuery from 'jquery'
import Jsc from '../../src/sweetalert2'
import { SHOW_CLASS_TIMEOUT } from '../../src/utils/openPopup'
import { $, JscWithoutAnimation, dispatchCustomEvent, isHidden, triggerKeydownEvent } from '../utils'
import { isVisible } from '../../src/utils/dom'
import { defaultParams } from '../../src/utils/params'

describe('Miscellaneous tests', function () {
  it('version is correct semver', () => {
    expect(!!Jsc.version.match(/\d+\.\d+\.\d+/)).to.be.true
  })

  it('modal shows up', () => {
    Jsc.fire('Hello world!')
    expect(Jsc.isVisible()).to.be.true
  })

  it('the icon is shown', () => {
    Jsc.fire('', '', 'success')
    expect(Jsc.getIcon().classList.contains('jsc-success')).to.be.true
  })

  it('should throw console warning about invalid params', () => {
    const spy = cy.spy(console, 'warn')
    Jsc.fire({ invalidParam: 'oops' })
    expect(spy.calledWith('JsConfirm: Unknown parameter "invalidParam"')).to.be.true
  })

  it('should throw console error about unexpected params', () => {
    const spy = cy.spy(console, 'error')
    Jsc.fire('Hello world!', { icon: 'success' })
    expect(spy.calledWith('JsConfirm: Unexpected type of html! Expected "string" or "Element", got object')).to.be
      .true
  })

  it('should not throw console error about undefined params and treat them as empty strings', () => {
    const spy = cy.spy(console, 'error')
    Jsc.fire(undefined, 'Hello world!', undefined)
    expect(spy.notCalled).to.be.true
  })

  it('should accept Elements as shorhand params', () => {
    const title = document.createElement('strong')
    title.innerHTML = 'title'
    const content = document.createElement('a')
    content.innerHTML = 'content'
    Jsc.fire(title, content, 'success')
    expect(Jsc.getTitle().innerHTML).to.equal('<strong>title</strong>')
    expect(Jsc.getHtmlContainer().innerHTML).to.equal('<a>content</a>')
  })

  it('should show the popup with OK button in case of empty object passed as an argument', () => {
    Jsc.fire({})
    expect(isVisible(Jsc.getConfirmButton())).to.be.true
    expect(isHidden(Jsc.getDenyButton())).to.be.true
    expect(isHidden(Jsc.getCancelButton())).to.be.true
    expect(Jsc.getTitle().textContent).to.equal('')
    expect(Jsc.getHtmlContainer().textContent).to.equal('')
    expect(isHidden(Jsc.getFooter())).to.be.true
  })

  it('modal width', () => {
    Jsc.fire({ width: 300 })
    expect(Jsc.getPopup().style.width).to.equal('300px')

    Jsc.fire({ width: '400px' })
    expect(Jsc.getPopup().style.width).to.equal('400px')

    Jsc.fire({ width: '500' })
    expect(Jsc.getPopup().style.width).to.equal('500px')

    Jsc.fire({ width: '90%' })
    expect(Jsc.getPopup().style.width).to.equal('90%')
  })

  it('heightAuto', () => {
    Jsc.fire('I should set .jsc-height-auto class to html and body')
    expect(document.documentElement.classList.contains('jsc-height-auto')).to.be.true

    Jsc.fire({
      title: 'I am modeless and should not set .jsc-height-auto',
      backdrop: false,
    })
    expect(document.documentElement.classList.contains('jsc-height-auto')).to.be.true

    Jsc.fire({
      title: 'I am toast and should not set .jsc-height-auto',
      toast: true,
    })
    expect(document.documentElement.classList.contains('jsc-height-auto')).to.be.true
  })

  it('getters', () => {
    Jsc.fire('Title', 'Content')
    expect(Jsc.getTitle().innerText).to.equal('Title')
    expect(Jsc.getHtmlContainer().innerText.trim()).to.equal('Content')

    Jsc.fire({
      showCancelButton: true,
      showDenyButton: true,
      imageUrl: '/assets/jsc-logo.png',
      confirmButtonText: 'Confirm button',
      confirmButtonAriaLabel: 'Confirm button aria-label',
      denyButtonText: 'Deny button',
      denyButtonAriaLabel: 'Deny button aria-label',
      cancelButtonText: 'Cancel button',
      cancelButtonAriaLabel: 'Cancel button aria-label',
      footer: '<b>Footer</b>',
    })
    expect(Jsc.getImage().src.includes('/assets/jsc-logo.png')).to.be.true
    expect(Jsc.getActions().textContent).to.equal('Confirm buttonDeny buttonCancel button')
    expect(Jsc.getConfirmButton().innerText).to.equal('Confirm button')
    expect(Jsc.getDenyButton().innerText).to.equal('Deny button')
    expect(Jsc.getCancelButton().innerText).to.equal('Cancel button')
    expect(Jsc.getConfirmButton().getAttribute('aria-label')).to.equal('Confirm button aria-label')
    expect(Jsc.getDenyButton().getAttribute('aria-label')).to.equal('Deny button aria-label')
    expect(Jsc.getCancelButton().getAttribute('aria-label')).to.equal('Cancel button aria-label')
    expect(Jsc.getFooter().innerHTML).to.equal('<b>Footer</b>')

    Jsc.fire({ input: 'text' })
    Jsc.getInput().value = 'input text'
    expect(Jsc.getInput().value).to.equal('input text')

    Jsc.fire({
      input: 'radio',
      inputOptions: {
        one: 'one',
        two: 'two',
      },
    })
    $('.jsc-radio input[value="two"]').setAttribute('checked', true)
    expect(Jsc.getInput().value).to.equal('two')
  })

  it('content/title is set (html)', () => {
    Jsc.fire({
      title: '<strong>Strong</strong>, <em>Emphasis</em>',
      html: '<style>p { font-size: 10px; }</style><p>Paragraph</p><img /><button style="width:10px"></button>',
    })

    expect(Jsc.getTitle().querySelectorAll('strong, em').length).to.equal(2)
    expect(Jsc.getHtmlContainer().querySelectorAll('style, p, img, button').length).to.equal(4)
    expect(Jsc.getHtmlContainer().querySelector('button').style.width).to.equal('10px')
    expect(window.getComputedStyle(Jsc.getHtmlContainer().querySelector('p')).fontSize).to.equal('10px')
  })

  it('content/title is set (text)', () => {
    Jsc.fire({
      titleText: '<strong>Strong</strong>, <em>Emphasis</em>',
      text: '<p>Paragraph</p><img /><button></button>',
    })

    expect(Jsc.getTitle().innerHTML, '&lt;strong&gt;Strong&lt;/strong&gt;).to.equal(&lt;em&gt;Emphasis&lt;/em&gt;')
    expect(Jsc.getHtmlContainer().innerHTML).to.equal(
      '&lt;p&gt;Paragraph&lt;/p&gt;&lt;img /&gt;&lt;button&gt;&lt;/button&gt;'
    )
    expect(Jsc.getTitle().querySelectorAll('strong, em').length).to.equal(0)
    expect(Jsc.getHtmlContainer().querySelectorAll('p, img, button').length).to.equal(0)
  })

  it('JS element as html param', () => {
    const p = document.createElement('p')
    p.textContent = 'js element'
    Jsc.fire({
      html: p,
    })
    expect(Jsc.getHtmlContainer().innerHTML).to.equal('<p>js element</p>')
  })

  it('disable/enable buttons', () => {
    Jsc.fire('test disable/enable buttons')

    Jsc.disableButtons()
    expect(Jsc.getConfirmButton().disabled).to.be.true
    expect(Jsc.getDenyButton().disabled).to.be.true
    expect(Jsc.getCancelButton().disabled).to.be.true

    Jsc.enableButtons()
    expect(Jsc.getConfirmButton().disabled).to.be.false
    expect(Jsc.getDenyButton().disabled).to.be.false
    expect(Jsc.getCancelButton().disabled).to.be.false
  })

  it('reversed buttons', () => {
    Jsc.fire({
      text: 'Modal with reversed buttons',
      showCancelButton: true,
      showDenyButton: true,
      reverseButtons: true,
    })
    expect(Jsc.getConfirmButton().previousSibling).to.equal(Jsc.getDenyButton())
    expect(Jsc.getDenyButton().previousSibling).to.equal(Jsc.getCancelButton())

    Jsc.fire('Modal with buttons')
    expect(Jsc.getDenyButton().previousSibling).to.equal(Jsc.getConfirmButton())
    expect(Jsc.getCancelButton().previousSibling).to.equal(Jsc.getDenyButton())
  })

  it('modal vertical offset', (done) => {
    // create a modal with dynamic-height content
    JscWithoutAnimation.fire({
      imageUrl:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNikAQAACIAHF/uBd8AAAAASUVORK5CYII=',
      title: 'Title',
      html: '<hr><div style="height: 50px"></div><p>Text content</p>',
      icon: 'warning',
      input: 'text',
    })

    // listen for image load
    Jsc.getImage().addEventListener('load', () => {
      const box = Jsc.getPopup().getBoundingClientRect()
      const delta = box.top - (box.bottom - box.height)
      // allow 1px difference, in case of uneven height
      expect(Math.abs(delta) <= 1).to.be.true
      done()
    })
  })

  it('didOpen', (done) => {
    // create a modal with an didOpen callback
    Jsc.fire({
      title: 'didOpen test',
      didOpen: (modal) => {
        expect(Jsc.getPopup()).to.equal(modal)
        done()
      },
    })
  })

  it('willOpen', (done) => {
    // create a modal with an willOpen callback
    Jsc.fire({
      title: 'willOpen test',
      willOpen: (modal) => {
        expect(Jsc.isVisible()).to.be.false
        expect(Jsc.getPopup()).to.equal(modal)
      },
    })

    // check that willOpen calls properly
    const dynamicTitle = 'Set willOpen title'
    Jsc.fire({
      title: 'willOpen test',
      willOpen: () => {
        Jsc.getTitle().innerHTML = dynamicTitle
      },
      didOpen: () => {
        expect(Jsc.getTitle().innerHTML).to.equal(dynamicTitle)
        done()
      },
    })
  })

  it('didRender', () => {
    const didRender = cy.spy()

    // create a modal with an didRender callback
    // the didRender hook should be called once here
    Jsc.fire({
      title: 'didRender test',
      didRender,
    })

    expect(didRender.calledOnce).to.be.true

    // update the modal, causing a new render
    // the didRender hook should be called once again
    Jsc.update({})

    expect(didRender.calledTwice).to.be.true

    // the modal element must always be passed to the didRender hook
    expect(didRender.alwaysCalledWithExactly(Jsc.getPopup())).to.be.true
  })

  it('didClose', (done) => {
    let willCloseFinished = false

    // create a modal with an didClose callback
    Jsc.fire({
      title: 'didClose test',
      willClose: () => {
        willCloseFinished = true
      },
      didClose: () => {
        expect(willCloseFinished).to.be.true
        expect(Jsc.getContainer()).to.be.null
        done()
      },
    })

    Jsc.getCloseButton().click()
  })

  it('didDestroy', (done) => {
    let firstPopupDestroyed = false
    Jsc.fire({
      title: '1',
      didDestroy: () => {
        firstPopupDestroyed = true
      },
    })
    Jsc.fire({
      title: '2',
      didDestroy: () => {
        done()
      },
    })
    expect(firstPopupDestroyed).to.be.true
    Jsc.getConfirmButton().click()
  })

  it('willClose', (done) => {
    // create a modal with an willClose callback
    Jsc.fire({
      title: 'willClose test',
      willClose: (_modal) => {
        expect(modal).to.equal(_modal)
        expect(Jsc.getContainer()).to.equal($('.jsc-container'))
        done()
      },
    })

    const modal = Jsc.getPopup()
    Jsc.getCloseButton().click()
  })

  it('Jsc.fire() in willClose', (done) => {
    Jsc.fire({
      title: 'willClose test',
      willClose: () => {
        Jsc.fire({
          text: 'WillClose',
          input: 'text',
          customClass: {
            input: 'on-close-jsc',
          },
        })
      },
    }).then(() => {
      expect(Jsc.isVisible()).to.be.true
      expect(Jsc.getInput().classList.contains('on-close-jsc')).to.be.true
      done()
    })

    Jsc.clickConfirm()
  })

  it('esc key', (done) => {
    document.body.addEventListener('keydown', () => {
      throw new Error('Should not propagate keydown event to body!')
    })

    JscWithoutAnimation.fire({
      title: 'Esc me',
      didOpen: () => triggerKeydownEvent(Jsc.getPopup(), 'Escape'),
    }).then((result) => {
      expect(result).to.eql({
        dismiss: Jsc.DismissReason.esc,
        isConfirmed: false,
        isDenied: false,
        isDismissed: true,
      })
      done()
    })
  })

  it('allowEscapeKey as a function', (done) => {
    let functionWasCalled = false

    JscWithoutAnimation.fire({
      title: 'allowEscapeKey as a function',
      allowEscapeKey: () => {
        functionWasCalled = true
        return false
      },
      didOpen: () => {
        expect(functionWasCalled).to.equal(false)

        triggerKeydownEvent(Jsc.getPopup(), 'Escape')

        setTimeout(() => {
          expect(functionWasCalled).to.equal(true)
          expect(Jsc.isVisible()).to.be.true

          done()
        })
      },
    })
  })

  it('close button', (done) => {
    Jsc.fire({
      title: 'Close button test',
      showCloseButton: true,
    }).then((result) => {
      expect(result).to.eql({
        dismiss: Jsc.DismissReason.close,
        isConfirmed: false,
        isDenied: false,
        isDismissed: true,
      })
      done()
    })

    const closeButton = Jsc.getCloseButton()
    expect(isVisible(closeButton)).to.be.true
    expect(closeButton.getAttribute('aria-label')).to.equal('Close this dialog')
    closeButton.click()
  })

  it('close button customization', () => {
    Jsc.fire({
      title: 'Customized Close button test',
      showCloseButton: true,
      closeButtonHtml: 'c',
    })

    const closeButton = Jsc.getCloseButton()
    expect(closeButton.innerHTML).to.equal('c')
  })

  it('cancel button', (done) => {
    Jsc.fire({
      showCancelButton: true,
    }).then((result) => {
      expect(result).to.eql({
        dismiss: Jsc.DismissReason.cancel,
        isConfirmed: false,
        isDenied: false,
        isDismissed: true,
      })
      done()
    })

    Jsc.clickCancel()
  })

  it('deny button', (done) => {
    Jsc.fire({
      showDenyButton: true,
    }).then((result) => {
      expect(result).to.eql({
        value: false,
        isConfirmed: false,
        isDenied: true,
        isDismissed: false,
      })
      done()
    })

    Jsc.clickDeny()
  })

  it('timer', (done) => {
    JscWithoutAnimation.fire({
      title: 'Timer test',
      timer: 10,
    }).then((result) => {
      expect(result).to.eql({
        dismiss: Jsc.DismissReason.timer,
        isConfirmed: false,
        isDenied: false,
        isDismissed: true,
      })
      done()
    })
  })

  it('params validation', () => {
    expect(Jsc.isValidParameter('title')).to.be.true
    expect(Jsc.isValidParameter('foobar')).to.be.false
  })

  it('addition and removal of backdrop', () => {
    Jsc.fire({ backdrop: false })
    expect(document.body.classList.contains('jsc-no-backdrop')).to.be.true
    expect(document.documentElement.classList.contains('jsc-no-backdrop')).to.be.true
    Jsc.fire({ title: 'test' })
    expect(document.body.classList.contains('jsc-no-backdrop')).to.be.false
    expect(document.documentElement.classList.contains('jsc-no-backdrop')).to.be.false
  })

  it('footer', () => {
    Jsc.fire({ title: 'Modal with footer', footer: 'I am footer' })
    expect(isVisible(Jsc.getFooter())).to.be.true

    Jsc.fire('Modal w/o footer')
    expect(isHidden(Jsc.getFooter())).to.be.true
  })

  it('visual apperarance', () => {
    Jsc.fire({
      padding: '2em',
      background: 'red',
      confirmButtonColor: 'green',
      denyButtonColor: 'red',
      cancelButtonColor: 'blue',
    })

    expect(Jsc.getPopup().style.padding).to.equal('2em')
    expect(window.getComputedStyle(Jsc.getPopup()).backgroundColor, 'rgb(255, 0).to.equal(0)')
    expect(Jsc.getConfirmButton().style.backgroundColor).to.equal('green')
    expect(Jsc.getDenyButton().style.backgroundColor).to.equal('red')
    expect(Jsc.getCancelButton().style.backgroundColor).to.equal('blue')
  })

  it('null values', () => {
    const params = {}
    Object.keys(defaultParams).forEach((key) => {
      params[key] = null
    })
    Jsc.fire(params)
    expect(Jsc.isVisible()).to.be.true
  })

  it('backdrop accepts css background param', () => {
    Jsc.fire({
      title: 'I have no backdrop',
      backdrop: false,
    })
    expect(Jsc.getContainer().style.background).to.equal('')

    const backdrop = 'rgb(123, 123, 123)'
    Jsc.fire({
      title: 'I have a custom backdrop',
      backdrop,
    })
    expect(Jsc.getContainer().style.background.includes(backdrop)).to.be.true
  })

  it('Popup shows with jsc classes used in html', (done) => {
    Jsc.fire({
      html: '<span class="jsc-cancel"></span>',
    })
    setTimeout(() => {
      expect(Jsc.getPopup().classList.contains('jsc-show')).to.be.true
      done()
    }, SHOW_CLASS_TIMEOUT)
  })
})

describe('JQuery', () => {
  it('jQuery elements as shorthand params', () => {
    Jsc.fire(jQuery('<h1>jQuery title</h1>'), jQuery('<p>jQuery content</p>'))
    expect(Jsc.getTitle().innerHTML).to.equal('<h1>jQuery title</h1>')
    expect(Jsc.getHtmlContainer().innerHTML).to.equal('<p>jQuery content</p>')
  })

  it('jQuery elements as params', () => {
    Jsc.fire({
      title: jQuery('<h1>jQuery title</h1>'),
      html: jQuery('<p>jQuery content</p>'),
      footer: jQuery('<footer>jQuery footer</footer>'),
    })
    expect(Jsc.getTitle().innerHTML).to.equal('<h1>jQuery title</h1>')
    expect(Jsc.getHtmlContainer().innerHTML).to.equal('<p>jQuery content</p>')
    expect(Jsc.getFooter().innerHTML).to.equal('<footer>jQuery footer</footer>')
  })
})

describe('Outside click', () => {
  const simulateMouseEvent = (x, y, eventType) => {
    dispatchCustomEvent(document.elementFromPoint(x, y), eventType, { clientX: x, clientY: y })
  }

  it('backdrop click', (done) => {
    JscWithoutAnimation.fire('Backdrop click').then((result) => {
      expect(result).to.eql({
        dismiss: Jsc.DismissReason.backdrop,
        isConfirmed: false,
        isDenied: false,
        isDismissed: true,
      })
      done()
    })
    Jsc.getContainer().click()
  })

  it('double backdrop click', (done) => {
    const didClose = cy.spy()
    Jsc.fire({
      title: 'didClose should be triggered once',
      didClose,
    })
    Jsc.getContainer().click()
    Jsc.getContainer().click()
    setTimeout(() => {
      expect(didClose.calledOnce).to.be.true
      done()
    }, 500)
  })

  it('popup mousedown, backdrop mouseup', (done) => {
    Jsc.fire('popup mousedown, backdrop mouseup')
    simulateMouseEvent(1, 1, 'mousedown')
    simulateMouseEvent(window.innerWidth / 2, window.innerHeight / 2, 'mouseup')
    setTimeout(() => {
      expect(Jsc.isVisible()).to.be.true
      done()
    })
  })

  it('backdrop mousedown, popup mouseup', (done) => {
    JscWithoutAnimation.fire('backdrop mousedown, popup mouseup')
    simulateMouseEvent(window.innerWidth / 2, window.innerHeight / 2, 'mousedown')
    simulateMouseEvent(1, 1, 'mouseup')
    setTimeout(() => {
      expect(Jsc.isVisible()).to.be.true
      done()
    })
  })
})

describe('RTL', () => {
  it('container should have .jsc-rtl in case of <body dir="rtl">', () => {
    document.body.setAttribute('dir', 'rtl')
    JscWithoutAnimation.fire('hi')
    expect(Jsc.getContainer().classList.contains('jsc-rtl')).to.be.true
  })

  it('container should have .jsc-rtl in case of <body style="direction: rtl">', () => {
    document.body.style.direction = 'rtl'
    JscWithoutAnimation.fire('hi')
    expect(Jsc.getContainer().classList.contains('jsc-rtl')).to.be.true
  })

  it('container should have .jsc-rtl in case of <div dir="rtl">', () => {
    const targetDiv = document.createElement('div')
    document.body.appendChild(targetDiv)
    targetDiv.setAttribute('dir', 'rtl')
    JscWithoutAnimation.fire({ target: targetDiv })
    expect(Jsc.getContainer().classList.contains('jsc-rtl')).to.be.true
  })

  it('container should have .jsc-rtl in case of <div style="direction: rtl">', () => {
    const targetDiv = document.createElement('div')
    document.body.appendChild(targetDiv)
    targetDiv.style.direction = 'rtl'
    JscWithoutAnimation.fire({ target: targetDiv })
    expect(Jsc.getContainer().classList.contains('jsc-rtl')).to.be.true
  })
})
