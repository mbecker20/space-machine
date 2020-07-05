import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls, VALUE } from '../moduleTypes'

export interface SignalDelayModule extends BaseAM {
  audioNode: DelayNode
  controls: BaseControls
}

function makeSignalDelay() {
  const signalDelay = audioCtx.createDelay()

  const controls = {
    'set delay time': (newDelay: string) => {signalDelay.delayTime.value = Number(newDelay)},
  }

  return {
    audioNode: signalDelay,
    paramIDs: [['delayTime', VALUE]],
    controls,
  }

}

export default makeSignalDelay