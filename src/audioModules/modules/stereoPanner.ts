import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE} from '../moduleTypes'

export interface StereoPannerModule extends BaseAM {
  audioNode: StereoPannerNode
}

export function makePannerControlData(): ControlData {
  return {
    'pan': {
      controlType: VALUE,
      paramID: 'pan',
      value: 0,
      range: [-1, 1],
      maxRange: [-1, 1],
    }
  }
}

function makeStereoPanner(prevControlData?: ControlData): StereoPannerModule {
  const stereoPanner = audioCtx.createStereoPanner()

  const connectingParamIDs = ['pan']

  if (prevControlData) {
    stereoPanner.pan.value = prevControlData['pan'].value as number
  }

  const controlSetFuncs: ControlSetFuncs = {
    'pan': (newPan: string) => {
      stereoPanner.pan.value = Number(newPan)
    }
  }

  return {
    audioNode: stereoPanner,
    connectingParamIDs,
    controlSetFuncs,
  }

}

export default makeStereoPanner