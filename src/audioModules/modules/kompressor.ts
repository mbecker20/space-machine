import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE } from '../moduleTypes'

export interface KompressorModule extends BaseAM {
  audioNode: DynamicsCompressorNode
}

function makeKompressor(): KompressorModule {
  const kompressor = audioCtx.createDynamicsCompressor()

  const connectingParamIDs = ['threshold', 'knee', 'ratio', 'attack', 'release']

  const controlData: ControlData = {
    'set threshold': {
      controlType: VALUE,
      value: kompressor.threshold.value
    },
    'set knee': {
      controlType: VALUE,
      value: kompressor.knee.value
    },
    'set ratio': {
      controlType: VALUE,
      value: kompressor.ratio.value
    },
    'set attack': {
      controlType: VALUE,
      value: kompressor.attack.value
    },
    'set release': {
      controlType: VALUE,
      value: kompressor.release.value
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'set threshold': (newThreshold: string) => {
      controlData['set threshold'].value = Number(newThreshold)
      kompressor.threshold.value = controlData['set threshold'].value
    },
    'set knee': (newKnee: string) => {
      controlData['set knee'].value = Number(newKnee)
      kompressor.knee.value = controlData['set knee'].value
    },
    'set ratio': (newRatio: string) => {
      controlData['set ratio'].value = Number(newRatio)
      kompressor.ratio.value = controlData['set ratio'].value
    },
    'set attack': (newAttack: string) => {
      controlData['set attack'].value = Number(newAttack)
      kompressor.attack.value = controlData['set attack'].value
    },
    'set release': (newRelease: string) => {
      controlData['set release'].value = Number(newRelease)
      kompressor.release.value = controlData['set release'].value
    },
  }

  return {
    audioNode: kompressor,
    connectingParamIDs,
    controlData,
    controlSetFuncs,
  }
}

export default makeKompressor