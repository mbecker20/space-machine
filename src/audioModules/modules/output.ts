import audioCtx from '../../audioCtx'
import { BaseAM } from '../moduleTypes'

export interface OutputControls {
  'resume': () => void
  'suspend': () => void
}

export interface OutputModule extends BaseAM {
  audioNode: AudioNode
  controls: OutputControls
}

function makeOutput(): OutputModule {
  function resume() {
    audioCtx.resume()
  }

  function suspend() {
    audioCtx.suspend()
  }

  audioCtx.resume()
  return { audioNode: audioCtx.destination, paramIDs: [], controls: { 'resume': resume, 'suspend': suspend } }
}

export default makeOutput