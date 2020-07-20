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
    const channelSplitter = audioCtx.createChannelSplitter(2)
    lineInput.connect(channelSplitter)

    const controlData: ControlData = {
      'number of channels: ': {
        controlType: INFO,
        paramID: 'n/a',
        value: 0,
      },
      'mute': {
        controlType: SWITCH,
        paramID: 'n/a',
        value: false,
      }
    }

    const controlSetFuncs: ControlSetFuncs = {
      'number of channels: ': (arg: string) => {
        controlData['number of channels: '].value = lineInput.channelCount
      },
      'mute': (arg: string) => {
        const isMuted = arg === 'true'
        controlData['mute'].value = isMuted
        stream.getAudioTracks()[0].enabled = isMuted
      }
    }

    const lineInputModule: LineInputModule = {
      audioNode: channelSplitter,
      connectingParamIDs: [],
      controlData,
      controlSetFuncs,
      outputs: ['0 (L)', '1 (R)']
    }

    window.audioModules = {
      ...window.audioModules,
      [id]: lineInputModule
    }
  })
}

export default makeLineInput