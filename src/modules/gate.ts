import audioCtx from '../audioCtx'

interface GateModule {
  audioNode: GainNode
  setState: (gateLevel: number, gateLength: number) => void
  openGate: () => void
}

function makeGate(gateLevel: number, gateLength: number): GateModule {
  const gate = audioCtx.createGain()
  gate.gain.setValueAtTime (0, audioCtx.currentTime)

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

  return { audioNode: gate, setState, openGate }
}

export default makeGate