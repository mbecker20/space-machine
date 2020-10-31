import audioCtx from '../../audioCtx'
import { ControlSetFuncs, BaseAM, ControlData, VISUALIZER_CONTROL } from '../moduleTypes'

export interface VisualizerModule extends BaseAM {
  audioNode: AnalyserNode
  timeArray: Float32Array
  freqArray: Float32Array
  bufferLength: number
}

export function makeVisualizerControlData(): ControlData {
  return {
    'visualizer-update': {
      controlType: VISUALIZER_CONTROL,
    }
  }
}

function makeVisualizer(prevControlData?: ControlData): VisualizerModule {
  const analyzer = audioCtx.createAnalyser()
  analyzer.fftSize = 1024
  const bufferLength = analyzer.frequencyBinCount
  const timeArray = new Float32Array(bufferLength)
  const freqArray = new Float32Array(bufferLength)
  const controlSetFuncs: ControlSetFuncs = {
    'visualizer-update': () => {
      analyzer.getFloatFrequencyData(freqArray)
      analyzer.getFloatTimeDomainData(timeArray)
    }
  }

  return {
    audioNode: analyzer,
    controlSetFuncs,
    connectingParamIDs: [],
    timeArray,
    freqArray,
    bufferLength,
  }
}

export default makeVisualizer