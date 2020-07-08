import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, TYPE, VALUE, BUTTON } from '../moduleTypes'

export interface OscillatorModule extends BaseAM {
  audioNode: OscillatorNode
  typeTypes: string[]
}

const oscillatorTypes = ['sine', 'square', 'triangle', 'sawtooth']

function makeOscillator(): OscillatorModule {
  const oscillator = audioCtx.createOscillator()
   
  const connectingParamIDs = ['frequency', 'detune']

  const controlData: ControlData = {
    'set frequency': {
      controlType: VALUE,
      paramID: 'frequency'
    },
    'set detune': {
      controlType: VALUE,
      paramID: 'detune'
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'set frequency': (newFrequency: string) => { oscillator.frequency.value = Number(newFrequency) },
    'set detune': (newDetune: string) => { oscillator.detune.value = Number(newDetune) },
    'kill': (arg = '') => { oscillator.stop() }
  }
  
  return { 
    audioNode: oscillator,
    typeTypes: oscillatorTypes,
    connectingParamIDs,
    controlData,
    controlSetFuncs,
  }

  oscillator.start()

}

export default makeOscillator