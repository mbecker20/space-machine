import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls, VALUE } from '../moduleTypes'

export interface ConstantModule extends BaseAM {
  audioNode: ConstantSourceNode
  controls: BaseControls
}

function makeConstant(value = 0): ConstantModule {

  const constant = audioCtx.createConstantSource()
  constant.offset.setValueAtTime(value, audioCtx.currentTime)

  function linRampValue(newValue: string) {
    constant.offset.linearRampToValueAtTime(Number(newValue), audioCtx.currentTime)
  }

  function expRampValue(newValue: string) {
    constant.offset.exponentialRampToValueAtTime(Number(newValue), audioCtx.currentTime)
  }

  const controls = {
    'set value': (newValue: string) => {constant.offset.value = Number(newValue)},
  }
  
  return { 
    audioNode: constant, 
    paramIDs: [['value', VALUE], ],
    controls
  }

}

export default makeConstant