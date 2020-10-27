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
    }
  }
}

function makeTuner(prevControlData?: ControlData): TunerModule {
  const analyzer = audioCtx.createAnalyser()
  analyzer.fftSize = Math.pow(2, 12)
  const bufferLength = analyzer.frequencyBinCount
  const freqArray = new Float32Array(bufferLength)
  const controlSetFuncs: ControlSetFuncs = {
    'tuner': () => {
      // returns the current max freq, and db at tat freq
      analyzer.getFloatFrequencyData(freqArray)
      let maxBin = 0
      let maxdB = 0
      for (let i = 0; i < bufferLength; i++) {
        if (freqArray[i] > maxdB) {
          maxdB = freqArray[i]
          maxBin = i
        }
      }
      return i 
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