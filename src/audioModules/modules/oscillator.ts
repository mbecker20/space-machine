import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls } from '../moduleTypes'
import { TYPE, VALUE, BUTTON } from '../moduleTypes'

export interface OscillatorModule extends BaseAM {
  audioNode: OscillatorNode
  controls: BaseControls
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

  function setType(newType: string) {
    osc.type = newType as OscillatorType
  }

  function setFrequency(newFrequency: string) {
    osc.frequency.setValueAtTime(Number(newFrequency), audioCtx.currentTime)
  }

  function setDetune(newDetune: string) {
    osc.detune.setValueAtTime(Number(newDetune), audioCtx.currentTime)
  }

  const controls = {
    'set type': setType,
    'set frequency': setFrequency,
    'set detune': setDetune,
    'stop': stop,
  }

  osc.start()
  
  return { 
    audioNode: osc,
    paramIDs: [['type', TYPE], ['frequency', VALUE], ['detune', VALUE], ['stop', BUTTON]],
    controls,
  }
}

export default makeOscillator