import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE, TYPE } from '../moduleTypes'

export interface AutoFilterModule extends BaseAM {
  audioNode: BiquadFilterNode
  typeTypes: string[]
}

const filterTypes = ['lowpass', 'lowshelf', 'highpass', 'highshelf', 'allpass', 'bandpass', 'notch', 'peaking']
const connectingParamIDs = ['frequency', 'detune', 'Q', 'gain']

function makeAutoFilter (prevControlData?: ControlData): [ AutoFilterModule, ControlData ] {
  const autoFilter = audioCtx.createBiquadFilter()

  if (prevControlData) {
    autoFilter.type = prevControlData['set type'].value as BiquadFilterType
    autoFilter.frequency.value = prevControlData['frequency'].value as number
    autoFilter.detune.value = prevControlData['detune'].value as number
    autoFilter.Q.value = prevControlData['Q'].value as number
    autoFilter.gain.value = prevControlData['gain'].value as number
  }

  const controlData: ControlData = {
    'set type': {
      controlType: TYPE,
      paramID: 'type',
      value: autoFilter.type
    },
    'frequency': {
      controlType: VALUE,
      paramID: 'frequency',
      value: autoFilter.frequency.value,
      range: prevControlData ? prevControlData['frequency'].range : [0, audioCtx.sampleRate / 2],
      maxRange: [0, audioCtx.sampleRate / 2]
    },
    'detune': {
      controlType: VALUE,
      paramID: 'detune',
      value: autoFilter.detune.value,
      range: prevControlData ? prevControlData['detune'].range : [-50, 50],
      maxRange: [-153600, 153600]
    },
    'Q': {
      controlType: VALUE,
      paramID: 'Q',
      value: autoFilter.Q.value,
      range: prevControlData ? prevControlData['Q'].range : [-30, 30]
    },
    'gain': {
      controlType: VALUE,
      paramID: 'gain',
      value: autoFilter.gain.value,
      range: prevControlData ? prevControlData['gain'].range : [-20000, 1400],
      maxRange: [-20000, 1400],
    },
  }

  const controlSetFuncs: ControlSetFuncs = {
    'set type': (newType: string) => { autoFilter.type = newType as BiquadFilterType},
    'frequency': (newFrequency: string) => { 
      autoFilter.frequency.value = Number(newFrequency) 
    },
    'detune': (newDetune: string) => { 
      autoFilter.detune.value = Number(newDetune) 
    },
    'Q': (newQ: string) => { 
      autoFilter.Q.value = Number(newQ) 
    },
    'gain': (newGain: string) => {
      autoFilter.gain.value = Number(newGain)
    },
  }

  return [
    {
      audioNode: autoFilter,
      typeTypes: filterTypes,
      connectingParamIDs,
      controlSetFuncs,
    },
    controlData,
  ] 
}

export default makeAutoFilter