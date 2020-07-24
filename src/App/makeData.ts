import { PointerLayerData, PointerEventCallback } from '../components/PointerLayer/PointerLayer'

export function makeConnectionMenuData(isOpen: boolean, fromID = '', toID = '') {
  return {
    isOpen,
    fromID,
    toID,
  }
}

export function makePointerLayerData(isOpen: boolean, pointerId: number = -1, onPointerMove: PointerEventCallback = () => {}, onPointerUp: PointerEventCallback = () => {}): PointerLayerData {
  return {
    isOpen,
    pointerId,
    onPointerMove,
    onPointerUp,
  }
}