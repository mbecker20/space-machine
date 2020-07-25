import React, { ReactNode, WheelEvent, RefObject } from 'react'
import CSS from 'csstype'

interface Props {
  children: ReactNode
  className?: string
  style?: CSS.Properties
  ref: RefObject<HTMLDivElement>
}

const baseStyle = {
  overflowY: 'hidden',
  overflowX: 'scroll',
  display: 'flex',
}

function HorizontalScrollDiv({ children, className, style, ref }: Props) {
  function onWheel(event: WheelEvent) {
    if(ref && ref.current) {
      ref.current.scrollLeft += event.deltaY
    } 
  }
  return (
    <div ref={ref} className={className} style={Object.assign({}, baseStyle, style)} onWheel={onWheel}>
      {children}
    </div>
  )
}

export default HorizontalScrollDiv