import audioCtx from '../audioCtx'

interface OscillatorModule {
  audioNode: OscillatorNode
  setType: (newType: OscillatorType) => void
  setFrequency: (newFreq: number) => void
  setDetune: (newDetune: number) => void
}

function makeOscillator(type: OscillatorType, freq: number, detune: number): OscillatorModule {
  const osc = audioCtx.createOscillator()
  osc.type = type
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
  osc.detune.setValueAtTime(detune, audioCtx.currentTime)
  
  //controls

  function setType(newType: OscillatorType) {
    osc.type = newType
  }

  function setFrequency(newFreq: number) {
    osc.frequency.setValueAtTime(newFreq, audioCtx.currentTime)
  }

  function setDetune(newDetune: number) {
    osc.detune.setValueAtTime(newDetune, audioCtx.currentTime)
  }

  osc.start()
  return { audioNode: osc, setType, setFrequency, setDetune }
}

export default makeOscillator