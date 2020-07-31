import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE } from '../moduleTypes'

export interface KompressorModule extends BaseAM {
  audioNode: DynamicsCompressorNode
}

const connectingParamIDs = ['threshold', 'knee', 'ratio', 'attack', 'release']

function makeKompressor(prevControlData?: ControlData): [ KompressorModule, ControlData ] {
  const kompressor = audioCtx.createDynamicsCompressor()

  if (prevControlData) {
    kompressor.threshold.value = prevControlData['threshold'].value as number
    kompressor.knee.value = prevControlData['knee'].value as number
    kompressor.ratio.value = prevControlData['ratio'].value as number
    kompressor.attack.value = prevControlData['attack'].value as number
    kompressor.release.value = prevControlData['release'].value as number
  }

  const controlData: ControlData = {
    'threshold': {
      controlType: VALUE,
      paramID: 'threshold',
      value: kompressor.threshold.value, 
      range: [-100, 0]
    },
    'knee': {
      controlType: VALUE,
      paramID: 'knee',
      value: kompressor.knee.value,
      range: [0, 40]
    },
    'ratio': {
      controlType: VALUE,
      paramID: 'ratio',
      value: kompressor.ratio.value,
      range: [1, 20]
    },
    'attack': {
      controlType: VALUE,
      paramID: 'attack',
      value: kompressor.attack.value,
      range: [0, 1]
    },
    'release': {
      controlType: VALUE,
      paramID: 'release',
      value: kompressor.release.value,
      range: [0, 1]
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'threshold': (newThreshold: string) => { 
      kompressor.threshold.value = Number(newThreshold) 
    },
    'knee': (newKnee: string) => { 
      kompressor.knee.value = Number(newKnee) 
    },
    'ratio': (newRatio: string) => { 
      kompressor.ratio.value = Number(newRatio) 
    },
    'attack': (newAttack: string) => { 
      kompressor.attack.value = Number(newAttack)
    },
    'release': (newRelease: string) => { 
      kompressor.release.value = Number(newRelease) 
    },
  }

  return [
    {
      audioNode: kompressor,
      connectingParamIDs,
      controlSetFuncs,
    },
    controlData,
  ]
}

export default makeKompressor