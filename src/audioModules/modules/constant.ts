import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE, BUTTON } from '../moduleTypes'

export interface ConstantModule extends BaseAM {
  audioNode: ConstantSourceNode
}


function makeConstantSource(prevControlData?: ControlData): [ ConstantModule, ControlData ] {
  const constantSource = audioCtx.createConstantSource()
  constantSource.offset.value = prevControlData ? prevControlData['value'].value as number : 0

  const connectingParamIDs = ['offset']

  const controlData: ControlData = {
    'value': {
      controlType: VALUE,
      paramID: 'offset',
      value: constantSource.offset.value,
      range: prevControlData ? prevControlData['value'].range : [-100, 100],
    },
    'kill': {
      controlType: BUTTON,
      paramID: 'n/a',
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'value': (newValue: string) => { constantSource.offset.value = Number(newValue) },
    'kill': (arg = '') => { constantSource.stop() }
  }

  constantSource.start()

  return [
    {
      audioNode: constantSource,
      connectingParamIDs,
      controlSetFuncs,
    },
    controlData,
  ]

}

export default makeConstantSource