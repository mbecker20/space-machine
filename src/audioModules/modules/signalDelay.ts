import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE } from '../moduleTypes'

export interface SignalDelayModule extends BaseAM {
  audioNode: DelayNode
}

function makeSignalDelay(): SignalDelayModule {
  const signalDelay = audioCtx.createDelay()

  const connectingParamIDs = ['delayTime']

  const controlData: ControlData = {
    'set delay time': {
      controlType: VALUE,
      paramID: 'delayTime',
      value: signalDelay.delayTime.value,
      range: [0, 1, .01]
    }
  }

  const controlSetFuncs: ControlSetFuncs = { 
    'set delay time': (newDelayTime: string) => {
      controlData['set delay time'].value = Number(newDelayTime)
      signalDelay.delayTime.value = Number(newDelayTime)
    }
  }

  return {
    audioNode: signalDelay,
    connectingParamIDs,
    controlData,
    controlSetFuncs,
    connectionInputs: ['0'],
    connectionOutputs: ['0'],
  }
}

export default makeSignalDelay