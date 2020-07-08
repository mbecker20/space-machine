import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE } from '../moduleTypes'

export interface AutoFilterModule extends BaseAM {
  audioNode: BiquadFilterNode
  typeTypes: string[]
}

const filterTypes = ['lowpass', 'lowshelf', 'highpass', 'highshelf', 'allpass', 'bandpass', 'notch', 'peaking']

function makeAutoFilter (): AutoFilterModule {
  const autoFilter = audioCtx.createBiquadFilter()

  const connectingParamIDs = ['frequency', 'detune', 'Q', 'gain']

  const controlData: ControlData = {
    'set frequency': {
      controlType: VALUE,
      paramID: 'frequency'
    },
    'set detune': {
      controlType: VALUE,
      paramID: 'detune'
    },
    'set Q': {
      controlType: VALUE,
      paramID: 'Q'
    },
    'set gain': {
      controlType: VALUE,
      paramID: 'gain'
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'set frequency': (newFrequency: string) => { autoFilter.frequency.value = Number(newFrequency) },
    'set detune': (newDetune: string) => { autoFilter.detune.value = Number(newDetune) },
    'set Q': (newQ: string) => { autoFilter.Q.value = Number(newQ) },
    'set gain': (newGain: string) => { autoFilter.gain.value = Number(newGain) },
  }

  return {
    audioNode: autoFilter,
    typeTypes: filterTypes,
    connectingParamIDs,
    controlData,
    controlSetFuncs,
  }  
}

export default makeAutoFilter