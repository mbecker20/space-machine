import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE } from '../moduleTypes'

export interface GainModule extends BaseAM {
  audioNode: GainNode
}

function makeGain(prevControlData?: ControlData): [ GainModule, ControlData ] {
  const gain = audioCtx.createGain()
  gain.gain.value = prevControlData ? prevControlData['gain'].value as number : 0

  const connectingParamIDs = ['gain']

  const controlData: ControlData = {
    'gain': {
      controlType: VALUE,
      paramID: 'gain',
      value: gain.gain.value,
      range: prevControlData ? prevControlData['gain'].range : [-1, 1]
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