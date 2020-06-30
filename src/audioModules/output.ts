import audioCtx from '../audioCtx'

interface OutputModule {
  audioNode: AudioNode
}

function makeOutput(): OutputModule {
  return { audioNode: audioCtx.destination }
}

export default makeOutput