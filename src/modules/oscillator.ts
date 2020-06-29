import audioCtx from '../audioCtx'

function makeOscillator(type: OscillatorType, freq: number, detune: number) {
  const osc = audioCtx.createOscillator()
  osc.type = type
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
  osc.detune.setValueAtTime(detune, audioCtx.currentTime)
  
  //controls

  osc.start()
  return { module: osc }
}

export default makeOscillator