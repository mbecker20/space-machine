import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls, VALUE } from '../moduleTypes'

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

  return { audioNode: gain, paramIDs: [['gain', VALUE]], controls: { 'set gain': setGain } }
}

export default makeGain