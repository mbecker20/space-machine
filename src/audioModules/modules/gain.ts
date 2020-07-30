import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE } from '../moduleTypes'

export interface GainModule extends BaseAM {
  audioNode: GainNode
}

function makeGain(gainAmount = 0): [ GainModule, ControlData ] {
  const gain = audioCtx.createGain()
  gain.gain.value = gainAmount

  const connectingParamIDs = ['gain']

  const controlData: ControlData = {
    'gain': {
      controlType: VALUE,
      paramID: 'gain',
      value: 0,
      range: [-1, 1]
    },
  }

  const controlSetFuncs: ControlSetFuncs = {
    'gain': (newGain: string) => {
      gain.gain.value = Number(newGain)
    },
  }
  
  return [
    {
      audioNode: gain,
      connectingParamIDs,
      controlSetFuncs,
    },
    controlData
  ]
}

export default makeGain