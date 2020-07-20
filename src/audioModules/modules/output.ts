import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, BUTTON, VALUE } from '../moduleTypes'

export interface OutputModule extends BaseAM {
  audioNode: GainNode
}

function makeOutput(): OutputModule {
  audioCtx.resume()

  const masterGain = audioCtx.createGain(); masterGain.connect(audioCtx.destination)

  const controlData: ControlData = {
    'set master gain': {
      controlType: VALUE,
      paramID: 'gain',
      value: 1,
      range: [0, 5, .1],
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
    'set master gain': (arg: string) => { masterGain.gain.value = Number(arg) },
    'resume': (arg: string) => { audioCtx.resume() },
    'suspend': (arg: string) => { audioCtx.suspend() }
  }

  return { 
    audioNode: masterGain,
    connectingParamIDs: [],
    controlData,
    controlSetFuncs,
    outputs: ['none']
  }
}

export default makeOutput