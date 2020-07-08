import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, BUTTON } from '../moduleTypes'

export interface OutputModule extends BaseAM {
  audioNode: AudioNode
}

function makeOutput(): OutputModule {
  const controlData: ControlData = {
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
    'resume': (arg: string) => { audioCtx.resume() },
    'suspend': (arg: string) => { audioCtx.suspend() }
  }

  audioCtx.resume()
  return { 
    audioNode: audioCtx.destination, 
    connectingParamIDs: [],
    controlData,
    controlSetFuncs,
  }
}

export default makeOutput