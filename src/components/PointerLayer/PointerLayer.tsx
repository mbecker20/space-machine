import React, { PointerEvent } from 'react'
import useJSS from './style'

export type PointerEventCallback = (e: PointerEvent<HTMLDivElement>) => void

export interface PointerLayerData {
  isOpen: boolean
  pointerId: number
  onPointerMove: PointerEventCallback
  onPointerUp: PointerEventCallback
}

interface Props {
  pointerLayerData: PointerLayerData
  resetPointerLayerData: () => void
}

function PointerLayer({ pointerLayerData, resetPointerLayerData }: Props) {
  const classes = useJSS()
  const { pointerId, onPointerMove, onPointerUp } = pointerLayerData
  return (
    <div className={classes.PointerLayer} 
      onPointerMove={(e) => {
        if (e.pointerId === pointerId) {
          onPointerMove(e)
        }
      }}
      onPointerUp={(e) => {
        if (e.pointerId === pointerId) {
          onPointerUp(e)
          resetPointerLayerData()
        }
      }}
    />   
  )
}

export default PointerLayer