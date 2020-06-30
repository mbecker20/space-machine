import audioCtx from '../audioCtx'

export interface OutputModule {
  audioNode: AudioNode
}

function makeOutput(): OutputModule {
  return { audioNode: audioCtx.destination }
}

export default makeOutput