import React, { ReactNode, useRef, WheelEvent } from 'react'
import CSS from 'csstype'

interface Props {
  children: ReactNode
  className?: string
  style?: CSS.Properties
}

const baseStyle = {
  overflowY: 'hidden',
  overflowX: 'scroll',
  display: 'flex',
}

function HorizontalScrollDiv({ children, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  function onWheel(event: WheelEvent) {
    if(ref && ref.current) {
      ref.current.scrollLeft += event.deltaY
    } 
  }

  const baseStyleCopy = Object.assign({}, baseStyle)
  return (
    <div ref={ref} className={className} style={Object.assign(baseStyleCopy, style)} onWheel={onWheel}>
      {children}
    </div>
  )
}

export default HorizontalScrollDiv