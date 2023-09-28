/// <reference types="cypress" />

import { Jsc } from '../../utils'

describe('target', () => {
  it('target', () => {
    console.warn = () => true // Suppress the warnings
    Jsc.fire('Default target')
    expect(document.body).to.equal(Jsc.getContainer().parentNode)
    Jsc.close()

    const dummyTargetElement = Object.assign(document.createElement('div'), { id: 'dummy-target' })
    document.body.appendChild(dummyTargetElement)

    Jsc.fire({ title: 'Custom valid target (string)', target: '#dummy-target' }) // switch targets
    expect(Jsc.getContainer().parentNode).to.equal(dummyTargetElement)
    Jsc.close()

    Jsc.fire({ title: 'Custom invalid target (string)', target: 'lorem_ipsum' }) // switch targets
    expect(Jsc.getContainer().parentNode).to.equal(document.body)
    Jsc.close()

    Jsc.fire({ title: 'Custom valid target (element)', target: dummyTargetElement })
    expect(Jsc.getContainer().parentNode).to.equal(dummyTargetElement)
    Jsc.close()

    Jsc.fire({ title: 'Custom invalid target (element)', target: true })
    expect(document.body).to.equal(Jsc.getContainer().parentNode)
    Jsc.close()
  })
})
