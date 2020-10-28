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
      range: [-200, 10],
    },
  }
}

function getFreqFromIndex(index: number, bufferLength: number) {
  return index * audioCtx.sampleRate / (2 * bufferLength)
}

function makeTuner(prevControlData?: ControlData): TunerModule {
  const analyzer = audioCtx.createAnalyser()
  analyzer.fftSize = Math.pow(2, 11)
  const bufferLength = analyzer.frequencyBinCount
  const freqArray = new Float32Array(bufferLength)
  const controlSetFuncs: ControlSetFuncs = {
    'tuner': () => {
      // returns the current max freq, and db at that freq
      analyzer.getFloatFrequencyData(freqArray)
      let maxBin = 0
      let maxdB = -200
      for (let i = 0; i < bufferLength; i++) {
        if (freqArray[i] > maxdB) {
          maxdB = freqArray[i]
          if (freqArray[i] > maxdB + 50 || (i !== 2 * maxBin && i !== 2 * maxBin - 1 && i !== 2 * maxBin + 1)) {
            maxBin = i // in case its just a harmonic
          } 
        }
      }
      return [getFreqFromIndex(maxBin, bufferLength), maxdB]
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