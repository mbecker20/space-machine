import React, { useRef, useState } from 'react'
import CSS from 'csstype'
import { sizes, colors } from '../../theme/theme'
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
  onEveryChange?: (newVal: number) => void
}

function StatelessKnob({ initValue, range, onChange, onEveryChange }: Props) {
  const classes = useJSS()
  const svgRef = useRef<SVGSVGElement>(null)
  const scale = (range[1] - range[0]) * sizes.knob.sensitivity / 200
  let tempVal = clamp(initValue, range)
  const [inputVal, setInputVal] = useState(makeValString(tempVal))
  const textRef = useRef<HTMLInputElement>(null)

  const onPointerMove: PointerEventCallback = e => {
    tempVal = clamp(tempVal - e.movementY * scale, range)
    if (svgRef.current) { svgRef.current.style.transform = `rotate(${getRotation(tempVal, range)}deg)` }
    if (textRef.current) { textRef.current.value = `${makeValString(tempVal)}` }
    if (onEveryChange) { onEveryChange(tempVal) }
  }
  const onPointerUp: PointerEventCallback = () => {
    if (onChange) { onChange(tempVal) }
    setInputVal(makeValString(tempVal))
  }
  return (
    <div className={classes.KnobContainer}>
      <svg className={classes.KnobSVG} width={`${sizes.knob.size + 1}vmin`} height={`${sizes.knob.size + 1}vmin`} ref={svgRef}
        style={{ transform: `rotate(${getRotation(initValue, range)}deg)` }}
      >

        <circle cx={`${(sizes.knob.size + 1) / 2}vmin`} cy={`${(sizes.knob.size + 1) / 2}vmin`} r={`${sizes.knob.size / 2}vmin`} 
        stroke={colors.knobBorder} strokeWidth={sizes.knob.borderWidth} fill={colors.knob}/>

        <rect width={`${sizes.knob.markerWidth}vmin`} height={`${sizes.knob.markerHeight}vmin`} 
          x={`${(sizes.knob.size + 1) / 2 - sizes.knob.markerWidth / 2}vmin`} y='.5vmin' fill={colors.knobMarker}/>

      </svg>
      <input className={classes.KnobText}
        ref={textRef}
        onChange={e => {
          setInputVal(e.target.value)
          if (onEveryChange) { onEveryChange(clamp(Number(e.target.value), range)) }
        }}
        onBlur={e => {
          const newVal = clamp(Number(e.target.value), range)
          if (onChange) {
            onChange(newVal)
          }
          setInputVal(makeValString(newVal))
        }}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            textRef.current?.blur()
          }
        }}
        type='number'
        value={inputVal}
      />
      <div className={classes.InteractionLayer}
        title={`${initValue}`}
        onClick={e => e.stopPropagation()}
        onDragStart={e => e.stopPropagation()}
        onPointerDown={e => {
          e.stopPropagation()
          e.preventDefault()
          if (e.shiftKey) {
            if (textRef.current) {
              textRef.current.placeholder = textRef.current.value
              textRef.current.value = ''
              textRef.current.focus()
            }
          } else {
            window.openPointerLayer(e.pointerId, onPointerMove, onPointerUp)
          }
        }}
      />
    </div>
  )
}

export default StatelessKnob