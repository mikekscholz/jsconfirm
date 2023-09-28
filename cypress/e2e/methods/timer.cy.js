/// <reference types="cypress" />

import { isVisible } from '../../../src/utils/dom'
import { $, Jsc, JscWithoutAnimation } from '../../utils'

describe('getTimerLeft()', () => {
  it('should return time left', (done) => {
    Jsc.fire({
      timer: 1000,
    })
    setTimeout(() => {
      const timerLeft = Jsc.getTimerLeft()
      expect(timerLeft > 0).to.be.true
      expect(timerLeft < 1000).to.be.true
      done()
    }, 1)
  })

  it('should return undefined if popup does not have timer', () => {
    Jsc.fire({
      timer: 1000,
    })
    Jsc.fire('I do not have timer, I should reset timer')
    const timerLeft = Jsc.getTimerLeft()
    expect(timerLeft).to.equal(undefined)
  })
})

describe('increaseTimer()', () => {
  it('should increase timer', (done) => {
    JscWithoutAnimation.fire({
      timer: 500,
    })
    expect(Jsc.increaseTimer(400) > 0).to.be.true
    setTimeout(() => {
      expect(Jsc.isVisible()).to.be.true
    }, 700)
    setTimeout(() => {
      expect(Jsc.isVisible()).to.be.false
      done()
    }, 1000)
  })

  it('should increase stopped timer', (done) => {
    JscWithoutAnimation.fire({
      timer: 500,
    })
    const remainingTime = Jsc.stopTimer()
    Jsc.increaseTimer(10)
    setTimeout(() => {
      expect(Jsc.getTimerLeft()).to.equal(remainingTime + 10)
      done()
    }, 100)
  })
})

it('isTimerRunning() method', (done) => {
  JscWithoutAnimation.fire({
    timer: 200,
  })
  setTimeout(() => {
    expect(Jsc.isTimerRunning()).to.be.true
    Jsc.stopTimer()
    expect(!Jsc.isTimerRunning()).to.be.true
    done()
  }, 100)
})

describe('resumeTimer()', () => {
  it('should resume timer', (done) => {
    JscWithoutAnimation.fire({
      timer: 100,
    })
    Jsc.stopTimer()
    setTimeout(() => {
      expect(Jsc.isVisible()).to.be.true
      Jsc.resumeTimer()
    }, 200)
    setTimeout(() => {
      expect(Jsc.isVisible()).to.be.false
      done()
    }, 700)
  })

  it('should not fail when called twice', (done) => {
    JscWithoutAnimation.fire({
      timer: 500,
    })
    Jsc.resumeTimer()
    Jsc.resumeTimer()
    Jsc.stopTimer()
    setTimeout(() => {
      expect(Jsc.isVisible()).to.be.true
      done()
    }, 1000)
  })
})

describe('stopTimer()', () => {
  it('should stop timer', (done) => {
    JscWithoutAnimation.fire({
      timer: 500,
    })
    setTimeout(() => {
      expect(Jsc.stopTimer() > 0).to.be.true
    }, 50)
    setTimeout(() => {
      expect(Jsc.isVisible()).to.be.true
      done()
    }, 750)
  })

  it('should not fail when called twice', (done) => {
    JscWithoutAnimation.fire({
      timer: 500,
    })
    const remainingTime = Jsc.stopTimer()
    setTimeout(() => {
      expect(Jsc.stopTimer()).to.equal(remainingTime)
      done()
    }, 100)
  })
})

it('toggleTimer() method', (done) => {
  JscWithoutAnimation.fire({
    timer: 500,
  })
  Jsc.toggleTimer()
  setTimeout(() => {
    expect(Jsc.isVisible()).to.be.true
    Jsc.toggleTimer()
  }, 700)
  setTimeout(() => {
    expect(Jsc.isVisible()).to.be.false
    done()
  }, 2000)
})

it('getTimerProgressBar() method', () => {
  JscWithoutAnimation.fire({
    timer: 500,
    timerProgressBar: true,
  })
  expect(Jsc.getTimerProgressBar()).to.equal($('.jsc-timer-progress-bar'))
})

describe('timerProgressBar', () => {
  it('should show timer progress bar', () => {
    JscWithoutAnimation.fire({
      timer: 10,
      timerProgressBar: true,
    })

    const progressBar = document.querySelector('.jsc-timer-progress-bar')
    expect(isVisible(progressBar)).to.be.true
  })

  it('should stop the animation of timer progress bar when timer is stopped', (done) => {
    JscWithoutAnimation.fire({
      timer: 100,
      timerProgressBar: true,
    })
    Jsc.stopTimer()
    setTimeout(() => {
      expect(Jsc.getTimerProgressBar().style.transition).to.equal('')
      done()
    }, 20)
  })

  it('should stop the animation of timer progress bar when timer is stopped in didOpen', (done) => {
    JscWithoutAnimation.fire({
      timer: 100,
      timerProgressBar: true,
      didOpen: Jsc.stopTimer,
    })
    setTimeout(() => {
      expect(Jsc.getTimerProgressBar().style.transition).to.equal('')
      done()
    }, 20)
  })
})
