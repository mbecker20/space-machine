import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls, VALUE} from '../moduleTypes'

export interface StereoPannerModule extends BaseAM {
  audioNode: StereoPannerNode
  controls: BaseControls
}

function makeStereoPanner(): StereoPannerModule {
  const stereoPanner = audioCtx.createStereoPanner()

  const controls = {
    'set pan': (newPan: string) => {stereoPanner.pan.value = Number(newPan)}
  }

  return {
    audioNode: stereoPanner,
    paramIDs: [['pan', VALUE]],
    controls,
  }

}

export default makeStereoPanner