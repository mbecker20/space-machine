import audioCtx from '../audioCtx'

export interface GateControls {
  setState: (gateLevel: number, gateLength: number) => void
  openGate: () => void
}

export interface GateModule {
  audioNode: GainNode
  controls: GateControls
}

function makeGate(gateLevel = 0, gateLength = 1): GateModule {
  const gate = audioCtx.createGain()
  gate.gain.setValueAtTime(0, audioCtx.currentTime)

  // controls

  let gateState = {
    level: gateLevel,
    length: gateLength,
  }

  function setState(gateLevel: number, gateLength: number) {
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

  return { audioNode: gate, controls: { setState, openGate } }
}

export default makeGate