import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, BUTTON, VALUE } from '../moduleTypes'

export interface OutputModule extends BaseAM {
  audioNode: GainNode
}

function makeOutput(prevControlData?: ControlData): [ OutputModule, ControlData ] {
  audioCtx.resume()

  const masterGain = audioCtx.createGain()
  masterGain.connect(audioCtx.destination)

  if (prevControlData) {
    masterGain.gain.value = prevControlData['master gain'].value as number
  } else {
    masterGain.gain.value = 1
  }

  const controlData: ControlData = {
    'master gain': {
      controlType: VALUE,
      paramID: 'gain',
      value: masterGain.gain.value,
      range: prevControlData ? prevControlData['master gain'].range : [0, 1],
      maxRange: [0, 20],
    },
    'resume': {
      controlType: BUTTON,
      paramID: 'n/a'
    },
    'suspend': {
      controlType: BUTTON,
      paramID: 'n/a'
    }
  }

  const controlSetFuncs = {
    'master gain': (arg: string) => {
      masterGain.gain.value = Number(arg)
    },
    'resume': (arg: string) => { audioCtx.resume() },
    'suspend': (arg: string) => { audioCtx.suspend() }
  }

  return [
    {
      audioNode: masterGain,
      connectingParamIDs: [],
      controlSetFuncs,
    },
    controlData,
  ]
}

export default makeOutput