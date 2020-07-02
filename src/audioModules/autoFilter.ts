import audioCtx from '../audioCtx'

export interface AutoFilterControls {
  setType: (newType: BiquadFilterType) => void
  setFrequency: (newFrequency: number) => void
  setDetune: (newDetune: number) => void
  setQ: (newQ: number) => void
  setGain: (newGain: number) => void
}

export interface AutoFilterModule {
  audioNode: BiquadFilterNode
  controls: AutoFilterControls
}

function makeAutoFilter (type: BiquadFilterType, frequency: number, detune: number, Q: number, gain: number) {
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

  return { audioNode: autoFilter, controls: { setType, setFrequency, setDetune, setQ, setGain }}
}

export default makeAutoFilter