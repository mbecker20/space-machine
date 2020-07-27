import React, { useRef } from 'react'
import CSS from 'csstype'
import { sizes } from '../../theme/theme'
import useJSS from './style'
import { clamp } from '../../helpers/genFuncs'
import { PointerEventCallback } from '../PointerLayer/PointerLayer'

interface Props {
  initValue: number
  range: [number, number]
  svgStyle?: CSS.Properties
  circleStyle?: CSS.Properties
  onChange?: (newVal: number) => void
}

function getRotation(val: number, range: [number, number]) {
  return ((val - range[0]) / (range[1] - range[0])) * (sizes.knob.rotRange[1] - sizes.knob.rotRange[0]) + sizes.knob.rotRange[0]
}

function Knob({ initValue, range, onChange }: Props) {
  const classes = useJSS()
  const svgRef = useRef<SVGSVGElement>(null)
  const scale = (range[1] - range[0]) / 150
  let tempVal = initValue
  const textRef = useRef<HTMLDivElement>(null)
  const onPointerMove: PointerEventCallback = e => {
    tempVal = clamp(tempVal - e.movementY * scale, range)
    if (svgRef.current) { svgRef.current.style.transform = `rotate(${getRotation(tempVal, range)}deg)` }
    if (textRef.current) { textRef.current.innerText = `${Math.floor(tempVal * 10) / 10}` }
  }
  const onPointerUp: PointerEventCallback = e => {
    if (onChange) { onChange(tempVal) }
  }
  return (
    <div className={classes.KnobContainer}>
      <svg className={classes.KnobSVG} width={`${sizes.knob.size}vmin`} height={`${sizes.knob.size}vmin`} ref={svgRef}
        style={{ transform: `rotate(${getRotation(initValue, range)}deg)` }}
        onClick={e => e.stopPropagation()}
        onDragStart={e => e.stopPropagation() }
        onPointerDown={e => {
          window.openPointerLayer(e.pointerId, onPointerMove, onPointerUp)
        }}
      >

        <circle cx={`${sizes.knob.size / 2}vmin`} cy={`${sizes.knob.size / 2}vmin`} r={`${sizes.knob.size / 2}vmin`} 
        stroke='red' fill='white' fontSize={sizes.text.small} color='black'/>

        <rect width={`${sizes.knob.markerWidth}vmin`} height={`${sizes.knob.markerHeight}vmin`} 
        x={`${sizes.knob.size / 2 - sizes.knob.markerWidth / 2}vmin`} y='0px'/>

      </svg>
      <div className={classes.KnobText}
        onClick={e => e.stopPropagation()}
        onDragStart={e => e.stopPropagation()}
        onPointerDown={e => {
          if (e.shiftKey) {
            
          } else {
            window.openPointerLayer(e.pointerId, onPointerMove, onPointerUp)
          }
        }}
        ref={textRef}
      >
        {`${Math.floor(tempVal * 10) / 10}`}
      </div>
    </div>
  )
}

export default Knob