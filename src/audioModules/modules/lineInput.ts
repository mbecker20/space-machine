import audioCtx from '../../audioCtx'
import { BaseAM, SWITCH, ControlData, ControlSetFuncs } from '../moduleTypes'

export interface LineInputModule extends BaseAM {
  audioNode: ChannelSplitterNode
}

export function makeLineInControlData(): ControlData {
  return {
    'mute': {
      controlType: SWITCH,
      paramID: 'n/a',
      value: false,
    }
  }
}

function makeLineInput(id: string) {
  navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
      latency: 0,
    }
  }).then(stream => {
    const lineInput = audioCtx.createMediaStreamSource(stream)
    const channelSplitter = audioCtx.createChannelSplitter(2)
    lineInput.connect(channelSplitter)

    

    const controlSetFuncs: ControlSetFuncs = {
      'mute': (arg: string) => {
        stream.getAudioTracks()[0].enabled = arg === 'true'
      }
    }

    const lineInputModule: LineInputModule = {
      audioNode: channelSplitter,
      connectingParamIDs: [],
      controlSetFuncs,
    }

    window.audioModules = {
      ...window.audioModules,
      [id]: lineInputModule
    }
  })
}

export default makeLineInput