import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE, TYPE } from '../moduleTypes'

export interface OscillatorModule extends BaseAM {
  audioNode: OscillatorNode
  typeTypes: string[]
}

const oscillatorTypes = ['sine', 'square', 'triangle', 'sawtooth']

function makeOscillator(): OscillatorModule {
  const oscillator = audioCtx.createOscillator()
   
  const connectingParamIDs = ['frequency', 'detune']

  const controlData: ControlData = {
    'set type': {
      controlType: TYPE,
      paramID: 'type',
    },
    'set frequency': {
      controlType: VALUE,
      paramID: 'frequency',
      value: oscillator.frequency.value,
      range: [0, 20000, 1]
    },
    'set detune': {
      controlType: VALUE,
      paramID: 'detune'
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'set type': (newType: string) => { oscillator.type = newType as OscillatorType },
    'set frequency': (newFrequency: string) => {
      controlData['set frequency'].value = Number(newFrequency)
      oscillator.frequency.value = Number(newFrequency)
    },
    'set detune': (newDetune: string) => { oscillator.detune.value = Number(newDetune) },
    'kill': (arg = '') => { oscillator.stop() }
  }

  oscillator.start()
  
  return { 
    audioNode: oscillator,
    typeTypes: oscillatorTypes,
    connectingParamIDs,
    controlData,
    controlSetFuncs,
  }
}

export default makeOscillator