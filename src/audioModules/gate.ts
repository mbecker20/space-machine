import audioCtx from '../audioCtx'
import { AudioModule } from './moduleTypes'

export interface GateControls {
  setState: (gateLevel: number, gateLength: number) => void
  openGate: () => void
}

export interface GateModule {
  audioNode: GainNode
  controls: GateControls
  connect: (audioModule: AudioModule) => void
  disconnect: (audioModule: AudioModule) => void
}

function makeGate(gateLevel = 0, gateLength = 1): GateModule {
  const gate = audioCtx.createGain()
  gate.gain.setValueAtTime(0, audioCtx.currentTime)

  function connect(audioModule: AudioModule) {
    gate.connect(audioModule.audioNode)
  }

  function disconnect(audioModule: AudioModule) {
    gate.disconnect(audioModule.audioNode)
  }

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

  return { audioNode: gate, connect, disconnect, controls: { setState, openGate } }
}

export default makeGate