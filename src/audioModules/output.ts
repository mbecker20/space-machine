import audioCtx from '../audioCtx'

export interface OutputModule {
  audioNode: AudioNode
}

function makeOutput(): OutputModule {
  audioCtx.resume()
  return { audioNode: audioCtx.destination }
}

export default makeOutput