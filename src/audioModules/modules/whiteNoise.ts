import audioCtx from "../../audioCtx";
import { BaseAM, ControlData } from "../moduleTypes";

export interface WhiteNoiseModule extends BaseAM {
  audioNode: AudioBufferSourceNode
}

export function makeWhiteNoiseControlData(): ControlData {
  return {}
}

const length = 10
const bufferSize = audioCtx.sampleRate * length

function makeWhiteNoise(prevControlData?: ControlData): WhiteNoiseModule {
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
  let data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }
  let noise = audioCtx.createBufferSource()
  noise.buffer = buffer
  noise.loop = true
  noise.start()

  return {
    audioNode: noise,
    connectingParamIDs: [],
    controlSetFuncs: {},
  }
}

export default makeWhiteNoise