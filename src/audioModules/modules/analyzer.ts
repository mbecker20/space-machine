import audioCtx from '../../audioCtx'
import { ControlSetFuncs, BaseAM, ControlData, GRAPH } from '../moduleTypes'

export interface AnalyzerModule extends BaseAM {
  audioNode: AnalyserNode
  timeArray: Float32Array
  bufferLength: number
  //freqArray: Uint8Array
}

export function makeAnalyzerControlData(): ControlData {
  return {
    'time graph': {
      controlType: GRAPH,
      range: [-1.5, 1.5],
    }
  }
}

function makeAnalyzer(prevControlData?: ControlData): AnalyzerModule {
  const analyzer = audioCtx.createAnalyser()
  analyzer.fftSize = 2048
  const bufferLength = analyzer.frequencyBinCount
  const timeArray = new Float32Array(bufferLength)
  //const freqArray = new Uint8Array(bufferLength)

  const controlSetFuncs: ControlSetFuncs = {
    'time graph': () => {
      analyzer.getFloatTimeDomainData(timeArray)
    }
  }

  return {
    audioNode: analyzer,
    controlSetFuncs,
    connectingParamIDs: [],
    timeArray,
    bufferLength,
  }
}

export default makeAnalyzer