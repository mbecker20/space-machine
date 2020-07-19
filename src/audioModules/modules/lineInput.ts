import audioCtx from '../../audioCtx'
import { BaseAM } from '../moduleTypes'

export interface LineInputModule extends BaseAM {
  audioNode: MediaStreamAudioSourceNode
}

function makeLineInput(id: string) {
  navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
      latency: 0
    }
  }).then(stream => {
    const lineInput = audioCtx.createMediaStreamSource(stream)
    const lineInputModule: LineInputModule = {
      audioNode: lineInput,
      connectingParamIDs: [],
      controlData: {},
      controlSetFuncs: {},
    }
    window.audioModules = {
      ...window.audioModules,
      [id]: lineInputModule
    }
  })
}

export default makeLineInput