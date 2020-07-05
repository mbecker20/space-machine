import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls, TYPE, VALUE } from '../moduleTypes'

export interface AutoFilterModule extends BaseAM {
  audioNode: BiquadFilterNode
  controls: BaseControls
  typeTypes: string[]
}

const filterTypes = ['lowpass', 'lowshelf', 'highpass', 'highshelf', 'allpass', 'bandpass', 'notch', 'peaking']

function makeAutoFilter (): AutoFilterModule {
  
  const autoFilter = audioCtx.createBiquadFilter()

  const controls = {
    'set type': (newType: string) => {autoFilter.type = newType as BiquadFilterType},
    'set frequency': (newFrequency: string) => {autoFilter.frequency.value = Number(newFrequency)},
    'set detune': (newDetune: string) => {autoFilter.detune.value = Number(newDetune)},
    'set Q': (newQ: string) => {autoFilter.Q.value = Number(newQ)},
    'set gain': (newGain: string) => {autoFilter.gain.value = Number(newGain)},
  }

  return { 
    audioNode: autoFilter, 
    paramIDs: [['type', TYPE], ['frequency', VALUE], ['detune', VALUE], ['Q', VALUE], ['gain', VALUE]],
    typeTypes: filterTypes,
    controls,
  }
}

export default makeAutoFilter