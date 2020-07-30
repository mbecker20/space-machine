import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE, TYPE } from '../moduleTypes'

export interface OscillatorModule extends BaseAM {
  audioNode: OscillatorNode
  typeTypes: string[]
}

const oscillatorTypes = ['sine', 'square', 'triangle', 'sawtooth']

function makeOscillator(): [ OscillatorModule, ControlData ] {
  const oscillator = audioCtx.createOscillator()
   
  const connectingParamIDs = ['frequency', 'detune']

  const controlData: ControlData = {
    'set type': {
      controlType: TYPE,
      paramID: 'type',
    },
    'frequency': {
      controlType: VALUE,
      paramID: 'frequency',
      value: oscillator.frequency.value,
      range: [0, 20000]
    },
    'detune': {
      controlType: VALUE,
      paramID: 'detune',
      value: oscillator.detune.value,
      range: [-100, 100],
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'set type': (newType: string) => { oscillator.type = newType as OscillatorType },
    'frequency': (newFrequency: string) => {
      controlData['frequency'].value = Number(newFrequency)
      oscillator.frequency.value = Number(newFrequency)
    },
    'detune': (newDetune: string) => { 
      controlData['detune'].value = Number(newDetune)
      oscillator.detune.value = Number(newDetune)
    },
    'kill': (arg = '') => { oscillator.stop() }
  }

  oscillator.start()
  
  return [
    {
      audioNode: oscillator,
      typeTypes: oscillatorTypes,
      connectingParamIDs,
      controlSetFuncs,
    },
    controlData,
  ]
}

export default makeOscillator