import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls, TYPE, VALUE } from '../moduleTypes'

export interface AutoFilterModule extends BaseAM {
  audioNode: BiquadFilterNode
  controls: BaseControls
  typeTypes: string[]
}

const filterTypes = ['lowpass', 'lowshelf', 'highpass', 'highshelf', 'allpass', 'bandpass', 'notch', 'peaking']

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
    autoFilter.frequency.value = Number(newFrequency)
  }
  function setDetune(newDetune: string) {
    autoFilter.detune.value = Number(newDetune)
  }
  function setQ(newQ: string) {
    autoFilter.Q.value = Number(newQ)
  }
  function setGain(newGain: string) {
    autoFilter.gain.value = Number(newGain)
  }

  const controls = {
    'set type': setType,
    'set frequency': setFrequency,
    'set detune': setDetune,
    'set Q': setQ,
    'set gain': setGain,
  }

  return { 
    audioNode: autoFilter, 
    paramIDs: [['type', TYPE], ['frequency', VALUE], ['detune', VALUE], ['Q', VALUE], ['gain', VALUE]],
    typeTypes: filterTypes,
    controls,
  }
}

export default makeAutoFilter