import { add } from "mathjs"
import audioCtx from "../../audioCtx"
import { BaseAM, ControlData, ControlSetFuncs, TUNER_CONTROL } from "../moduleTypes"

export interface TunerModule extends BaseAM {
  audioNode: AnalyserNode,
  freqArray: Float32Array,
  bufferLength: number
}

export function makeTunerControlData(): ControlData {
  return {
    'tuner': {
      controlType: TUNER_CONTROL,
    },
  }
}

function downSample(freqArray: number[], bufferLength: number, harmonic: number) {
  let over = false
  return freqArray.map((num, i) => {
    if (over) {
      return 0
    } else if (harmonic * i < bufferLength) {
      return freqArray[harmonic * i]
    } else {
      over = true
      return 0
    }
  })
}

function addHarmonics(freqArray: Float32Array, bufferLength: number, numHarmonics: number) {
  let min = Math.min(...freqArray)
  let harmonicArray = [...freqArray.map(val => val - min)]
  let harmonicCopy = [...harmonicArray]
  for (let harmonic = 2; harmonic <= numHarmonics; harmonic++) {
    harmonicArray = add(harmonicArray, downSample(harmonicCopy, bufferLength, harmonic)) as number[]
  }
  return harmonicArray
}

function getFreqFromIndex(index: number, bufferLength: number) {
  return index * audioCtx.sampleRate / (2 * bufferLength)
}

function makeTuner(prevControlData?: ControlData): TunerModule {
  const analyzer = audioCtx.createAnalyser()
  analyzer.fftSize = Math.pow(2, 15)
  analyzer.smoothingTimeConstant = 0
  const bufferLength = analyzer.frequencyBinCount
  const freqArray = new Float32Array(bufferLength)
  const controlSetFuncs: ControlSetFuncs = {
    'tuner': () => {
      // returns the current max freq, and db at that freq
      analyzer.getFloatFrequencyData(freqArray)
      let maxBin = 0
      let maxdB = 0
      const harmonicArray = addHarmonics(freqArray, bufferLength, 5)
      for (let i = 0; i < bufferLength; i++) {
        if (harmonicArray[i] > maxdB) {
          maxdB = harmonicArray[i]
          maxBin = i
        }
      }
      return [getFreqFromIndex(maxBin, bufferLength), freqArray[maxBin]]
    }
  }
  return {
    audioNode: analyzer,
    controlSetFuncs,
    connectingParamIDs: [],
    bufferLength,
    freqArray,
  }
}

export default makeTuner