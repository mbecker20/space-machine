import audioCtx from '../../audioCtx'
import { BaseAM } from '../moduleTypes'

export interface OscControls {
  'stop': () => void
  'set type': (newType: OscillatorType) => void
  'set frequency': (newFreq: number) => void
  'set detune': (newDetune: number) => void
}

export interface OscillatorModule extends BaseAM {
  audioNode: OscillatorNode
  controls: OscControls
}

function makeOscillator(type: OscillatorType = 'sine', frequency = 440, detune = 0): OscillatorModule {
  const osc = audioCtx.createOscillator()
  osc.type = type
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime)
  osc.detune.setValueAtTime(detune, audioCtx.currentTime)
  
  //controls

  function stop() {
    osc.stop()
  }

  function setType(newType: OscillatorType) {
    osc.type = newType
  }

  function setFrequency(newFrequency: number) {
    osc.frequency.setValueAtTime(newFrequency, audioCtx.currentTime)
  }

  function setDetune(newDetune: number) {
    osc.detune.setValueAtTime(newDetune, audioCtx.currentTime)
  }

  const controls = {
    'stop': stop,
    'set type': setType,
    'set frequency': setFrequency,
    'set detune': setDetune,
  }

  osc.start()
  
  return { audioNode: osc, paramIDs: ['frequency', 'detune'], controls }
}

export default makeOscillator