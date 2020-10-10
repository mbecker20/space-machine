import React, { ReactNode } from 'react'
import useJSS from './style'
import CSS from 'csstype'

interface Props {
  children?: ReactNode
  className?: string
  style?: CSS.Properties
  direction: 'row' | 'column' | 'row dense' | 'column dense'
  numRows?: number
  numCols?: number
  gap?: string
}

function AutoPlacingGrid({ children, className, style, numRows, numCols, direction, gap }: Props) {
  const classes = useJSS({ numRows, numCols, direction, gap })
  return (
    <div className={className ? `${classes.AutoPlacingGrid} ${className}` : classes.AutoPlacingGrid}
      style={style}
    >
      {children}
    </div>
  )
}

export default AutoPlacingGrid