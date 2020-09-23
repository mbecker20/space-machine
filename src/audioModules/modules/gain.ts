import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE } from '../moduleTypes'

export interface GainModule extends BaseAM {
  audioNode: GainNode
}

export function makeGainControlData(): ControlData {
  return {
    'gain': {
      controlType: VALUE,
      paramID: 'gain',
      value: 0,
      range: [0, 1],
    }
  }
}

function makeGain(prevControlData?: ControlData): GainModule {
  const gain = audioCtx.createGain()
  gain.gain.value = prevControlData ? prevControlData['gain'].value as number : 0

  const connectingParamIDs = ['gain']

  const controlSetFuncs: ControlSetFuncs = {
    'gain': (newGain: string) => {
      gain.gain.value = Number(newGain)
    },
  }
  
  return {
    audioNode: gain,
    connectingParamIDs,
    controlSetFuncs,
  }
}

export default makeGain