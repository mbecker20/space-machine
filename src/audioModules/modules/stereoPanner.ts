import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE} from '../moduleTypes'

export interface StereoPannerModule extends BaseAM {
  audioNode: StereoPannerNode
}

function makeStereoPanner(): StereoPannerModule {
  const stereoPanner = audioCtx.createStereoPanner()

  const connectingParamIDs = ['pan']

  const controlData: ControlData = {
    'set pan': {
      controlType: VALUE,
      paramID: 'pan'
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'set pan': (newPan: string) => {stereoPanner.pan.value = Number(newPan)}
  }

  return {
    audioNode: stereoPanner,
    connectingParamIDs,
    controlData,
    controlSetFuncs,
  }

}

export default makeStereoPanner