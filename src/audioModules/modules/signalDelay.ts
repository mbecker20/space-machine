import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE, AUTOFILTER } from '../moduleTypes'

export interface SignalDelayModule extends BaseAM {
  audioNode: DelayNode
}

function makeSignalDelay(): SignalDelayModule {
  const signalDelay = audioCtx.createDelay()

  const connectingParamIDs = ['delay time']

  const controlData: ControlData = {
    'set delay time': {
      controlType: VALUE,
      paramID: 'delay time'
    }
  }

  const controlSetFuncs: ControlSetFuncs = { 
    'set delay time': (newDelayTime: string) => { signalDelay.delayTime.value = Number(newDelayTime)}
  }

  return {
    audioNode: signalDelay,
    connectingParamIDs,
    controlData,
    controlSetFuncs,
  }
}

export default makeSignalDelay