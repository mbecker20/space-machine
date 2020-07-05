import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls, VALUE } from '../moduleTypes'

export interface KompressorModule extends BaseAM {
  audioNode: DynamicsCompressorNode
  controls: BaseControls
}

function makeKompressor(): KompressorModule {
  const kompressor = audioCtx.createDynamicsCompressor()

  const controls = {
    'set threshold': (newThreshold: string) => {kompressor.threshold.value = Number(newThreshold)},
    'set knee': (newKnee: string) => {kompressor.knee.value = Number(newKnee)},
    'set ratio': (newRatio: string) => {kompressor.ratio.value = Number(newRatio)},
    'set attack': (newAttack: string) => {kompressor.attack.value = Number(newAttack)},
    'set release': (newRelease: string) => {kompressor.release.value = Number(newRelease)},
  }

  return {
    audioNode: kompressor,
    paramIDs: [['threshold', VALUE], ['knee', VALUE], ['ratio', VALUE], ['attack', VALUE], ['release', VALUE]],
    controls,
  }
}

export default makeKompressor