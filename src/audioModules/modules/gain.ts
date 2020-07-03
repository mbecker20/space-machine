import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls } from '../moduleTypes'

export interface GainModule extends BaseAM {
  audioNode: GainNode
  controls: BaseControls
}

function makeGain(gainAmount = 1): GainModule {
  const gain = audioCtx.createGain()
  gain.gain.setValueAtTime(gainAmount, audioCtx.currentTime)

  // controls 

  function setGain(newGain: string) {
    gain.gain.setValueAtTime(Number(newGain), audioCtx.currentTime)
  }

  return { audioNode: gain, paramIDs: ['gain'], controls: { 'set gain': setGain } }
}

export default makeGain