import audioCtx from '../../audioCtx'
import { BaseAM } from '../moduleTypes'

export interface GainControls {
  setGain: (newGain: number) => void
}

export interface GainModule extends BaseAM {
  audioNode: GainNode
  controls: GainControls
}

function makeGain(gainAmount = 1): GainModule {
  const gain = audioCtx.createGain()
  gain.gain.setValueAtTime(gainAmount, audioCtx.currentTime)

  // controls 

  function setGain(newGain: number) {
    gain.gain.setValueAtTime(newGain, audioCtx.currentTime)
  }

  return { audioNode: gain, paramIDs: ['gain'], controls: { setGain } }
}

export default makeGain