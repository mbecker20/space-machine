import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls, VALUE } from '../moduleTypes'

function makeKompressor() {
  const kompressor = audioCtx.createDynamicsCompressor()

  function setThreshold(threshold: string) {
    kompressor.threshold.value = Number(threshold)
  }

  function setKnee(knee: string) {
    kompressor.knee.value = Number(knee)
  }

}