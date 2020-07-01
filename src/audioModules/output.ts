import audioCtx from '../audioCtx'

export interface OutputControls {
  resume: () => void
  suspend: () => void
}

export interface OutputModule {
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
  return { audioNode: audioCtx.destination, controls: { resume, suspend } }
}

export default makeOutput