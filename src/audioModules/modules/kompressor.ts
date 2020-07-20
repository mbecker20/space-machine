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
    },
    'set knee': {
      controlType: VALUE,
      paramID: 'knee'
    },
    'set ratio': {
      controlType: VALUE,
      paramID: 'ratio'
    },
    'set attack': {
      controlType: VALUE,
      paramID: 'attack'
    },
    'set release': {
      controlType: VALUE,
      paramID: 'release'
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'set threshold': (newThreshold: string) => { kompressor.threshold.value = Number(newThreshold) },
    'set knee': (newKnee: string) => { kompressor.knee.value = Number(newKnee) },
    'set ratio': (newRatio: string) => { kompressor.ratio.value = Number(newRatio) },
    'set attack': (newAttack: string) => { kompressor.attack.value = Number(newAttack)},
    'set release': (newRelease: string) => { kompressor.release.value = Number(newRelease) },
  }

  return {
    audioNode: kompressor,
    connectingParamIDs,
    controlData,
    controlSetFuncs,
    outputs: ['0'],
  }
}

export default makeKompressor