import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls, VALUE} from '../moduleTypes'

function makeStereoPanner() {
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