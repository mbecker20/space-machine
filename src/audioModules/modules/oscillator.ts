import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE, TYPE } from '../moduleTypes'

export interface OscillatorModule extends BaseAM {
  audioNode: OscillatorNode
  typeTypes: string[]
}

const oscillatorTypes = ['sine', 'square', 'triangle', 'sawtooth']

function makeOscillator(prevControlData?: ControlData): [ OscillatorModule, ControlData ] {
  const oscillator = audioCtx.createOscillator()
   
  if (prevControlData) {
    oscillator.type = prevControlData['set type'].value as OscillatorType
    oscillator.frequency.value = prevControlData['frequency'].value as number
    oscillator.detune.value = prevControlData['detune'].value as number 
  }

  const connectingParamIDs = ['frequency', 'detune']

  const controlData: ControlData = {
    'set type': {
      controlType: TYPE,
      paramID: 'type',
      value: oscillator.type
    },
    'frequency': {
      controlType: VALUE,
      paramID: 'frequency',
      value: oscillator.frequency.value,
      range: prevControlData ? prevControlData['frequency'].range : [0, 20000]
    },
    'detune': {
      controlType: VALUE,
      paramID: 'detune',
      value: oscillator.detune.value,
      range: prevControlData ? prevControlData['detune'].range : [-50, 50],
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'set type': (newType: string) => { oscillator.type = newType as OscillatorType },
    'frequency': (newFrequency: string) => {
      oscillator.frequency.value = Number(newFrequency)
    },
    'detune': (newDetune: string) => { 
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