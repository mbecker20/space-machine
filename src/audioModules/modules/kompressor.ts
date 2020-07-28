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
      paramID: 'threshold',
      value: kompressor.threshold.value, 
      range: [-100, 0]
    },
    'set knee': {
      controlType: VALUE,
      paramID: 'knee',
      value: kompressor.knee.value,
      range: [0, 40]
    },
    'set ratio': {
      controlType: VALUE,
      paramID: 'ratio',
      value: kompressor.ratio.value,
      range: [1, 20]
    },
    'set attack': {
      controlType: VALUE,
      paramID: 'attack',
      value: kompressor.attack.value,
      range: [0, 1]
    },
    'set release': {
      controlType: VALUE,
      paramID: 'release',
      value: kompressor.release.value,
      range: [0, 1]
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'threshold': (newThreshold: string) => { 
      controlData['threshold'].value = Number(newThreshold)
      kompressor.threshold.value = Number(newThreshold) 
    },
    'knee': (newKnee: string) => { 
      controlData['knee'].value = Number(newKnee)
      kompressor.knee.value = Number(newKnee) 
    },
    'set ratio': (newRatio: string) => { 
      controlData['ratio'].value = Number(newRatio)
      kompressor.ratio.value = Number(newRatio) 
    },
    'set attack': (newAttack: string) => { 
      controlData['attack'].value = Number(newAttack)
      kompressor.attack.value = Number(newAttack)
    },
    'set release': (newRelease: string) => { 
      controlData['release'].value = Number(newRelease)
      kompressor.release.value = Number(newRelease) 
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