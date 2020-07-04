import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls, TYPE, VALUE, BUTTON } from '../moduleTypes'

export interface OscillatorModule extends BaseAM {
  audioNode: OscillatorNode
  controls: BaseControls
  typeTypes: string[]
}

const oscTypes = ['sine', 'square', 'triangle', 'sawtooth']

function makeOscillator(type: OscillatorType = 'sine', frequency = 440, detune = 0): OscillatorModule {
 
  const osc = audioCtx.createOscillator()
    osc.type = type
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime)
    osc.detune.setValueAtTime(detune, audioCtx.currentTime)

  const controls = {
    'set type': (newType: string) => {osc.type = newType as OscillatorType},
    'set frequency': (newFrequency: string) => {osc.frequency.value = Number(newFrequency)},
    'set detune': (newDetune: string) => {osc.detune.value = Number(newDetune)},
    'kill': (arg = '') => {osc.stop}
  }

  osc.start()
  
  return { 
    audioNode: osc,
    paramIDs: [['type', TYPE], ['frequency', VALUE], ['detune', VALUE], ['kill', BUTTON]],
    typeTypes: oscTypes,
    controls,
  }
}

export default makeOscillator