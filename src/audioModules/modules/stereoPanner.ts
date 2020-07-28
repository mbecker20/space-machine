import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE} from '../moduleTypes'

export interface StereoPannerModule extends BaseAM {
  audioNode: StereoPannerNode
}

function makeStereoPanner(): StereoPannerModule {
  const stereoPanner = audioCtx.createStereoPanner()

  const connectingParamIDs = ['pan']

  const controlData: ControlData = {
    'pan': {
      controlType: VALUE,
      paramID: 'pan',
      value: stereoPanner.pan.value,
      range: [-1, 1],
      maxRange: [-1, 1],
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'pan': (newPan: string) => {
      controlData['pan'].value = Number(newPan)
      stereoPanner.pan.value = Number(newPan)
    }
  }

  return {
    audioNode: stereoPanner,
    connectingParamIDs,
    controlData,
    controlSetFuncs,
  }

}

export default makeStereoPanner