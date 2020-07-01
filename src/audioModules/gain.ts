import audioCtx from '../audioCtx'
import { AudioModule } from './moduleTypes'

export interface GainControls {
  setGain: (newGain: number) => void
}

export interface GainModule {
  audioNode: GainNode
  controls: GainControls
  connect: (audioModule: AudioModule) => void
  disconnect: (audioModule: AudioModule) => void
}

function makeGain(): GainModule {
  const gain = audioCtx.createGain()
  gain.gain.value = 0

  function setGain(newGain: number) {
    gain.gain.setValueAtTime(newGain, audioCtx.currentTime)
  }

  function connect(audioModule: AudioModule) {
    gain.connect(audioModule.audioNode)
  }

  function disconnect(audioModule: AudioModule) {
    gain.disconnect(audioModule.audioNode)
  }

  return { audioNode: gain, connect, disconnect, controls: {setGain} }
}

export default makeGain