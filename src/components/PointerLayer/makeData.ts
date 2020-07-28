import { PointerLayerData, PointerEventCallback } from '../PointerLayer/PointerLayer'

export function makePointerLayerData(isOpen: boolean, pointerId: number = -1, onPointerMove: PointerEventCallback = () => { }, onPointerUp: PointerEventCallback = () => { }): PointerLayerData {
  return {
    isOpen,
    pointerId,
    onPointerMove,
    onPointerUp,
  }
}