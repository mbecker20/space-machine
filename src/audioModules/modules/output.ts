import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, BUTTON, VALUE } from '../moduleTypes'

export interface OutputModule extends BaseAM {
  audioNode: GainNode
}

function makeOutput(): OutputModule {
  audioCtx.resume()

  const masterGain = audioCtx.createGain(); masterGain.connect(audioCtx.destination)

  const controlData: ControlData = {
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

  const controlSetFuncs = {
    'master gain': (arg: string) => {
      controlData['master gain'].value = Number(arg)
      masterGain.gain.value = Number(arg)
    },
    'resume': (arg: string) => { audioCtx.resume() },
    'suspend': (arg: string) => { audioCtx.suspend() }
  }

  return { 
    audioNode: masterGain,
    connectingParamIDs: [],
    controlData,
    controlSetFuncs,
  }
}

export default makeOutput