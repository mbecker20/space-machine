import React, { PointerEvent, useRef, useEffect } from 'react'
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
  const pointerLayerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    //pointerLayerRef.current?.setPointerCapture(pointerId)
  })
  return (
    <div className={classes.PointerLayer}
      ref={pointerLayerRef}
      onPointerMove={(e) => {
        if (e.pointerId === pointerId) {
          onPointerMove(e)
        }
      }}
      onPointerUp={(e) => {
        if (e.pointerId === pointerId) {
          onPointerUp(e)
          //pointerLayerRef.current?.releasePointerCapture(pointerId)
          resetPointerLayerData()
        }
      }}
    />   
  )
}

export default PointerLayer