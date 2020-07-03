import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls, BUTTON } from '../moduleTypes'

export interface OutputModule extends BaseAM {
  audioNode: AudioNode
  controls: BaseControls
}

function makeOutput(): OutputModule {
  function resume(arg = '') {
    console.log('resuming')
    audioCtx.resume()
  }

  function suspend(arg = '') {
    audioCtx.suspend()
  }

  audioCtx.resume()
  return { 
    audioNode: audioCtx.destination, 
    paramIDs: [['resume', BUTTON], ['suspend', BUTTON]], 
    controls: { 'resume': resume, 'suspend': suspend },
  }
}

export default makeOutput