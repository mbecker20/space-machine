import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE } from '../moduleTypes'

export interface GainModule extends BaseAM {
  audioNode: GainNode
}

function makeGain(gainAmount = 0): GainModule {
  const gain = audioCtx.createGain()
  gain.gain.value = gainAmount

  const connectingParamIDs = ['gain']

  const controlData: ControlData = {
    'gain': {
      controlType: VALUE,
      paramID: 'gain',
      value: 0,
      range: [-20000, 20000]
    },
    'fine gain': {
      controlType: VALUE,
      paramID: 'gain',
      value: 0,
      range: [-1, 1]
    }
  }

  function updateGain() {
    gain.gain.value = (controlData['gain'].value as number) + (controlData['fine gain'].value as number)
  }

  const controlSetFuncs: ControlSetFuncs = {
    'gain': (newGain: string) => {
      controlData['gain'].value = Number(newGain)
      updateGain()
    },
    'fine gain': (newFineGain: string) => {
      controlData['fine gain'].value = Number(newFineGain)
      updateGain()
    },
  }
  
  return {
    audioNode: gain,
    connectingParamIDs,
    controlData,
    controlSetFuncs,
  }
}

export default makeGain