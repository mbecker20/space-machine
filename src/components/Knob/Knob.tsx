import React, { useRef, useState } from 'react'
import CSS from 'csstype'
import { sizes } from '../../theme/theme'
//import useJSS from './style'
import { clamp } from '../../helpers/genFuncs'
import { PointerEventCallback } from '../PointerLayer/PointerLayer'

interface Props {
  initValue: number
  range: [number, number]
  svgStyle?: CSS.Properties
  circleStyle?: CSS.Properties
  onChange?: (newVal: number) => void
}

const rotRange = [-160, 160]

function getRotation(val: number, range: [number, number]) {
  return ( ( val - range[0] ) / ( range[1] - range[0] ) ) * ( rotRange[1] - rotRange[0] ) + rotRange[0]
}

//let prevY = 0
//let capturedID = -1

function Knob({ initValue, range, onChange }: Props) {
  //const classes = useJSS()
  const svgRef = useRef<SVGSVGElement>(null)
  const scale = (range[1] - range[0]) / 100
  const [val, setVal] = useState(initValue)
  const onPointerMove: PointerEventCallback = e => {
    const dif = e.movementY * scale
    if (onChange) { onChange(val + dif) }
    setVal(clamp(val + dif, range))
  }
  const onPointerUp: PointerEventCallback = e => {

  }
  return (
    <svg width={'8vmin'} height={'8vmin'} ref={svgRef}
      style={{ transform: `rotate(${getRotation(val, range)}deg)`, zIndex: 100 }}
      onClick={e => e.stopPropagation()}
      onDragStart={e => e.stopPropagation() }
      onPointerDown={e => {
        window.openPointerLayer(e.pointerId, onPointerMove, onPointerUp)
      }}
    >
      <circle cx='4vmin' cy='4vmin' r='4vmin' stroke='red' fill='white' fontSize={sizes.text.small} color='black'>
        <div style={{ color: 'black', zIndex: 102 }}>{`${val}`}</div>
      </circle>
      <rect width='.5vmin' height='2vmin' x='4vmin' y='0px'/>
    </svg>
  )
}

export default Knob