import audioCtx from "../../audioCtx"
import { BaseAM, ControlData, ControlSetFuncs, TUNER_CONTROL } from "../moduleTypes"

export interface TunerModule extends BaseAM {
  audioNode: AnalyserNode,
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
  analyzer.fftSize = Math.pow(2, 10)
  const bufferLength = analyzer.frequencyBinCount
  const controlSetFuncs: ControlSetFuncs = {
    'tuner': () => {

    }
  }
  return {
    audioNode: analyzer,
    controlSetFuncs,
    connectingParamIDs: [],
    bufferLength,
  }
}

export default makeTuner