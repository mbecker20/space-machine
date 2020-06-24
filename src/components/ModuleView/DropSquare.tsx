import React from 'react'
import CSS from 'csstype'
import { useSpring, animated } from 'react-spring'
import useJSS from './style'

interface Props {
  row: number
  col: number
}

function DropSquare({ row, col }: Props) {
  const classes = useJSS()
  const dsStyle: CSS.Properties = {
    gridColumn: `${col} / span 1`,
    gridRow: `${row} / span 1`,
  }
  return (
    <animated.div className={classes.DropSquare} style={dsStyle}>
      
    </animated.div>
  );
}

export default DropSquare