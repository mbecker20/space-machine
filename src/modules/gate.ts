import audioCtx from '../audioCtx'

function makeGate(gateLevel: number, gateLength: number) {
  const gate = audioCtx.createGain()
  gate.gain.setValueAtTime (0, audioCtx.currentTime)

  let gateState = {
    level: gateLevel,
    length: gateLength,
  }

  function updateState(gateLevel: number, gateLength: number) {
    gateState = {
      level: gateLevel,
      length: gateLength,
    }
  }
  
  function openGate() {
    const { level, length } = gateState
    gate.gain.setValueAtTime (level, audioCtx.currentTime)
    gate.gain.setValueAtTime (0, audioCtx.currentTime + length )
  }

  return { audioNode: gate, updateState, openGate }
}