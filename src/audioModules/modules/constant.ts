import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE, TYPE, BUTTON } from '../moduleTypes'

export interface ConstantModule extends BaseAM {
  audioNode: ConstantSourceNode
  typeTypes: string[]
}

interface SetValFuncs {
  [index: string]: (arg: string) => void
}

const constantSourceTypes = ['no ramp', 'linear', 'exponential']

function makeConstantSource(): ConstantModule {
  const constantSource = audioCtx.createConstantSource()
  constantSource.offset.value = 0

  const connectingParamIDs = ['offset']

  const controlData: ControlData = {
    'value': {
      controlType: VALUE,
      paramID: 'offset',
      value: 0,
      range: [-100, 100],
    },
    'ramp type': {
      controlType: TYPE,
      paramID: 'n/a',
      value: 'no ramp',
    },
    'ramp length': {
      controlType: VALUE,
      paramID: 'n/a',
      value: 1,
      range: [0, 100],
      maxRange: [0, 10000],
    },
    'kill': {
      controlType: BUTTON,
      paramID: 'n/a',
    }
  }

  const setValFuncs: SetValFuncs = {
    'no ramp': (newValue: string) => {
      controlData['value'].value = Number(newValue)
      constantSource.offset.value = Number(newValue) 
    },
    'linear': (newValue: string) => {
      controlData['value'].value = Number(newValue)
      constantSource.offset.linearRampToValueAtTime(Number(newValue), audioCtx.currentTime + (controlData['ramp length'].value as number))
    },
    'exponential': (newValue: string) => {
      controlData['value'].value = Number(newValue)
      constantSource.offset.exponentialRampToValueAtTime(Number(newValue), audioCtx.currentTime + (controlData['ramp length'].value as number))
    },
  }

  const controlSetFuncs: ControlSetFuncs = {
    'value': (newValue: string) => { setValFuncs[controlData['ramp type'].value as string](newValue) },
    'ramp type': (newType: string) => { controlData['ramp type'].value = newType },
    'ramp length': (newValue: string) => { controlData['ramp length'].value = Number(newValue) },
    'kill': (arg = '') => { constantSource.stop() }
  }

  constantSource.start()

  return {
    audioNode: constantSource, 
    connectingParamIDs,
    controlData,
    controlSetFuncs,
    typeTypes: constantSourceTypes,
  }

}

export default makeConstantSource