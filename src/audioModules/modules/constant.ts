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
    'set value': {
      controlType: VALUE,
      paramID: 'offset',
      value: 0,
    },
    'set ramp': {
      controlType: TYPE,
      paramID: 'n/a',
      value: 'no ramp',
    },
    'set ramp length': {
      controlType: VALUE,
      paramID: 'n/a',
      value: 1,
      range: [0, 10000, 0.01],
    },
    'start': {
      controlType: BUTTON,
      paramID: 'n/a',
    },
    'stop': {
      controlType: BUTTON,
      paramID: 'n/a',
    }
  }

  const setValFuncs: SetValFuncs = {
    'no ramp': (newValue: string) => {
      controlData['set value'].value = Number(newValue)
      constantSource.offset.value = Number(newValue) 
    },
    'linear': (newValue: string) => {
      controlData['set value'].value = Number(newValue)
      constantSource.offset.linearRampToValueAtTime(Number(newValue), audioCtx.currentTime + (controlData['set ramp length'].value as number))},
    'exponential': (newValue: string) => {
      controlData['set value'].value = Number(newValue)
      constantSource.offset.exponentialRampToValueAtTime(Number(newValue), audioCtx.currentTime + (controlData['set ramp length'].value as number))}
  }

  const controlSetFuncs: ControlSetFuncs = {
    'set value': (newValue: string) => { setValFuncs[controlData['set ramp'].value as string](newValue) },
    'set ramp': (newType: string) => { controlData['set ramp'].value = newType },
    'set ramp length': (newValue: string) => { controlData['set ramp length'].value = Number(newValue) },
    'start': (arg = '') => { constantSource.start() },
    'stop': (arg = '') => { constantSource.stop() }
  }

  constantSource.start()

  return { 
    audioNode: constantSource, 
    connectingParamIDs,
    controlData,
    controlSetFuncs,
    typeTypes: constantSourceTypes
  }

}

export default makeConstantSource