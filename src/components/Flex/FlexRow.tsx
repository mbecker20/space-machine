import React from 'react'
import CSS from 'csstype'
import useJSS from './style'

interface Props {
  className?: string
  style?: CSS.Properties
  children?: React.ReactNode
  ref?: React.RefObject<HTMLDivElement>
}

function FlexRow({ className, children, style, ref }: Props) {
  const classes = useJSS()
  return (
    <div className={className ? `${classes.FlexRow} ${className}` : classes.FlexRow}
      style={style}
      ref={ref}
    >
      { children }
    </div>
  )
}

export default FlexRow