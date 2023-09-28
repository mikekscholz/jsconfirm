/// <reference types="cypress" />

import { Jsc } from '../utils'

describe('API', () => {
  it('properties of `Jsc` class are consistent', (done) => {
    const assertConsistent = (postfix) => {
      const currentJscPropNames = Object.keys(Jsc)
      // const extraPropNames = currentJscPropNames.filter(key => !initialJscPropNames.includes(key))
      // expect(extraPropNames.length, 0).to.be.eql(`# of extra properties ${postfix}`)
      // expect(extraPropNames.join(','), '').to.be.eql(`extra property names ${postfix}`)
      const missingProps = currentJscPropNames.filter((key) => !currentJscPropNames.includes(key))
      expect(missingProps.length).to.equal(0, `# of missing properties ${postfix}`)
      expect(missingProps.join(',')).to.equal('', `missing property names ${postfix}`)
    }
    assertConsistent('before first jsc')
    Jsc.fire({
      title: 'test',
      didOpen: () => {
        assertConsistent('after opening first jsc')
        Jsc.clickConfirm()
      },
    }).then(() => {
      assertConsistent('after closing first jsc')
      done()
    })
  })

  it('ways to instantiate', () => {
    expect(new Jsc('foo') instanceof Jsc).to.be.true
    expect(Jsc.fire('foo') instanceof Jsc).to.be.true
  })

  it('instance properties and methods', () => {
    const params = { input: 'text', inputValue: 'foo' }
    const jsc = Jsc.fire(params)
    expect(Object.keys(jsc)).contain.members(['params'])
    expect(jsc.params).to.be.eql(params)
    expect(jsc.getInput().value).to.equal('foo')
  })

  it('extending jsc', (done) => {
    const MyJsc = class extends Jsc {
      static argsToParams(args) {
        expect(args).to.be.eql(['arg'])
        return { title: 'title' }
      }

      _main(params) {
        expect(params).to.be.eql({ title: 'title' })
        return super
          ._main({
            input: 'text',
            inputValue: 'inputValue',
            didOpen: () => MyJsc.clickConfirm(),
          })
          .then((result) => {
            expect(result).to.be.eql({
              value: 'inputValue',
              isConfirmed: true,
              isDenied: false,
              isDismissed: false,
            })
            return 'result'
          })
      }
    }
    MyJsc.fire('arg').then((result) => {
      expect(result).to.equal('result')
      done()
    })
  })
})
