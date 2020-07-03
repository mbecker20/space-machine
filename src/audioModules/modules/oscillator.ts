import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls } from '../moduleTypes'
import { TYPE, VALUE, BUTTON } from '../moduleTypes'

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
  
  //controls

  function kill() {
    osc.stop()
  }

  function setType(newType: string) {
    osc.type = newType as OscillatorType
  }

  function setFrequency(newFrequency: string) {
    osc.frequency.value = Number(newFrequency)
  }

  function setDetune(newDetune: string) {
    osc.detune.value = Number(newDetune)
  }

  const controls = {
    'set type': setType,
    'set frequency': setFrequency,
    'set detune': setDetune,
    'kill': kill,
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