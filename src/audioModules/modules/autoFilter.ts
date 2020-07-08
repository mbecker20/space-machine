import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, TYPE, VALUE, KOMPRESSOR } from '../moduleTypes'

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
      value: autoFilter.frequency.value
    },
    'set detune': {
      controlType: VALUE,
      value: autoFilter.detune.value
    },
    'set Q': {
      controlType: VALUE,
      value: autoFilter.Q.value
    },
    'set gain': {
      controlType: VALUE,
      value: autoFilter.gain.value
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'set frequency': (newFrequency: string) => {
      controlData['set frequency'].value = Number(newFrequency)
      autoFilter.frequency.value = controlData['set frequency'].value
    },
    'set detune': (newDetune: string) => {
      controlData['set detune'].value = Number(newDetune)
      autoFilter.detune.value = controlData['set detune'].value
    },
    'set Q': (newQ: string) => {
      controlData['set Q'].value = Number(newQ)
      autoFilter.Q.value = controlData['set Q'].value
    },
    'set gain': (newGain: string) => {
      controlData['set gain'].value = Number(newGain)
      autoFilter.gain.value = controlData['set gain'].value
    },
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