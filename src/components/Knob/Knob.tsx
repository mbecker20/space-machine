import React, { useRef, useState } from 'react'
import CSS from 'csstype'
import { sizes } from '../../theme/theme'
import useJSS from './style'
import { clamp } from '../../helpers/genFuncs'
import { PointerEventCallback } from '../PointerLayer/PointerLayer'
import { getRotation, makeValString } from './helpers'

interface Props {
  initValue: number
  range: [number, number]
  svgStyle?: CSS.Properties
  circleStyle?: CSS.Properties
  onChange?: (newVal: number) => void
}



function Knob({ initValue, range, onChange }: Props) {
  const classes = useJSS()
  const svgRef = useRef<SVGSVGElement>(null)
  const scale = (range[1] - range[0]) / 150
  const [ val, setVal ] = useState(initValue)
  let tempVal = val
  const textRef = useRef<HTMLInputElement>(null)
  const onPointerMove: PointerEventCallback = e => {
    tempVal = clamp(tempVal - e.movementY * scale, range)
    if (svgRef.current) { svgRef.current.style.transform = `rotate(${getRotation(tempVal, range)}deg)` }
    if (textRef.current) { textRef.current.value = `${makeValString(tempVal)}` }
  }
  const onPointerUp: PointerEventCallback = e => {
    if (onChange) { onChange(tempVal) }
  }
  return (
    <div className={classes.KnobContainer}>
      <svg className={classes.KnobSVG} width={`${sizes.knob.size}vmin`} height={`${sizes.knob.size}vmin`} ref={svgRef}
        style={{ transform: `rotate(${getRotation(initValue, range)}deg)` }}
      >

        <circle cx={`${sizes.knob.size / 2}vmin`} cy={`${sizes.knob.size / 2}vmin`} r={`${sizes.knob.size / 2}vmin`} 
        stroke='red' fill='white' fontSize={sizes.text.small} color='black'/>

        <rect width={`${sizes.knob.markerWidth}vmin`} height={`${sizes.knob.markerHeight}vmin`} 
        x={`${sizes.knob.size / 2 - sizes.knob.markerWidth / 2}vmin`} y='0px'/>

      </svg>
      <input className={classes.KnobText}
        ref={textRef}
        onChange={e => {
          if (onChange) { 
            onChange(clamp(Number(e.target.value), range))
          }
          setVal(Number(e.target.value))
        }}
        type='number'
        value={makeValString(val)}
      />
      <div className={classes.InteractionLayer}
        onClick={e => e.stopPropagation()}
        onDragStart={e => e.stopPropagation()}
        onPointerDown={e => {
          e.stopPropagation()
          if (e.shiftKey) {
            if (textRef.current) {
              textRef.current?.focus()
              textRef.current.value = ''
            }
          } else {
            window.openPointerLayer(e.pointerId, onPointerMove, onPointerUp)
          }
        }}
      />
    </div>
  )
}

export default Knob