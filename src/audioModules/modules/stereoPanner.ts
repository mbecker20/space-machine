import audioCtx from '../../audioCtx'
import { BaseAM, ControlData, ControlSetFuncs, VALUE} from '../moduleTypes'

export interface StereoPannerModule extends BaseAM {
  audioNode: StereoPannerNode
}

function makeStereoPanner(prevControlData?: ControlData): [ StereoPannerModule, ControlData ] {
  const stereoPanner = audioCtx.createStereoPanner()

  const connectingParamIDs = ['pan']

  if (prevControlData) {
    stereoPanner.pan.value = prevControlData['pan'].value as number
  }

  const controlData: ControlData = {
    'pan': {
      controlType: VALUE,
      paramID: 'pan',
      value: stereoPanner.pan.value,
      range: prevControlData ? prevControlData['pan'].range : [-1, 1],
      maxRange: [-1, 1],
    }
  }

  const controlSetFuncs: ControlSetFuncs = {
    'pan': (newPan: string) => {
      stereoPanner.pan.value = Number(newPan)
    }
  }

  return [
    {
      audioNode: stereoPanner,
      connectingParamIDs,
      controlSetFuncs,
    },
    controlData,
  ]

}

export default makeStereoPanner