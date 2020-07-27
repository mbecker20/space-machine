import React, { useState } from 'react'
import useJSS from './style'
import { useSpring, animated } from 'react-spring'
import { colors } from '../../theme/theme'


interface Props {
  text: string,
  onSwitch: (newState: boolean) => void,
  initState: boolean,
  style?: object,
}

function Switch({ text, onSwitch, initState, style }: Props) {
  const [state, setState] = useState(initState)
  const classes = useJSS()
  const spring = useSpring({
    cx: state ? '65' : '25',
    fill: state ? 'green' : 'red',
    config: {
      tension: 250,
    },
  })
  return (
    <div className={classes.Bounder} style={style}>
      <div
        onClick={() => { onSwitch(!state); setState(!state) }}
      >
        {text}
      </div>
      <svg onClick={() => { onSwitch(!state); setState(!state) }} width={'90'} height={'30'}>
        <rect width='50' height='20' x='20' y='5' rx='10' ry='10' fill={colors.grey}/>
        <animated.circle cx={spring.cx} cy={'15'} r={'15'} fill={spring.fill}/>
      </svg>
    </div>
  )
}

export default Switch