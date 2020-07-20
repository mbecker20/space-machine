import audioCtx from '../../audioCtx'
import { BaseAM, INFO, SWITCH, ControlData, ControlSetFuncs } from '../moduleTypes'

export interface LineInputModule extends BaseAM {
  audioNode: ChannelSplitterNode
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
    const channelSplitter = audioCtx.createChannelSplitter()
    lineInput.connect(channelSplitter)

    const controlData: ControlData = {
      'number of channels': {
        controlType: INFO,
        paramID: 'n/a',
      },
      'mute': {
        controlType: SWITCH,
        paramID: 'n/a',
        value: false,
      }
    }

    const controlSetFuncs: ControlSetFuncs = {
      'number of channels': (arg: string) => {
        return lineInput.channelCount
      },
      'mute': (arg: string) => {
        controlData['mute'].value = !controlData['mute'].value
        stream.getAudioTracks()[0].enabled = controlData['mute'].value
      }
    }

    const lineInputModule: LineInputModule = {
      audioNode: channelSplitter,
      connectingParamIDs: [],
      controlData,
      controlSetFuncs,
    }

    window.audioModules = {
      ...window.audioModules,
      [id]: lineInputModule
    }
  })
}

export default makeLineInput