import React, { useState } from 'react'
import useJSS from './style'
import { useSpring, animated } from 'react-spring'
import { colors, sizes } from '../../theme/theme'

interface Props {
  text: string,
  onSwitch: (newState: boolean) => void,
  initState: boolean,
  style?: object,
}

const heightDif = 1

const fullWidth = 2 * sizes.switch.diameter
const fullHeight = sizes.switch.diameter + heightDif

const rectWidth = 1.5 * sizes.switch.diameter
const rectHeight = sizes.switch.diameter - heightDif
const rectX = sizes.switch.diameter / 4
const rectY = heightDif

const circleCY = (sizes.switch.diameter + heightDif) / 2


function Switch({ text, onSwitch, initState, style }: Props) {
  const [isSwitched, setSwitched] = useState(initState)
  const classes = useJSS()
  const spring = useSpring({
    cx: isSwitched ? `${fullWidth - sizes.switch.diameter / 2}vmin` : `${sizes.switch.diameter / 2}vmin`,
    fill: isSwitched ? 'green' : 'red',
    config: {
      tension: 250,
    },
  })
  return (
    <div className={classes.Bounder} style={style}>
      <div
        onClick={() => { onSwitch(!isSwitched); setSwitched(!isSwitched) }}
      >
        {text}
      </div>
      <svg className={classes.SwitchSVG}
        width={`${fullWidth}vmin`}
        height={`${fullHeight}vmin`}
        onClick={() => {
          onSwitch(!isSwitched); setSwitched(!isSwitched)
        }}
      >
        <rect width={`${rectWidth}vmin`} height={`${rectHeight}vmin`} x={`${rectX}vmin`} y={`${rectY}vmin`} rx='10' ry='10' fill={colors.grey}/>
        <animated.circle cx={spring.cx} cy={`${circleCY}vmin`} r={`${sizes.switch.diameter / 2}vmin`} fill={spring.fill}/>
      </svg>
    </div>
  )
}

export default Switch