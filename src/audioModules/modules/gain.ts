import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls, VALUE } from '../moduleTypes'

export interface GainModule extends BaseAM {
  audioNode: GainNode
  controls: BaseControls
}

function makeGain(gainAmount = 1): GainModule {
  const gain = audioCtx.createGain()
  gain.gain.value = gainAmount

  const controls = {
    'set gain': (newGain: string) => {gain.gain.value = Number(newGain)}
  }
  
  return { audioNode: gain, paramIDs: [['gain', VALUE]], controls }
}

export default makeGain