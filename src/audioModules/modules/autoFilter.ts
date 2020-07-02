import audioCtx from '../../audioCtx'
import { BaseAM } from '../moduleTypes'

export interface AutoFilterControls {
  'set type': (newType: BiquadFilterType) => void
  'set frequency': (newFrequency: number) => void
  'set detune': (newDetune: number) => void
  'set Q': (newQ: number) => void
  'set gain': (newGain: number) => void
}

export interface AutoFilterModule extends BaseAM {
  audioNode: BiquadFilterNode
  controls: AutoFilterControls
}

function makeAutoFilter (type: BiquadFilterType = 'lowpass', frequency = 12500, detune = 0, Q = 0, gain = 1): AutoFilterModule {
  const autoFilter = audioCtx.createBiquadFilter()
    autoFilter.type = type
    autoFilter.frequency.setValueAtTime(frequency, audioCtx.currentTime)
    autoFilter.detune.setValueAtTime(detune, audioCtx.currentTime)
    autoFilter.Q.setValueAtTime(Q, audioCtx.currentTime)
    autoFilter.gain.setValueAtTime(gain, audioCtx.currentTime)

  function setType(newType: BiquadFilterType) {
    autoFilter.type = newType
  }
  function setFrequency(newFrequency: number) {
    autoFilter.frequency.setValueAtTime(newFrequency, audioCtx.currentTime)
  }
  function setDetune(newDetune: number) {
    autoFilter.detune.setValueAtTime(newDetune, audioCtx.currentTime)
  }
  function setQ(newQ: number) {
    autoFilter.q.setValueAtTime(newQ, audioCtx.currentTime)
  }
  function setGain(newGain: number) {
    autoFilter.gain.setValueAtTime(newGain, audioCtx.currentTime)
  }

  const controls = {
    'set type': setType,
    'set frequency': setFrequency,
    'set detune': setDetune,
    'set Q': setQ,
    'set gain': setGain,
  }

  return { audioNode: autoFilter, paramIDs: ['frequency', 'detune', 'Q', 'gain'], controls }
}

export default makeAutoFilter