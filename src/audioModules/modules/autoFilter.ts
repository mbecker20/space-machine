import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls } from '../moduleTypes'

export interface AutoFilterModule extends BaseAM {
  audioNode: BiquadFilterNode
  controls: BaseControls
}

function makeAutoFilter (type: BiquadFilterType = 'lowpass', frequency = 12500, detune = 0, Q = 0, gain = 1): AutoFilterModule {
  const autoFilter = audioCtx.createBiquadFilter()
    autoFilter.type = type
    autoFilter.frequency.setValueAtTime(frequency, audioCtx.currentTime)
    autoFilter.detune.setValueAtTime(detune, audioCtx.currentTime)
    autoFilter.Q.setValueAtTime(Q, audioCtx.currentTime)
    autoFilter.gain.setValueAtTime(gain, audioCtx.currentTime)

  function setType(newType: string) {
    autoFilter.type = newType as BiquadFilterType
  }
  function setFrequency(newFrequency: string) {
    autoFilter.frequency.setValueAtTime(Number(newFrequency), audioCtx.currentTime)
  }
  function setDetune(newDetune: string) {
    autoFilter.detune.setValueAtTime(Number(newDetune), audioCtx.currentTime)
  }
  function setQ(newQ: string) {
    autoFilter.Q.setValueAtTime(Number(newQ), audioCtx.currentTime)
  }
  function setGain(newGain: string) {
    autoFilter.gain.setValueAtTime(Number(newGain), audioCtx.currentTime)
  }

  const controls = {
    'set type': setType,
    'set frequency': setFrequency,
    'set detune': setDetune,
    'set Q': setQ,
    'set gain': setGain,
  }

  return { audioNode: autoFilter, paramIDs: ['type', 'frequency', 'detune', 'Q', 'gain'], controls }
}

export default makeAutoFilter