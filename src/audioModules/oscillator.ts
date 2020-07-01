import audioCtx from '../audioCtx'
import { AudioModule } from './moduleTypes'

export interface OscControls {
  start: () => void
  stop: () => void
  setType: (newType: OscillatorType) => void
  setFrequency: (newFreq: number) => void
  setDetune: (newDetune: number) => void
}

export interface OscillatorModule {
  audioNode: OscillatorNode
  controls: OscControls
  connect: (module: AudioModule) => void
  disconnect: (module: AudioModule) => void
}

function makeOscillator(type: OscillatorType = 'sine', frequency = 440, detune = 0): OscillatorModule {
  const osc = audioCtx.createOscillator()
  osc.type = type
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime)
  osc.detune.setValueAtTime(detune, audioCtx.currentTime)

  function connect(module: AudioModule) {
    osc.connect(module.audioNode)
  }

  function disconnect(module: AudioModule) {
    osc.disconnect(module.audioNode)
  }
  
  //controls

  function start() {
    osc.start()
  }

  function stop() {
    osc.stop()
  }

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
  
  return { audioNode: osc, connect, disconnect, controls: { start, stop, setType, setFrequency, setDetune } }
}

export default makeOscillator