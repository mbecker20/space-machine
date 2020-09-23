import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE } from '../moduleTypes'

export interface SignalDelayModule extends BaseAM {
  audioNode: DelayNode
}

export function makeDelayControlData(): ControlData {
  return {
    'delay time': {
      controlType: VALUE,
      paramID: 'delayTime',
      value: 0,
      range: [0, 2],
      maxRange: [0, 60],
    }
  }
}

function makeSignalDelay(prevControlData?: ControlData): SignalDelayModule {
  const signalDelay = audioCtx.createDelay(60)

  if (prevControlData) {
    signalDelay.delayTime.value = prevControlData['delay time'].value as number
  }

  const connectingParamIDs = ['delayTime']

  const controlSetFuncs: ControlSetFuncs = { 
    'delay time': (newDelayTime: string) => {
      signalDelay.delayTime.value = Number(newDelayTime)
    }
  }

  return {
    audioNode: signalDelay,
    connectingParamIDs,
    controlSetFuncs,
  }
    
}

export default makeSignalDelay