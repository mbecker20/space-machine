import audioCtx from '../audioCtx'

export interface OscControls {
  stop: () => void
  setType: (newType: OscillatorType) => void
  setFrequency: (newFreq: number) => void
  setDetune: (newDetune: number) => void
}

export interface OscillatorModule {
  audioNode: OscillatorNode
  controls: OscControls
}

function makeOscillator(type: OscillatorType = 'sine', frequency = 440, detune = 0): OscillatorModule {
  const osc = audioCtx.createOscillator()
  osc.type = type
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime)
  osc.detune.setValueAtTime(detune, audioCtx.currentTime)
  
  //controls

  function stop() {
    osc.stop()
  }

  function setType(newType: OscillatorType) {
    osc.type = newType
  }

  function setFrequency(newFrequency: number) {
    osc.frequency.setValueAtTime(newFrequency, audioCtx.currentTime)
  }

  function setDetune(newDetune: number) {
    osc.detune.setValueAtTime(newDetune, audioCtx.currentTime)
  }

  osc.start()
  
  return { audioNode: osc, controls: { stop, setType, setFrequency, setDetune } }
}

export default makeOscillator