import audioCtx from '../../audioCtx'
import { BaseAM, BaseControls } from '../moduleTypes'

export interface ConstantModule extends BaseAM {
  audioNode: ConstantSourceNode
  controls: BaseControls
}

function makeConstant(value = 0) {

  const constant = audioCtx.createConstantSource()
  constant.offset.setValueAtTime(value, audioCtx.currentTime)

  function setValue(newValue: number) {
    constant.offset.setValueAtTime(newValue, audioCtx.currentTime)
  }

  function linRampValue(newValue: number) {
    constant.offset.linearRampToValueAtTime(newValue, audioCtx.currentTime)
  }

  function expRampValue(newValue: number) {
    constant.offset.exponentialRampToValueAtTime(newValue, audioCtx.currentTime)
  }

  const controls = {
    'value': value,
  }
  
  return { audioNode: constant, paramIDs: [value] }

}

