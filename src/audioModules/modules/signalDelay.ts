import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE } from '../moduleTypes'

export interface SignalDelayModule extends BaseAM {
  audioNode: DelayNode
}

function makeSignalDelay(): SignalDelayModule {
  const signalDelay = audioCtx.createDelay(60)

  const connectingParamIDs = ['delayTime']

  const controlData: ControlData = {
    'delay time': {
      controlType: VALUE,
      paramID: 'delayTime',
      value: signalDelay.delayTime.value,
      range: [0, 2],
      maxRange: [0, 60],
    }
  }

  const controlSetFuncs: ControlSetFuncs = { 
    'delay time': (newDelayTime: string) => {
      controlData['delay time'].value = Number(newDelayTime)
      signalDelay.delayTime.value = Number(newDelayTime)
    }
  }

  return {
    audioNode: signalDelay,
    connectingParamIDs,
    controlData,
    controlSetFuncs,
  }
}

export default makeSignalDelay