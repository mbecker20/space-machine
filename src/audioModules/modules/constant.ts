import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE, BUTTON } from '../moduleTypes'

export interface ConstantModule extends BaseAM {
  audioNode: ConstantSourceNode
}

export function makeConstantControlData(): ControlData {
  return {
    'value': {
      controlType: VALUE,
      paramID: 'offset',
      value: 0,
      range: [-100, 100],
    },
    'kill': {
      controlType: BUTTON,
      paramID: 'n/a',
    }
  }
}


function makeConstantSource(prevControlData?: ControlData): ConstantModule {
  const constantSource = audioCtx.createConstantSource()
  constantSource.offset.value = prevControlData ? prevControlData['value'].value as number : 0

  const connectingParamIDs = ['offset']

  const controlSetFuncs: ControlSetFuncs = {
    'value': (newValue: string) => { constantSource.offset.value = Number(newValue) },
    'kill': (arg = '') => { constantSource.stop() }
  }

  constantSource.start()

  return {
    audioNode: constantSource,
    connectingParamIDs,
    controlSetFuncs,
  }
}

export default makeConstantSource