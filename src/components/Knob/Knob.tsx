import React, { useRef, useState } from 'react'
import CSS from 'csstype'
import { sizes } from '../../theme/theme'
//import useJSS from './style'
import { clamp } from '../../helpers/genFuncs'

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
  return (
    <svg width={'8vmin'} height={'8vmin'} ref={svgRef}
      style={{ transform: `rotate(${getRotation(val, range)}deg)`, zIndex: 100 }}
      onClick={e => e.stopPropagation()}
      onDragStart={ e => e.stopPropagation() }
    >
      <circle cx='4vmin' cy='4vmin' r='4vmin' stroke='red' fill='white' fontSize={sizes.text.small} color='black'>{`${val}`}</circle>
      <circle cx='4vmin' cy='4vmin' r='4vmin' stroke='transparent' fill='transparent'
        onClick={e => e.stopPropagation()}
        onDragStart={e => e.stopPropagation()}
        onDrag={ e => e.stopPropagation() }
        onPointerDown={e => {
          //e.preventDefault()
          svgRef.current?.setPointerCapture(e.pointerId)
          //prevY = e.clientY
          //capturedID = e.pointerId
          console.log(e.pointerId)
          console.log(e.button)
        }}
        onPointerMove={e => {
          //if (e.button === 0) {
          console.log('meh')
          console.log(`button ${e.button}`)
          console.log(e.pointerId)
          const dif = e.movementY * scale
          if (onChange) { onChange(val + dif) }
          //if (svgRef.current) { svgRef.current.style.transform = `rotate(${getRotation(val, range)}deg)` }
          setVal(clamp(val + dif, range))
          //}
        }}
        onPointerUp={e => svgRef.current?.releasePointerCapture(e.pointerId)}
        style={{ zIndex: 101 }}
      />
      <rect width='.5vmin' height='2vmin' x='4vmin' y='0px'/>
    </svg>
  )
}

export default Knob