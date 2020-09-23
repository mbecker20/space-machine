import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, BUTTON, VALUE } from '../moduleTypes'

export interface OutputModule extends BaseAM {
  audioNode: GainNode
}

export function makeOutputControlData(): ControlData {
  return {
    'master gain': {
      controlType: VALUE,
      paramID: 'gain',
      value: 1,
      range: [0, 1],
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
}

function makeOutput(prevControlData?: ControlData): OutputModule {
  audioCtx.resume()

  const masterGain = audioCtx.createGain()
  masterGain.connect(audioCtx.destination)

  if (prevControlData) {
    masterGain.gain.value = prevControlData['master gain'].value as number
  } else {
    masterGain.gain.value = 1
  }

  const controlSetFuncs = {
    'master gain': (arg: string) => {
      masterGain.gain.value = Number(arg)
    },
    'resume': (arg: string) => { audioCtx.resume() },
    'suspend': (arg: string) => { audioCtx.suspend() }
  }

  return {
    audioNode: masterGain,
    connectingParamIDs: [],
    controlSetFuncs,
  }
}

export default makeOutput