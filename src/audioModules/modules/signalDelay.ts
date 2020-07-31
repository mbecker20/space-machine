import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE } from '../moduleTypes'

export interface SignalDelayModule extends BaseAM {
  audioNode: DelayNode
}

function makeSignalDelay(prevControlData?: ControlData): [ SignalDelayModule, ControlData ] {
  const signalDelay = audioCtx.createDelay(60)

  if (prevControlData) {
    signalDelay.delayTime.value = prevControlData['delay time'].value as number
  }

  const connectingParamIDs = ['delayTime']

  const controlData: ControlData = {
    'delay time': {
      controlType: VALUE,
      paramID: 'delayTime',
      value: signalDelay.delayTime.value,
      range: prevControlData ? prevControlData['delay time'].range : [0, 2],
      maxRange: [0, 60],
    }
  }

  const controlSetFuncs: ControlSetFuncs = { 
    'delay time': (newDelayTime: string) => {
      signalDelay.delayTime.value = Number(newDelayTime)
    }
  }

  return [
    {
      audioNode: signalDelay,
      connectingParamIDs,
      controlSetFuncs,
    },
    controlData,
  ]
}

export default makeSignalDelay