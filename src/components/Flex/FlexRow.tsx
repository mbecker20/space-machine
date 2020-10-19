import React from 'react'
import CSS from 'csstype'
import useJSS from './style'

interface Props {
  className?: string
  style?: CSS.Properties
  children?: React.ReactNode
  ref?: React.RefObject<HTMLDivElement>
  justifyContent?: string
  alignItems?: string
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse',
}

function FlexRow({ className, children, style, ref, justifyContent, alignItems, flexWrap }: Props) {
  const classes = useJSS({ justifyContent, alignItems, flexWrap })
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