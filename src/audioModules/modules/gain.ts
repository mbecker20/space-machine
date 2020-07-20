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
    'set gain': {
      controlType: VALUE,
      paramID: 'gain',
      value: 0,
      range: [-10000, 10000, 1]
    },
    'set fine gain': {
      controlType: VALUE,
      paramID: 'gain',
      value: 0,
      range: [-1, 1, .01]
    }
  }

  function updateGain() {
    gain.gain.value = (controlData['set gain'].value as number) + (controlData['set fine gain'].value as number)
  }

  const controlSetFuncs: ControlSetFuncs = {
    'set gain': (newGain: string) => {
      controlData['set gain'].value = Number(newGain)
      updateGain()
    },
    'set fine gain': (newFineGain: string) => {
      controlData['set fine gain'].value = Number(newFineGain)
      updateGain()
    },
  }
  
  return { 
    audioNode: gain,
    connectingParamIDs,
    controlData,
    controlSetFuncs,
    outputs: ['0'],
  }
}

export default makeGain